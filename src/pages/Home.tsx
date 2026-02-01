import { useEffect, lazy, Suspense } from "react";
import { useLocation } from "react-router-dom";
import { SEO } from "@/components/seo/SEO";
import Hero from "@/pages/home/Hero";
import { LazySection } from "@/components/ui/common/lazy-section";
import { SiFuturelearn } from "react-icons/si";
import { GiGroundbreaker } from "react-icons/gi";

const BelowFold = lazy(() => import("@/pages/home/BelowFold"));

export default function Home(): JSX.Element {
  const location = useLocation();

  // Handle cross-page scroll requests and hash-based section links.
  // - location.state.scrollToSection: navigation initiated by our Navbar (same-tab or cross-page)
  // - window.location.hash: direct URL access or "open in new tab" on a section link
  useEffect(() => {
    const state = location.state as { scrollToSection?: string } | null;
    const hash =
      typeof window !== "undefined" && window.location.hash
        ? window.location.hash.replace(/^#/, "")
        : undefined;

    // Prefer explicit state; if none, use hash only on the home route.
    const sectionId =
      state?.scrollToSection ?? (location.pathname === "/" ? hash : undefined);
    if (!sectionId) return;
    // Below-fold content will mount when LazySection forceMount is true (see render).

    let cancelled = false;

    const scrollWithRetry = (attempt: number) => {
      if (cancelled) return;

      const element = document.getElementById(sectionId);
      if (!element) {
        // Retry a few times to allow React content to mount (important on initial loads / new tabs).
        if (attempt < 40) {
          window.setTimeout(() => scrollWithRetry(attempt + 1), 50);
        }
        return;
      }

      // Wait for layout to stabilize before computing offsets (important in mobile preview/overlay modes)
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

        // After handling once (via state or hash), clear hash/state so refresh goes to top
        // and scroll preservation can behave normally.
        window.history.replaceState({}, "", location.pathname);
      });
    };

    // Add a small initial delay on mobile to account for preview rendering
    const delay =
      typeof window !== "undefined" && window.innerWidth < 768 ? 100 : 0;
    const timeoutId = window.setTimeout(() => scrollWithRetry(0), delay);

    return () => {
      cancelled = true;
      window.clearTimeout(timeoutId);
    };
  }, [location]);

  const hash =
    typeof window !== "undefined" && window.location.hash
      ? window.location.hash.replace(/^#/, "")
      : undefined;
  const sectionIdForMount =
    (location.state as { scrollToSection?: string } | null)?.scrollToSection ??
    (location.pathname === "/" ? hash : undefined);
  const forceMountBelowFold = !!sectionIdForMount;

  return (
    <div>
      <SEO />
      <Hero />
      <LazySection forceMount={forceMountBelowFold}>
        <Suspense fallback={<div className="min-h-[600px]" aria-hidden="true" />}>
          <BelowFold />
        </Suspense>
      </LazySection>
    </div>
  );
}
