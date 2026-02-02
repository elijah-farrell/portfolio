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

  if (theme === "dark") {
    root.classList.add("dark");
  } else {
    root.classList.remove("dark");
  }

  // So native scrollbar (and form controls) follow light/dark on theme button click
  root.style.colorScheme = theme;

  try {
    window.localStorage.setItem("theme", theme);
  } catch {
    // ignore storage failures
  }
}

export function toggleTheme() {
  setTheme(getTheme() === "dark" ? "light" : "dark");
}



