import { useEffect } from "react";
import { useIsoLayoutEffect } from "@/lib/ssr";

const KEY = "scrollY";

function savedScroll(): number | null {
  try {
    const raw = sessionStorage.getItem(KEY);
    if (!raw) return null;
    const y = parseInt(raw, 10);
    if (Number.isNaN(y) || y <= 0) return null;
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
 * Saves scroll when the page is left. index.html restores before first paint
 * when the prerendered page is already tall enough. This applies that same
 * position once after React commits, and does not follow later height changes.
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
      try {
        sessionStorage.setItem(KEY, String(window.scrollY));
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
