import { TracingBeam } from "@/components/ui/tracing-beam";
import SkillsSection from "@/components/SkillsSection";
import AboutMe from "@/components/AboutMe";
import ProjectsSection from "@/components/ProjectSection";
import { TextReveal } from "@/components/magicui/text-reveal";
import ExperienceSection from "@/components/Experience";
import Contact from "./Contact";
import ServicesSection from "@/components/ToolsForDev";
import HeroSection from "@/components/HeroSection";
import CodeQuote from "@/components/CodeQuote";
import Education from "@/components/Education";
import { SiFuturelearn } from "react-icons/si";
import { GiBreakingChain, GiGroundbreaker } from "react-icons/gi";

export default function Home(): JSX.Element {
  return (
    <div>
      <HeroSection />
      <TracingBeam className="px-6">
        <AboutMe />
        <ExperienceSection />
        <SkillsSection />
        <ProjectsSection />
        <Education />

        <CodeQuote />

        <TextReveal>
          I learn
          <SiFuturelearn /> fast—mostly because I break
          <GiGroundbreaker /> things faster.
        </TextReveal>
        <ServicesSection />
        <Contact />
      </TracingBeam>
    </div>
  );
}
