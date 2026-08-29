// Single source of truth for theme on the client.
// The DOM (<html> class) owns the theme; React just reads/toggles it.

export type Theme = "light" | "dark";

export function getTheme(): Theme {
  if (typeof document === "undefined") return "dark";
  return document.documentElement.classList.contains("dark") ? "dark" : "light";
}

function overscrollColor(theme: Theme): string {
  return theme === "dark" ? "#0a0a0a" : "#ffffff";
}

export function syncOverscrollToTheme(theme: Theme = getTheme()) {
  if (typeof document === "undefined") return;
  document.documentElement.style.setProperty("--overscroll-bg", overscrollColor(theme));
  document.documentElement.style.colorScheme = theme;
}

export function setTheme(theme: Theme) {
  if (typeof document === "undefined") return;
  const root = document.documentElement;
  root.classList.toggle("dark", theme === "dark");
  // Keep chrome in sync with the menu. Deferring color-scheme while the URL
  // bar is collapsed leaves a too-tall slab of the previous theme.
  root.style.colorScheme = theme;
  if (document.body.style.position === "fixed") {
    document.documentElement.style.setProperty("--overscroll-bg", overscrollColor(theme));
  }
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
