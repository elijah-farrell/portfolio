import React, { useState, useEffect } from "react";
import LinkCard from "@/components/ui/common/link-card";
import { BackgroundBeamsWithCollision } from "@/components/ui/aceternity/background-beams-with-collision";
import { TextGenerateEffect } from "@/components/ui/aceternity/text-generate-effect";
import { SiGithub } from "react-icons/si";
import { FiMapPin, FiMail, FiPhone } from "react-icons/fi";

export default function Contact(): JSX.Element {
  const allLinks = [
    { title: "Email", icon: <FiMail />, url: "mailto:farrellelijah@outlook.com" },
    { title: "Schedule Call", icon: <FiPhone />, url: "https://cal.com/elijahfarrell", external: true },
    { title: "GitHub", url: "https://github.com/elijah-farrell", icon: <SiGithub /> },
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
    "I’d love to hear about your ideas.",
    "Questions? I’m happy to help.",
    "Let’s explore how we can work together.",
    "Open to discussing your next steps.",
    "Curious about possibilities? Let’s chat.",
    "Happy to connect and share insights.",
    "Your vision is worth a conversation.",
    "Ready to collaborate?", 
    "Let's discuss your next project or just say hello!",
  ];

  const [showPhrases] = useState(true);
  const [phraseIndex, setPhraseIndex] = useState(() =>
    Math.floor(Math.random() * phrases.length)
  );

  // Rotate phrases every 4s, but pause when tab is hidden
  useEffect(() => {
    if (!showPhrases) return;

    let intervalId: NodeJS.Timeout | null = null;
    let timeoutId: NodeJS.Timeout | null = null;
    const phraseChangeTimeRef = { current: Date.now() }; // Track when current phrase started

    const updatePhrase = () => {
      setPhraseIndex((prev) => {
        phraseChangeTimeRef.current = Date.now();
        return (prev + 1) % phrases.length;
      });
    };

    const scheduleNextUpdate = (delay: number) => {
      // Clear any existing timers
      if (timeoutId) clearTimeout(timeoutId);
      if (intervalId) clearInterval(intervalId);

      // Schedule the next update
      timeoutId = setTimeout(() => {
        updatePhrase();
        
        // Continue with regular 4s intervals
        intervalId = setInterval(() => {
          updatePhrase();
        }, 4000);
      }, delay);
    };

    const handleVisibilityChange = () => {
      if (document.hidden) {
        // Tab hidden - pause timers
        if (timeoutId) clearTimeout(timeoutId);
        if (intervalId) clearInterval(intervalId);
        timeoutId = null;
        intervalId = null;
      } else {
        // Tab visible - calculate remaining time and resume
        const now = Date.now();
        const timeSinceLastChange = now - phraseChangeTimeRef.current;
        const timeRemaining = Math.max(0, 4000 - timeSinceLastChange);
        scheduleNextUpdate(timeRemaining);
      }
    };

    // Initialize phrase change time
    phraseChangeTimeRef.current = Date.now();
    // Start with full 4s delay
    scheduleNextUpdate(4000);

    // Listen for tab visibility changes
    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      if (timeoutId) clearTimeout(timeoutId);
      if (intervalId) clearInterval(intervalId);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [showPhrases, phrases.length]);

  return (
    <div
      id="contact"
      className="border-0 min-h-[max(80vh,32rem)] md:min-h-[max(70vh,32rem)] flex flex-col contact-section"
    >
      {/* Title */}
      <h1 className="text-3xl font-bold text-left">CONTACT</h1>

      {/* Background beams + content */}
      <BackgroundBeamsWithCollision className="w-full h-full min-h-0 md:min-h-[40vh] z-0 flex-1 contact-beams">
        <div className="px-2 md:px-4 h-full min-h-0 flex flex-col justify-start">
          <div className="w-full min-h-full z-30 relative">
            
            {/* Subtitle */}
            <p className="text-black dark:text-[var(--text)] mt-16 md:mt-8 mb-0 text-center text-lg w-full">
              Feel free to reach me at{" "}
              <a
                href="mailto:farrellelijah@outlook.com"
                className="underline underline-offset-2"
              >
                farrellelijah@outlook.com
              </a>
            </p>

            {/* Rotating professional phrases */}
            <div className="mt-6 md:mt-4 mb-4 md:mb-2 text-center min-h-[4rem]">
              {showPhrases && (
                <TextGenerateEffect
                  key={phraseIndex} // 🔑 ensures animation resets each phrase
                  words={phrases[phraseIndex]}
                  className="text-lg text-black dark:text-[var(--text)] text-center [&_span]:!text-black [&_span]:dark:!text-[var(--text)]"
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

            {/* Footer - always visible; extra padding on short/landscape viewports */}
            <div className="text-center text-xs text-neutral-500 dark:text-neutral-400 pt-8 pb-6 md:pb-8">
              © Developed by Me
            </div>
          </div>
        </div>
      </BackgroundBeamsWithCollision>
    </div>
  );
}
