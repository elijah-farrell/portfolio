import React, { useState, useEffect } from "react";
import LinkCard from "@/components/ui/common/LinkCard";
import { BackgroundBeamsWithCollision } from "@/components/ui/aceternity/background-beams-with-collision";
import { TextGenerateEffect } from "@/components/ui/aceternity/text-generate-effect";
import { SiGithub, SiLinkedin, SiDiscord } from "react-icons/si";
import { FiMapPin, FiMail, FiCalendar } from "react-icons/fi";

export default function Contact(): JSX.Element {
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
    <div id="contact" className="border-0 min-h-[80vh] flex flex-col">
      {/* Title */}
      <h1 className="text-3xl font-bold text-left">CONTACT</h1>

      {/* Background beams + content */}
      <BackgroundBeamsWithCollision className="w-full h-full z-0 flex-1">
        <div className="px-2 md:px-4 h-full flex flex-col justify-start">
          <div className="w-full h-full z-30 relative">
            
            {/* Subtitle */}
            <p className="text-gray-600 dark:text-gray-400 mt-24 mb-6 text-center text-lg w-full">
              Ready to collaborate? Let's discuss your next project or just say hello!
            </p>

            {/* Rotating professional phrases */}
            <div className="mt-4 mb-8 text-center min-h-[4rem]">
              {showPhrases && (
                <TextGenerateEffect
                  key={phraseIndex} // 🔑 ensures animation resets each phrase
                  words={phrases[phraseIndex]}
                  className="text-lg text-primary text-center"
                  justify="center"
                />
              )}
            </div>

            {/* Links */}
            <div className="flex flex-wrap justify-center gap-6 py-12 relative z-40 px-2">
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
            <div className="text-center text-xs text-muted-foreground pt-16 pb-12 md:pb-8">
              © Developed by Me
            </div>
          </div>
        </div>
      </BackgroundBeamsWithCollision>
    </div>
  );
}
