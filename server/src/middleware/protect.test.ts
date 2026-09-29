import { describe, it, vi, expect } from "vitest";
import protect from "./protect";
import jwt from "jsonwebtoken";
import { env } from "../env";

describe("protect middleware", () => {
  it("returns 401 when no authorization header is present", () => {
    const req = { headers: {} } as any;
    const res = { status: vi.fn().mockReturnThis(), json: vi.fn() } as any;
    const next = vi.fn();

    protect(req, res, next);
    expect(res.status).toHaveBeenCalledWith(401);
    expect(next).not.toHaveBeenCalled();
  });

  it("returns 401 when the token is invalid", () => {
    const req = { headers: { authorization: "Bearer garbage_token" } } as any;
    const res = { status: vi.fn().mockReturnThis(), json: vi.fn() } as any;
    const next = vi.fn();
    protect(req, res, next);
    expect(res.status).toHaveBeenCalledWith(401);
    expect(next).not.toHaveBeenCalled();
  });

  it("calls next() and sets req.userId when the token is valid", () => {
    const token = jwt.sign({ userId: "test-user-id" }, env.JWT_SECRET);
    const req = { headers: { authorization: `Bearer ${token}` } } as any;
    const res = { status: vi.fn().mockReturnThis(), json: vi.fn() } as any;
    const next = vi.fn();
    protect(req, res, next);
    expect(next).toHaveBeenCalled();
    expect(req.userId).toBe("test-user-id");
  });
});
