// Timeline.tsx
import React from "react";
import { TextAnimate } from "./magicui/text-animate";
import { GlowingEffect } from "./ui/glowing-effect";
import { settings } from "@/config/settings";

// Define the type for each timeline entry
interface TimelineItemProps {
  title: string;
  company: string;
  description: string;
  from: string;
  to: string;
  logoPath?: string;
  technologies?: string[];
  achievements?: string[];
}
const calculateDuration = (from: string, to: string): string => {
  const [fromMonth, fromYear] = from.split("/").map(Number);
  const [toMonth, toYear] =
    to.toLowerCase() === "present"
      ? [new Date().getMonth() + 1, new Date().getFullYear()]
      : to.split("/").map(Number);

  let totalMonths = (toYear - fromYear) * 12 + (toMonth - fromMonth) + 1; // +1 to include both months
  const years = Math.floor(totalMonths / 12);
  const months = totalMonths % 12;

  const yearText = years > 0 ? `${years} year${years > 1 ? "s" : ""}` : "";
  const monthText = months > 0 ? `${months} month${months > 1 ? "s" : ""}` : "";
  return [yearText, monthText].filter(Boolean).join(" ");
};
// Timeline item component
const TimelineItem: React.FC<TimelineItemProps> = ({
  title,
  company,
  description,
  from,
  to,
  logoPath,
  technologies,
  achievements,
}) => (
  <div className="relative w-full group">
    <div className="absolute -left-[1.95rem] top-10 transition-none">
      <span className="relative flex h-3 w-3">
        <span className="absolute inline-flex h-3 w-3 animate-ping rounded-2xl bg-gray-400 opacity-75 group-hover:bg-emerald-400"></span>
        <span className="relative inline-flex h-3 w-3 rounded-2xl bg-emerald-500 group-hover:bg-emerald-400 transition-colors duration-300"></span>
      </span>
    </div>
    <div className="relative h-full rounded-2xl border p-2 md:rounded-2xl md:p-3 group-hover:border-emerald-200 dark:group-hover:border-emerald-700 transition-colors duration-300">
      {settings.experience.showGlowingEffect && (
        <GlowingEffect
          spread={20}
          glow={true}
          disabled={false}
          proximity={50}
          inactiveZone={0.01}
        />
      )}
      <div className="border-0.75 relative flex h-full flex-col justify-between gap-6 overflow-hidden rounded-xl p-6 md:p-6  transition-shadow duration-300">
        <div className="relative flex flex-1 flex-col justify-between gap-3">
          <div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <h4 className="font-bold text-emerald-600">
                  {settings.experience.showAnimations ? (
                    <TextAnimate animation="blurInUp" by="character" once>
                      {title}
                    </TextAnimate>
                  ) : (
                    title
                  )}
                </h4>
                <p className="text-sm text-gray-500">
                  {company}
                </p>
              </div>
              {settings.experience.showCompanyLogos && logoPath && (
                <img
                  src={logoPath}
                  alt={`${company} logo`}
                  className="h-8 w-8 rounded object-contain"
                />
              )}
            </div>
            <p className="mt-1 max-w-screen-sm text-sm text-gray-500">
              {description.split('\n').map((line, index) => {
                if (line.trim() === '') return <br key={index} />;
                if (line.startsWith('•')) {
                  return (
                    <div key={index} className="flex items-start gap-2 mb-2">
                      <span className="text-emerald-500 mt-0.5">•</span>
                      <span>{line.substring(1).trim()}</span>
                    </div>
                  );
                }
                return <div key={index} className="mb-2">{line}</div>;
              })}
            </p>

            {/* Technologies used */}
            {technologies && technologies.length > 0 && (
              <div className="mt-3">
                <p className="text-xs text-gray-500 mb-1">Technologies:</p>
                <div className="flex flex-wrap gap-1">
                  {technologies.map((tech, index) => (
                    <span
                      key={index}
                      className="px-2 py-1 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300 text-xs rounded-2xl"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Key achievements */}
            {achievements && achievements.length > 0 && (
              <div className="mt-3">
                <p className="text-xs text-gray-500 mb-1">Key Achievements:</p>
                <ul className="text-xs text-gray-600 dark:text-gray-400">
                  {achievements.map((achievement, index) => (
                    <li key={index} className="flex items-center gap-1">
                      <span className="text-emerald-500">•</span>
                      <span>{achievement}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  </div>
);

// Define the type for the array of timeline data
interface TimelineData {
  title: string;
  company: string;
  description: string;
  from: string;
  to: string;
  logoPath?: string;
  technologies?: string[];
  achievements?: string[];
}

// Static data for the timeline
const timelineData: TimelineData[] = [
  {
    title: "Research Assistant",
    company: "Center for Safe and Secure AI Robotics (CESSAIR)",
    description: `High Performance Computing & Distributed Systems Division
SUNY Polytechnic Institute | Feb 2025 – May 2025

• Developed "BORGChat," a distributed multi-agent AI suite running on the CESSAIR Brain Operating Research Grid (BORG), leveraging 30+ NVIDIA Orin Nano devices to simulate and orchestrate real-time conversations between large language models.
• Designed and deployed a custom GTK4 desktop interface enabling dynamic LLM personality customization, session management, and visualization of agent-to-agent interactions.
• Optimized prompt engineering and conversational memory systems to improve response accuracy, reduce latency, and enhance the overall research quality of multi-agent experiments.
• Contributed to open-source HPC research software development, using C++ and CMake for build management, and collaborating with a small research team to design reproducible, cross-platform deployment instructions.`,
    from: "Feb 2025",
    to: "May 2025",
            logoPath: "/assets/logos/suny-poly-logo.jpg",
    technologies: ["C++", "CMake", "GTK4", "Ollama", "NVIDIA Orin Nano"],
  },
  {
    title: "Work Study Assistant",
    company: "The Workplace",
    description: `Watertown, NY 13601 | August 2021 - December 2021

• Performed general duties including facility support and janitorial tasks.
• Assisted with basic device troubleshooting and user setup when assigned.
• Gained initial exposure to technical support environments and team coordination.`,
    from: "Aug 2021",
    to: "Dec 2021",
            logoPath: "/assets/logos/workplace.jpeg",
  },
];

// Main Timeline component
const ExperienceSection: React.FC = () => (
  <div className="pt-8" id="experience">
    <h1 className="text-3xl font-bold mb-2">EXPERIENCE</h1>
    <p className="text-gray-600 dark:text-gray-400 mb-6">
      What I have done so far
    </p>
    <section className="p-3 md:p-6 bg-gradient-to-b max-w-4xl mx-auto transition-colors duration-300">
      <div className="space-y-6 border-l-2 border-dotted border-gray-300 dark:border-gray-600 pl-6 py-3 rounded-2xl">
        {timelineData.map((item, index) => (
          <TimelineItem key={index} {...item} />
        ))}
      </div>
    </section>
  </div>
);

export default ExperienceSection;
