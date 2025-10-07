import React, { useEffect, useRef, useState, useCallback, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

interface GlowingEffectProps {
  className?: string;
  borderWidth?: number;
  spread?: number;
  glow?: boolean;
  disabled?: boolean;
  proximity?: number;
  inactiveZone?: number;
}

export const GlowingEffect: React.FC<GlowingEffectProps> = ({
  className,
  borderWidth = 1,
  spread = 20,
  glow = true,
  disabled = false,
  proximity = 100,
  inactiveZone = 0.5,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const mouseX = useRef(0);
  const mouseY = useRef(0);
  const [isMouseOver, setIsMouseOver] = useState(false);
  const [glowingPosition, setGlowingPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (disabled || !containerRef.current) return;

    const rect = containerRef.current.getBoundingClientRect();
    mouseX.current = e.clientX - rect.left;
    mouseY.current = e.clientY - rect.top;

    // Calculate distance from center
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const distanceX = mouseX.current - centerX;
    const distanceY = mouseY.current - centerY;
    const distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY);

    // Check if mouse is within the inactive zone (center)
    if (distance < Math.min(rect.width, rect.height) * inactiveZone) {
      setIsMouseOver(false);
      return;
    }

    setIsMouseOver(true);
    setGlowingPosition({ x: mouseX.current, y: mouseY.current });
  }, [disabled, inactiveZone]);

  const handleMouseLeave = useCallback(() => {
    setIsMouseOver(false);
  }, []);

  useEffect(() => {
    const container = containerRef.current;
    if (container) {
      container.addEventListener("mousemove", handleMouseMove);
      container.addEventListener("mouseleave", handleMouseLeave);

      return () => {
        container.removeEventListener("mousemove", handleMouseMove);
        container.removeEventListener("mouseleave", handleMouseLeave);
      };
    }
  }, [handleMouseMove, handleMouseLeave]);

  const glowStyle = useMemo(() => {
    if (!glow || !isMouseOver || disabled) return {};

    return {
      width: `${spread}px`,
      height: `${spread}px`,
      left: `${glowingPosition.x - spread / 2}px`,
      top: `${glowingPosition.y - spread / 2}px`,
      opacity: 1,
    };
  }, [glow, isMouseOver, disabled, spread, glowingPosition]);

  return (
    <div
      ref={containerRef}
      className={cn(
        "relative w-full h-full overflow-hidden",
        className
      )}
      style={{
        borderWidth: `${borderWidth}px`,
      }}
    >
      <AnimatePresence>
        {glow && isMouseOver && !disabled && (
          <motion.div
            className="absolute rounded-full bg-gradient-to-br from-emerald-500 to-blue-500 filter blur-xl pointer-events-none"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            transition={{ duration: 0.15 }}
            style={glowStyle}
          />
        )}
      </AnimatePresence>
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `
            radial-gradient(
              circle at var(--mouse-x) var(--mouse-y),
              rgba(var(--emerald-500), 0.1) 0%,
              transparent 100%
            )
          `,
        }}
      />
    </div>
  );
};
