"use client";
import React, {useEffect, useRef, useState} from "react";
import {motion, useScroll, useSpring, useTransform,} from "framer-motion";
import {cn} from "@/lib/utils";

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
  
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
    layoutEffect: false, // Prevent hydration issues
  });

  const contentRef = useRef<HTMLDivElement>(null);
  const [svgHeight, setSvgHeight] = useState(0);

  useEffect(() => {
    // Check if component is visible in viewport
    const checkVisibility = () => {
      if (ref.current) {
        const rect = ref.current.getBoundingClientRect();
        const isInView = rect.top < window.innerHeight && rect.bottom > 0;
        setIsVisible(isInView);
      }
    };

    // Check for TextReveal component (I learn fast animation)
    const checkTextReveal = () => {
      const textRevealElement = document.querySelector('[data-text-reveal-content]');
      const textRevealContainer = document.querySelector('[data-text-reveal]');
      
      if (textRevealElement && textRevealContainer) {
        // Verify this is actually the TextReveal component by checking its content
        const hasTextRevealContent = textRevealElement.textContent?.includes('learn') || 
                                   textRevealElement.textContent?.includes('fast') ||
                                   textRevealElement.textContent?.includes('break');
        
        if (!hasTextRevealContent) {
          setTextRevealInView(false);
          return;
        }
        
        // Additional check: ensure this is not the Skills section
        const isSkillsSection = textRevealElement.closest('#skills') || 
                              textRevealElement.textContent?.includes('Skills') ||
                              textRevealElement.textContent?.includes('technologies');
        
        if (isSkillsSection) {
          setTextRevealInView(false);
          return;
        }
        
        const rect = textRevealElement.getBoundingClientRect();
        const containerRect = textRevealContainer.getBoundingClientRect();
        const viewportHeight = window.innerHeight;
        
        // Simple mobile adjustment - add fixed offset for TextReveal positioning
        const isMobile = window.innerWidth < 768;
        if (isMobile) {
          setTextRevealVerticalOffset(viewportHeight * 0.4); // Fixed mobile offset
        } else {
          setTextRevealVerticalOffset(12); // Default desktop position
        }
        
        let isInView;
        
        // Use same detection logic for both mobile and desktop
        const viewportCenter = viewportHeight / 2;
        const elementCenter = rect.top + rect.height / 2;
        const distanceFromCenter = Math.abs(elementCenter - viewportCenter);
        const threshold = viewportHeight * 0.3;
        isInView = distanceFromCenter < threshold;
        
        setTextRevealInView(isInView);
      }
    };

    // Initial check
    checkVisibility();
    checkTextReveal();
    
    // Check on scroll
    const handleScroll = () => {
      checkVisibility();
      checkTextReveal();
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (contentRef.current && isVisible) {
      // Calculate height to extend above contact title
      const contactSection = contentRef.current.querySelector('#contact');
      if (contactSection) {
        const contactRect = contactSection.getBoundingClientRect();
        const contentRect = contentRef.current.getBoundingClientRect();
        const heightAboveContact = contactRect.top - contentRect.top - 20; // Stop 20px above contact title
        setSvgHeight(heightAboveContact);
      } else {
        setSvgHeight(contentRef.current.offsetHeight);
      }
    }
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
              backgroundColor:
                scrollYProgress.get() > 0 ? "white" : "#10b981",
              borderColor:
                scrollYProgress.get() > 0 ? "white" : "#059669",
            }}
            className="h-2 w-2  rounded-full border border-neutral-300 bg-white"
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
