import React, { useEffect, useState } from "react";

const mainImage = "/assets/pfp.webp";
const altMainImage = "/assets/animated.webp";

const FloatingImage: React.FC = () => {
  const [currentSrc, setCurrentSrc] = useState(altMainImage);
  const [fade, setFade] = useState(false);
  const [showAlt, setShowAlt] = useState(true);
  const [scrollY, setScrollY] = useState(0);
  const [isMounted, setIsMounted] = useState(false);

  // Handle initial mount fade-in
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Handle image transitions (defer to avoid blocking initial render)
  useEffect(() => {
    // Defer to next frame to avoid blocking initial paint
    const timeoutId = setTimeout(() => {
      const interval = setInterval(() => {
        setFade(true);
        setTimeout(() => {
          setShowAlt((prev) => !prev);
          setCurrentSrc(showAlt ? mainImage : altMainImage);
          setFade(false);
        }, 500);
      }, 10000);
      
      return () => clearInterval(interval);
    }, 0);
    
    return () => clearTimeout(timeoutId);
  }, [mainImage, altMainImage, showAlt]);

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
      {/* Main image - eager load first image for better LCP */}
      <img
        src={currentSrc}
        alt="Elijah Farrell - Software Developer"
        width={384}
        height={384}
        loading="eager"
        decoding="async"
        className={`
                    w-80 h-96 xl:w-96 xl:h-96 object-cover rounded-2xl md:rounded-3xl 
                    transition-all duration-500 
                    ${fade ? "opacity-50" : "opacity-100"}
                `}
      />
    </div>
  );
};

export default FloatingImage;
