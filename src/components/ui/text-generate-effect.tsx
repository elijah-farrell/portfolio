"use client";
import { useEffect } from "react";
import { motion, stagger, useAnimate } from "framer-motion";
import { cn } from "@/lib/utils";

export const TextGenerateEffect = ({
  words,
  className,
  filter = true,
  duration = 0.5,
}: {
  words: string;
  className?: string;
  filter?: boolean;
  duration?: number;
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
      <motion.div ref={scope} className="flex flex-wrap">
        {wordsArray.map((word, idx) => (
          <motion.span
            key={idx}
            className="opacity-0 text-neutral-600 dark:text-neutral-400"
            style={{
              filter: filter ? "blur(6px)" : "none",
              whiteSpace: "pre", // Preserve spaces
            }}
          >
            {word}{" "}
          </motion.span>
        ))}
      </motion.div>
    </div>
  );
};
