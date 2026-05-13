import React, { useCallback, useEffect, useRef, useState } from "react";

type MagneticProps = {
  children: React.ReactNode;
  /** How far the content follows the pointer (0–1 scale of half-width offset). */
  strength?: number;
  className?: string;
};

/**
 * Subtle cursor-follow offset for interactive tiles (respects reduced motion).
 */
export function Magnetic({
  children,
  strength = 0.28,
  className = "",
}: MagneticProps): JSX.Element {
  const rootRef = useRef<HTMLDivElement>(null);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [reducedMotion, setReducedMotion] = useState(false);
  const [hover, setHover] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mq.matches);
    const onChange = () => setReducedMotion(mq.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  const reset = useCallback(() => {
    setHover(false);
    setOffset({ x: 0, y: 0 });
  }, []);

  const onMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (reducedMotion) return;
      setHover(true);
      const el = rootRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      setOffset({
        x: (e.clientX - cx) * strength,
        y: (e.clientY - cy) * strength,
      });
    },
    [reducedMotion, strength]
  );

  return (
    <div
      ref={rootRef}
      className={`relative inline-flex p-1 ${className}`.trim()}
      onMouseMove={onMouseMove}
      onMouseLeave={reset}
    >
      <div
        className={`will-change-transform ${
          hover ? "duration-0" : "duration-200 ease-out"
        } transition-transform`}
        style={{
          transform: `translate3d(${offset.x}px, ${offset.y}px, 0)`,
        }}
      >
        {children}
      </div>
    </div>
  );
}
