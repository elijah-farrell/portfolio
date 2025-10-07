import { TracingBeam } from "@/components/ui/aceternity/tracing-beam";
import { SEO } from "@/components/seo/SEO";
import Hero from "@/components/home/Hero";
import Skills from "@/components/home/Skills";
import AboutMe from "@/components/home/AboutMe";
import Projects from "@/components/home/Projects";
import { TextReveal } from "@/components/ui/magic/text-reveal";
import ExperienceSection from "@/components/home/Experience";
import Contact from "@/components/home/Contact";
import { SiFuturelearn } from "react-icons/si";
import { GiGroundbreaker } from "react-icons/gi";

export default function Home(): JSX.Element {
  return (
    <div>
      <SEO />
      <Hero />
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
    </div>
  );
}
