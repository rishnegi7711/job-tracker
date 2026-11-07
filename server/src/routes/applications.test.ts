import { afterAll, beforeAll, beforeEach, describe, expect, it, vi } from "vitest";
import express from "express";
import jwt from "jsonwebtoken";
import type { Server } from "http";
import type { AddressInfo } from "net";
import { env } from "../env";

// The database is mocked: this checks what the route asks Prisma for, not what Postgres returns.
vi.mock("../lib/prisma", () => ({
  default: {
    application: { findUnique: vi.fn(), create: vi.fn(), update: vi.fn() },
    interviewRound: { findMany: vi.fn() },
    statusChange: { findMany: vi.fn(), create: vi.fn(), update: vi.fn() },
    $transaction: vi.fn(),
  },
}));

import prisma from "../lib/prisma";
import applicationRouter from "./applications";
import { StatusChangeRecordSchema } from "../schemas/statusChange";

const userId = "test-user-id";
const token = jwt.sign({ userId }, env.JWT_SECRET);

// What the database returns for that orderBy. They were created as c, b, a: out of date
// order, with a and b on the same date, so the id tie-break puts a before b.
const stored = [
  { id: "a", type: "Phone", date: new Date("2026-03-01"), outcome: null, applicationId: "app-1" },
  { id: "b", type: "Phone", date: new Date("2026-03-01"), outcome: null, applicationId: "app-1" },
  { id: "c", type: "Onsite", date: new Date("2026-03-10"), outcome: null, applicationId: "app-1" },
];

describe("GET /api/applications/:id/rounds", () => {
  let server: Server;
  let baseUrl: string;

  beforeAll(async () => {
    const app = express();
    app.use("/api/applications", applicationRouter);
    await new Promise<void>((resolve) => {
      server = app.listen(0, resolve);
    });
    baseUrl = `http://localhost:${(server.address() as AddressInfo).port}`;
  });

  afterAll(() => {
    server.close();
  });

  beforeEach(() => {
    vi.mocked(prisma.application.findUnique).mockResolvedValue({ id: "app-1", userId } as never);
    vi.mocked(prisma.interviewRound.findMany).mockResolvedValue(stored as never);
  });

  it("asks for rounds by date ascending, then id ascending", async () => {
    const res = await fetch(`${baseUrl}/api/applications/app-1/rounds`, {
      headers: { authorization: `Bearer ${token}` },
    });

    expect(res.status).toBe(200);
    expect(prisma.interviewRound.findMany).toHaveBeenCalledWith({
      where: { applicationId: "app-1" },
      orderBy: [{ date: "asc" }, { id: "asc" }],
    });
  });

  it("returns the rounds as the query ordered them", async () => {
    const res = await fetch(`${baseUrl}/api/applications/app-1/rounds`, {
      headers: { authorization: `Bearer ${token}` },
    });

    const body = (await res.json()) as { id: string }[];
    expect(body.map((r) => r.id)).toEqual(["a", "b", "c"]);
  });
});

// --- Status history ---------------------------------------------------------------

const auth = { authorization: `Bearer ${token}`, "content-type": "application/json" };
const day = (n: number) => new Date(Date.UTC(2026, 2, n));
const daysFromNow = (n: number) => new Date(Date.now() + n * 24 * 60 * 60 * 1000);

describe("status history", () => {
  let server: Server;
  let baseUrl: string;

  beforeAll(async () => {
    const app = express();
    app.use(express.json());
    app.use("/api/applications", applicationRouter);
    await new Promise<void>((resolve) => {
      server = app.listen(0, resolve);
    });
    baseUrl = `http://localhost:${(server.address() as AddressInfo).port}`;
  });

  afterAll(() => {
    server.close();
  });

  const existing = { id: "app-1", userId, status: "Applied", dateApplied: day(1) };

  beforeEach(() => {
    vi.resetAllMocks();
    vi.mocked(prisma.application.findUnique).mockResolvedValue(existing as never);
    vi.mocked(prisma.application.update).mockResolvedValue({ ...existing } as never);
    vi.mocked(prisma.statusChange.create).mockResolvedValue({} as never);
    vi.mocked(prisma.statusChange.update).mockResolvedValue({} as never);
    vi.mocked(prisma.$transaction).mockImplementation((async (ops: Promise<unknown>[]) =>
      Promise.all(ops)) as never);
  });

  const patch = (body: object) =>
    fetch(`${baseUrl}/api/applications/app-1`, {
      method: "PATCH",
      headers: auth,
      body: JSON.stringify(body),
    });

  describe("POST /api/applications", () => {
    it("creates the application with its first status row at dateApplied", async () => {
      vi.mocked(prisma.application.create).mockResolvedValue({ id: "app-1" } as never);

      const res = await fetch(`${baseUrl}/api/applications`, {
        method: "POST",
        headers: auth,
        body: JSON.stringify({
          company: "Acme",
          role: "Dev",
          status: "Interviewing",
          dateApplied: "2026-03-01",
        }),
      });

      expect(res.status).toBe(201);
      const data = vi.mocked(prisma.application.create).mock.calls[0][0].data;
      expect(data.statusChanges).toEqual({
        create: { status: "Interviewing", changedAt: day(1), backfilled: false },
      });
    });
  });

  describe("PATCH /api/applications/:id", () => {
    it("updates the status and inserts a row in one transaction, dated statusChangedAt", async () => {
      const res = await patch({ status: "Interviewing", statusChangedAt: "2026-03-05" });

      expect(res.status).toBe(200);
      expect(prisma.$transaction).toHaveBeenCalledTimes(1);
      expect(prisma.application.update).toHaveBeenCalledWith({
        where: { id: "app-1" },
        data: { status: "Interviewing" },
      });
      expect(prisma.statusChange.create).toHaveBeenCalledWith({
        data: {
          applicationId: "app-1",
          status: "Interviewing",
          changedAt: day(5),
          backfilled: false,
        },
      });
    });

    it("dates the row today when statusChangedAt is not sent", async () => {
      await patch({ status: "Rejected" });

      const today = new Date(new Date().toISOString().slice(0, 10));
      expect(prisma.statusChange.create).toHaveBeenCalledWith({
        data: expect.objectContaining({ status: "Rejected", changedAt: today }),
      });
    });

    it("inserts nothing when the status is unchanged, and ignores statusChangedAt", async () => {
      const res = await patch({ status: "Applied", statusChangedAt: "2026-03-05", notes: "hi" });

      expect(res.status).toBe(200);
      expect(prisma.statusChange.create).not.toHaveBeenCalled();
      expect(prisma.application.update).toHaveBeenCalledWith({
        where: { id: "app-1" },
        data: { status: "Applied", notes: "hi" },
      });
    });

    it("returns 400 for statusChangedAt without status", async () => {
      const res = await patch({ statusChangedAt: "2026-03-05" });

      expect(res.status).toBe(400);
      expect(((await res.json()) as { error: object }).error).toHaveProperty("statusChangedAt");
      expect(prisma.$transaction).not.toHaveBeenCalled();
    });

    it("returns 400 for statusChangedAt more than a day in the future", async () => {
      const res = await patch({
        status: "Offer",
        statusChangedAt: daysFromNow(3).toISOString(),
      });

      expect(res.status).toBe(400);
      expect(((await res.json()) as { error: object }).error).toHaveProperty("statusChangedAt");
      expect(prisma.$transaction).not.toHaveBeenCalled();
    });

    it("accepts statusChangedAt up to a day ahead (time zones)", async () => {
      const res = await patch({
        status: "Offer",
        statusChangedAt: daysFromNow(0.5).toISOString(),
      });

      expect(res.status).toBe(200);
    });

    it("returns 400 for statusChangedAt before dateApplied", async () => {
      const res = await patch({ status: "Offer", statusChangedAt: "2026-02-20" });

      expect(res.status).toBe(400);
      expect(((await res.json()) as { error: object }).error).toHaveProperty("statusChangedAt");
    });

    it("checks statusChangedAt against the new dateApplied when the same PATCH changes it", async () => {
      vi.mocked(prisma.statusChange.findMany).mockResolvedValue([
        { id: "r1", changedAt: day(1), createdAt: day(1) },
      ] as never);

      const res = await patch({
        status: "Offer",
        dateApplied: "2026-03-10",
        statusChangedAt: "2026-03-05",
      });

      expect(res.status).toBe(400);
      expect(((await res.json()) as { error: object }).error).toHaveProperty("statusChangedAt");
    });

    it("returns 400 when a dateApplied edit falls after a later history row", async () => {
      vi.mocked(prisma.statusChange.findMany).mockResolvedValue([
        { id: "r1", changedAt: day(1), createdAt: day(1) },
        { id: "r2", changedAt: day(8), createdAt: day(8) },
      ] as never);

      const res = await patch({ dateApplied: "2026-03-09" });

      expect(res.status).toBe(400);
      expect(((await res.json()) as { error: object }).error).toHaveProperty("dateApplied");
      expect(prisma.$transaction).not.toHaveBeenCalled();
    });

    it("moves the first row's changedAt with a valid dateApplied edit, in one transaction", async () => {
      vi.mocked(prisma.statusChange.findMany).mockResolvedValue([
        { id: "r1", changedAt: day(1), createdAt: day(1) },
        { id: "r2", changedAt: day(8), createdAt: day(8) },
      ] as never);

      const res = await patch({ dateApplied: "2026-03-08" });

      expect(res.status).toBe(200);
      expect(prisma.statusChange.findMany).toHaveBeenCalledWith({
        where: { applicationId: "app-1" },
        orderBy: [{ changedAt: "asc" }, { createdAt: "asc" }],
      });
      expect(prisma.statusChange.update).toHaveBeenCalledWith({
        where: { id: "r1" },
        data: { changedAt: day(8) },
      });
      expect(prisma.$transaction).toHaveBeenCalledTimes(1);
    });

    it("leaves history alone when dateApplied is not changed", async () => {
      await patch({ notes: "x" });

      expect(prisma.statusChange.findMany).not.toHaveBeenCalled();
      expect(prisma.statusChange.update).not.toHaveBeenCalled();
    });
  });

  describe("GET /api/applications/:id/status-history", () => {
    const url = () => `${baseUrl}/api/applications/app-1/status-history`;
    const rows = [
      { id: "s1", applicationId: "app-1", status: "Applied", changedAt: day(1), createdAt: day(1), backfilled: true },
      { id: "s2", applicationId: "app-1", status: "Interviewing", changedAt: day(4), createdAt: day(6), backfilled: false },
    ];

    it("returns 401 without a token", async () => {
      expect((await fetch(url())).status).toBe(401);
    });

    it("returns 404 when the application does not exist", async () => {
      vi.mocked(prisma.application.findUnique).mockResolvedValue(null);
      expect((await fetch(url(), { headers: auth })).status).toBe(404);
    });

    it("returns 403 for another user's application", async () => {
      vi.mocked(prisma.application.findUnique).mockResolvedValue({ id: "app-1", userId: "someone-else" } as never);
      const res = await fetch(url(), { headers: auth });

      expect(res.status).toBe(403);
      expect(prisma.statusChange.findMany).not.toHaveBeenCalled();
    });

    it("asks for rows by changedAt then createdAt ascending, and returns records that parse", async () => {
      vi.mocked(prisma.statusChange.findMany).mockResolvedValue(rows as never);
      const res = await fetch(url(), { headers: auth });

      expect(res.status).toBe(200);
      expect(prisma.statusChange.findMany).toHaveBeenCalledWith({
        where: { applicationId: "app-1" },
        orderBy: [{ changedAt: "asc" }, { createdAt: "asc" }],
      });
      const body = (await res.json()) as unknown[];
      expect(body.map((r) => StatusChangeRecordSchema.parse(r).id)).toEqual(["s1", "s2"]);
    });
  });
});
