import { useEffect } from "react";
import { useIsoLayoutEffect } from "@/lib/ssr";

const KEY = "scrollY";

function savedScroll(): number | null {
  try {
    const raw = sessionStorage.getItem(KEY);
    if (!raw) return null;
    const y = raw.startsWith("{")
      ? Number((JSON.parse(raw) as { y?: unknown }).y)
      : parseInt(raw, 10);
    if (!Number.isFinite(y) || y <= 0) return null;
    return y;
  } catch {
    return null;
  }
}

function shouldRestore(): boolean {
  if (window.location.hash && window.location.pathname === "/") return false;
  const nav = performance.getEntriesByType("navigation")[0] as
    | PerformanceNavigationTiming
    | undefined;
  return nav?.type === "reload" || nav?.type === "back_forward";
}

/**
 * Saves the exact scroll offset when the page is left. index.html restores it
 * before first paint when the prerendered page is already tall enough, and this
 * applies that same offset once after React commits.
 * A reload that has not finished loading does not overwrite the saved position,
 * so mashing refresh cannot replace it with 0.
 */
export function useRefreshScrollRestore(): void {
  useIsoLayoutEffect(() => {
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }
    if (!shouldRestore()) return;
    const y = savedScroll();
    if (y == null) return;
    window.scrollTo({ top: y, left: 0, behavior: "instant" });
  }, []);

  useEffect(() => {
    const save = () => {
      const type = (
        performance.getEntriesByType("navigation")[0] as
          | PerformanceNavigationTiming
          | undefined
      )?.type;
      const isReload = type === "reload" || type === "back_forward";
      if (isReload && document.readyState !== "complete") return;

      try {
        const y = window.scrollY;
        if (y <= 0) {
          sessionStorage.removeItem(KEY);
          return;
        }
        sessionStorage.setItem(KEY, String(Math.round(y)));
      } catch {
        /* sessionStorage unavailable */
      }
    };

    const onVisibilityChange = () => {
      if (document.visibilityState === "hidden") save();
    };

    window.addEventListener("beforeunload", save);
    window.addEventListener("pagehide", save);
    document.addEventListener("visibilitychange", onVisibilityChange);

    return () => {
      window.removeEventListener("beforeunload", save);
      window.removeEventListener("pagehide", save);
      document.removeEventListener("visibilitychange", onVisibilityChange);
    };
  }, []);
}
