import React, { useState, useEffect } from "react";
import { FlipWords } from "@/components/ui/aceternity/flip-words";
import { Badge } from "@/components/ui/common/badge";
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

import FloatingImage from "@/components/ui/common/FloatingImage";
import ResumeButton from "@/components/ui/common/DownloadResumeBtn";
import { settings } from "@/config/settings";
import { TextGenerateEffect } from "@/components/ui/aceternity/text-generate-effect";

export default function Hero(): JSX.Element {
  const [animatedStats, setAnimatedStats] = useState({
    languages: 0,
    projects: 0,
    skills: 0,
    education: 0,
  });
  const [isStatsVisible, setIsStatsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsStatsVisible(true);

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
          if (progress < 1) requestAnimationFrame(animate);
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
      href: "#about",
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
      label: "Coding Languages",
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
    <div className="min-h-screen flex flex-col lg:flex-row justify-center items-center px-6 md:px-16 lg:px-24 xl:px-32 2xl:px-40 pt-16 lg:pt-0 xl:pt-20 relative overflow-hidden bg-white dark:bg-[#0a0a0a] xl:justify-start hero-container">
      {/* Left Text Section */}
      <div className="flex flex-col text-2xl font-normal text-neutral-600 dark:text-neutral-400 lg:w-1/2 lg:pl-3 max-w-full hero-text-container">
        {/* Available Badge */}
        {settings.showAvailableForOpportunities && (
          <div className="mb-4">
            <Badge className="bg-emerald-100 text-emerald-800 dark:bg-emerald-900 dark:text-emerald-100 py-1 hover:bg-emerald-200 dark:hover:bg-emerald-800">
              🟢 Available for opportunities
            </Badge>
          </div>
        )}

        <FlipWords words={greetings} duration={3000} className="greeting-text" />

        {/* Main text */}
        <div className="flex flex-wrap items-center mt-2 text-sm sm:text-base intro-text">
          <span>I am Elijah, I am a&nbsp;</span>
          <FlipWords
            words={[
              "<Developer/>",
              "CS Graduate",
              "<Coder/>",
              "Programmer",
              "Problem Solver",
              "PC Builder",
              "Tech Nerd",
            ]}
            duration={10000}
            className="dark:text-emerald-500 text-emerald-600"
          />
        </div>

        {/* Animated "Welcome" text */}
        <div className="mt-2">
          <TextGenerateEffect
            words="Welcome to my over-engineered portfolio site."
            className="text-sm sm:text-base max-[435px]:text-xs block welcome-text"
            justify="start"
          />
        </div>
        
        <style>{`
          @media (max-width: 1100px) and (min-width: 1024px) {
            .welcome-text {
              font-size: calc(clamp(0.6rem, 3vw, 1rem) - 2px) !important;
            }
            .intro-text {
              font-size: calc(1rem - 2px) !important;
            }
            .intro-text span {
              font-size: calc(1rem - 2px) !important;
            }
            .intro-text * {
              font-size: calc(1rem - 2px) !important;
            }
          }
          @media (max-width: 640px) {
            .resume-section {
              margin-top: 1rem !important;
              margin-bottom: 0.5rem !important;
            }
            .stats-section {
              margin-top: 0.5rem !important;
              gap: 0.75rem !important;
            }
            .hero-container {
              padding-left: 1rem !important;
              padding-right: 1rem !important;
              width: 100vw !important;
              margin-left: calc(-50vw + 50%) !important;
            }
            .hero-text-container {
              max-width: calc(100vw - 2rem) !important;
            }
          }
          @media (min-width: 641px) {
            .resume-section {
              margin-top: 1.5rem !important;
            }
            .stats-section {
              margin-top: 2rem !important;
            }
          }
          @media (max-width: 640px) {
            .hero-container {
              padding-top: 2.5rem !important;
            }
          }
          @media (max-width: 475px) {
            .intro-text {
              font-size: 0.875rem !important;
            }
            .intro-text span {
              font-size: 0.875rem !important;
            }
            .intro-text * {
              font-size: 0.875rem !important;
            }
            .greeting-text {
              font-size: 1.375rem !important;
            }
            .greeting-text * {
              font-size: 1.375rem !important;
            }
            .welcome-text {
              font-size: 0.875rem !important;
              width: 100% !important;
            }
            .hero-container {
              padding-left: 1.25rem !important;
              padding-right: 1.25rem !important;
            }
            .hero-text-container {
              max-width: calc(100vw - 2.5rem) !important;
              width: 100% !important;
            }
          }
          @media (max-width: 435px) {
            .greeting-text {
              font-size: 1.2rem !important;
            }
            .greeting-text * {
              font-size: 1.2rem !important;
            }
            .intro-text {
              font-size: 0.8rem !important;
            }
            .intro-text span {
              font-size: 0.8rem !important;
            }
            .intro-text * {
              font-size: 0.8rem !important;
            }
            .welcome-text {
              font-size: 0.8rem !important;
            }
          }
          @media (max-width: 395px) {
            .greeting-text {
              font-size: 1.5rem !important;
            }
            .greeting-text * {
              font-size: 1.5rem !important;
            }
            .intro-text {
              font-size: 1rem !important;
            }
            .intro-text span {
              font-size: 1rem !important;
            }
            .intro-text * {
              font-size: 1rem !important;
            }
            .welcome-text {
              font-size: 1rem !important;
            }
          }
        `}</style>

        {/* Resume + Social Links */}
        <div className="flex flex-row gap-4 w-full items-center justify-start max-[400px]:scale-[0.87] max-[400px]:origin-left max-[350px]:scale-75 resume-section">
          {/* Resume button */}
          <div className="w-auto">
            <ResumeButton />
          </div>

          {/* Socials */}
          <div className="flex w-auto justify-start gap-2">
            {[
              { href: "mailto:farrellelijah@outlook.com", icon: <FiMail size={16} /> },
              { href: "https://github.com/elijah-farrell", icon: <SiGithub size={16} /> },
              { href: "https://www.linkedin.com/in/elijah-farrell-915047349/", icon: <SiLinkedin size={16} /> },
              { href: "https://discord.gg/h9QSQZzn", icon: <SiDiscord size={16} /> },
              { href: "https://cal.com/elijahfarrell", icon: <FiPhone size={16} /> },
            ].map((link, i) => (
              <a
                key={i}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center w-10 h-10 sm:w-9 sm:h-9 bg-white dark:bg-black border border-gray-200 dark:border-neutral-700 rounded-full text-neutral-700 dark:text-neutral-300 hover:bg-gray-100 dark:hover:bg-neutral-800 hover:border-emerald-200 dark:hover:border-emerald-700 transition-colors"
              >
                {link.icon}
              </a>
            ))}
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-4 text-center stats-section">
          {stats.map((stat, index) => (
            <a
              key={index}
              href={stat.href}
              className={`${stat.bgColor} p-3 sm:p-4 lg:p-4 rounded-2xl hover:scale-105 transition-transform duration-300 group block flex flex-col items-center justify-center text-center`}
            >
              <div className={`${stat.color} mb-2 flex justify-center`}>
                {stat.icon}
              </div>
              <div className="text-lg font-bold text-gray-900 dark:text-gray-100">
                {isStatsVisible ? stat.value.toLocaleString() : 0}
                {stat.suffix}
              </div>
              <div className={`text-xs text-muted-foreground break-words ${stat.label === "Programming Languages" ? "text-[11px]" : ""}`}>{stat.label}</div>
            </a>
          ))}
        </div>
      </div>

      {/* Right Image Section */}
      <div className="lg:w-1/2 flex justify-center relative min-h-[400px] mt-8 xl:mt-0">
        <FloatingImage />
      </div>

      {/* Scroll Indicator */}
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
  );
}
