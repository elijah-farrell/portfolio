import { useLayoutEffect, useEffect } from "react";
import { useLocation } from "react-router-dom";

const KEY = "scrollY";

function isReload(): boolean {
  if (typeof performance === "undefined" || !performance.getEntriesByType)
    return false;
  const nav = performance.getEntriesByType(
    "navigation"
  )[0] as PerformanceNavigationTiming | undefined;
  return nav?.type === "reload";
}

/**
 * Saves scroll on unload. On reload, restores scroll after paint (double rAF)
 * so content is laid out. Use once in Layout; works with React Router ScrollRestoration.
 */
export function useRefreshScrollRestore(): void {
  const { pathname } = useLocation();

  useLayoutEffect(() => {
    if (!isReload()) return;
    if (typeof window !== "undefined" && window.location.hash && pathname === "/")
      return;

    const raw = sessionStorage.getItem(KEY);
    if (!raw) return;

    const y = parseInt(raw, 10);
    if (Number.isNaN(y) || y <= 0) return;

    const restore = () => {
      const max =
        document.documentElement.scrollHeight - window.innerHeight;
      window.scrollTo({
        top: Math.min(y, Math.max(0, max)),
        left: 0,
        behavior: "instant",
      });
    };

    requestAnimationFrame(() => requestAnimationFrame(restore));
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
