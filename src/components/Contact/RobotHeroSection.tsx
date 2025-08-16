import { motion } from 'framer-motion';
import { FadeInOnScroll } from '@/components/ScrollReveal';
import { useSettings } from '@/contexts/SettingsContext';
import { useState, useEffect } from 'react';

interface RobotHeroSectionProps {
  currentColor: string;
}

export default function RobotHeroSection({ currentColor }: RobotHeroSectionProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  
  // Single Spline model for both themes
  const modelUrl = "https://prod.spline.design/p2cGBgByqQOQaKli/scene.splinecode";
  
  // Small delay to ensure container is properly sized
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 100);
    
    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="relative w-full h-screen mx-auto bg-[#FFFFFF] dark:bg-[#000000] overflow-hidden">
      {/* 3D Robot Model as Background */}
      <div className="absolute inset-0 w-full h-screen bg-[#FFFFFF] dark:bg-[#000000]">
        <div className="w-full h-screen">
          {isLoaded && (
            <spline-viewer 
              url={modelUrl}
              className="w-full h-screen"
              events-target="global"
            />
          )}
        </div>
      </div>
      
      {/* Content overlay */}
      <div className="relative z-10 w-full h-full">
        {/* Top content - above the robot */}
        <div className="absolute top-24 sm:top-28 md:top-32 lg:top-36 xl:top-40 left-4 sm:left-8 lg:left-16 xl:left-24 max-w-2xl sm:max-w-3xl lg:max-w-4xl">
          <FadeInOnScroll direction="down" duration={800} delay={200} elementId="robot-hero-top">
            <div className="space-y-3 sm:space-y-4 lg:space-y-6">
              <div className="space-y-2 sm:space-y-3">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  className="flex items-center gap-2 sm:gap-3 lg:gap-4"
                >
                  <div 
                    className="w-2 h-2 sm:w-3 sm:h-3 lg:w-4 lg:h-4 rounded-full" 
                    style={{ backgroundColor: currentColor }}
                  />
                  <div 
                    className="w-8 h-1 sm:w-12 sm:h-1 lg:w-16 lg:h-1 rounded-full" 
                    style={{ backgroundColor: currentColor }}
                  />
                </motion.div>
                
                <motion.h1
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                  className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl 2xl:text-7xl font-bold leading-tight drop-shadow-2xl text-gray-900 dark:text-white"
                  style={{
                    textShadow: 'var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), 0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)'
                  }}
                >
                  Let's{' '}
                  <span style={{ color: currentColor }}>Connect</span>
                </motion.h1>
                
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.6 }}
                  className="text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl leading-relaxed drop-shadow-lg text-gray-800 dark:text-white"
                  style={{
                    textShadow: 'var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), 0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)'
                  }}
                >
                  Ready to build something amazing?
                </motion.p>
              </div>
            </div>
          </FadeInOnScroll>
        </div>

        {/* Bottom content - below the robot */}
        <div className="absolute bottom-8 sm:bottom-12 lg:bottom-16 left-1/2 transform -translate-x-1/2 max-w-2xl sm:max-w-3xl lg:max-w-4xl text-center">
          <FadeInOnScroll direction="up" duration={800} delay={400} elementId="robot-hero-bottom">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="flex flex-col items-center space-y-3 sm:space-y-4"
            >
              <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                className="text-gray-800/80 dark:text-white/80 hover:text-gray-900 dark:hover:text-white cursor-pointer transition-colors duration-300"
                onClick={() => {
                  const contactSection = document.getElementById('contact-form');
                  if (contactSection) {
                    contactSection.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
              >
                <svg 
                  className="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 lg:w-12 lg:h-12" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth="2" 
                    d="M19 14l-7 7m0 0l-7-7m7 7V3"
                  />
                </svg>
              </motion.div>
              
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 1.2 }}
                className="text-xs sm:text-sm lg:text-base font-mono tracking-widest uppercase text-gray-600 dark:text-white/60"
                style={{
                  textShadow: '0 0 10px currentColor, 0 0 20px currentColor',
                  letterSpacing: '0.2em',
                  fontWeight: '600'
                }}
              >
                SCROLL TO CONTINUE
              </motion.p>
            </motion.div>
          </FadeInOnScroll>
        </div>
      </div>
    </section>
  );
}
