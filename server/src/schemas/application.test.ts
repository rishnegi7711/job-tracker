import { describe, it, expect } from "vitest";
import { ApplicationSchema } from "./application";

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
});
