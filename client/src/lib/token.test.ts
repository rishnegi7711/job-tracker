import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

const blockedStorage = () => {
  const boom = () => {
    throw new DOMException("blocked", "SecurityError");
  };
  vi.stubGlobal("localStorage", {
    getItem: boom,
    setItem: boom,
    removeItem: boom,
  });
};

describe("token helper", () => {
  // memoryToken is module state, so each test loads a fresh copy
  const load = async () => {
    vi.resetModules();
    return import("./token");
  };

  beforeEach(() => {
    localStorage.clear();
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it("round-trips through storage", async () => {
    const { getToken, setToken, clearToken } = await load();
    expect(getToken()).toBeNull();
    setToken("abc");
    expect(localStorage.getItem("token")).toBe("abc");
    expect(getToken()).toBe("abc");
    clearToken();
    expect(getToken()).toBeNull();
  });

  it("never throws and keeps the token in memory when storage is blocked", async () => {
    blockedStorage();
    const { getToken, setToken, clearToken } = await load();
    expect(getToken()).toBeNull();
    expect(() => setToken("abc")).not.toThrow();
    expect(getToken()).toBe("abc");
    expect(() => clearToken()).not.toThrow();
    expect(getToken()).toBeNull();
  });

  it("trusts storage over memory, so a log out in another tab applies", async () => {
    const { getToken, setToken } = await load();
    setToken("abc");
    localStorage.removeItem("token");
    expect(getToken()).toBeNull();
  });
});
