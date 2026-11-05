import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { FormField } from "./FormField";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectTrigger, SelectValue } from "@/components/ui/select";

describe("FormField", () => {
  it("links the error to the control and marks it invalid", () => {
    render(
      <FormField id="email" label="Email" error="Enter a valid email">
        {(a11y) => <Input {...a11y} />}
      </FormField>,
    );
    const input = screen.getByLabelText("Email");
    expect(input).toHaveAttribute("aria-invalid", "true");
    expect(input).toHaveAccessibleDescription("Enter a valid email");
  });

  it("adds no aria attributes without an error", () => {
    render(
      <FormField id="email" label="Email">
        {(a11y) => <Input {...a11y} />}
      </FormField>,
    );
    const input = screen.getByLabelText("Email");
    expect(input).not.toHaveAttribute("aria-invalid");
    expect(input).not.toHaveAttribute("aria-describedby");
  });

  it("works for Textarea", () => {
    render(
      <FormField id="notes" label="Notes" error="Too long">
        {(a11y) => <Textarea {...a11y} />}
      </FormField>,
    );
    expect(screen.getByLabelText("Notes")).toHaveAccessibleDescription("Too long");
  });

  it("works for SelectTrigger", () => {
    render(
      <FormField id="status" label="Status" error="Pick a status">
        {(a11y) => (
          <Select>
            <SelectTrigger {...a11y}>
              <SelectValue placeholder="Select status" />
            </SelectTrigger>
          </Select>
        )}
      </FormField>,
    );
    const trigger = screen.getByRole("combobox");
    expect(trigger).toHaveAttribute("aria-invalid", "true");
    expect(trigger).toHaveAccessibleDescription("Pick a status");
  });
});
