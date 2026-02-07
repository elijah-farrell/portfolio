// Timeline.tsx
import React, { useState } from "react";
import { TextAnimate } from "../../components/ui/magic/text-animate";
import { GlowingEffect } from "../../components/ui/aceternity/glowing-effect";
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

  const totalMonths = (toYear - fromYear) * 12 + (toMonth - fromMonth) + 1; // +1 to include both months
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
}) => {
  const [logoLoaded, setLogoLoaded] = useState(false);
  return (
  <div className="relative w-full group">
    <div className="absolute -left-[1.95rem] top-10 transition-none">
      <span className="relative flex h-3 w-3">
        <span className="absolute inline-flex h-3 w-3 animate-ping rounded-2xl bg-gray-400 opacity-75 group-hover:bg-emerald-400"></span>
        <span className="relative inline-flex h-3 w-3 rounded-2xl bg-emerald-500 group-hover:bg-emerald-400"></span>
      </span>
    </div>
    <div className="relative h-full rounded-2xl border p-2 md:rounded-2xl md:p-3 group-hover:border-emerald-200 dark:border-neutral-800 dark:group-hover:border-emerald-700">
      {settings.experience.showGlowingEffect && (
        <GlowingEffect
          spread={20}
          glow={true}
          disabled={false}
          proximity={50}
          inactiveZone={0.01}
        />
      )}
      <div className="border-0.75 relative flex h-full flex-col justify-between gap-4 md:gap-6 overflow-hidden rounded-xl p-4 md:p-6 transition-shadow duration-300">
        <div className="relative flex flex-1 flex-col justify-between gap-3">
          <div>
            {/* Responsive header section */}
            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 mb-3">
              {/* Title and company info - responsive layout */}
              <div className="flex-1 min-w-0">
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2 mb-2">
                  <div className="flex flex-col gap-2">
                    <div className="flex items-center gap-2 sm:gap-3">
                      <h4 className="font-bold text-emerald-600 text-base sm:text-lg break-words">
                        {settings.experience.showAnimations ? (
                          <TextAnimate animation="blurInUp" by="word-character" once>
                            {title}
                          </TextAnimate>
                        ) : (
                          title
                        )}
                      </h4>
                      
                      {/* Logo - positioned to the right of the title */}
                      {settings.experience.showCompanyLogos && logoPath && (
                        <div className="flex-shrink-0 h-8 w-8 sm:h-10 sm:w-10">
                          <img
                            src={logoPath}
                            srcSet={logoPath.replace(".webp", "-64w.webp") + " 64w, " + logoPath.replace(".webp", "-128w.webp") + " 128w"}
                            sizes="32px"
                            alt={`${company} logo`}
                            width={40}
                            height={40}
                            loading="lazy"
                            decoding="async"
                            onLoad={() => setLogoLoaded(true)}
                            style={{ opacity: logoLoaded ? 1 : 0 }}
                            className="h-8 w-8 sm:h-10 sm:w-10 rounded object-contain no-image-save transition-opacity duration-300"
                          />
                        </div>
                      )}
                    </div>
                    
                    <p className="text-sm text-gray-500 break-words">
                      {company}
                    </p>
                  </div>
                  
                  {/* Date in top right */}
                  <span className="text-sm text-gray-500 dark:text-gray-400 font-medium flex-shrink-0 self-start">
                    {from} – {to}
                  </span>
                </div>
                
                {/* Duration - responsive layout */}
                <div className="flex flex-col xs:flex-row xs:items-center gap-1 xs:gap-3 text-xs text-gray-600 dark:text-gray-400">
                  <span className="text-emerald-600 font-medium">
                    {calculateDuration(from, to)}
                  </span>
                </div>
              </div>
            </div>

            {/* Description - responsive text sizing */}
            <div className="mt-3 max-w-none text-sm text-gray-500 leading-relaxed">
              {description.split('\n').map((line, index) => {
                if (line.trim() === '') return <br key={index} />;
                if (line.startsWith('•')) {
                  return (
                    <div key={index} className="flex items-start gap-2 mb-2">
                      <span className="text-emerald-500 mt-0.5 flex-shrink-0">•</span>
                      <span className="break-words">{line.substring(1).trim()}</span>
                    </div>
                  );
                }
                return <div key={index} className="mb-2 break-words">{line}</div>;
              })}
            </div>

            {/* Technologies used - responsive layout */}
            {technologies && technologies.length > 0 && (
              <div className="mt-4">
                <p className="text-xs text-gray-500 mb-2">Technologies:</p>
                <div className="flex flex-wrap gap-1.5">
                  {technologies.map((tech, index) => (
                    <span
                      key={index}
                      className="px-2 py-1 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300 text-xs rounded-2xl break-words"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Key achievements - responsive layout */}
            {achievements && achievements.length > 0 && (
              <div className="mt-4">
                <p className="text-xs text-gray-500 mb-2">Key Achievements:</p>
                <ul className="text-xs text-gray-600 dark:text-gray-400 space-y-1">
                  {achievements.map((achievement, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <span className="text-emerald-500 flex-shrink-0 mt-0.5">•</span>
                      <span className="break-words">{achievement}</span>
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
};

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
    company: "SUNY Polytechnic Institute (CESSAIR)",
    description: `• Led a small research team of 5 students to develop BORGChat, an AI chat application in C++ on schedule
• Collaborated effectively with team members to solve problems and support project goals
• Coordinated tasks and adapted quickly to new challenges to ensure smooth progress`,
    from: "Feb 2025",
    to: "May 2025",
            logoPath: "/assets/logos/suny-poly-logo.webp",
  },
  {
    title: "Work Study Assistant",
    company: "The Workplace",
    description: `• Performed general duties including facility support and janitorial tasks.
• Assisted with basic device troubleshooting and user setup when assigned.`,
    from: "Aug 2021",
    to: "Dec 2021",
            logoPath: "/assets/logos/workplace.webp",
  },
];

// Main Timeline component
const ExperienceSection: React.FC = () => (
  <div className="pt-8" id="experience">
    <h1 className="text-2xl sm:text-3xl font-bold mb-2 px-4 sm:px-0">EXPERIENCE</h1>
    <p className="text-neutral-600 dark:text-neutral-400 mb-6 px-4 sm:px-0">
      An overview of my professional journey so far.
    </p>
    <section className="px-3 sm:p-3 md:p-6 bg-gradient-to-b max-w-4xl">
      <div className="space-y-4 sm:space-y-6 border-l-2 border-dotted border-gray-300 dark:border-gray-600 pl-4 sm:pl-6 py-3 rounded-2xl">
        {timelineData.map((item, index) => (
          <TimelineItem key={index} {...item} />
        ))}
      </div>
    </section>
  </div>
);

export default ExperienceSection;
