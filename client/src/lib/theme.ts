export const themes = ["light", "dark", "system"] as const;
export type Theme = (typeof themes)[number];

const KEY = "theme";

export const getTheme = (): Theme => {
  try {
    const t = localStorage.getItem(KEY);
    return themes.find((x) => x === t) ?? "system";
  } catch {
    return "system";
  }
};

// Same rule as the no-flash script in index.html: keep the two in step.
export const setTheme = (t: Theme) => {
  try {
    localStorage.setItem(KEY, t);
  } catch {
    // storage blocked: the choice still applies until reload
  }
  document.documentElement.classList.toggle(
    "dark",
    t === "dark" ||
      (t === "system" && matchMedia("(prefers-color-scheme: dark)").matches),
  );
};
