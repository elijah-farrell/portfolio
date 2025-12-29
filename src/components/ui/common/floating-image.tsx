import React, { useEffect, useState, useRef } from "react";
import {
  CardContainer,
  CardBody,
  CardItem,
} from "@/components/ui/aceternity/3d-card";

const mainImage = "/assets/pfp.webp";
const altMainImage = "/assets/animated.webp";

const FloatingImage: React.FC = () => {
  const [showAlt, setShowAlt] = useState(true);
  const [parallaxOffset, setParallaxOffset] = useState(0);
  const [isMounted, setIsMounted] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);
  const imageContainerRef = useRef<HTMLDivElement>(null);

  // Fade in on mount so the hero image doesn't flash
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Check if screen is desktop (Tailwind lg: >= 1024px)
  useEffect(() => {
    const checkScreenSize = () => {
      setIsDesktop(window.innerWidth >= 1024);
    };
    
    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);
    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  // Preload both images to prevent loading glitches during transitions
  useEffect(() => {
    const preloadImage = (src: string) => {
      const img = new Image();
      img.src = src;
    };

    preloadImage(mainImage);
    preloadImage(altMainImage);
  }, []);

  // Handle image transitions
  useEffect(() => {
    const interval = setInterval(() => {
      setShowAlt((prev) => !prev);
    }, 10000);
    
    return () => clearInterval(interval);
  }, []);

  // Handle scroll-based parallax effect on all screen sizes.
  // Simple, globally clamped parallax so the image never flies too far.
  // On mobile/tablet, we also clamp against the About section so the
  // image doesn't scroll underneath the "ABOUT ME" title.
  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const currentScrollY = window.scrollY;

          // Base parallax offset driven by scroll position with a hard clamp.
          // Tuned so the image gets a nice drift but never covers the About text.
          const factor = isDesktop ? 0.14 : 0.14;
          const maxOffset = isDesktop ? 130 : 140;
          let calculatedOffset = currentScrollY * factor;
          if (calculatedOffset < 0) calculatedOffset = 0;
          if (calculatedOffset > maxOffset) calculatedOffset = maxOffset;

          // On non-desktop layouts (single-column), clamp relative to the
          // ABOUT ME heading so the image stops just before overlapping it.
          if (!isDesktop && imageContainerRef.current) {
            const about = document.getElementById("about");
            if (about) {
              const aboutRect = about.getBoundingClientRect();
              const imageRect = imageContainerRef.current.getBoundingClientRect();

              const currentOffset = parallaxOffset;
              const delta = calculatedOffset - currentOffset;

              const predictedBottom = imageRect.bottom + delta;
              const margin = 12; // slightly tighter gap on mobile

              if (predictedBottom > aboutRect.top - margin) {
                const maxDelta = (aboutRect.top - margin) - imageRect.bottom;
                calculatedOffset = currentOffset + maxDelta;
              }
            }
          }

          setParallaxOffset(calculatedOffset);
          
          // Update transform with calculated parallax offset.
          if (imageContainerRef.current) {
            imageContainerRef.current.style.transform = `translateY(${calculatedOffset}px)`;
          }
          
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    // Run once on mount so that if scroll was restored
    // (e.g. via useScrollPreservation), the parallax position
    // immediately matches the current scrollY.
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, [isDesktop]);

  // Desktop (>=1024px): use full 3d-card hover effect.
  if (isDesktop) {
    return (
      <div className="relative max-w-full">
        <CardContainer className="inter-var">
          <CardBody>
            <CardItem translateZ={60} className="relative">
              <div
                ref={imageContainerRef}
                className="relative"
                style={{
                  transform: `translateY(${parallaxOffset}px)`,
                  transition: "transform 0.3s ease-out, opacity 0.5s ease-in",
                  opacity: isMounted ? 1 : 0,
                  transformStyle: "preserve-3d",
                  backfaceVisibility: "hidden",
                  willChange: "transform",
                }}
              >
                {/* Both images rendered simultaneously for smooth cross-fade */}
                <img
                  src={altMainImage}
                  alt="Elijah Farrell - Software Developer"
                  width={384}
                  height={384}
                  loading="eager"
                  decoding="async"
                  className={`
                    absolute inset-0 no-image-save
                    w-80 h-96 xl:w-96 xl:h-96 object-cover rounded-2xl md:rounded-3xl 
                    transition-opacity duration-500 ease-in-out
                    ${showAlt ? "opacity-100 z-10" : "opacity-0 z-0"}
                  `}
                  style={{
                    backfaceVisibility: "hidden",
                  }}
                />
                <img
                  src={mainImage}
                  alt="Elijah Farrell - Software Developer"
                  width={384}
                  height={384}
                  loading="eager"
                  decoding="async"
                  className={`
                    absolute inset-0 no-image-save
                    w-80 h-96 xl:w-96 xl:h-96 object-cover rounded-2xl md:rounded-3xl 
                    transition-opacity duration-500 ease-in-out
                    ${!showAlt ? "opacity-100 z-10" : "opacity-0 z-0"}
                  `}
                  style={{
                    backfaceVisibility: "hidden",
                  }}
                />
                {/* Spacer to maintain layout */}
                <div className="w-80 h-96 xl:w-96 xl:h-96" aria-hidden="true" />
              </div>
            </CardItem>
          </CardBody>
        </CardContainer>
      </div>
    );
  }

  // Below 1024px: no 3D card effect, just a subtle scale on hover/click.
  return (
    <div className="relative max-w-full">
      <div
        className="inline-block transition-transform duration-150 ease-out hover:scale-[1.03] active:scale-[1.05]"
      >
        <div
          ref={imageContainerRef}
          className="relative"
          style={{
            transform: `translateY(${parallaxOffset}px)`,
            transition: "transform 0.3s ease-out, opacity 0.5s ease-in",
            opacity: isMounted ? 1 : 0,
            transformStyle: "preserve-3d",
            backfaceVisibility: "hidden",
            willChange: "transform",
          }}
        >
          {/* Both images rendered simultaneously for smooth cross-fade */}
          <img
            src={altMainImage}
            alt="Elijah Farrell - Software Developer"
            width={384}
            height={384}
            loading="eager"
            decoding="async"
            className={`
              absolute inset-0 no-image-save
              w-80 h-96 xl:w-96 xl:h-96 object-cover rounded-2xl md:rounded-3xl 
              transition-opacity duration-500 ease-in-out
              ${showAlt ? "opacity-100 z-10" : "opacity-0 z-0"}
            `}
            style={{
              backfaceVisibility: "hidden",
            }}
          />
          <img
            src={mainImage}
            alt="Elijah Farrell - Software Developer"
            width={384}
            height={384}
            loading="eager"
            decoding="async"
            className={`
              absolute inset-0 no-image-save
              w-80 h-96 xl:w-96 xl:h-96 object-cover rounded-2xl md:rounded-3xl 
              transition-opacity duration-500 ease-in-out
              ${!showAlt ? "opacity-100 z-10" : "opacity-0 z-0"}
            `}
            style={{
              backfaceVisibility: "hidden",
            }}
          />
          {/* Spacer to maintain layout */}
          <div className="w-80 h-96 xl:w-96 xl:h-96" aria-hidden="true" />
        </div>
      </div>
    </div>
  );
};

export default FloatingImage;




