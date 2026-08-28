// Single source of truth for theme on the client.
// The DOM (<html> class) owns the theme; React just reads/toggles it.

export type Theme = "light" | "dark";

export function getTheme(): Theme {
  if (typeof document === "undefined") return "dark";
  return document.documentElement.classList.contains("dark") ? "dark" : "light";
}

export function setTheme(theme: Theme) {
  if (typeof document === "undefined") return;
  const root = document.documentElement;
  root.classList.toggle("dark", theme === "dark");
  // Keep browser chrome/scrollbar in sync after client-side toggle.
  root.style.colorScheme = theme;
  queueMicrotask(() => {
    try {
      window.localStorage.setItem("theme", theme);
    } catch {
      // ignore
    }
  });
}

export function toggleTheme() {
  setTheme(getTheme() === "dark" ? "light" : "dark");
}



