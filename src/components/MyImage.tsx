import React, { useEffect, useState, useRef } from "react";
import { GlowingEffect } from "./ui/glowing-effect";

interface FloatingImageProps {
  mainImage: string;
  altImage?: string;
}

const FloatingImage: React.FC<FloatingImageProps> = ({
  mainImage,
  altImage,
}) => {
  const [currentSrc, setCurrentSrc] = useState(mainImage);
  const [fade, setFade] = useState(false);
  const [showAlt, setShowAlt] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [scrollY, setScrollY] = useState(0);
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const [isDark, setIsDark] = useState(false);
  const imageRef = useRef<HTMLDivElement>(null);

  // Detect dark mode
  useEffect(() => {
    const checkDarkMode = () => {
      setIsDark(document.documentElement.classList.contains('dark'));
    };
    checkDarkMode();
    
    const observer = new MutationObserver(checkDarkMode);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
    
    return () => observer.disconnect();
  }, []);

  // Handle image loading
  useEffect(() => {
    const img = new Image();
    img.onload = () => {
      setIsImageLoaded(true);
    };
    img.src = mainImage;
    
    if (altImage) {
      const altImg = new Image();
      altImg.src = altImage;
    }
  }, [mainImage, altImage]);

  // Handle image transitions
  useEffect(() => {
    if (altImage) {
      const interval = setInterval(() => {
        setFade(true);
        setTimeout(() => {
          setShowAlt((prev) => !prev);
          setCurrentSrc(showAlt ? mainImage : altImage);
          setFade(false);
        }, 500);
      }, 10000);
      return () => clearInterval(interval);
    }
  }, [mainImage, altImage, showAlt]);

  // Handle scroll-based parallax effect
  useEffect(() => {
    const handleScroll = () => {
      // Only update if component is still mounted and visible
      if (imageRef.current && imageRef.current.offsetParent !== null) {
        setScrollY(window.scrollY);
      }
    };
    
    // Use passive listener for better performance
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Handle mouse movement for 3D tilt effect
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!imageRef.current) return;

    const rect = imageRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const mouseX = e.clientX - centerX;
    const mouseY = e.clientY - centerY;

    setMousePosition({
      x: (mouseX / rect.width) * 20, // Max 20deg rotation
      y: (mouseY / rect.height) * 20,
    });
  };

  const handleMouseLeave = () => {
    setMousePosition({ x: 0, y: 0 });
  };

  return (
    <div
      ref={imageRef}
      className="relative rounded-2xl md:rounded-3xl duration-700 h-auto w-auto transition-all shadow-2xl hover:shadow-3xl group perspective-1000"
      style={{ position: 'relative', backgroundColor: isDark ? '#0a0a0a' : '#FEFEFE' }} // Explicit positioning to fix scroll warnings
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <div 
        className="relative h-full rounded-2xl border-3 md:rounded-3xl overflow-hidden"
        style={{
          backgroundColor: isDark ? '#0a0a0a' : '#FEFEFE',
          transform: `
                      translateY(${scrollY * 0.1}px) 
                      rotateX(${-mousePosition.y * 0.5}deg) 
                      rotateY(${mousePosition.x * 0.5}deg)
                      scale(${
                        mousePosition.x !== 0 || mousePosition.y !== 0 ? 1.05 : 1
                      })
                  `,
          transformStyle: "preserve-3d",
          transition: "transform 0.3s ease-out",
        }}
      >
        <GlowingEffect
          borderWidth={3}
          spread={50}
          glow={true}
          disabled={false}
          proximity={150}
          inactiveZone={0.01}
        />

        {/* Background layer with blur effect */}
        <div
          className="absolute inset-0 rounded-2xl md:rounded-3xl opacity-20 group-hover:opacity-30 transition-opacity duration-500"
          style={{
            backgroundImage: `url(${currentSrc})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            filter: "blur(20px)",
            transform: "scale(1.1)",
          }}
        />

        {/* Loading placeholder */}
        {!isImageLoaded && (
          <div className="relative z-10 w-96 h-96 bg-gradient-to-br from-emerald-100 to-emerald-200 dark:from-emerald-900 dark:to-emerald-800 rounded-2xl md:rounded-3xl flex items-center justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600"></div>
          </div>
        )}

        {/* Main image */}
        <img
          src={currentSrc}
          alt="Elijah Farrell - Software Developer"
          width={384}
          height={384}
          loading="eager"
          decoding="async"
          fetchpriority="high"
          className={`
                        relative z-10 w-96 h-96 object-cover rounded-2xl md:rounded-3xl 
                        transition-all duration-500 
                        ${fade ? "blur-md grayscale" : "blur-0 grayscale-0"}
                        group-hover:brightness-110 group-hover:contrast-105
                        ${!isImageLoaded ? "opacity-0" : "opacity-100"}
                    `}
          style={{
            transform: `
                            translateZ(50px)
                            rotateX(${mousePosition.y * 0.1}deg) 
                            rotateY(${-mousePosition.x * 0.1}deg)
                        `,
          }}
        />

        {/* Animated overlay */}
        <div className="absolute inset-0 rounded-2xl md:rounded-3xl bg-gradient-to-tr from-emerald-500/10 via-transparent to-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

        {/* Floating particles effect */}
        <div className="absolute inset-0 rounded-2xl md:rounded-3xl overflow-hidden pointer-events-none">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-emerald-400 rounded-full opacity-0 group-hover:opacity-70 animate-pulse"
              style={{
                left: `${20 + i * 15}%`,
                top: `${30 + (i % 3) * 20}%`,
                animationDelay: `${i * 0.5}s`,
                animationDuration: "2s",
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default FloatingImage;
