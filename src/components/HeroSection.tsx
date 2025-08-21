import { FlipWords } from "@/components/ui/flip-words";
import { TextGenerateEffect } from "@/components/ui/text-generate-effect";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  FiDownload,
  FiMail,
  FiGithub,
  FiLinkedin,
  FiChevronDown,
  FiBriefcase,
  FiUsers,
  FiTool,
  FiCode,
  FiAward,
} from "react-icons/fi";
import { useState, useEffect } from "react";
import FloatingImage from "@/components/MyImage";
import mainImage from "@/assets/about/EF-headshot.jpeg";
import altMainImage from "@/assets/about/EF-headshot.jpeg";
import { settings } from "@/config/settings";
import ResumeButton from "./DownloadResumeBtn";

export default function HeroSection(): JSX.Element {
  const [animatedStats, setAnimatedStats] = useState({
    experience: 0,
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

      animateValue(0, 3, 1500, (val) =>
        setAnimatedStats((prev) => ({ ...prev, experience: val }))
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
      value: animatedStats.experience,
      suffix: "+",
      label: "Years Experience",
      icon: <FiBriefcase size={20} />,
      color: "text-blue-600",
      bgColor: "bg-blue-50 dark:bg-blue-900/20",
      href: "#experience",
    },
    {
      value: animatedStats.projects,
      suffix: "",
      label: "Projects Built",
      icon: <FiCode size={20} />,
      color: "text-emerald-600",
      bgColor: "bg-emerald-50 dark:bg-emerald-900/20",
      href: "#projects",
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
    {
      value: animatedStats.education,
      suffix: "",
      label: "Degrees Earned",
      icon: <FiAward size={20} />,
      color: "text-purple-600",
      bgColor: "bg-purple-50 dark:bg-purple-900/20",
      href: "#education",
    },
  ];

  const greetings: string[] = [
    "Hi,",
    "Hello,",
    "Hey there,",
    "Greetings,",
    "Welcome,",
    "Good day,",
    "Hi there,",
    "Hello there,",
    "Greetings,",
    "Welcome,",
  ];

  return (
    <>
      <div className="min-h-screen h-auto flex flex-col lg:flex-row justify-center items-center px-5 md:px-40 space-x-2 mt-10 relative">
        <div className="text-2xl mx-auto font-normal text-neutral-600 dark:text-neutral-400 lg:w-1/2 lg:pl-3">
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
          <span className="text-base">I am Elijah Farrell. I am a </span>
          <FlipWords
            words={["<Developer/>", "Learner", "<Coder/>", "Programmer", "CS Graduate"]}
            duration={15000}
            className="dark:text-emerald-500 text-emerald-600 text-base"
          />
          <TextGenerateEffect
            words={"Computer Science graduate passionate about technology and problem-solving"}
            className="text-base"
          />

          {/* Call-to-Action Buttons */}
          <div className="flex flex-wrap gap-2 mt-8">
            <ResumeButton />
            <Button
              variant="link"
              className="flex items-center gap-2 rounded-2xl"
              onClick={() => {
                const element = document.getElementById("contact");
                if (element) {
                  element.scrollIntoView({ behavior: "smooth", block: "start" });
                }
              }}
            >
              <FiMail size={16} />
              Get In Touch
            </Button>
          </div>

          {/* Interactive Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8 text-center">
            {stats.map((stat, index) => (
              <a
                key={index}
                href={stat.href}
                className={`${stat.bgColor} p-4 rounded-2xl cursor-pointer transform transition-all duration-300 hover:scale-105 hover:shadow-md group border border-transparent hover:border-opacity-20 block no-underline`}
              >
                <div
                  className={`${stat.color} mb-2 group-hover:scale-110 transition-transform duration-300 flex justify-center`}
                >
                  {stat.icon}
                </div>
                <div className="text-lg font-bold text-gray-900 dark:text-gray-100">
                  {isStatsVisible ? stat.value.toLocaleString() : 0}
                  {stat.suffix}
                </div>
                <div className="text-xs text-muted-foreground group-hover:text-opacity-80 transition-all duration-300">
                  {stat.label}
                </div>
              </a>
            ))}
          </div>
          <div></div>
        </div>
        <div className="lg:w-1/2 p-10 flex justify-center">
          <FloatingImage mainImage={mainImage} altImage={altMainImage} />
        </div>

        {/* Scroll Indicator - Positioned absolutely at bottom of viewport */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
          <a
            href="#about"
            className="flex flex-col items-center cursor-pointer animate-bounce hover:text-emerald-600 transition-colors duration-300 no-underline"
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
