import { useLayoutEffect } from "react";
import { useLocation } from "react-router-dom";

/**
 * useScrollPreservation
 * ---------------------
 * Refresh-only scroll restore:
 * - On real reloads, restores last scrollY from sessionStorage.
 * - For normal navigation / back-forward, lets the browser handle scroll.
 */
export const useScrollPreservation = () => {
  const location = useLocation();

  useLayoutEffect(() => {
    const navEntries = performance.getEntriesByType(
      "navigation"
    ) as PerformanceNavigationTiming[];
    const type = navEntries[0]?.type;

    // Only take over scroll restoration on real reloads
    if ("scrollRestoration" in history) {
      history.scrollRestoration = type === "reload" ? "manual" : "auto";
    }

    // On real reloads, restore the previous scroll position.
    if (type === "reload") {
      const savedY = sessionStorage.getItem("scrollY");
      if (savedY) {
        const y = parseInt(savedY, 10);
        if (!Number.isNaN(y)) {
          requestAnimationFrame(() => {
            window.scrollTo(0, y);
          });
        }
      }
    }

    const saveScroll = () => {
      try {
        sessionStorage.setItem("scrollY", window.scrollY.toString());
      } catch {
        // ignore storage failures (Safari private mode, etc.)
      }
    };

    const handleVisibilityChange = () => {
      if (document.visibilityState === "hidden") {
        saveScroll();
      }
    };

    window.addEventListener("beforeunload", saveScroll);
    window.addEventListener("pagehide", saveScroll);
    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      window.removeEventListener("beforeunload", saveScroll);
      window.removeEventListener("pagehide", saveScroll);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [location.key]);
};


