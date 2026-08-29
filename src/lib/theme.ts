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

let pageThemePaintGen = 0;

function paintSafariOverscroll(theme: Theme) {
  const color = overscrollColor(theme);
  const root = document.documentElement;
  root.style.setProperty("--overscroll-bg", color);
  root.style.colorScheme = theme;
  // Literal hex: CSS-variable updates on body are often ignored by the sampler.
  document.body.style.backgroundColor = color;
}

export function syncOverscrollToTheme(theme: Theme = getTheme()) {
  if (typeof document === "undefined") return;
  paintSafariOverscroll(theme);
}

export function setTheme(theme: Theme) {
  if (typeof document === "undefined") return;
  const root = document.documentElement;
  paintSafariOverscroll(theme);

  const gen = ++pageThemePaintGen;
  requestAnimationFrame(() => {
    if (gen !== pageThemePaintGen) return;
    root.classList.toggle("dark", theme === "dark");
  });

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
