import { useEffect } from "react";
import { useIsoLayoutEffect } from "@/lib/ssr";

const KEY = "scrollY";

type SavedScroll = { y: number; max: number | null };

function maxScroll(): number {
  return Math.max(0, document.documentElement.scrollHeight - window.innerHeight);
}

function savedScroll(): SavedScroll | null {
  try {
    const raw = sessionStorage.getItem(KEY);
    if (!raw) return null;
    if (raw.startsWith("{")) {
      const data = JSON.parse(raw) as { y?: unknown; max?: unknown };
      const y = typeof data.y === "number" ? data.y : Number.NaN;
      const max = typeof data.max === "number" ? data.max : null;
      if (!Number.isFinite(y) || y <= 0) return null;
      return { y, max: max != null && Number.isFinite(max) && max > 0 ? max : null };
    }
    const y = parseInt(raw, 10);
    if (Number.isNaN(y) || y <= 0) return null;
    return { y, max: null };
  } catch {
    return null;
  }
}

/** Keep the scrollbar thumb in place when the page height changed between reloads. */
function restoreTop(saved: SavedScroll): number {
  const max = maxScroll();
  if (saved.max && max > 0) return Math.round((saved.y / saved.max) * max);
  return saved.y;
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
 * fraction of the page once after React commits.
 * A reload that has not finished loading does not overwrite the saved position,
 * so mashing refresh cannot replace it with 0.
 */
export function useRefreshScrollRestore(): void {
  useIsoLayoutEffect(() => {
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }
    if (!shouldRestore()) return;
    const saved = savedScroll();
    if (saved == null) return;
    window.scrollTo({ top: restoreTop(saved), left: 0, behavior: "instant" });
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
        sessionStorage.setItem(
          KEY,
          JSON.stringify({ y: Math.round(y), max: maxScroll() })
        );
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
