import { useState, useEffect } from "react";
import { useSettings } from "@/contexts/SettingsContext";
import Navigation from "@/components/Navigation/Navigation";
import HeroSection from "@/components/Index/Hero/HeroSection";
import AboutSection from "@/components/Index/About/AboutSection";
import EducationSection from "@/components/Index/EducationSection";
import SkillsSection from "@/components/Index/Skills/SkillsSection";
import WorkExperience from "@/components/Index/WorkExperience";
import Projects from "@/components/Index/Projects";
import Footer from "@/components/Footer/Footer";

export default function Index() {
  const { darkMode, currentColor } = useSettings();
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    // Update favicon based on theme
    const favicon = document.getElementById('favicon') as HTMLLinkElement;
    if (favicon) {
      favicon.href = darkMode ? '/favicon_dark.png' : '/favicon_light.png';
    }
  }, [darkMode]);

  return (
    <div className="min-h-screen w-full font-['Inter'] transition-colors duration-300 bg-white dark:bg-black">
      <Navigation />

      <main className="relative z-10">
        <HeroSection 
          darkMode={darkMode}
          currentColor={currentColor}
          windowWidth={windowWidth}
        />
        
        <div id="about">
          <AboutSection currentColor={currentColor} />
        </div>
        
        <div id="education">
          <EducationSection currentColor={currentColor} />
        </div>
        
        <div id="work">
          <WorkExperience />
        </div>
        
        <div id="projects">
          <Projects />
        </div>
        
        <div id="skills">
          <SkillsSection currentColor={currentColor} />
        </div>
      </main>

      <Footer currentColor={currentColor} />
    </div>
  );
}
