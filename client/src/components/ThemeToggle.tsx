import { useState } from "react";
import { Monitor, Moon, Sun } from "lucide-react";
import { getTheme, setTheme, type Theme } from "@/lib/theme";

const options = [
  { value: "light", label: "Light", Icon: Sun },
  { value: "dark", label: "Dark", Icon: Moon },
  { value: "system", label: "System", Icon: Monitor },
] satisfies { value: Theme; label: string; Icon: typeof Sun }[];

// Native radios: arrow keys and grouping come for free.
const ThemeToggle = () => {
  const [theme, setChoice] = useState(getTheme);

  return (
    <fieldset className="flex h-9 min-w-0 items-center gap-0.5 rounded-lg border border-border bg-muted p-0.5">
      <legend className="sr-only">Theme</legend>
      {options.map(({ value, label, Icon }) => (
        <label
          key={value}
          title={label}
          className="flex size-7 cursor-pointer items-center justify-center rounded-md text-muted-foreground transition-colors hover:text-foreground has-checked:bg-card has-checked:text-foreground has-focus-visible:ring-3 has-focus-visible:ring-focus-ring"
        >
          <input
            type="radio"
            name="theme"
            value={value}
            checked={theme === value}
            onChange={() => {
              setChoice(value);
              setTheme(value);
            }}
            className="sr-only"
          />
          <Icon className="size-4" aria-hidden />
          <span className="sr-only">{label}</span>
        </label>
      ))}
    </fieldset>
  );
};

export default ThemeToggle;
