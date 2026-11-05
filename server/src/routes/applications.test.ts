import { afterAll, beforeAll, beforeEach, describe, expect, it, vi } from "vitest";
import express from "express";
import jwt from "jsonwebtoken";
import type { Server } from "http";
import type { AddressInfo } from "net";
import { env } from "../env";

// The database is mocked: this checks what the route asks Prisma for, not what Postgres returns.
vi.mock("../lib/prisma", () => ({
  default: {
    application: { findUnique: vi.fn() },
    interviewRound: { findMany: vi.fn() },
  },
}));

import prisma from "../lib/prisma";
import applicationRouter from "./applications";

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
