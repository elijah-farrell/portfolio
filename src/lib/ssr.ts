import { useEffect, useLayoutEffect } from "react";

/** useLayoutEffect in the browser; useEffect during prerender (no window). */
export const useIsoLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;
