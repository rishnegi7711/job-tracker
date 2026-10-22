import type { ComponentProps } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

type AuthFieldProps = ComponentProps<typeof Input> & {
  label: string;
  error?: string;
};

// Label + 40px field + inline error, as specified in DESIGN.md "Inputs / Fields".
export const AuthField = ({ label, error, id, ...props }: AuthFieldProps) => (
  <div className="flex flex-col gap-1.5">
    <Label htmlFor={id}>{label}</Label>
    <Input
      id={id}
      aria-describedby={error ? `${id}-error` : undefined}
      className="h-10 px-3 text-[15px] md:text-[15px]"
      {...props}
    />
    {error && (
      <span id={`${id}-error`} className="text-xs text-destructive">
        {error}
      </span>
    )}
  </div>
);
