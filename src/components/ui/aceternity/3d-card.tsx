"use client";

import {cn} from "@/lib/utils";
import React, {createContext, useContext, useEffect, useRef, useState,} from "react";

const MouseEnterContext = createContext<
  [boolean, React.Dispatch<React.SetStateAction<boolean>>] | undefined
>(undefined);

export const CardContainer = ({
  children,
  className,
  containerClassName,
}: {
  children?: React.ReactNode;
  className?: string;
  containerClassName?: string;
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isMouseEntered, setIsMouseEntered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const { left, top, width, height } =
      containerRef.current.getBoundingClientRect();
    const x = (e.clientX - left - width / 2) / 30;
    const y = (e.clientY - top - height / 2) / 30;
    // Clamp values to prevent extreme rotation
    const clampedX = Math.max(-15, Math.min(15, x));
    const clampedY = Math.max(-15, Math.min(15, y));
    containerRef.current.style.transform = `rotateY(${clampedX}deg) rotateX(${clampedY}deg)`;
  };

  const handleMouseEnter = (_e: React.MouseEvent<HTMLDivElement>) => {
    setIsMouseEntered(true);
    if (!containerRef.current) return;
  };

  const handleMouseLeave = (_e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    setIsMouseEntered(false);
    // Add smooth transition back to center
    containerRef.current.style.transition = 'transform 0.3s ease-out';
    containerRef.current.style.transform = `rotateY(0deg) rotateX(0deg)`;
    // Remove transition after animation completes
    setTimeout(() => {
      if (containerRef.current) {
        containerRef.current.style.transition = '';
      }
    }, 300);
  };

  const handleTouchStart = () => {
    setIsMouseEntered(true);
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    if (!containerRef.current || e.touches.length === 0) return;
    const { left, top, width, height } =
      containerRef.current.getBoundingClientRect();
    const touch = e.touches[0];
    const x = (touch.clientX - left - width / 2) / 30;
    const y = (touch.clientY - top - height / 2) / 30;
    // Clamp values to prevent extreme rotation
    const clampedX = Math.max(-15, Math.min(15, x));
    const clampedY = Math.max(-15, Math.min(15, y));
    containerRef.current.style.transform = `rotateY(${clampedX}deg) rotateX(${clampedY}deg)`;
  };

  const handleTouchEnd = () => {
    if (!containerRef.current) return;
    setIsMouseEntered(false);
    // Add smooth transition back to center
    containerRef.current.style.transition = 'transform 0.3s ease-out';
    containerRef.current.style.transform = `rotateY(0deg) rotateX(0deg)`;
    // Remove transition after animation completes
    setTimeout(() => {
      if (containerRef.current) {
        containerRef.current.style.transition = '';
      }
    }, 300);
  };
  return (
    <MouseEnterContext.Provider value={[isMouseEntered, setIsMouseEntered]}>
      <div
        className={cn(
          containerClassName
        )}
        style={{
          perspective: "1000px",
        }}
      >
        <div
          ref={containerRef}
          onMouseEnter={handleMouseEnter}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          className={cn(
            className
          )}
          style={{
            transformStyle: "preserve-3d",
            backfaceVisibility: "hidden",
            willChange: "transform",
          }}
        >
          {children}
        </div>
      </div>
    </MouseEnterContext.Provider>
  );
};

export const CardBody = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div
      className={cn(
        " [transform-style:preserve-3d]  [&>*]:[transform-style:preserve-3d]",
        className
      )}
    >
      {children}
    </div>
  );
};

export const CardItem = ({
  as: Tag = "div",
  children,
  className,
  translateX = 0,
  translateY = 0,
  translateZ = 0,
  rotateX = 0,
  rotateY = 0,
  rotateZ = 0,
  ...rest
}: {
  as?: React.ElementType;
  children: React.ReactNode;
  className?: string;
  translateX?: number | string;
  translateY?: number | string;
  translateZ?: number | string;
  rotateX?: number | string;
  rotateY?: number | string;
  rotateZ?: number | string;
  [key: string]: unknown;
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const [isMouseEntered] = useMouseEnter();

  useEffect(() => {
    handleAnimations();
  }, [isMouseEntered]);

  const handleAnimations = () => {
    if (!ref.current) return;
    if (isMouseEntered) {
      ref.current.style.transform = `translateX(${translateX}px) translateY(${translateY}px) translateZ(${translateZ}px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) rotateZ(${rotateZ}deg)`;
    } else {
      ref.current.style.transform = `translateX(0px) translateY(0px) translateZ(0px) rotateX(0deg) rotateY(0deg) rotateZ(0deg)`;
    }
  };

  return (
    <Tag
      ref={ref}
      className={cn(" transition duration-200 ease-linear", className)}
      style={{
        backfaceVisibility: "hidden",
        willChange: "transform",
      }}
      {...rest}
    >
      {children}
    </Tag>
  );
};

// Create a hook to use the context
export const useMouseEnter = () => {
  const context = useContext(MouseEnterContext);
  if (context === undefined) {
    throw new Error("useMouseEnter must be used within a MouseEnterProvider");
  }
  return context;
};
