import React, { useState, useEffect, useRef, lazy, Suspense } from "react";
import LinkCard from "@/components/ui/common/LinkCard";
const BackgroundBeamsWithCollisionLazy = lazy(() => import("@/components/ui/aceternity/background-beams-with-collision").then(m => ({ default: m.BackgroundBeamsWithCollision })));
import { TextGenerateEffect } from "@/components/ui/aceternity/text-generate-effect";
import { SiGithub, SiLinkedin, SiDiscord } from "react-icons/si";
import { FiMapPin, FiMail, FiCalendar } from "react-icons/fi";

export default function Contact(): JSX.Element {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);
  const sentinelRef = useRef<HTMLDivElement | null>(null);
  const [shouldLoadBeams, setShouldLoadBeams] = useState(false);
  useEffect(() => {
    if (!isMobile || shouldLoadBeams) return;
    const target = sentinelRef.current;
    if (!target) return;
    const io = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setShouldLoadBeams(true);
          io.disconnect();
        }
      },
      { root: null, rootMargin: "400px 0px", threshold: 0.01 }
    );
    io.observe(target);
    return () => io.disconnect();
  }, [isMobile, shouldLoadBeams]);
  const allLinks = [
    { title: "Email", icon: <FiMail />, url: "mailto:farrellelijah@outlook.com" },
    { title: "Schedule Call", icon: <FiCalendar />, url: "https://cal.com/elijahfarrell", external: true },
    {
      title: "LinkedIn",
      url: "https://www.linkedin.com/in/elijah-farrell-915047349/",
      icon: <SiLinkedin />,
    },
    { title: "GitHub", url: "https://github.com/elijah-farrell", icon: <SiGithub /> },
    { title: "Discord", url: "https://discord.gg/h9QSQZzn", icon: <SiDiscord /> },
    {
      title: "Location",
      icon: <FiMapPin />,
      url: "https://maps.google.com/?q=Upstate+New+York",
      external: true,
    },
  ];

  // Professional rotating phrases
  const phrases = [
    "Feel free to reach out anytime.",
    "Your next project deserves the right collaborator.",
    "Building great work starts with a conversation.",
    "I look forward to connecting with you.",
    "Innovation awaits your inquiry.",
    "Still reviewing your options?",
    "Let's discuss how I can help your vision.",
  ];

  const [showPhrases, setShowPhrases] = useState(false);
  const [phraseIndex, setPhraseIndex] = useState(0);

  // Start showing phrases after 10s
  useEffect(() => {
    const timer = setTimeout(() => setShowPhrases(true), 10000);
    return () => clearTimeout(timer);
  }, []);

  // Rotate phrases every 4s once visible
  useEffect(() => {
    if (showPhrases) {
      const interval = setInterval(() => {
        setPhraseIndex((prev) => (prev + 1) % phrases.length);
      }, 4000);
      return () => clearInterval(interval);
    }
  }, [showPhrases, phrases.length]);

  return (
    <div id="contact" className="border-0 min-h-[80vh] md:min-h-[70vh] flex flex-col">
      <div ref={sentinelRef} aria-hidden="true" />
      {/* Title */}
      <h2 className="text-3xl font-bold text-left">CONTACT</h2>

      {/* Background beams + content (lazy on mobile, immediate on desktop) */}
      {isMobile ? (
        shouldLoadBeams ? (
          <Suspense fallback={<div className="w-full h-full md:h-[40vh] z-0 flex-1" />}> 
            <BackgroundBeamsWithCollisionLazy className="w-full h-full md:h-[40vh] z-0 flex-1">
              <div className="px-2 md:px-4 h-full flex flex-col justify-start">
                <div className="w-full h-full z-30 relative">
            
            {/* Subtitle */}
            <p className="text-black dark:text-white mt-16 md:mt-8 mb-0 text-center text-lg w-full">
              Ready to collaborate? Let's discuss your next project or just say hello!
            </p>

            {/* Rotating professional phrases */}
            <div className="mt-6 md:mt-4 mb-4 md:mb-2 text-center min-h-[4rem]">
              {showPhrases && (
                <TextGenerateEffect
                  key={phraseIndex} // 🔑 ensures animation resets each phrase
                  words={phrases[phraseIndex]}
                  className="text-lg text-black dark:text-white text-center [&_span]:!text-black [&_span]:dark:!text-white"
                  justify="center"
                />
              )}
            </div>

            {/* Links */}
            <div className="flex flex-wrap justify-center gap-6 py-6 md:py-4 relative z-40 px-2">
              {allLinks.map((element, index) => (
                <div key={index} className="relative z-40">
                  <LinkCard
                    title={element.title}
                    url={element.url}
                    icon={element.icon}
                  />
                </div>
              ))}
            </div>

                  {/* Footer */}
                  <div className="text-center text-xs text-muted-foreground pt-8 pb-4 md:pb-8">
                    © Developed by Me
                  </div>
                </div>
              </div>
            </BackgroundBeamsWithCollisionLazy>
          </Suspense>
        ) : (
          <div className="w-full h-full md:h-[40vh] z-0 flex-1">
            <div className="px-2 md:px-4 h-full flex flex-col justify-start">
              <div className="w-full h-full z-30 relative">
              
              {/* Subtitle */}
              <p className="text-black dark:text-white mt-16 md:mt-8 mb-0 text-center text-lg w-full">
                Ready to collaborate? Let's discuss your next project or just say hello!
              </p>
              
              {/* Rotating professional phrases */}
              <div className="mt-6 md:mt-4 mb-4 md:mb-2 text-center min-h-[4rem]">
                {showPhrases && (
                  <TextGenerateEffect
                    key={phraseIndex}
                    words={phrases[phraseIndex]}
                    className="text-lg text-black dark:text-white text-center [&_span]:!text-black [&_span]:dark:!text-white"
                    justify="center"
                  />
                )}
              </div>
              
              {/* Links */}
              <div className="flex flex-wrap justify-center gap-6 py-6 md:py-4 relative z-40 px-2">
                {allLinks.map((element, index) => (
                  <div key={index} className="relative z-40">
                    <LinkCard
                      title={element.title}
                      url={element.url}
                      icon={element.icon}
                    />
                  </div>
                ))}
              </div>
              
              {/* Footer */}
              <div className="text-center text-xs text-muted-foreground pt-8 pb-4 md:pb-8">
                © Developed by Me
              </div>
              </div>
            </div>
          </div>
        )
      ) : (
        <Suspense fallback={<div className="w-full h-full md:h-[40vh] z-0 flex-1" />}> 
          <BackgroundBeamsWithCollisionLazy className="w-full h-full md:h-[40vh] z-0 flex-1">
            <div className="px-2 md:px-4 h-full flex flex-col justify-start">
              <div className="w-full h-full z-30 relative">
              
              {/* Subtitle */}
              <p className="text-black dark:text-white mt-16 md:mt-8 mb-0 text-center text-lg w-full">
                Ready to collaborate? Let's discuss your next project or just say hello!
              </p>
              
              {/* Rotating professional phrases */}
              <div className="mt-6 md:mt-4 mb-4 md:mb-2 text-center min-h-[4rem]">
                {showPhrases && (
                  <TextGenerateEffect
                    key={phraseIndex}
                    words={phrases[phraseIndex]}
                    className="text-lg text-black dark:text-white text-center [&_span]:!text-black [&_span]:dark:!text-white"
                    justify="center"
                  />
                )}
              </div>
              
              {/* Links */}
              <div className="flex flex-wrap justify-center gap-6 py-6 md:py-4 relative z-40 px-2">
                {allLinks.map((element, index) => (
                  <div key={index} className="relative z-40">
                    <LinkCard
                      title={element.title}
                      url={element.url}
                      icon={element.icon}
                    />
                  </div>
                ))}
              </div>
              
                {/* Footer */}
                <div className="text-center text-xs text-muted-foreground pt-8 pb-4 md:pb-8">
                  © Developed by Me
                </div>
              </div>
            </div>
          </BackgroundBeamsWithCollisionLazy>
        </Suspense>
      )}
    </div>
  );
}
