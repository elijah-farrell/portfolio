import { FlipWords } from "@/components/ui/flip-words";
import { Badge } from "@/components/ui/badge";
import {
  FiMail,
  FiChevronDown,
  FiBriefcase,
  FiTool,
  FiCode,
  FiAward,
  FiPhone,
} from "react-icons/fi";
import { SiGithub, SiLinkedin, SiDiscord } from "react-icons/si";
import { useState, useEffect } from "react";
import FloatingImage from "@/components/MyImage";
const mainImage = "/assets/pfp.jpeg";
const altMainImage = "/assets/animated.png";
import { settings } from "@/config/settings";
import ResumeButton from "./DownloadResumeBtn";

export default function HeroSection(): JSX.Element {
  const [animatedStats, setAnimatedStats] = useState({
    languages: 0,
    projects: 0,
    skills: 0,
    education: 0,
  });
  const [isStatsVisible, setIsStatsVisible] = useState(false);

  // Animate numbers when component mounts
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsStatsVisible(true);
      // Animate to target values
      const animateValue = (
        start: number,
        end: number,
        duration: number,
        setter: (value: number) => void
      ) => {
        const startTime = Date.now();
        const animate = () => {
          const now = Date.now();
          const progress = Math.min((now - startTime) / duration, 1);
          const current = Math.floor(start + (end - start) * progress);
          setter(current);
          if (progress < 1) {
            requestAnimationFrame(animate);
          }
        };
        animate();
      };

      animateValue(0, 5, 1500, (val) =>
        setAnimatedStats((prev) => ({ ...prev, languages: val }))
      );
      animateValue(0, 4, 2000, (val) =>
        setAnimatedStats((prev) => ({ ...prev, projects: val }))
      );
      animateValue(0, 25, 1200, (val) =>
        setAnimatedStats((prev) => ({ ...prev, skills: val }))
      );
      animateValue(0, 2, 1800, (val) =>
        setAnimatedStats((prev) => ({ ...prev, education: val }))
      );
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const stats = [
    {
      value: animatedStats.education,
      suffix: "",
      label: "Degrees Earned",
      icon: <FiAward size={20} />,
      color: "text-purple-600",
      bgColor: "bg-purple-50 dark:bg-purple-900/20",
      href: "#education",
    },
    {
      value: animatedStats.projects,
      suffix: "+",
      label: "Projects Built",
      icon: <FiBriefcase size={20} />,
      color: "text-emerald-600",
      bgColor: "bg-emerald-50 dark:bg-emerald-900/20",
      href: "#projects",
    },
    {
      value: animatedStats.languages,
      suffix: "+",
      label: "Programming Languages",
      icon: <FiCode size={20} />,
      color: "text-blue-600",
      bgColor: "bg-blue-50 dark:bg-blue-900/20",
      href: "#skills",
    },
    {
      value: animatedStats.skills,
      suffix: "+",
      label: "Technical Skills",
      icon: <FiTool size={20} />,
      color: "text-orange-600",
      bgColor: "bg-orange-50 dark:bg-orange-900/20",
      href: "#skills",
    },
  ];

  const greetings: string[] = [
    "Hi,",
    "Hello,",
    "Hey there,",
    "Greetings,",
    "Welcome,",
    "Hi there,",
    "Hello there,",
    "Hey,",
    "Hello friend,",
    "Greetings traveler,",
    "Welcome aboard,",
    "How are you,",
    "What's up,",
  ];

  return (
    <>
      <div className="min-h-screen h-auto flex flex-col xl:flex-row justify-center items-center px-6 md:px-16 lg:px-24 xl:px-32 2xl:px-40 space-x-2 pt-16 lg:pt-20 relative overflow-hidden bg-white dark:bg-[#0a0a0a]">
        <div className="text-2xl mx-auto font-normal text-neutral-600 dark:text-neutral-400 xl:w-1/2 xl:pl-3 max-w-full">
          {/* Status Badge */}
          {settings.showAvailableForOpportunities && (
            <div className="mb-4">
              <Badge className="bg-emerald-100 text-emerald-800 dark:bg-emerald-900 dark:text-emerald-100 py-1 hover:bg-emerald-200 dark:hover:bg-emerald-800">
                🟢 Available for opportunities
              </Badge>
            </div>
          )}

          <FlipWords words={greetings} duration={3000} />
          <br />
           <span className="text-sm sm:text-base">I am Elijah, I am a </span>
           <FlipWords
             words={[
               "<Developer/>", 
               "Learner", 
               "<Coder/>", 
               "Programmer", 
               "CS Graduate",
               "PC Builder",
               "Tech Nerd"
             ]}
             duration={10000}
             className="dark:text-emerald-500 text-emerald-600 text-sm sm:text-base"
           />
           <br />
           <span className="text-sm sm:text-base">Welcome to my over-engineered portfolio site.</span>

          {/* Call-to-Action Buttons & Social Links */}
          <div className="flex items-center gap-2 xs:gap-3 sm:gap-4 mt-8">
            {/* Main CTA Buttons - Left Side */}
            <div className="flex gap-2">
              <ResumeButton />
            </div>

            {/* Social Links - Right Side */}
            <div className="flex gap-1 xs:gap-2 sm:gap-3">
             <a
               href="mailto:farrellelijah@outlook.com"
               className="flex items-center gap-1 px-2.5 py-2.5 xs:px-3 xs:py-3 xl:px-3 xl:py-3 bg-white dark:bg-black border border-gray-200 dark:border-neutral-700 hover:bg-gray-100 dark:hover:bg-neutral-800 hover:border-emerald-200 dark:hover:border-emerald-700 text-neutral-700 dark:text-neutral-300 rounded-full text-sm font-medium"
             >
               <FiMail size={14} className="xs:w-4 xs:h-4 xl:w-4 xl:h-4" />
             </a>
            <a
              href="https://github.com/elijah-farrell"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 px-2.5 py-2.5 xs:px-3 xs:py-3 xl:px-3 xl:py-3 bg-white dark:bg-black border border-gray-200 dark:border-neutral-700 hover:bg-gray-100 dark:hover:bg-neutral-800 hover:border-emerald-200 dark:hover:border-emerald-700 text-neutral-700 dark:text-neutral-300 rounded-full text-sm font-medium"
            >
              <SiGithub size={14} className="xs:w-4 xs:h-4 xl:w-4 xl:h-4" />
            </a>
            <a
              href="https://www.linkedin.com/in/elijah-farrell-915047349/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 px-2.5 py-2.5 xs:px-3 xs:py-3 xl:px-3 xl:py-3 bg-white dark:bg-black border border-gray-200 dark:border-neutral-700 hover:bg-gray-100 dark:hover:bg-neutral-800 hover:border-emerald-200 dark:hover:border-emerald-700 text-neutral-700 dark:text-neutral-300 rounded-full text-sm font-medium"
            >
              <SiLinkedin size={14} className="xs:w-4 xs:h-4 xl:w-4 xl:h-4" />
            </a>
            <a
                               href="https://discord.gg/h9QSQZzn"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 px-2.5 py-2.5 xs:px-3 xs:py-3 xl:px-3 xl:py-3 bg-white dark:bg-black border border-gray-200 dark:border-neutral-700 hover:bg-gray-100 dark:hover:bg-neutral-800 hover:border-emerald-200 dark:hover:border-emerald-700 text-neutral-700 dark:text-neutral-300 rounded-full text-sm font-medium"
            >
              <SiDiscord size={14} className="xs:w-4 xs:h-4 xl:w-4 xl:h-4" />
            </a>
            <a
              href="https://cal.com/elijahfarrell"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 px-2.5 py-2.5 xs:px-3 xs:py-3 xl:px-3 xl:py-3 bg-white dark:bg-black border border-gray-200 dark:border-neutral-700 hover:bg-gray-100 dark:hover:bg-neutral-800 hover:border-emerald-200 dark:hover:border-emerald-700 text-neutral-700 dark:text-neutral-300 rounded-full text-sm font-medium"
            >
              <FiPhone size={14} className="xs:w-4 xs:h-4 xl:w-4 xl:h-4" />
            </a>
            </div>
          </div>

           {/* Interactive Stats */}
           <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-1 xs:gap-1 sm:gap-2 md:gap-4 mt-8 text-center max-w-md md:max-w-lg lg:max-w-2xl xl:max-w-5xl mx-auto">
            {stats.map((stat, index) => (
              <a
                key={index}
                href={stat.href}
                 className={`${stat.bgColor} p-2 xs:p-3 sm:p-3 md:p-4 rounded-2xl cursor-pointer transform transition-transform duration-300 hover:scale-105 hover:shadow-md group border border-transparent hover:border-opacity-20 block no-underline`}
              >
                <div
                  className={`${stat.color} mb-1 xs:mb-2 group-hover:scale-110 transition-transform duration-300 flex justify-center`}
                >
                  {stat.icon}
                </div>
                 <div className="text-base sm:text-lg font-bold text-gray-900 dark:text-gray-100">
                   {isStatsVisible ? stat.value.toLocaleString() : 0}
                   {stat.suffix}
                 </div>
                 <div className="text-sm text-muted-foreground group-hover:text-opacity-80">
                   {stat.label}
                 </div>
              </a>
            ))}
          </div>
          <div></div>
        </div>
        <div className="lg:w-1/2 p-10 flex justify-center bg-[#FEFEFE] dark:bg-[#0a0a0a]">
          <FloatingImage mainImage={mainImage} altImage={altMainImage} />
        </div>

        {/* Scroll Indicator - Positioned absolutely at bottom of viewport */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
          <a
            href="#about"
            className="flex flex-col items-center cursor-pointer animate-bounce hover:text-emerald-600 no-underline"
          >
            <span className="text-xs text-muted-foreground mb-2">
              Scroll to explore
            </span>
            <FiChevronDown className="text-emerald-600" size={20} />
          </a>
        </div>
      </div>
    </>
  );
}
