"use client";

import React, { useEffect, useRef, useState } from "react";

/**
 * Renders children only when the section is near the viewport (Intersection Observer).
 * Defers JS execution for below-the-fold content so initial load stays light (mobile 90+).
 * Use forceMount when user deep-links (hash/state) so scroll target exists.
 */
export function LazySection({
  children,
  rootMargin = "200px",
  minHeight = "min-h-[400px]",
  className,
  forceMount = false,
}: {
  children: React.ReactNode;
  rootMargin?: string;
  minHeight?: string;
  className?: string;
  forceMount?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(forceMount);

  useEffect(() => {
    if (forceMount) {
      setInView(true);
      return;
    }
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setInView(true);
      },
      { rootMargin, threshold: 0 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [rootMargin, forceMount]);

  return (
    <div ref={ref} className={className}>
      {inView ? children : <div className={minHeight} aria-hidden="true" />}
    </div>
  );
}
