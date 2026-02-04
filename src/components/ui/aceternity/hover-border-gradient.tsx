"use client";
import React, {useEffect, useRef, useState} from "react";

import {motion} from "framer-motion";
import {cn} from "@/lib/utils";

type Direction = "TOP" | "LEFT" | "BOTTOM" | "RIGHT";

/** Ignore synthetic mouse events for this long after a touch (ms). */
const TOUCH_IGNORE_MS = 500;

export function HoverBorderGradient({
  children,
  containerClassName,
  className,
  as: Tag = "button",
  duration = 1,
  clockwise = true,
  ...props
}: React.PropsWithChildren<
  {
    as?: React.ElementType;
    containerClassName?: string;
    className?: string;
    duration?: number;
    clockwise?: boolean;
  } & React.HTMLAttributes<HTMLElement> & Record<string, unknown>
>) {
  const [hovered, setHovered] = useState<boolean>(false);
  const [direction, setDirection] = useState<Direction>("TOP");
  const [isDark, setIsDark] = useState<boolean>(false);
  const lastTouchEndRef = useRef<number>(0);

  // Detect dark mode
  useEffect(() => {
    const checkDarkMode = () => {
      setIsDark(document.documentElement.classList.contains('dark'));
    };
    
    checkDarkMode();
    
    // Watch for changes
    const observer = new MutationObserver(checkDarkMode);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class']
    });
    
    return () => observer.disconnect();
  }, []);

  const rotateDirection = (currentDirection: Direction): Direction => {
    const directions: Direction[] = ["TOP", "LEFT", "BOTTOM", "RIGHT"];
    const currentIndex = directions.indexOf(currentDirection);
    const nextIndex = clockwise
      ? (currentIndex - 1 + directions.length) % directions.length
      : (currentIndex + 1) % directions.length;
    return directions[nextIndex];
  };

  const movingMapLight: Record<Direction, string> = {
    TOP: "radial-gradient(20.7% 50% at 50% 0%, hsl(0, 0%, 0%) 0%, rgba(0, 0, 0, 0) 100%)",
    LEFT: "radial-gradient(16.6% 43.1% at 0% 50%, hsl(0, 0%, 0%) 0%, rgba(0, 0, 0, 0) 100%)",
    BOTTOM:
      "radial-gradient(20.7% 50% at 50% 100%, hsl(0, 0%, 0%) 0%, rgba(0, 0, 0, 0) 100%)",
    RIGHT:
      "radial-gradient(16.2% 41.199999999999996% at 100% 50%, hsl(0, 0%, 0%) 0%, rgba(0, 0, 0, 0) 100%)",
  };

  const movingMapDark: Record<Direction, string> = {
    TOP: "radial-gradient(20.7% 50% at 50% 0%, hsl(0, 0%, 100%) 0%, rgba(255, 255, 255, 0) 100%)",
    LEFT: "radial-gradient(16.6% 43.1% at 0% 50%, hsl(0, 0%, 100%) 0%, rgba(255, 255, 255, 0) 100%)",
    BOTTOM:
      "radial-gradient(20.7% 50% at 50% 100%, hsl(0, 0%, 100%) 0%, rgba(255, 255, 255, 0) 100%)",
    RIGHT:
      "radial-gradient(16.2% 41.199999999999996% at 100% 50%, hsl(0, 0%, 100%) 0%, rgba(255, 255, 255, 0) 100%)",
  };

  const movingMap = isDark ? movingMapDark : movingMapLight;

  const highlight =
  "radial-gradient(75% 181.15942028985506% at 50% 50%, #00FF00 0%, rgba(255, 255, 255, 0) 100%)";

  useEffect(() => {
    if (!hovered) {
      const interval = setInterval(() => {
        setDirection((prevState) => rotateDirection(prevState));
      }, duration * 1000);
      return () => clearInterval(interval);
    }
  }, [hovered]);

  const handlePointerEnter = () => {
    if (Date.now() - lastTouchEndRef.current < TOUCH_IGNORE_MS) return;
    setHovered(true);
  };

  const handlePointerLeave = () => {
    setHovered(false);
  };

  const handleTouchStart = () => {
    setHovered(true);
  };

  const handleTouchEnd = () => {
    lastTouchEndRef.current = Date.now();
    setHovered(false);
  };

  return (
    <Tag
      onMouseEnter={handlePointerEnter}
      onMouseLeave={handlePointerLeave}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      onTouchCancel={handleTouchEnd}
      className={cn(
        "relative flex rounded-full border dark:border-neutral-800 content-center bg-neutral-900/20 dark:bg-neutral-100/20 hover:bg-neutral-900/10 dark:hover:bg-neutral-100/10 items-center flex-col flex-nowrap h-min justify-center overflow-visible p-px decoration-clone w-fit",
        containerClassName
      )}
      {...props}
    >
      <div
        className={cn(
          "w-auto text-[var(--text)] z-10 px-4 py-2 rounded-[inherit]",
          className
        )}
        style={{ backgroundColor: 'var(--background)' }}
      >
        {children}
      </div>
      {/* Single gradient layer at a time to avoid frozen floaters from remount/anim */}
      <div
        className="absolute inset-0 z-0 rounded-[inherit] overflow-hidden"
        style={{ contain: "paint", isolation: "isolate" }}
        aria-hidden
      >
        {hovered ? (
          <motion.div
            className="absolute inset-0 rounded-[inherit]"
            style={{
              filter: "blur(2px)",
              background: highlight,
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.15 }}
          />
        ) : (
          <motion.div
            className="absolute inset-0 rounded-[inherit]"
            style={{
              filter: "blur(2px)",
            }}
            initial={false}
            animate={{ background: movingMap[direction] }}
            transition={{ ease: "linear", duration: duration ?? 1 }}
          />
        )}
      </div>
      <div className="absolute z-1 flex-none inset-[2px] rounded-[100px]" style={{ backgroundColor: 'var(--background)' }} />
    </Tag>
  );
}
