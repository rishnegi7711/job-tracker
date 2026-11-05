import type { ReactNode } from "react";
import { Label } from "@/components/ui/label";

// What a control spreads on itself so its error is announced with it.
export type FieldA11y = {
  id: string;
  "aria-describedby"?: string;
  "aria-invalid"?: true;
};

type FormFieldProps = {
  id: string;
  label: string;
  optional?: boolean;
  error?: string;
  children: (a11y: FieldA11y) => ReactNode;
};

// Label + control + inline error, as specified in DESIGN.md "Inputs / Fields".
// A render prop, not a cloned child: a control may sit inside a Controller.
export const FormField = ({
  id,
  label,
  optional,
  error,
  children,
}: FormFieldProps) => (
  <div className="flex flex-col gap-1.5">
    <Label htmlFor={id}>
      {label}
      {optional && (
        <span className="text-xs font-normal text-ink-subtle">optional</span>
      )}
    </Label>
    {children({
      id,
      ...(error && { "aria-describedby": `${id}-error`, "aria-invalid": true }),
    })}
    {error && (
      <span id={`${id}-error`} className="text-xs text-destructive">
        {error}
      </span>
    )}
  </div>
);
