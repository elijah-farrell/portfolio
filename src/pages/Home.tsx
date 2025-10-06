import { TracingBeam } from "@/components/ui/tracing-beam";
import { SEO } from "@/components/SEO";
import HeroSection from "@/components/HeroSection";
import SkillsSection from "@/components/SkillsSection";
import AboutMe from "@/components/AboutMe";
import ProjectsSection from "@/components/ProjectSection";
import { TextReveal } from "@/components/magicui/text-reveal";
import ExperienceSection from "@/components/Experience";
import Contact from "@/components/Contact";
import { SiFuturelearn } from "react-icons/si";
import { GiGroundbreaker } from "react-icons/gi";

export default function Home(): JSX.Element {
  return (
    <div>
      <SEO />
      <HeroSection />
      <TracingBeam className="px-6">
        <AboutMe />
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
