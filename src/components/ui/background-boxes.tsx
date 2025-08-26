"use client";
import React, { useEffect, useState, useRef } from "react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";

export const BoxesCore = ({ className, ...rest }: { className?: string }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [visibleBoxes, setVisibleBoxes] = useState<Array<{row: number, col: number}>>([]);
  const [isMobile, setIsMobile] = useState(false);

  // Calculate how many boxes we need to cover the full viewport
  const calculateVisibleBoxes = () => {
    if (!containerRef.current) return;

    const container = containerRef.current;
    const rect = container.getBoundingClientRect();
    
    // Box dimensions (h-8 w-16 = 32px × 64px)
    const boxHeight = 32;
    const boxWidth = 64;
    
    // Calculate how many boxes we need to cover the visible area
    // Add more buffer to ensure full coverage
    const rowsNeeded = Math.ceil(rect.height / boxHeight) + 4; // +4 for better buffer
    const colsNeeded = Math.ceil(rect.width / boxWidth) + 4;   // +4 for better buffer
    
    // Cap the maximum to prevent excessive rendering
    const maxRows = Math.min(rowsNeeded, 60);
    const maxCols = Math.min(colsNeeded, 100);
    
    // Generate only the boxes we need
    const boxes = [];
    for (let i = 0; i < maxRows; i++) {
      for (let j = 0; j < maxCols; j++) {
        boxes.push({ row: i, col: j });
      }
    }
    
    setVisibleBoxes(boxes);
    setIsMobile(window.innerWidth < 768);
  };

  useEffect(() => {
    calculateVisibleBoxes();
    
    const handleResize = () => {
      calculateVisibleBoxes();
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

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
    <div
      ref={containerRef}
      style={{
        transform: `translate(-50%,-30%) skewX(-48deg) skewY(14deg) scale(0.8) rotate(0deg) translateZ(0)`,
      }}
      className={cn(
        "absolute -top-1/2 left-1/2 z-0 h-[400%] w-[500%] -translate-x-1/2 -translate-y-1/2 p-4",
        className,
      )}
      {...rest}
    >
      {visibleBoxes.map(({ row, col }) => (
        <motion.div
          key={`box-${row}-${col}`}
          className="relative h-8 w-16 border-t border-r border-slate-500 dark:border-slate-500 border-slate-300"
          style={{
            position: 'absolute',
            left: `${col * 64}px`,
            top: `${row * 32}px`,
          }}
        >
          {col % 2 === 0 && row % 2 === 0 ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="pointer-events-none absolute -top-[14px] -left-[22px] h-6 w-10 stroke-[1px] text-slate-400 dark:text-slate-400 text-slate-500"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 6v12m6-6H6"
              />
            </svg>
          ) : null}
          
          {/* Hover effect only on non-mobile */}
          {!isMobile && (
            <motion.div
              className="absolute inset-0 bg-transparent"
              whileHover={{
                backgroundColor: getRandomColor(),
                transition: { duration: 0 },
              }}
            />
          )}
        </motion.div>
      ))}
    </div>
  );
};

export const Boxes = React.memo(BoxesCore);
