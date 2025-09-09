import React from "react";
import { WobbleCard } from "@/components/ui/wobble-card";
import { CardSpotlight } from "@/components/ui/card-spotlight";

export default function Education() {
  return (
    <>
      {/* Education Section */}
      <div id="education" className="mt-12">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white">
            EDUCATION
          </h2>
          <div className="space-y-6">
            <CardSpotlight className="bg-white dark:bg-black border border-gray-200 dark:border-neutral-700 shadow-sm">
              <div className="flex flex-col sm:flex-row items-start space-y-3 sm:space-y-0 sm:space-x-4">
                <img
                  src="/assets/logos/suny-poly-logo.jpg"
                  alt="SUNY Polytechnic Institute"
                  className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 object-cover rounded-lg flex-shrink-0 mx-auto sm:mx-0"
                />
                <div className="flex-1 space-y-2 w-full">
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2">
                    <h4 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-white text-center sm:text-left">
                      SUNY Polytechnic Institute
                    </h4>
                    <span className="text-sm text-gray-500 dark:text-gray-400 font-medium text-center sm:text-right">
                      May 2025
                    </span>
                  </div>
                  <p className="text-gray-600 dark:text-gray-400 text-center sm:text-left">
                    B.S. in Computer Science
                  </p>
                  <div className="flex flex-wrap justify-center sm:justify-start gap-3 text-xs text-emerald-600 dark:text-emerald-400 font-medium">
                    <span>GPA: 3.88</span>
                    <span>•</span>
                    <span>Magna Cum Laude</span>
                  </div>
                </div>
              </div>
            </CardSpotlight>
            
            <CardSpotlight className="bg-white dark:bg-black border border-gray-200 dark:border-neutral-700 shadow-sm">
              <div className="flex flex-col sm:flex-row items-start space-y-3 sm:space-y-0 sm:space-x-4">
                <img
                  src="/assets/logos/jcc-logo.png"
                  alt="Jefferson Community College"
                  className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 object-cover rounded-lg flex-shrink-0 mx-auto sm:mx-0"
                />
                <div className="flex-1 space-y-2 w-full">
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2">
                    <h4 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-white text-center sm:text-left">
                      Jefferson Community College
                    </h4>
                    <span className="text-sm text-gray-500 dark:text-gray-400 font-medium text-center sm:text-right">
                      2023
                    </span>
                  </div>
                  <p className="text-gray-600 dark:text-gray-400 text-center sm:text-left">
                    A.S. in Computer Science
                  </p>
                  <div className="text-xs text-emerald-600 dark:text-emerald-400 font-medium text-center sm:text-left">
                    Phi Theta Kappa Honor Society
                  </div>
                </div>
              </div>
            </CardSpotlight>
          </div>
        </div>
      </div>

      {/* Coursework Section */}
      <div>
        <section className="p-6 md:p-12 max-w-4xl mx-auto">
          <h4 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">
            Relevant Coursework
          </h4>
          <p className="text-gray-600 dark:text-gray-400 mb-4 text-sm">
            A comprehensive curriculum covering computer science fundamentals, advanced programming, and mathematical foundations
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <WobbleCard 
              containerClassName="bg-white dark:bg-black border border-gray-200 dark:border-neutral-700 shadow-sm"
              className="p-3"
            >
              <h5 className="font-medium text-gray-900 dark:text-white mb-2 text-sm">Computer Science Core</h5>
              <ul className="space-y-1 text-xs text-gray-600 dark:text-gray-400">
                <li>CS 108 – Computing Fundamentals</li>
                <li>CS 240 – Data Structures & Algorithms</li>
                <li>CS 220 – Computer Organization</li>
                <li>CS 330 – Operating Systems & Networking</li>
                <li>CS 249 – Object-Oriented Programming</li>
                <li>CS 370 – Software Engineering</li>
                <li>CS 431 – Principles of Programming Languages</li>
                <li>CS 350 – Information & Knowledge Management</li>
              </ul>
            </WobbleCard>
            
            <WobbleCard 
              containerClassName="bg-white dark:bg-black border border-gray-200 dark:border-neutral-700 shadow-sm"
              className="p-3"
            >
              <h5 className="font-medium text-gray-900 dark:text-white mb-2 text-sm">Advanced Topics</h5>
              <ul className="space-y-1 text-xs text-gray-600 dark:text-gray-400">
                <li>IS 320 – Systems Analysis & Design</li>
                <li>CS 324 – Internet Tools (Web Programming)</li>
                <li>CS 377 – Introduction to Theory of Computing</li>
                <li>CS 470 – Computer Vision and Image Processing</li>
                <li>CS 477 – Algorithms</li>
                <li>CS 498 – Capstone Project</li>
              </ul>
            </WobbleCard>
            
            <WobbleCard 
              containerClassName="bg-white dark:bg-black border border-gray-200 dark:border-neutral-700 shadow-sm"
              className="p-3"
            >
              <h5 className="font-medium text-gray-900 dark:text-white mb-2 text-sm">Mathematics & Sciences</h5>
              <ul className="space-y-1 text-xs text-gray-600 dark:text-gray-400">
                <li>MAT 151 – Calculus I</li>
                <li>MAT 152 – Calculus II</li>
                <li>MAT 115 – Finite Math for CS</li>
                <li>PHY 101 – General Physics I</li>
                <li>CHE 110T/L – Chemistry Lecture & Lab</li>
              </ul>
            </WobbleCard>
          </div>
        </section>
      </div>
    </>
  );
}
