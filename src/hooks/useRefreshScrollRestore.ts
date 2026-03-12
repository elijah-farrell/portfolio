import { useLayoutEffect, useEffect } from "react";
import { useLocation } from "react-router-dom";

const KEY = "scrollY";
const RELOAD_RESTORING_CLASS = "scroll-restoring-reload";

function isReload(): boolean {
  if (typeof performance === "undefined" || !performance.getEntriesByType)
    return false;
  const nav = performance.getEntriesByType(
    "navigation"
  )[0] as PerformanceNavigationTiming | undefined;
  return nav?.type === "reload";
}

/**
 * Saves scroll on unload. On reload, restores scroll before first paint (in
 * useLayoutEffect) so mobile doesn't flash the top, then re-applies after
 * layout settles (double rAF) so full content height is in. Use once in Layout;
 * works with React Router ScrollRestoration.
 */
export function useRefreshScrollRestore(): void {
  const { pathname } = useLocation();

  useLayoutEffect(() => {
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }

    const releaseInitialMask = () => {
      document.documentElement.classList.remove(RELOAD_RESTORING_CLASS);
    };

    if (!isReload()) {
      releaseInitialMask();
      return;
    }
    if (typeof window !== "undefined" && window.location.hash && pathname === "/") {
      releaseInitialMask();
      return;
    }

    const raw = sessionStorage.getItem(KEY);
    if (!raw) {
      releaseInitialMask();
      return;
    }

    const y = parseInt(raw, 10);
    if (Number.isNaN(y) || y <= 0) {
      releaseInitialMask();
      return;
    }

    const restore = () => {
      const max =
        document.documentElement.scrollHeight - window.innerHeight;
      window.scrollTo({
        top: Math.min(y, Math.max(0, max)),
        left: 0,
        behavior: "instant",
      });
    };

    // Restore immediately so first paint has correct scroll (avoids mobile flash).
    restore();
    // Re-apply after layout settles (images, lazy content) so position stays correct.
    requestAnimationFrame(() =>
      requestAnimationFrame(() => {
        restore();
        releaseInitialMask();
      })
    );

    // Safety release in case rAF gets delayed on iOS backgrounded tabs.
    const timeoutId = window.setTimeout(releaseInitialMask, 800);
    return () => window.clearTimeout(timeoutId);
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
