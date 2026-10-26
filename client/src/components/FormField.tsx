import type { ReactNode } from "react";
import { Label } from "@/components/ui/label";

type FormFieldProps = {
  id: string;
  label: string;
  optional?: boolean;
  error?: string;
  children: ReactNode;
};

// Label + control + inline error, as specified in DESIGN.md "Inputs / Fields".
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
    {children}
    {error && (
      <span id={`${id}-error`} className="text-xs text-destructive">
        {error}
      </span>
    )}
  </div>
);
