import React, { useEffect, useState, useRef } from "react";

interface FloatingImageProps {
  mainImage: string;
}

const FloatingImage: React.FC<FloatingImageProps> = ({ mainImage }) => {
  const [scrollY, setScrollY] = useState(0);
  const imageRef = useRef<HTMLDivElement>(null);

  // Scroll-based parallax
  useEffect(() => {
    const handleScroll = () => {
      if (imageRef.current && imageRef.current.offsetParent !== null) {
        setScrollY(window.scrollY);
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div ref={imageRef} className="relative rounded-2xl md:rounded-3xl h-auto w-auto">
      <img
        src={mainImage}
        alt="Elijah Farrell - Software Developer"
        className="relative z-10 w-72 sm:w-80 md:w-96 h-72 sm:h-80 md:h-96 object-cover rounded-2xl md:rounded-3xl transition-transform duration-300"
        style={{
          transform: `translateY(${scrollY * 0.1}px)`, // only scroll effect
        }}
      />
    </div>
  );
};

export default FloatingImage;
