import React, { useEffect, useRef } from "react";
import {
  CardContainer,
  CardBody,
  CardItem,
} from "@/components/ui/aceternity/3d-card";
import { useIsoLayoutEffect } from "@/lib/ssr";
import {
  applyHeroParallaxTransform,
  heroParallaxOffset,
} from "@/lib/hero-parallax";

const mainImage = "/assets/pfp.webp";
const mainImageSrcSet = "/assets/pfp-320w.webp 320w, /assets/pfp-400w.webp 400w, /assets/pfp-800w.webp 800w";
const altMainImage = "/assets/animated.webp";
const altMainImageSrcSet = "/assets/animated-320w.webp 320w, /assets/animated-400w.webp 400w, /assets/animated-800w.webp 800w";
const lcpPreloadSrc = "/assets/animated-800w.webp";

const LERP = 0.09;

const FloatingImage: React.FC = () => {
  const [showAlt, setShowAlt] = React.useState(true);
  const imageContainerRef = useRef<HTMLDivElement>(null);
  const currentOffsetRef = useRef(0);
  const isInViewRef = useRef(true);
  const rafIdRef = useRef(0);
  const initializedRef = useRef(false);

  const snapToScroll = () => {
    const el = imageContainerRef.current;
    if (!el) return;
    const offset = heroParallaxOffset(
      window.scrollY,
      window.innerWidth,
      window.innerHeight,
      el,
      currentOffsetRef.current
    );
    currentOffsetRef.current = offset;
    initializedRef.current = true;
    applyHeroParallaxTransform(el, offset);
  };

  useIsoLayoutEffect(() => {
    snapToScroll();
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
      const el = imageContainerRef.current;
      if (!el || !isInViewRef.current) return;

      const targetOffset = heroParallaxOffset(
        window.scrollY,
        window.innerWidth,
        window.innerHeight,
        el,
        currentOffsetRef.current
      );

      if (!initializedRef.current) {
        currentOffsetRef.current = targetOffset;
        initializedRef.current = true;
      } else {
        currentOffsetRef.current +=
          (targetOffset - currentOffsetRef.current) * LERP;
      }

      applyHeroParallaxTransform(el, currentOffsetRef.current);
    };

    rafIdRef.current = requestAnimationFrame(update);
    return () => cancelAnimationFrame(rafIdRef.current);
  }, []);

  const containerStyle: React.CSSProperties = {
    opacity: 1,
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
    className:
      "absolute inset-0 no-image-save w-80 h-96 xl:w-96 xl:h-96 object-cover object-center rounded-2xl md:rounded-3xl transition-opacity duration-500 ease-in-out",
    style: { backfaceVisibility: "hidden" as const },
  } as const;

  const spacer = (
    <div className="w-80 h-96 xl:w-96 xl:h-96" aria-hidden="true" />
  );

  return (
    <div className="relative max-w-full max-lg:inline-block max-lg:transition-transform max-lg:duration-150 max-lg:ease-out max-lg:hover:scale-[1.03] max-lg:active:scale-[1.05]">
      <CardContainer className="inter-var">
        <CardBody>
          <CardItem translateZ={60} className="relative">
            <div
              ref={imageContainerRef}
              data-hero-parallax
              className="relative"
              style={containerStyle}
              suppressHydrationWarning
            >
              <img
                {...imgCommon}
                src={altMainImage}
                loading="eager"
                fetchPriority="high"
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
};

export default FloatingImage;
