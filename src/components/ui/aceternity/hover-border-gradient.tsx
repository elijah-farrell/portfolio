"use client";
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

type Direction = "TOP" | "LEFT" | "BOTTOM" | "RIGHT";

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
  } & React.HTMLAttributes<HTMLElement> &
    Pick<React.AnchorHTMLAttributes<HTMLAnchorElement>, "href" | "download" | "target" | "rel">
>) {
  const [hovered, setHovered] = useState<boolean>(false);
  const [direction, setDirection] = useState<Direction>("TOP");
  const [isDark, setIsDark] = useState<boolean>(() =>
    typeof document !== "undefined"
      ? document.documentElement.classList.contains("dark")
      : false
  );

  useEffect(() => {
    const check = () =>
      setIsDark(document.documentElement.classList.contains("dark"));
    check();
    const obs = new MutationObserver(check);
    obs.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });
    return () => obs.disconnect();
  }, []);

  const rotateDirection = (currentDirection: Direction): Direction => {
    const directions: Direction[] = ["TOP", "LEFT", "BOTTOM", "RIGHT"];
    const currentIndex = directions.indexOf(currentDirection);
    const nextIndex = clockwise
      ? (currentIndex - 1 + directions.length) % directions.length
      : (currentIndex + 1) % directions.length;
    return directions[nextIndex];
  };

  const movingMap = isDark ? movingMapDark : movingMapLight;

  // Our color: emerald-500
  const highlight =
    "radial-gradient(75% 181.15942028985506% at 50% 50%, #10b981 0%, rgba(255, 255, 255, 0) 100%)";

  useEffect(() => {
    if (!hovered) {
      const interval = setInterval(() => {
        setDirection((prevState) => rotateDirection(prevState));
      }, duration * 1000);
      return () => clearInterval(interval);
    }
  }, [hovered]);

  return (
    <Tag
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className={cn(
        "relative flex rounded-full border dark:border-neutral-800 content-center bg-neutral-900/20 dark:bg-neutral-100/20 hover:bg-neutral-900/10 dark:hover:bg-neutral-100/10 items-center flex-col flex-nowrap h-min justify-center overflow-visible p-px decoration-clone w-fit transition-none",
        containerClassName
      )}
      {...props}
    >
      <div
        className={cn(
          "w-auto text-[var(--text)] z-10 px-4 py-2 rounded-[inherit] transition-none",
          className
        )}
        style={{ backgroundColor: "var(--background)" }}
      >
        {children}
      </div>
      <motion.div
        className={cn(
          "flex-none inset-0 overflow-hidden absolute z-0 rounded-[inherit]"
        )}
        style={{
          filter: "blur(2px)",
          position: "absolute",
          width: "100%",
          height: "100%",
        }}
        initial={false}
        animate={{ background: hovered ? highlight : movingMap[direction] }}
        transition={{ ease: "linear", duration: duration ?? 1 }}
      />
      <div className="absolute z-1 flex-none inset-[2px] rounded-[100px] transition-none" style={{ backgroundColor: "var(--background)" }} />
    </Tag>
  );
}
