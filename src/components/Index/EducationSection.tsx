import { useState } from 'react';
import { FadeInOnScroll, HoverCard } from "@/components/ScrollReveal";
import sunyPolyLogo from '@/assets/education/suny-poly-logo.jpg';
import jccLogo from '@/assets/education/jcc-logo.png';
import { useRef, useEffect } from "react";
import RotatingText from "@/components/RotatingText";

interface EducationSectionProps {
  currentColor: string;
}

export default function EducationSection({ currentColor }: EducationSectionProps) {
  const titleRef = useRef<HTMLHeadingElement>(null);

  const allCourses = [
    'CS 108 – Computing Fundamentals',
    'CS 240 – Data Structures & Algorithms',
    'CS 220 – Computer Organization',
    'CS 330 – Operating Systems & Networking',
    'CS 249 – Object-Oriented Programming',
    'CS 370 – Software Engineering',
    'CS 431 – Principles of Programming Languages',
    'CS 350 – Information & Knowledge Management',
    'IS 320 – Systems Analysis & Design',
    'CS 324 – Internet Tools (Web Programming)',
    'CS 377 – Introduction to Theory of Computing',
    'CS 470 – Computer Vision and Image Processing',
    'CS 477 – Algorithms',
    'CS 498 – Capstone Project',
    'MAT 151 – Calculus I',
    'MAT 152 – Calculus II',
    'MAT 115 – Finite Math for CS',
    'PHY 101 – General Physics I',
    'CHE 110T/L – Chemistry Lecture & Lab'
  ];

  return (
    <section id="education" className="py-20 px-6 sm:px-8 bg-gray-50 dark:bg-neutral-900 border-t border-gray-200 dark:border-neutral-700">
      
      <div className="max-w-6xl mx-auto">
        <FadeInOnScroll direction="up" duration={800} delay={200} elementId="education-header">
          <div className="mb-8 text-center">
            <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white">
              Education
            </h2>
          </div>
        </FadeInOnScroll>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* SUNY Poly */}
          <FadeInOnScroll direction="right" duration={800} delay={400} elementId="education-suny">
            <HoverCard scale={1.02} shadowIntensity={20} className="bg-white dark:bg-black rounded-2xl p-8 shadow-lg border border-gray-100 dark:border-neutral-600">
              <div className="flex flex-col items-center text-center gap-6">
                <div className="flex-shrink-0">
                  <img 
                    src={sunyPolyLogo}
                    alt="SUNY Polytechnic Institute Logo"
                    className="w-32 h-32 rounded-xl object-cover"
                  />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                    SUNY Polytechnic Institute
                  </h3>
                  <p className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-2">
                    B.S. in Computer Science
                  </p>
                  <p className="text-gray-600 dark:text-gray-400 mb-3">
                    May 2025 · GPA: 3.88 · Magna Cum Laude
                  </p>
                </div>
              </div>
            </HoverCard>
          </FadeInOnScroll>

          {/* JCC */}
          <FadeInOnScroll direction="left" duration={800} delay={600} elementId="education-jcc">
            <HoverCard scale={1.02} shadowIntensity={20} className="bg-white dark:bg-black rounded-2xl p-8 shadow-lg border border-gray-100 dark:border-neutral-600">
              <div className="flex flex-col items-center text-center gap-6">
                <div className="flex-shrink-0">
                  <img 
                    src={jccLogo}
                    alt="Jefferson Community College Logo"
                    className="w-32 h-32 rounded-xl object-cover"
                  />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                    Jefferson Community College
                  </h3>
                  <p className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-2">
                    A.S. in Computer Science
                  </p>
                  <p className="text-gray-600 dark:text-gray-400 mb-3">
                    2023 · Phi Theta Kappa Honor Society
                  </p>
                </div>
              </div>
            </HoverCard>
          </FadeInOnScroll>
        </div>

        {/* Interactive Course Display */}
        <FadeInOnScroll direction="up" duration={800} delay={800} elementId="education-courses">
          <div className="mt-12 flex justify-center">
            <div className="bg-white dark:bg-black rounded-2xl p-4 shadow-lg border border-gray-100 dark:border-neutral-600 max-w-xl w-full">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2 text-center">
                Relevant Coursework
              </h3>

                             <div className="bg-[#f2f4f6] dark:bg-neutral-700 rounded-xl p-3 text-center flex items-center justify-center min-h-[80px] overflow-hidden">
                <RotatingText
                  texts={allCourses}
                  mainClassName="text-base font-medium text-gray-800 dark:text-gray-200 text-center"
                  staggerFrom="last"
                  initial={{ y: "100%", opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: "-100%", opacity: 0 }}
                  staggerDuration={0.025}
                  transition={{ type: "spring", damping: 30, stiffness: 400 }}
                  rotationInterval={5000}
                  auto={true}
                  loop={true}
                />
              </div>
            </div>
          </div>
        </FadeInOnScroll>
      </div>
    </section>
  );
} 