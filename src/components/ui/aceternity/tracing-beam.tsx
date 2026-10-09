"use client";
import React, { useEffect, useRef, useState } from "react";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import { cn } from "@/lib/utils";

const BEAM_TOP = 12;
const DOT_SIZE = 16;
const KINK_LENGTH = 24;

/** Place the beam jog beside the "I learn…" reveal. A fixed fraction of the beam
 *  drifts onto Tools when skills wrap or the viewport changes the 200vh reveal. */
function measureBeam(contentEl: HTMLElement) {
  const contactSection = contentEl.querySelector("#contact");
  let svgHeight = contentEl.offsetHeight;
  if (contactSection) {
    svgHeight = Math.max(
      0,
      contactSection.getBoundingClientRect().top -
        contentEl.getBoundingClientRect().top -
        20
    );
  }

  let kinkY = svgHeight * 0.8;
  const reveal = contentEl.querySelector<HTMLElement>("[data-text-reveal]");
  const sticky = reveal?.querySelector<HTMLElement>("[data-text-reveal-content]");
  if (reveal && sticky && sticky.offsetHeight > 0 && svgHeight > 0) {
    const phraseCenter =
      reveal.getBoundingClientRect().top -
      contentEl.getBoundingClientRect().top +
      sticky.offsetHeight / 2;
    // Path y=0 sits under the resting beam offset and the dot. The jog itself is KINK_LENGTH tall.
    const raw = phraseCenter - (BEAM_TOP + DOT_SIZE) - KINK_LENGTH / 2;
    const min = 80;
    const max = Math.max(min, svgHeight - KINK_LENGTH - 24);
    kinkY = Math.min(Math.max(raw, min), max);
  }

  return {
    svgHeight: Math.round(svgHeight),
    kinkY: Math.round(kinkY),
  };
}

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
  
  // Debounce timer ref for resize/orientation changes
  const resizeTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
    layoutEffect: false, // Prevent hydration issues
  });

  const contentRef = useRef<HTMLDivElement>(null);
  const [svgHeight, setSvgHeight] = useState(0);
  const [kinkY, setKinkY] = useState(0);

  useEffect(() => {
    // Batch all layout reads first, then apply state in rAF to avoid forced reflow.
    const recalculateAll = () => {
      const innerHeight = window.innerHeight;

      let nextVisible = false;
      if (ref.current) {
        const rect = ref.current.getBoundingClientRect();
        nextVisible = rect.top < innerHeight && rect.bottom > 0;
      }

      let nextTextRevealInView = false;
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
            const viewportCenter = innerHeight / 2;
            const elementCenter = rect.top + rect.height / 2;
            nextTextRevealInView = Math.abs(elementCenter - viewportCenter) < innerHeight * 0.3;
          }
        }
      }

      const measured = contentRef.current && nextVisible
        ? measureBeam(contentRef.current)
        : { svgHeight: 0, kinkY: 0 };

      requestAnimationFrame(() => {
        setIsVisible(nextVisible);
        setTextRevealInView(nextTextRevealInView);
        setSvgHeight(measured.svgHeight);
        setKinkY(measured.kinkY);
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
    const measured = measureBeam(contentRef.current);
    const id = requestAnimationFrame(() => {
      setSvgHeight(measured.svgHeight);
      setKinkY(measured.kinkY);
    });
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

  return (
    <motion.div
      ref={ref}
      className={cn("relative w-full max-w-4xl mx-auto h-full", className)}
      style={{ position: 'relative' }} // Explicit positioning
    >
      <motion.div 
        className="absolute -left-4 md:-left-20"
        style={{ x: leftShift, top: BEAM_TOP }}
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
            d={`M 1 0V -36 l 18 24 V ${kinkY} l -18 24V ${svgHeight}`}
            fill="none"
            stroke="#9091A0"
            strokeOpacity="0.16"
            transition={{
              duration: 10,
            }}
          ></motion.path>
          <motion.path
            d={`M 1 0V -36 l 18 24 V ${kinkY} l -18 24V ${svgHeight}`}
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