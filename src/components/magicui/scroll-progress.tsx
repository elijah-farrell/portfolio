"use client";

import {cn} from "@/lib/utils";
import {motion, MotionProps, useScroll} from "motion/react";
import React, { useState, useEffect } from "react";

interface ScrollProgressProps
  extends Omit<React.HTMLAttributes<HTMLElement>, keyof MotionProps> {}

export const ScrollProgress = React.forwardRef<
  HTMLDivElement,
  ScrollProgressProps
>(({ className, ...props }, ref) => {
  const [isVisible, setIsVisible] = useState(false);
  
  const { scrollYProgress } = useScroll({
    layoutEffect: false, // Prevent hydration issues
  });

  useEffect(() => {
    // Only show scroll progress when page is scrolled
    const checkScroll = () => {
      setIsVisible(window.scrollY > 100);
    };
    
    checkScroll();
    window.addEventListener('scroll', checkScroll, { passive: true });
    return () => window.removeEventListener('scroll', checkScroll);
  }, []);

  return (
    <motion.div
      ref={ref}
      className={cn(
        "fixed inset-x-0 top-0 z-50 h-px origin-left bg-gradient-to-r from-[#9ca3af] via-[#6b7280] to-[#4b5563] transition-all opacity-15",
        className,
      )}
      style={{
        scaleX: isVisible ? scrollYProgress : 0,
      }}
      {...props}
    />
  );
});

ScrollProgress.displayName = "ScrollProgress";
