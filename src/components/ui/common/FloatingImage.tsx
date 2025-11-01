import React, { useEffect, useState } from "react";

const mainImage = "/assets/pfp.webp"; // smaller, optimized
const altMainImage = "/assets/animated.webp"; // larger, decorative

const FloatingImage: React.FC = () => {
  const [currentSrc, setCurrentSrc] = useState(mainImage);
  const [fade, setFade] = useState(false);
  const [showAlt, setShowAlt] = useState(true);
  const [scrollY, setScrollY] = useState(0);
  const [isMounted, setIsMounted] = useState(false);

  // Handle initial mount fade-in
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Handle image transitions (desktop only, and respect reduced motion)
  useEffect(() => {
    const canAnimate = window.matchMedia('(prefers-reduced-motion: no-preference)').matches;
    const isDesktop = window.innerWidth >= 1024;
    if (!canAnimate || !isDesktop) return;

    const interval = setInterval(() => {
      setFade(true);
      setTimeout(() => {
        setShowAlt((prev) => !prev);
        setCurrentSrc(showAlt ? mainImage : altMainImage);
        setFade(false);
      }, 300);
    }, 10000);

    return () => clearInterval(interval);
  }, [showAlt]);

  // Handle scroll-based parallax effect with passive listeners for better performance
  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setScrollY(window.scrollY);
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      style={{
        transform: `translateY(${scrollY * 0.1}px)`,
        transition: "transform 0.3s ease-out, opacity 0.5s ease-in",
        opacity: isMounted ? 1 : 0,
      }}
    >
      {/* LCP image - smaller first, eager with high fetch priority */}
      <img
        src={currentSrc}
        alt="Elijah Farrell - Software Developer"
        width={384}
        height={384}
        loading="eager"
        decoding="async"
        fetchPriority="high"
        sizes="(max-width: 640px) 18rem, (max-width: 1024px) 24rem, 24rem"
        className={`
                    w-80 h-96 xl:w-96 xl:h-96 object-cover rounded-2xl md:rounded-3xl 
                    transition-opacity duration-300 
                    ${fade ? "opacity-0" : "opacity-100"}
                `}
      />
    </div>
  );
};

export default FloatingImage;
