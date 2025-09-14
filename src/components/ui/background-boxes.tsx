"use client";
import React, { useState, useEffect } from "react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";

export const BoxesCore = ({ className, ...rest }: { className?: string }) => {
  const [isLoaded, setIsLoaded] = useState(true); // Start as true for immediate visibility
  // Reduced number of boxes for better performance while maintaining visual appeal
  const rows = new Array(75).fill(1);
  const cols = new Array(50).fill(1);
  let colors = [
    "#10b981", // emerald-500
    "#059669", // emerald-600
    "#047857", // emerald-700
    "#34d399", // emerald-400
    "#6ee7b7", // emerald-300
    "#a7f3d0", // emerald-200
    "#10b981", // emerald-500
    "#059669", // emerald-600
    "#047857", // emerald-700
  ];
  const getRandomColor = () => {
    return colors[Math.floor(Math.random() * colors.length)];
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      style={{
        transform: `translate(-40%,-60%) skewX(-48deg) skewY(14deg) scale(0.675) rotate(0deg) translateZ(0)`,
      }}
      className={cn(
        "absolute -top-1/4 left-1/2 z-0 flex h-[150%] w-[200%] -translate-x-1/2 -translate-y-1/2 p-4",
        className,
      )}
      {...rest}
    >
      {rows.map((_, i) => (
        <motion.div
          key={`row` + i}
          className="relative h-8 w-16 border-l border-slate-700 dark:border-slate-500"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ 
            duration: 0.2, 
            delay: i * 0.005,
            ease: "easeOut" 
          }}
        >
          {cols.map((_, j) => (
            <motion.div
              whileHover={{
                backgroundColor: `${getRandomColor()}`,
                transition: { duration: 0 },
              }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ 
                duration: 0.15, 
                delay: (i * 0.005) + (j * 0.002),
                ease: "easeOut" 
              }}
              key={`col` + j}
              className="relative h-8 w-16 border-t border-r border-slate-700 dark:border-slate-500"
            >
              {j % 2 === 0 && i % 2 === 0 ? (
                <motion.svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="pointer-events-none absolute -top-[14px] -left-[22px] h-6 w-10 stroke-[1px] text-slate-700 dark:text-slate-400"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ 
                    opacity: 1, 
                    scale: 1 
                  }}
                  transition={{ 
                    duration: 0.2, 
                    delay: (i * 0.005) + (j * 0.002) + 0.1,
                    ease: "easeOut" 
                  }}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 6v12m6-6H6"
                  />
                </motion.svg>
              ) : null}
            </motion.div>
          ))}
        </motion.div>
      ))}
    </motion.div>
  );
};

export const Boxes = React.memo(BoxesCore);
