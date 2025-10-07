import React, { useEffect, useState, useRef } from "react";

const mainImage = "/assets/pfp.jpeg";
const altMainImage = "/assets/animated.png";

const FloatingImage: React.FC = () => {
  const [currentSrc, setCurrentSrc] = useState(altMainImage);
  const [fade, setFade] = useState(false);
  const [showAlt, setShowAlt] = useState(true);
  const [scrollY, setScrollY] = useState(0);

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
    >
      {/* Main image */}
      <img
        src={currentSrc}
        alt="Elijah Farrell - Software Developer"
        width={384}
        height={384}
        loading="lazy"
        className={`
                      w-96 h-96 object-cover rounded-2xl md:rounded-3xl 
                      transition-all duration-500 
                      ${fade ? "opacity-50" : "opacity-100"}
                  `}
      />
    </div>
  );
};

export default FloatingImage;
