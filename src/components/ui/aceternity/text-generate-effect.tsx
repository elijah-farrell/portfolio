"use client";
import { useEffect } from "react";
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
  const wordsArray = words.split(" ");

  useEffect(() => {
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
    );
  }, [scope, animate, filter, duration]);

  return (
    <div className={cn("font-normal", className)}>
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
            {word}{" "}
          </motion.span>
        ))}
      </motion.div>
    </div>
  );
};
