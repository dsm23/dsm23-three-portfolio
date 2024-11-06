import type { ThemeProviderProps } from "./types";

type Args = Omit<ThemeProviderProps, "attribute"> & { attribute: string };

export const script = ({
  attribute,
  storageKey,
  defaultTheme = "light",
  forcedTheme,
  themes = [],
  value,
  enableSystem,
  enableColorScheme,
}: Args) => {
  const el = document.documentElement;
  const systemThemes = ["light", "dark"];
  const isClass = attribute === "class";
  const classes = isClass && value ? themes.map((t) => value[t] ?? t) : themes;

  function updateDOM(theme: string) {
    if (isClass) {
      el.classList.remove(...classes);
      el.classList.add(theme);
    } else {
      el.setAttribute(attribute, theme);
    }

    setColorScheme(theme);
  }

  function setColorScheme(theme: string) {
    if (enableColorScheme && systemThemes.includes(theme)) {
      el.style.colorScheme = theme;
    }
  }

  function getSystemTheme() {
    return window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light";
  }

  if (forcedTheme) {
    updateDOM(forcedTheme);
  } else {
    try {
      const themeName = storageKey
        ? (localStorage.getItem(storageKey) ?? defaultTheme)
        : defaultTheme;
      const isSystem = enableSystem && themeName === "system";
      const theme = isSystem ? getSystemTheme() : themeName;
      updateDOM(theme);
    } catch (err) {
      console.error(err);
    }
  }
};
