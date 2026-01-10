"use client";
import { useEffect, useRef, useState } from "react";
import { motion, stagger, useAnimate } from "framer-motion";
import { cn } from "@/lib/utils";

export const TextGenerateEffect = ({
  words,
  className,
  filter = true,
  duration = 0.5,
  justify = "start", // Default to start for left alignment
}: {
  words: string;
  className?: string;
  filter?: boolean;
  duration?: number;
  justify?: "start" | "center" | "end";
}) => {
  const [scope, animate] = useAnimate();
  const containerRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const hasAnimatedRef = useRef(false);
  const isAnimatingRef = useRef(false);
  const observerRef = useRef<IntersectionObserver | null>(null);
  const wordsChangeTimeRef = useRef<number>(0);
  const previousWordsRef = useRef<string>(words);
  const wordsArray = words.split(" ");

  // Intersection Observer to check if component is in view
  useEffect(() => {
    // Clean up previous observer
    if (observerRef.current) {
      observerRef.current.disconnect();
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          // Prevent observer from firing right after words change (within 100ms)
          const timeSinceWordsChange = Date.now() - wordsChangeTimeRef.current;
          const isRecentWordsChange = timeSinceWordsChange < 100;
          
          // Only trigger if intersecting, hasn't animated yet, not currently animating, and not right after words change
          if (
            entry.isIntersecting && 
            !hasAnimatedRef.current && 
            !isAnimatingRef.current &&
            !isRecentWordsChange
          ) {
            setIsVisible(true);
            hasAnimatedRef.current = true;
            isAnimatingRef.current = true;
          }
        });
      },
      {
        threshold: 0.1, // Trigger when 10% visible
        rootMargin: "0px",
      }
    );

    observerRef.current = observer;

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, []); // Empty deps - only set up once

  // Reset animation state when words change and check if already visible
  useEffect(() => {
    // Only reset if words actually changed (not just on mount)
    const wordsActuallyChanged = previousWordsRef.current !== words;
    
    if (wordsActuallyChanged) {
      hasAnimatedRef.current = false;
      isAnimatingRef.current = false;
      setIsVisible(false);
      wordsChangeTimeRef.current = Date.now();
      previousWordsRef.current = words;
      
      // Small delay to let the component settle before checking visibility
      // This prevents double animation when coming back from tab switch
      const timeoutId = setTimeout(() => {
        // If element is already in view when words change, trigger animation
        if (containerRef.current) {
          const rect = containerRef.current.getBoundingClientRect();
          const isInView = rect.top < window.innerHeight && rect.bottom > 0;
          if (isInView && !hasAnimatedRef.current) {
            setIsVisible(true);
            hasAnimatedRef.current = true;
            isAnimatingRef.current = true;
          }
        }
      }, 50); // Small delay to prevent race condition
      
      return () => clearTimeout(timeoutId);
    } else {
      // First mount - initialize
      previousWordsRef.current = words;
    }
  }, [words]);

  // Animate only when visible
  useEffect(() => {
    if (isVisible && scope.current && isAnimatingRef.current) {
      // Reset spans to initial state before animating
      const spans = scope.current.querySelectorAll("span");
      spans.forEach((span: Element) => {
        const htmlSpan = span as HTMLElement;
        htmlSpan.style.opacity = "0";
        if (filter) {
          htmlSpan.style.filter = "blur(6px)";
        }
      });
      
      // Animate and mark as done when complete
      animate(
        "span",
        {
          opacity: 1,
          filter: filter ? "blur(0px)" : "none",
        },
        {
          duration: duration,
          delay: stagger(0.04), // smooth + consistent
        }
      ).then(() => {
        isAnimatingRef.current = false;
      });
    }
  }, [isVisible, scope, animate, filter, duration]);

  return (
    <div ref={containerRef} className={cn("font-normal", className)}>
      <motion.div ref={scope} className={`flex flex-wrap justify-${justify} leading-relaxed`}>
        {wordsArray.map((word, idx) => (
          <motion.span
            key={idx}
            className="opacity-0 text-neutral-600 dark:text-neutral-400"
            style={{
              filter: filter ? "blur(6px)" : "none",
              whiteSpace: "pre", // Preserve spaces
              lineHeight: "1.625", // Add proper line height for wrapped text
            }}
          >
            {word}{idx < wordsArray.length - 1 ? " " : ""}
          </motion.span>
        ))}
      </motion.div>
    </div>
  );
};
