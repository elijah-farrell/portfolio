import { TracingBeam } from "@/components/ui/aceternity/tracing-beam";
import { TextReveal } from "@/components/ui/magic/text-reveal";
import { SiFuturelearn } from "react-icons/si";
import { GiGroundbreaker } from "react-icons/gi";
import AboutMe from "@/pages/home/AboutMe";
import Projects from "@/pages/home/Projects";
import Skills from "@/pages/home/Skills";
import ExperienceSection from "@/pages/home/Experience";
import Contact from "@/pages/home/Contact";

/**
 * Below-the-fold content (lazy-loaded chunk). Loads only when user scrolls near it
 * so initial mobile load stays light for 90+ Performance.
 */
export default function BelowFold(): JSX.Element {
  return (
    <TracingBeam className="px-6">
      <AboutMe />
      <ExperienceSection />
      <Projects />
      <Skills />
      <TextReveal>
        I learn
        <SiFuturelearn /> fast—mostly because I break
        <GiGroundbreaker /> things faster.
      </TextReveal>
      <Contact />
    </TracingBeam>
  );
}
