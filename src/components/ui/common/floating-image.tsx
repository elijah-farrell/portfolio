import React, { useEffect, useState, useRef } from "react";
import {
  CardContainer,
  CardBody,
  CardItem,
} from "@/components/ui/aceternity/3d-card";

const mainImage = "/assets/pfp.webp";
const mainImageSrcSet = "/assets/pfp-320w.webp 320w, /assets/pfp-400w.webp 400w, /assets/pfp-800w.webp 800w";
const altMainImage = "/assets/animated.webp";
const altMainImageSrcSet = "/assets/animated-320w.webp 320w, /assets/animated-400w.webp 400w, /assets/animated-800w.webp 800w";
// Preload a sharp hero image (800w covers 384px @2x); avoid 320w so LCP isn't blurry
const lcpPreloadSrc = "/assets/animated-800w.webp";

const PARALLAX_FACTOR_DESKTOP = 0.14;
const PARALLAX_MAX_DESKTOP = 130;
const PARALLAX_FACTOR_MOBILE = 0.26;
const PARALLAX_MAX_MOBILE = 400;
/** Short viewport (e.g. landscape phone): gentle parallax so image stays visible */
const PARALLAX_FACTOR_SHORT = 0.06;
const PARALLAX_MAX_SHORT = 60;
const SHORT_VIEWPORT_HEIGHT = 500;
const LERP = 0.09;

const FloatingImage: React.FC = () => {
  const [showAlt, setShowAlt] = useState(true);
  const [isMounted, setIsMounted] = useState(false);
  const [primaryImageLoaded, setPrimaryImageLoaded] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);
  const [isShortViewport, setIsShortViewport] = useState(false);
  const imageContainerRef = useRef<HTMLDivElement>(null);
  const currentOffsetRef = useRef(0);
  const isInViewRef = useRef(true);
  const rafIdRef = useRef<number>(0);
  const isDesktopRef = useRef(false);
  const isShortViewportRef = useRef(false);
  const initializedRef = useRef(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    const checkScreenSize = () => {
      const desktop = window.innerWidth >= 1024;
      const short = window.innerHeight <= SHORT_VIEWPORT_HEIGHT;
      setIsDesktop(desktop);
      setIsShortViewport(short);
      isDesktopRef.current = desktop;
      isShortViewportRef.current = short;
    };
    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);
    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  useEffect(() => {
    const img = new Image();
    img.src = lcpPreloadSrc;
  }, []);

  useEffect(() => {
    const interval = setInterval(() => setShowAlt((p) => !p), 10000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const wrapper = imageContainerRef.current?.closest(".hero-floating-image");
    if (!wrapper) return;
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          isInViewRef.current = entry.isIntersecting;
          if (!entry.isIntersecting) initializedRef.current = false;
        });
      },
      { rootMargin: "100px 0px", threshold: 0 }
    );
    obs.observe(wrapper);
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    const update = () => {
      rafIdRef.current = requestAnimationFrame(update);
      if (!imageContainerRef.current) return;
      if (!isInViewRef.current) return;

      const scrollY = window.scrollY;
      const desktop = isDesktopRef.current;
      const short = isShortViewportRef.current;
      const factor = desktop
        ? PARALLAX_FACTOR_DESKTOP
        : short
          ? PARALLAX_FACTOR_SHORT
          : PARALLAX_FACTOR_MOBILE;
      const maxOffset = desktop
        ? PARALLAX_MAX_DESKTOP
        : short
          ? PARALLAX_MAX_SHORT
          : PARALLAX_MAX_MOBILE;

      let targetOffset = scrollY * factor;
      targetOffset = Math.max(0, Math.min(maxOffset, targetOffset));

      if (!desktop) {
        const about = document.getElementById("about");
        if (about && imageContainerRef.current) {
          const aboutRect = about.getBoundingClientRect();
          const imageRect = imageContainerRef.current.getBoundingClientRect();
          const margin = 16;
          const baseBottom = imageRect.bottom - currentOffsetRef.current;
          const maxAllowed = aboutRect.top - margin - baseBottom;
          targetOffset = Math.min(targetOffset, Math.max(0, maxAllowed));
        }
      }

      if (!initializedRef.current) {
        currentOffsetRef.current = targetOffset;
        initializedRef.current = true;
      } else {
        currentOffsetRef.current +=
          (targetOffset - currentOffsetRef.current) * LERP;
      }

      const smoothed = currentOffsetRef.current;
      imageContainerRef.current.style.transform = `translate3d(0,${smoothed}px,0)`;
    };

    rafIdRef.current = requestAnimationFrame(update);
    return () => cancelAnimationFrame(rafIdRef.current);
  }, []);

  const containerStyle: React.CSSProperties = {
    transform: "translate3d(0,0,0)",
    transition: "opacity 0.5s ease-in",
    opacity: isMounted && primaryImageLoaded ? 1 : 0,
    transformStyle: "preserve-3d",
    backfaceVisibility: "hidden",
    willChange: "transform",
  };

  const imgCommon = {
    srcSet: altMainImageSrcSet,
    sizes: "(max-width: 639px) 320px, (max-width: 1279px) 400px, 768px",
    alt: "Elijah Farrell - Software Developer",
    width: 384,
    height: 384,
    decoding: "async" as const,
    className: "absolute inset-0 no-image-save w-80 h-96 xl:w-96 xl:h-96 object-cover object-center rounded-2xl md:rounded-3xl transition-opacity duration-500 ease-in-out",
    style: { backfaceVisibility: "hidden" as const },
  } as const;

  const spacer = <div className="w-80 h-96 xl:w-96 xl:h-96" aria-hidden="true" />;

  if (isDesktop) {
    return (
      <div className="relative max-w-full">
        <CardContainer className="inter-var">
          <CardBody>
            <CardItem translateZ={60} className="relative">
              <div ref={imageContainerRef} className="relative" style={containerStyle}>
                <img
                  {...imgCommon}
                  src={altMainImage}
                  loading="eager"
                  fetchPriority="high"
                  onLoad={() => setPrimaryImageLoaded(true)}
                  style={{ ...imgCommon.style, opacity: showAlt ? 1 : 0 }}
                  className={`${imgCommon.className} ${showAlt ? "z-10" : "z-0"}`}
                />
                <img
                  {...imgCommon}
                  srcSet={mainImageSrcSet}
                  src={mainImage}
                  loading="lazy"
                  style={{ ...imgCommon.style, opacity: showAlt ? 0 : 1 }}
                  className={`${imgCommon.className} ${showAlt ? "z-0" : "z-10"}`}
                />
                {spacer}
              </div>
            </CardItem>
          </CardBody>
        </CardContainer>
      </div>
    );
  }

  return (
    <div className="relative max-w-full">
      <div className="inline-block transition-transform duration-150 ease-out hover:scale-[1.03] active:scale-[1.05]">
        <div ref={imageContainerRef} className="relative" style={containerStyle}>
          <img
            {...imgCommon}
            src={altMainImage}
            loading="eager"
            fetchPriority="high"
            onLoad={() => setPrimaryImageLoaded(true)}
            style={{ ...imgCommon.style, opacity: showAlt ? 1 : 0 }}
            className={`${imgCommon.className} ${showAlt ? "z-10" : "z-0"}`}
          />
          <img
            {...imgCommon}
            srcSet={mainImageSrcSet}
            src={mainImage}
            loading="lazy"
            style={{ ...imgCommon.style, opacity: showAlt ? 0 : 1 }}
            className={`${imgCommon.className} ${showAlt ? "z-0" : "z-10"}`}
          />
          {spacer}
        </div>
      </div>
    </div>
  );
};

export default FloatingImage;
