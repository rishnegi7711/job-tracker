import { describe, it, expect } from "vitest";
import { ApplicationSchema, ApplicationRecordSchema } from "./application";

describe("ApplicationSchema", () => {
  it("rejects and empty company name", () => {
    const badInput = {
      company: "",
      role: "Engineer",
      status: "Applied",
      dateApplied: "2026-01-01",
      notes: "",
    };
    const result = ApplicationSchema.safeParse(badInput);
    expect(result.success).toBe(false);
  });
  it("accepts valid application data", () => {
    const goodInput = {
      company: "Google",
      role: "Engineer",
      status: "Applied",
      dateApplied: "2026-01-01",
      notes: "",
    };
    const result = ApplicationSchema.safeParse(goodInput);
    expect(result.success).toBe(true);
  });
  it("accepts postingText of exactly 20,000 characters", () => {
    const maxInput = {
      company: "Google",
      role: "Engineer",
      status: "Applied",
      dateApplied: "2026-01-01",
      postingText: "a".repeat(20000),
    };
    const result = ApplicationSchema.safeParse(maxInput);
    expect(result.success).toBe(true);
  });
  it("rejects postingText over 20,000 characters", () => {
    const longInput = {
      company: "Google",
      role: "Engineer",
      status: "Applied",
      dateApplied: "2026-01-01",
      postingText: "a".repeat(20001),
    };
    const result = ApplicationSchema.safeParse(longInput);
    expect(result.success).toBe(false);
  });
});

describe("ApplicationRecordSchema", () => {
  it("accepts a record with null postingText", () => {
    const record = {
      id: "app_1",
      userId: "user_1",
      company: "Google",
      role: "Engineer",
      status: "Applied",
      dateApplied: "2026-01-01T00:00:00.000Z",
      notes: null,
      postingText: null,
    };
    const result = ApplicationRecordSchema.safeParse(record);
    expect(result.success).toBe(true);
  });
  it("accepts a record with no postingText key", () => {
    const record = {
      id: "app_1",
      userId: "user_1",
      company: "Google",
      role: "Engineer",
      status: "Applied",
      dateApplied: "2026-01-01T00:00:00.000Z",
      notes: null,
    };
    const result = ApplicationRecordSchema.safeParse(record);
    expect(result.success).toBe(true);
  });
});
