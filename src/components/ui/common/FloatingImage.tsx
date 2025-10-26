import React, { useEffect, useState, useRef } from "react";

const mainImage = "/assets/pfp.jpeg";
const altMainImage = "/assets/animated.png";

const FloatingImage: React.FC = () => {
  const [currentSrc, setCurrentSrc] = useState(altMainImage);
  const [fade, setFade] = useState(false);
  const [showAlt, setShowAlt] = useState(true);
  const [scrollY, setScrollY] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);

  // Handle image load
  const handleImageLoad = () => {
    setIsLoaded(true);
  };

  // Handle image transitions
  useEffect(() => {
      const interval = setInterval(() => {
        setFade(true);
        setTimeout(() => {
          setShowAlt((prev) => !prev);
          setCurrentSrc(showAlt ? mainImage : altMainImage);
          setFade(false);
        }, 500);
      }, 10000);
      return () => clearInterval(interval);
  }, [mainImage, altMainImage, showAlt]);

  // Handle scroll-based parallax effect
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      style={{
        transform: `translateY(${scrollY * 0.1}px)`,
        transition: "transform 0.3s ease-out",
      }}
      className="relative"
    >
      {/* Skeleton placeholder */}
      {!isLoaded && (
        <div
          className="w-80 h-96 xl:w-96 xl:h-96 object-cover rounded-2xl md:rounded-3xl bg-gradient-to-br from-emerald-100 via-emerald-50 to-blue-100 dark:from-emerald-900/20 dark:via-emerald-800/10 dark:to-blue-900/20 animate-pulse"
        />
      )}
      
      {/* Main image */}
        <img
          ref={imgRef}
          src={currentSrc}
          alt="Elijah Farrell - Software Developer"
          width={384}
          height={384}
          loading="eager"
          onLoad={handleImageLoad}
          className={`
                      w-80 h-96 xl:w-96 xl:h-96 object-cover rounded-2xl md:rounded-3xl 
                      transition-all duration-500 
                      ${fade ? "opacity-50" : isLoaded ? "opacity-100" : "opacity-0"}
                      ${!isLoaded ? "absolute top-0 left-0" : ""}
                  `}
        />
    </div>
  );
};

export default FloatingImage;
