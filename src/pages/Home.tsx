import { TracingBeam } from "@/components/ui/tracing-beam";
import SkillsSection from "@/components/SkillsSection";
import AboutMe from "@/components/AboutMe";
import ProjectsSection from "@/components/ProjectSection";
import { TextReveal } from "@/components/magicui/text-reveal";
import ExperienceSection from "@/components/Experience";
import Contact from "@/components/Contact";
import { SEO } from "@/components/SEO";

import HeroSection from "@/components/HeroSection";
import Education from "@/components/Education";
import { SiFuturelearn } from "react-icons/si";
import { GiBreakingChain, GiGroundbreaker } from "react-icons/gi";

export default function Home(): JSX.Element {
  return (
    <div>
      <SEO />
      <HeroSection />
      <TracingBeam className="px-6">
        <AboutMe />
        <Education />
        <ExperienceSection />
        <ProjectsSection />
        <SkillsSection />
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
