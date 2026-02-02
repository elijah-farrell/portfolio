import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { SEO } from "@/components/seo/SEO";
import Hero from "@/pages/home/Hero";
import BelowFold from "@/pages/home/BelowFold";

export default function Home(): JSX.Element {
  const location = useLocation();

  // Handle cross-page scroll requests and hash-based section links.
  useEffect(() => {
    const state = location.state as { scrollToSection?: string } | null;
    const hash =
      typeof window !== "undefined" && window.location.hash
        ? window.location.hash.replace(/^#/, "")
        : undefined;

    const sectionId =
      state?.scrollToSection ?? (location.pathname === "/" ? hash : undefined);
    if (!sectionId) return;

    let cancelled = false;

    const scrollWithRetry = (attempt: number) => {
      if (cancelled) return;

      const element = document.getElementById(sectionId);
      if (!element) {
        if (attempt < 40) {
          window.setTimeout(() => scrollWithRetry(attempt + 1), 50);
        }
        return;
      }

      requestAnimationFrame(() => {
        if (cancelled) return;

        const navbar = document.querySelector(
          ".resizable-navbar"
        ) as HTMLElement | null;
        const isMobile = window.innerWidth < 768;
        const navOffset = navbar ? navbar.clientHeight : isMobile ? 25 : 60;

        const rect = element.getBoundingClientRect();
        const targetTop = window.scrollY + rect.top - navOffset;

        window.scrollTo({
          top: targetTop,
          behavior: "smooth",
        });

        window.history.replaceState({}, "", location.pathname);
      });
    };

    const delay =
      typeof window !== "undefined" && window.innerWidth < 768 ? 100 : 0;
    const timeoutId = window.setTimeout(() => scrollWithRetry(0), delay);

    return () => {
      cancelled = true;
      window.clearTimeout(timeoutId);
    };
  }, [location]);

  return (
    <div>
      <SEO />
      <Hero />
      <BelowFold />
    </div>
  );
}
