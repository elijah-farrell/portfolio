import { useEffect } from "react";
import { useIsoLayoutEffect } from "@/lib/ssr";

const KEY = "scrollY";
/** Stop re-applying reload scroll once layout has had time to grow. */
const SETTLE_MS = 2500;

function isReload(): boolean {
  if (typeof performance === "undefined" || !performance.getEntriesByType)
    return false;
  const nav = performance.getEntriesByType(
    "navigation"
  )[0] as PerformanceNavigationTiming | undefined;
  return nav?.type === "reload";
}

/**
 * Saves scroll on unload. Reload/back restore happens in index.html after
 * #root (before first paint). This re-applies if document height grows.
 */
export function useRefreshScrollRestore(): void {
  useIsoLayoutEffect(() => {
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }

    if (!isReload()) return;
    if (window.location.hash && window.location.pathname === "/") return;

    let y: number;
    try {
      const raw = sessionStorage.getItem(KEY);
      if (!raw) return;
      y = parseInt(raw, 10);
      if (Number.isNaN(y) || y <= 0) return;
    } catch {
      return;
    }

    let cancelled = false;
    let lastRestoredTop = 0;
    let settleId = 0;
    let iosRaf = 0;

    const restore = () => {
      if (cancelled) return;
      const max = Math.max(
        0,
        document.documentElement.scrollHeight - window.innerHeight
      );
      lastRestoredTop = Math.min(y, max);
      window.scrollTo({
        top: lastRestoredTop,
        left: 0,
        behavior: "instant",
      });
    };

    restore();
    // iOS may paint one frame at y=0 before scrollTo sticks.
    iosRaf = requestAnimationFrame(restore);

    let lastHeight = document.documentElement.scrollHeight;
    const ro = new ResizeObserver(() => {
      const next = document.documentElement.scrollHeight;
      if (next === lastHeight) return;
      lastHeight = next;
      restore();
    });
    ro.observe(document.documentElement);
    if (document.body) ro.observe(document.body);
    const root = document.getElementById("root");
    if (root) ro.observe(root);

    const stop = () => {
      if (cancelled) return;
      cancelled = true;
      cancelAnimationFrame(iosRaf);
      ro.disconnect();
      window.clearTimeout(settleId);
      window.removeEventListener("scroll", onScroll);
    };

    const onScroll = () => {
      if (cancelled) return;
      if (Math.abs(window.scrollY - lastRestoredTop) <= 2) return;
      stop();
    };

    settleId = window.setTimeout(stop, SETTLE_MS);
    window.addEventListener("scroll", onScroll, { passive: true });

    return stop;
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
