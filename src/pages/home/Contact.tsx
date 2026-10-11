import React, { useState, useEffect } from "react";
import LinkCard from "@/components/ui/common/link-card";
import { Magnetic } from "@/components/ui/common/magnetic";
import { BackgroundBeamsWithCollision } from "@/components/ui/aceternity/background-beams-with-collision";
import { SiGithub } from "react-icons/si";
import { FiMapPin, FiMail, FiPhone } from "react-icons/fi";

const TYPE_MS = 32;

function TypewriterPhrase({ text }: { text: string }): JSX.Element {
  const [count, setCount] = useState(0);
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const apply = () => setReduced(media.matches);
    apply();
    media.addEventListener("change", apply);
    return () => media.removeEventListener("change", apply);
  }, []);

  useEffect(() => {
    if (reduced || count >= text.length) return;
    const id = window.setTimeout(() => setCount((current) => current + 1), TYPE_MS);
    return () => window.clearTimeout(id);
  }, [count, reduced, text]);

  const shown = reduced ? text : text.slice(0, count);

  return (
    <div className="relative mx-auto w-full max-w-xl text-lg text-black dark:text-[var(--text)]">
      <p className="sr-only">{text}</p>
      <p className="invisible" aria-hidden="true">
        {text}
      </p>
      <p className="absolute inset-x-0 top-0" aria-hidden="true">
        {shown}
        <span className="type-caret relative inline-block h-[1em] w-0 align-[-0.05em]">
          <span className="absolute inset-y-0 left-px w-px bg-current" />
        </span>
      </p>
    </div>
  );
}

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
  const [phraseIndex, setPhraseIndex] = useState(0);

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
      className="border-0 min-h-[max(80lvh,32rem)] md:min-h-[max(70lvh,32rem)] flex flex-col contact-section"
    >
      {/* Title */}
      <h1 className="text-3xl font-bold text-left">CONTACT</h1>

      {/* Background beams + content */}
      <BackgroundBeamsWithCollision className="w-full h-full min-h-0 md:min-h-[40lvh] z-0 flex-1 contact-beams">
        <div className="px-2 md:px-4 h-full min-h-0 flex flex-col justify-start">
          <div className="w-full min-h-full z-30 relative">
            
            {/* Subtitle */}
            <p className="mb-0 mt-16 w-full px-1 text-center text-lg text-black max-[340px]:text-[0.95rem] dark:text-[var(--text)] md:mt-8">
              Feel free to reach me at{" "}
              <br className="hidden max-[340px]:block" />
              <a
                href="mailto:farrellelijah@outlook.com"
                className="inline-block max-w-full text-[clamp(0.8125rem,4.6vw,1.125rem)] underline underline-offset-2"
              >
                farrellelijah@outlook.com
              </a>
            </p>

            {/* Rotating professional phrases */}
            <div className="mt-6 md:mt-4 mb-4 md:mb-2 text-center min-h-[4rem]">
              {showPhrases && <TypewriterPhrase key={phraseIndex} text={phrases[phraseIndex]} />}
            </div>

            {/* Links */}
            <div className="relative z-40 mx-auto flex w-full flex-nowrap items-center justify-center gap-6 px-0 py-6 max-[385px]:gap-3 md:py-4">
              {allLinks.map((element, index) => (
                <Magnetic
                  key={index}
                  className="z-40 max-[385px]:!p-0"
                  strength={0.32}
                >
                  <LinkCard
                    title={element.title}
                    url={element.url}
                    icon={element.icon}
                  />
                </Magnetic>
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
