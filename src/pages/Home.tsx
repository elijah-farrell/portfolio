import { lazy, Suspense, useEffect, useRef, useState } from "react";
import { SEO } from "@/components/seo/SEO";
import Hero from "@/components/home/Hero";
import AboutMe from "@/components/home/AboutMe";
import Projects from "@/components/home/Projects";
import ExperienceSection from "@/components/home/Experience";
import Contact from "@/components/home/Contact";
import { TracingBeam } from "@/components/ui/aceternity/tracing-beam";
import { TextReveal } from "@/components/ui/magic/text-reveal";
import { SiFuturelearn } from "react-icons/si";
import { GiGroundbreaker } from "react-icons/gi";

// Define lazy import, but render only after in-viewport to defer heavy three.js
const Skills = lazy(() => import("@/components/home/Skills"));

export default function Home(): JSX.Element {
  const skillsSentinelRef = useRef<HTMLDivElement | null>(null);
  const [shouldLoadSkills, setShouldLoadSkills] = useState(false);

  useEffect(() => {
    if (shouldLoadSkills) return; // already triggered
    const target = skillsSentinelRef.current;
    if (!target) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry.isIntersecting) {
          setShouldLoadSkills(true);
          observer.disconnect();
        }
      },
      { root: null, rootMargin: "600px 0px", threshold: 0.01 }
    );

    observer.observe(target);
    return () => observer.disconnect();
  }, [shouldLoadSkills]);
  return (
    <div>
      <SEO />
      <Hero />
      <TracingBeam className="px-6">
        <AboutMe />
        <ExperienceSection />
        <Projects />
        {/* Sentinel to trigger loading Skills when near viewport */}
        <div ref={skillsSentinelRef} aria-hidden="true" />
        {shouldLoadSkills ? (
          <Suspense fallback={<div className="h-96" />}>
            <Skills />
          </Suspense>
        ) : (
          // Reserve space to avoid layout shift before Skills loads
          <div style={{ minHeight: "24rem" }} />
        )}
        <TextReveal>
          I learn
          <SiFuturelearn /> fast—mostly because I break
          <GiGroundbreaker /> things faster.
        </TextReveal>
        <Contact />
      </TracingBeam>
    </div>
  );
}
