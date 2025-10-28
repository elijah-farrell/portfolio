import { lazy, Suspense } from "react";
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

// Lazy load Skills since it uses heavy Three.js effects (CardSpotlight)
const Skills = lazy(() => import("@/components/home/Skills"));

export default function Home(): JSX.Element {
  return (
    <div>
      <SEO />
      <Hero />
      <TracingBeam className="px-6">
        <AboutMe />
        <ExperienceSection />
        <Projects />
        <Suspense fallback={<div className="h-96" />}>
          <Skills />
        </Suspense>
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
