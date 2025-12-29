import React, { useState, useEffect } from "react";
import { FlipWords } from "@/components/ui/aceternity/flip-words";
import { Badge } from "@/components/ui/common/badge";
import {
  FiChevronDown,
  FiBriefcase,
  FiTool,
  FiCode,
  FiAward,
} from "react-icons/fi";

import FloatingImage from "@/components/ui/common/floating-image";
import ResumeButton from "@/components/ui/common/download-resume-btn";
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

  const scrollToSection = (id: string) => {
    if (typeof document === "undefined") return;

    const sectionId = id.replace(/^#/, "");
    const element = document.getElementById(sectionId);
    if (!element) return;

    // Use a slightly smaller offset on mobile where the navbar is shorter
    const isMobile = window.innerWidth < 768;
    const navOffset = isMobile ? 25 : 60;

    const rect = element.getBoundingClientRect();
    const targetTop = window.scrollY + rect.top - navOffset;

    window.scrollTo({
      top: targetTop,
      behavior: "smooth",
    });
  };

  return (
    <main className="min-h-screen flex flex-col lg:flex-row justify-center items-center px-6 md:px-16 lg:px-24 xl:px-32 2xl:px-40 pt-20 md:pt-24 lg:pt-28 xl:pt-32 pb-16 md:pb-20 lg:pb-8 xl:pb-10 relative hero-container">
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

        <FlipWords
          words={greetings}
          duration={3000}
          className="text-[var(--text)]"
        />

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
              padding-top: 5rem !important;
              padding-left: 1rem !important;
              padding-right: 1rem !important;
              width: 100% !important;
              margin-left: 0 !important;
              max-width: 100% !important;
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
            .welcome-text {
              font-size: 0.875rem !important;
              width: 100% !important;
            }
            .hero-container {
              padding-top: 3.25rem !important;
              padding-left: 1.25rem !important;
              padding-right: 1.25rem !important;
            }
            .hero-text-container {
              max-width: calc(100vw - 2.5rem) !important;
              width: 100% !important;
            }
          }
          @media (max-width: 435px) {
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
          @media (max-width: 385px) {
            .resume-section {
              font-size: 0.85rem !important;
            }
            .resume-section * {
              font-size: 0.85rem !important;
            }
          }
          @media (max-width: 350px) {
            .resume-section {
              font-size: 0.70rem !important;
            }
            .resume-section * {
              font-size: 0.70rem !important;
            }
          }
          @media (max-width: 375px) {
            .hero-floating-image img {
              width: 18rem !important;
              height: 22rem !important;
            }
            .hero-floating-image div[aria-hidden="true"] {
              width: 18rem !important;
              height: 22rem !important;
            }
          }
          @media (max-width: 350px) {
            .hero-floating-image img {
              width: 15.5rem !important;
              height: 20rem !important;
            }
            .hero-floating-image div[aria-hidden="true"] {
              width: 15.5rem !important;
              height: 20rem !important;
            }
          }
        `}</style>

        {/* Resume + Social Links */}
        <div className="flex flex-row gap-4 w-full items-center justify-start resume-section">
          {/* Resume button */}
          <div className="w-auto">
            <ResumeButton />
          </div>

          {/* Get in touch text "button" (scroll only, not a real link) */}
          <div className="flex w-auto justify-start">
            <button
              type="button"
              onClick={() => scrollToSection("contact")}
              aria-label="Jump to contact section"
              className="text-sm font-medium text-neutral-800 dark:text-[var(--text)] flex items-center gap-1 hover:text-emerald-600 dark:hover:text-emerald-400 bg-transparent border-0 p-0 cursor-pointer"
            >
              <span>Get in touch</span>
              <span aria-hidden="true">↓</span>
            </button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-4 text-center stats-section">
          {stats.map((stat, index) => (
            <button
              key={index}
              type="button"
              onClick={() => scrollToSection(stat.href)}
              aria-label={`${stat.label}: ${stat.value}${stat.suffix}`}
              className={`${stat.bgColor} p-3 sm:p-4 lg:p-4 rounded-2xl hover:scale-105 transition-transform duration-300 group flex flex-col items-center justify-center text-center cursor-pointer border-0 w-full`}
            >
              <div className={`${stat.color} mb-2 flex justify-center`}>
                {stat.icon}
              </div>
              <div className="text-lg font-bold text-[var(--text)]">
                {isStatsVisible ? stat.value.toLocaleString() : 0}
                {stat.suffix}
              </div>
              <div className={`text-xs text-neutral-600 dark:text-neutral-400 break-words ${stat.label === "Programming Languages" ? "text-[11px]" : ""}`}>{stat.label}</div>
            </button>
          ))}
        </div>
      </div>

      {/* Right Image Section */}
      <div className="lg:w-1/2 flex justify-center relative min-h-[400px] mt-8 xl:mt-0 hero-floating-image">
        <FloatingImage />
      </div>

      {/* Scroll Indicator */}
      {settings.hero?.showScrollIndicator && (
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
          <a
            href="#about"
            aria-label="Scroll to About section"
            title="Scroll to About section"
            className="flex flex-col items-center cursor-pointer animate-bounce hover:text-emerald-600"
          >
            <span className="text-xs text-neutral-600 dark:text-neutral-400 mb-2">
              Scroll to explore
            </span>
            <FiChevronDown className="text-emerald-600" size={20} />
          </a>
        </div>
      )}
    </main>
  );
}
