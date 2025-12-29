"use client";
import {cn} from "@/lib/utils";
import {AnimatePresence, motion} from "framer-motion";
import React, {useEffect, useRef, useState} from "react";

export const BackgroundBeamsWithCollision = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const parentRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);

  // Detect screen size on mount and resize
  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  // Responsive beam configuration
  const getBeams = () => {
    if (isMobile) {
      // Fewer beams for mobile with percentage-based positioning
      return [
        {
          initialX: "5%",
          translateX: "5%",
          duration: 7,
          repeatDelay: 3,
          delay: 2,
        },
        {
          initialX: "25%",
          translateX: "25%",
          duration: 5,
          repeatDelay: 7,
          className: "h-6",
        },
        {
          initialX: "45%",
          translateX: "45%",
          duration: 6,
          repeatDelay: 4,
          delay: 3,
          className: "h-12",
        },
        {
          initialX: "65%",
          translateX: "65%",
          duration: 8,
          repeatDelay: 2,
          className: "h-8",
        },
        {
          initialX: "85%",
          translateX: "85%",
          duration: 4,
          repeatDelay: 5,
          delay: 1,
        },
      ];
    } else {
      // More beams for desktop with percentage-based positioning
      return [
        {
          initialX: "5%",
          translateX: "5%",
          duration: 7,
          repeatDelay: 3,
          delay: 2,
        },
        {
          initialX: "15%",
          translateX: "15%",
          duration: 3,
          repeatDelay: 3,
          delay: 4,
        },
        {
          initialX: "25%",
          translateX: "25%",
          duration: 7,
          repeatDelay: 7,
          className: "h-6",
        },
        {
          initialX: "35%",
          translateX: "35%",
          duration: 5,
          repeatDelay: 14,
          delay: 4,
        },
        {
          initialX: "45%",
          translateX: "45%",
          duration: 11,
          repeatDelay: 2,
          className: "h-20",
        },
        {
          initialX: "55%",
          translateX: "55%",
          duration: 4,
          repeatDelay: 2,
          className: "h-12",
        },
        {
          initialX: "65%",
          translateX: "65%",
          duration: 6,
          repeatDelay: 4,
          delay: 2,
          className: "h-6",
        },
        {
          initialX: "75%",
          translateX: "75%",
          duration: 8,
          repeatDelay: 3,
          delay: 1,
        },
        {
          initialX: "85%",
          translateX: "85%",
          duration: 5,
          repeatDelay: 6,
          className: "h-10",
        },
        {
          initialX: "95%",
          translateX: "95%",
          duration: 7,
          repeatDelay: 2,
          delay: 3,
        },
      ];
    }
  };

  const beams = getBeams();

  return (
    <div
      ref={parentRef}
      className={cn(
        "bg-gradient-to-b relative flex items-center w-full justify-center overflow-hidden z-0 border-0",
        // h-screen if you want bigger
        className
      )}
    >
      {beams.map((beam, index) => (
        <CollisionMechanism
          key={`${beam.initialX}-${index}`}
          beamOptions={beam}
          containerRef={containerRef}
          parentRef={parentRef}
        />
      ))}

      {children}
      <div
        ref={containerRef}
        className="absolute bottom-0 bg-transparent w-full inset-x-0 pointer-events-none border-0"
        style={{
          boxShadow: "none",
        }}
      ></div>
    </div>
  );
};

const CollisionMechanism = React.forwardRef<
  HTMLDivElement,
  {
    containerRef: React.RefObject<HTMLDivElement>;
    parentRef: React.RefObject<HTMLDivElement>;
    beamOptions?: {
      initialX?: string | number;
      translateX?: string | number;
      initialY?: number;
      translateY?: number;
      rotate?: number;
      className?: string;
      duration?: number;
      delay?: number;
      repeatDelay?: number;
    };
  }
>(({ parentRef, containerRef, beamOptions = {} }, _ref) => {
  const beamRef = useRef<HTMLDivElement>(null);
  const [collision, setCollision] = useState<{
    detected: boolean;
    coordinates: { x: number; y: number } | null;
  }>({
    detected: false,
    coordinates: null,
  });
  const [beamKey, setBeamKey] = useState(0);
  const [cycleCollisionDetected, setCycleCollisionDetected] = useState(false);

  useEffect(() => {
    const checkCollision = () => {
      if (
        beamRef.current &&
        containerRef.current &&
        parentRef.current &&
        !cycleCollisionDetected
      ) {
        const beamRect = beamRef.current.getBoundingClientRect();
        const containerRect = containerRef.current.getBoundingClientRect();
        const parentRect = parentRef.current.getBoundingClientRect();

        if (beamRect.bottom >= containerRect.top) {
          const relativeX =
            beamRect.left - parentRect.left + beamRect.width / 2;
          const relativeY = beamRect.bottom - parentRect.top;

          setCollision({
            detected: true,
            coordinates: {
              x: relativeX,
              y: relativeY,
            },
          });
          setCycleCollisionDetected(true);
        }
      }
    };

    const animationInterval = setInterval(checkCollision, 50);

    return () => clearInterval(animationInterval);
  }, [cycleCollisionDetected]);

  useEffect(() => {
    if (collision.detected && collision.coordinates) {
      setTimeout(() => {
        setCollision({ detected: false, coordinates: null });
        setCycleCollisionDetected(false);
      }, 2000);

      setTimeout(() => {
        setBeamKey((prevKey) => prevKey + 1);
      }, 2000);
    }
  }, [collision]);

  return (
    <>
      <motion.div
        key={beamKey}
        ref={beamRef}
        animate="animate"
        initial={{
          translateY: beamOptions.initialY || "-200px",
          left: beamOptions.initialX || "0%",
          rotate: beamOptions.rotate || 0,
        }}
        variants={{
          animate: {
            translateY: beamOptions.translateY || "1800px",
            left: beamOptions.translateX || "0%",
            rotate: beamOptions.rotate || 0,
          },
        }}
        transition={{
          duration: beamOptions.duration || 8,
          repeat: Infinity,
          repeatType: "loop",
          ease: "linear",
          delay: beamOptions.delay || 0,
          repeatDelay: beamOptions.repeatDelay || 0,
        }}
        className={cn(
          "absolute top-20 m-auto h-14 w-px rounded-lg bg-gradient-to-t from-green-500 via-emerald-500 to-transparent",
          beamOptions.className
        )}
      />
      <AnimatePresence>
        {collision.detected && collision.coordinates && (
          <Explosion
            key={`${collision.coordinates.x}-${collision.coordinates.y}`}
            className=""
            style={{
              left: `${collision.coordinates.x}px`,
              top: `${collision.coordinates.y}px`,
              transform: "translate(-50%, -50%)",
            }}
          />
        )}
      </AnimatePresence>
    </>
  );
});

CollisionMechanism.displayName = "CollisionMechanism";

const Explosion = ({ ...props }: React.HTMLProps<HTMLDivElement>) => {
  const spans = Array.from({ length: 20 }, (_, index) => ({
    id: index,
    initialX: 0,
    initialY: 0,
    directionX: Math.floor(Math.random() * 80 - 40),
    directionY: Math.floor(Math.random() * -50 - 10),
  }));

  return (
    <div {...props} className={cn("absolute z-10 h-2 w-2", props.className)}>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
        className="absolute -inset-x-10 top-0 m-auto h-2 w-10 rounded-full bg-gradient-to-r from-transparent via-green-500 to-transparent blur-sm"
      ></motion.div>
      {spans.map((span) => (
        <motion.span
          key={span.id}
          initial={{ x: span.initialX, y: span.initialY, opacity: 1 }}
          animate={{
            x: span.directionX,
            y: span.directionY,
            opacity: 0,
          }}
          transition={{ duration: Math.random() * 1.5 + 0.5, ease: "easeOut" }}
          className="absolute h-1 w-1 rounded-full bg-gradient-to-b from-green-500 to-emerald-500"
        />
      ))}
    </div>
  );
};
