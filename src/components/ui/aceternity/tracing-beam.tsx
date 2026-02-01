"use client";
import React, { useEffect, useRef, useState } from "react";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import { cn } from "@/lib/utils";

export const TracingBeam = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [textRevealInView, setTextRevealInView] = useState(false);
  const [textRevealVerticalOffset, setTextRevealVerticalOffset] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  
  // Debounce timer ref for resize/orientation changes
  const resizeTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
    layoutEffect: false, // Prevent hydration issues
  });

  const contentRef = useRef<HTMLDivElement>(null);
  const [svgHeight, setSvgHeight] = useState(0);

  useEffect(() => {
    // Batch all layout reads first, then apply state in rAF to avoid forced reflow.
    const recalculateAll = () => {
      const innerWidth = window.innerWidth;
      const innerHeight = window.innerHeight;
      const nextMobile = innerWidth < 768;

      let nextVisible = false;
      if (ref.current) {
        const rect = ref.current.getBoundingClientRect();
        nextVisible = rect.top < innerHeight && rect.bottom > 0;
      }

      let nextTextRevealInView = false;
      let nextTextRevealOffset = 12;
      const textRevealElement = document.querySelector('[data-text-reveal-content]');
      const textRevealContainer = document.querySelector('[data-text-reveal]');
      if (textRevealElement && textRevealContainer) {
        const hasTextRevealContent = textRevealElement.textContent?.includes('learn') ||
          textRevealElement.textContent?.includes('fast') ||
          textRevealElement.textContent?.includes('break');
        if (hasTextRevealContent) {
          const isSkillsSection = textRevealElement.closest('#skills') ||
            textRevealElement.textContent?.includes('Skills') ||
            textRevealElement.textContent?.includes('technologies');
          if (!isSkillsSection) {
            const rect = textRevealElement.getBoundingClientRect();
            nextTextRevealOffset = nextMobile ? innerHeight * 0.4 : 12;
            const viewportCenter = innerHeight / 2;
            const elementCenter = rect.top + rect.height / 2;
            nextTextRevealInView = Math.abs(elementCenter - viewportCenter) < innerHeight * 0.3;
          }
        }
      }

      let nextSvgHeight = 0;
      if (contentRef.current && nextVisible) {
        const contactSection = contentRef.current.querySelector('#contact');
        if (contactSection) {
          const contactRect = contactSection.getBoundingClientRect();
          const contentRect = contentRef.current.getBoundingClientRect();
          nextSvgHeight = contactRect.top - contentRect.top - 20;
        } else {
          nextSvgHeight = contentRef.current.offsetHeight;
        }
      }

      requestAnimationFrame(() => {
        setIsMobile(nextMobile);
        setIsVisible(nextVisible);
        setTextRevealInView(nextTextRevealInView);
        setTextRevealVerticalOffset(nextTextRevealOffset);
        setSvgHeight(nextSvgHeight);
      });
    };

    recalculateAll();

    const handleScroll = () => recalculateAll();

    // Debounced resize handler
    const handleResize = () => {
      if (resizeTimeoutRef.current) {
        clearTimeout(resizeTimeoutRef.current);
      }
      
      resizeTimeoutRef.current = setTimeout(() => {
        recalculateAll();
      }, 150);
    };

    // Handle orientation changes with longer debounce
    const handleOrientationChange = () => {
      if (resizeTimeoutRef.current) {
        clearTimeout(resizeTimeoutRef.current);
      }
      
      resizeTimeoutRef.current = setTimeout(() => {
        recalculateAll();
      }, 400);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleResize, { passive: true });
    window.addEventListener('orientationchange', handleOrientationChange, { passive: true });
    
    return () => {
      if (resizeTimeoutRef.current) {
        clearTimeout(resizeTimeoutRef.current);
      }
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('orientationchange', handleOrientationChange);
    };
  }, []);

  // Additional effect to handle SVG height when visibility changes (batched read then write)
  useEffect(() => {
    if (!contentRef.current || !isVisible) return;
    const contactSection = contentRef.current.querySelector('#contact');
    let nextSvgHeight = 0;
    if (contactSection) {
      const contactRect = contactSection.getBoundingClientRect();
      const contentRect = contentRef.current.getBoundingClientRect();
      nextSvgHeight = contactRect.top - contentRect.top - 20;
    } else {
      nextSvgHeight = contentRef.current.offsetHeight;
    }
    const id = requestAnimationFrame(() => setSvgHeight(nextSvgHeight));
    return () => cancelAnimationFrame(id);
  }, [isVisible]);

  const y1 = useSpring(
    useTransform(scrollYProgress, [0, 0.8], [50, svgHeight]),
    {
      stiffness: 500,
      damping: 90,
    }
  );
  const y2 = useSpring(
    useTransform(scrollYProgress, [0, 1], [50, svgHeight - 200]),
    {
      stiffness: 500,
      damping: 90,
    }
  );

  // Left shift during TextReveal animation
  const leftShift = useSpring(
    textRevealInView ? -20 : 0,
    {
      stiffness: 200, // Softer on mobile
      damping: 20, // Less damping on mobile
    }
  );

  // Simple positioning - fixed values to prevent drift
  const dynamicTop = useSpring(
    textRevealInView ? textRevealVerticalOffset : 12,
    {
      stiffness: 200,
      damping: 50,
    }
  );

  return (
    <motion.div
      ref={ref}
      className={cn("relative w-full max-w-4xl mx-auto h-full", className)}
      style={{ position: 'relative' }} // Explicit positioning
    >
      <motion.div 
        className="absolute -left-4 md:-left-20"
        style={{ x: leftShift, top: textRevealInView ? dynamicTop : 12 }}
      >
        <motion.div
          transition={{
            duration: 0.2,
            delay: 0.5,
          }}
          animate={{
            boxShadow:
              scrollYProgress.get() > 0
                ? "none"
                : "rgba(0, 0, 0, 0.24) 0px 3px 8px",
          }}
          className="ml-[27px] h-4 w-4 rounded-full border border-netural-200 shadow-sm flex items-center justify-center"
        >
          <motion.div
            transition={{
              duration: 0.2,
              delay: 0.5,
            }}
            animate={{
              backgroundColor: "#10b981",
              borderColor: "#059669",
            }}
            className="h-2 w-2 rounded-full border border-neutral-300"
          />
        </motion.div>
        <svg
          viewBox={`0 0 20 ${svgHeight}`}
          width="20"
          height={svgHeight} // Set the SVG height
          className=" ml-4 block"
          aria-hidden="true"
        >
          <motion.path
            d={`M 1 0V -36 l 18 24 V ${svgHeight * 0.8} l -18 24V ${svgHeight}`}
            fill="none"
            stroke="#9091A0"
            strokeOpacity="0.16"
            transition={{
              duration: 10,
            }}
          ></motion.path>
          <motion.path
            d={`M 1 0V -36 l 18 24 V ${svgHeight * 0.8} l -18 24V ${svgHeight}`}
            fill="none"
            stroke="url(#gradient)"
            strokeWidth="1.25"
            className="motion-reduce:hidden"
            transition={{
              duration: 10,
            }}
          ></motion.path>
          <defs>
            <motion.linearGradient
              id="gradient"
              gradientUnits="userSpaceOnUse"
              x1="0"
              x2="0"
              y1={y1} // set y1 for gradient
              y2={y2} // set y2 for gradient
            >
              <stop stopColor="#34D399" stopOpacity="0"></stop>
              <stop stopColor="#34D399"></stop>
              <stop offset="0.325" stopColor="#10B981"></stop>
              <stop offset="1" stopColor="#059669" stopOpacity="0"></stop>
            </motion.linearGradient>
          </defs>
        </svg>
      </motion.div>
      <div ref={contentRef}>{children}</div>
    </motion.div>
  );
};