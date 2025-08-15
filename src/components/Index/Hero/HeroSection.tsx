import { FadeInOnScroll, HoverCard } from "@/components/ScrollReveal";
import FaultyTerminal from "./FaultyTerminal";
import { useNavigate } from "react-router-dom";

interface HeroSectionProps {
  darkMode: boolean;
  currentColor: string;
  windowWidth: number;
}

export default function HeroSection({ darkMode, currentColor, windowWidth }: HeroSectionProps) {
  const navigate = useNavigate();
  
  const nameStyle = {
    color: currentColor,
    whiteSpace: windowWidth < 301 ? 'normal' : 'nowrap' as const
  };

  const handleExploreWork = () => {
    // Scroll to work experience section since it's now on the home page
    const workSection = document.getElementById('work');
    if (workSection) {
      workSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleGetInTouch = () => {
    navigate('/contact');
    // Scroll to top after navigation
    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 100);
  };

  return (
    <section id="hero" className="min-h-screen flex items-center justify-center px-4 sm:px-6 relative overflow-hidden bg-white dark:bg-black border-b border-gray-200 dark:border-neutral-800">
      <div className="absolute inset-0 z-0">
        <FaultyTerminal
          scale={windowWidth < 1024 ? 2.0 : 2.2}
          gridMul={[2, 1]}
          digitSize={1.2}
          timeScale={0.5}
          pause={false}
          scanlineIntensity={0.5}
          glitchAmount={1}
          flickerAmount={1}
          noiseAmp={1}
          chromaticAberration={0}
          dither={0}
          curvature={0.05}
          tint={currentColor}
          mouseReact={true}
          mouseStrength={windowWidth < 1024 ? 0.2 : 0.3}
          pageLoadAnimation={true}
          brightness={0.6}
          isDarkMode={darkMode}
        />
      </div>
      
      <div 
        className="relative z-10 max-w-5xl mx-auto text-center"
        onMouseMove={(e) => {
          // Pass mouse events to the FaultyTerminal
          const faultTerminal = document.querySelector('[data-faulty-terminal]');
          if (faultTerminal) {
            const rect = faultTerminal.getBoundingClientRect();
            const x = (e.clientX - rect.left) / rect.width;
            const y = 1 - (e.clientY - rect.top) / rect.height;
            // Dispatch a custom event to document that FaultyTerminal can listen to
            document.dispatchEvent(new CustomEvent('globalmousemove', {
              detail: { x, y }
            }));
          }
        }}
      >
        
        <FadeInOnScroll direction="up" duration={1000} delay={300} initialOpacity={0} elementId="hero-text">
          <div className="mb-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/80 dark:bg-neutral-600/80 backdrop-blur-sm border border-gray-200 dark:border-neutral-500 mb-6">
              <div 
                className="w-2 h-2 rounded-full"
                style={{ backgroundColor: currentColor }}
              />
              <span className="text-sm font-medium text-gray-600 dark:text-gray-300">
                Available for new opportunities
              </span>
            </div>
            
            <h1 className="text-5xl sm:text-6xl font-bold text-gray-900 dark:text-white mb-6 leading-tight">
              <span>Hi, I'm <span style={nameStyle}>Elijah Farrell</span></span>
            </h1>
            
            <p className="text-xl sm:text-lg text-gray-900 dark:text-white max-w-3xl mx-auto leading-relaxed mb-8">
              Computer Science graduate passionate about building innovative
              solutions and learning emerging technologies. Ready to make
              an impact in the real world.
            </p>
          </div>
        </FadeInOnScroll>
        
        <FadeInOnScroll direction="up" duration={1000} delay={600} initialOpacity={0} elementId="hero-buttons">
          <div className="flex gap-4 sm:flex-col sm:gap-3 justify-center mb-12">
            <HoverCard scale={1.05} shadowIntensity={20} className="w-full">
              <button 
                onClick={handleExploreWork}
                className="w-full px-2 3xs:px-3 2xs:px-4 xs:px-6 sm:px-8 md:px-12 lg:px-16 py-3 text-white rounded-xl font-semibold hover:shadow-lg transform hover:scale-105 transition-all duration-200 text-xs 3xs:text-sm rounded-xl border-2"
                style={{ 
                  backgroundColor: currentColor,
                  borderColor: currentColor
                }}
              >
                <span className="3xs:hidden">Explore Work</span>
                <span className="hidden 3xs:inline">Explore My Work</span>
              </button>
            </HoverCard>
            <HoverCard scale={1.05} shadowIntensity={20} className="w-full">
              <button 
                onClick={handleGetInTouch}
                className="w-full px-2 3xs:px-3 2xs:px-4 xs:px-6 sm:px-8 md:px-12 lg:px-16 py-3 bg-transparent border-2 text-gray-700 dark:text-gray-300 rounded-xl font-semibold hover:bg-gray-50 dark:hover:bg-neutral-600 hover:shadow-lg transform hover:scale-105 transition-all duration-200 text-xs 3xs:text-sm"
                style={{ borderColor: currentColor }}
              >
                Hire Me
              </button>
            </HoverCard>
          </div>
        </FadeInOnScroll>
        
        <FadeInOnScroll direction="up" duration={1000} delay={900} initialOpacity={0} elementId="hero-social">
          <div className="flex justify-center gap-6 sm:gap-4">
            <HoverCard scale={1.1} shadowIntensity={15}>
              <a href="https://github.com/elijah-farrell" target="_blank" rel="noopener noreferrer" className="w-12 h-12 flex items-center justify-center rounded-xl bg-white/80 dark:bg-neutral-600/80 backdrop-blur-sm border border-gray-200 dark:border-neutral-500 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-all duration-200 hover:shadow-lg">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"></path>
                </svg>
              </a>
            </HoverCard>
            <HoverCard scale={1.1} shadowIntensity={15}>
              <a href="mailto:elijah5003@gmail.com" className="w-12 h-12 flex items-center justify-center rounded-xl bg-white/80 dark:bg-neutral-600/80 backdrop-blur-sm border border-gray-200 dark:border-neutral-500 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-all duration-200 hover:shadow-lg">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
                </svg>
              </a>
            </HoverCard>
            <HoverCard scale={1.1} shadowIntensity={15}>
              <a href="/resume.pdf" target="_blank" rel="noopener noreferrer" className="w-12 h-12 flex items-center justify-center rounded-xl bg-white/80 dark:bg-neutral-600/80 backdrop-blur-sm border border-gray-200 dark:border-neutral-500 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-all duration-200 hover:shadow-lg">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
                </svg>
              </a>
            </HoverCard>
          </div>
        </FadeInOnScroll>
      </div>
    </section>
  );
} 