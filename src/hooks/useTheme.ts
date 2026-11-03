import { useCallback, useEffect, useLayoutEffect, useState } from "react";

export type Theme = "light" | "dark";

const STORAGE_KEY = "theme";

/** The inline script in index.html sets data-theme before first paint; read it back. */
function initialTheme(): Theme {
  const attr = document.documentElement.dataset.theme;
  if (attr === "light" || attr === "dark") return attr;
  return window.matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark";
}

function storedTheme(): Theme | null {
  try {
    const value = localStorage.getItem(STORAGE_KEY);
    return value === "light" || value === "dark" ? value : null;
  } catch {
    return null;
  }
}

/**
 * Current colour theme. Follows the OS setting until the visitor picks one,
 * after which the choice is remembered.
 */
export function useTheme() {
  const [theme, setTheme] = useState<Theme>(initialTheme);

  // Layout effect so the attribute (and the CSS tokens it switches) is in place
  // before any child's passive effect reads them — HeroCanvas does
  useLayoutEffect(() => {
    document.documentElement.dataset.theme = theme;
  }, [theme]);

  // Track OS changes only while the visitor hasn't chosen explicitly
  useEffect(() => {
    const media = window.matchMedia("(prefers-color-scheme: light)");
    const onChange = (e: MediaQueryListEvent) => {
      if (!storedTheme()) setTheme(e.matches ? "light" : "dark");
    };
    media.addEventListener("change", onChange);
    return () => media.removeEventListener("change", onChange);
  }, []);

  const toggleTheme = useCallback(() => {
    setTheme((prev) => {
      const next: Theme = prev === "dark" ? "light" : "dark";
      try {
        localStorage.setItem(STORAGE_KEY, next);
      } catch {
        // Storage blocked (private mode) — the toggle still works for this visit
      }
      return next;
    });
  }, []);

  return { theme, toggleTheme };
}
