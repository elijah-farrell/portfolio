import React from "react";
import { CardSpotlight } from "@/components/ui/card-spotlight";

export default function Education() {
  return (
    <>
      {/* Education Section */}
      <div id="education" className="pt-8">
        <div className="max-w-4xl">
          <h2 className="text-3xl font-bold mb-2 text-gray-900 dark:text-white">
            EDUCATION
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            My academic journey and educational achievements
          </p>
          <div className="space-y-6">
            <CardSpotlight className="bg-white dark:bg-[#0a0a0a] border border-gray-200 dark:border-neutral-700 shadow-sm relative">
              <span className="absolute top-2 right-0 text-xs sm:text-sm text-gray-500 dark:text-gray-400 font-medium z-10 pr-1">
                May 2025
              </span>
              <div className="flex flex-col sm:flex-row items-start space-y-3 sm:space-y-0 sm:space-x-4">
                <img
                  src="/assets/logos/suny-poly-logo.jpg"
                  alt="SUNY Polytechnic Institute"
                  className="w-20 h-20 sm:w-20 sm:h-20 md:w-24 md:h-24 object-cover rounded-lg flex-shrink-0 mx-auto sm:mx-0"
                />
                <div className="flex-1 space-y-2 w-full">
                  <h4 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-white text-center sm:text-left">
                    B.S. in Computer Science
                  </h4>
                  <p className="text-gray-600 dark:text-gray-400 text-center sm:text-left">
                    SUNY Polytechnic Institute
                  </p>
                  <div className="flex flex-wrap justify-center sm:justify-start gap-3 text-xs text-emerald-600 dark:text-emerald-400 font-medium">
                    <span>GPA: 3.88</span>
                    <span>•</span>
                    <span>Magna Cum Laude</span>
                  </div>
                </div>
              </div>
            </CardSpotlight>
            
            <CardSpotlight className="bg-white dark:bg-[#0a0a0a] border border-gray-200 dark:border-neutral-700 shadow-sm relative">
              <span className="absolute top-2 right-0 text-xs sm:text-sm text-gray-500 dark:text-gray-400 font-medium z-10 pr-1">
                2023
              </span>
              <div className="flex flex-col sm:flex-row items-start space-y-3 sm:space-y-0 sm:space-x-4">
                <img
                  src="/assets/logos/jcc-logo.png"
                  alt="Jefferson Community College"
                  className="w-20 h-20 sm:w-20 sm:h-20 md:w-24 md:h-24 object-cover rounded-lg flex-shrink-0 mx-auto sm:mx-0"
                />
                <div className="flex-1 space-y-2 w-full">
                  <h4 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-white text-center sm:text-left">
                    A.S. in Computer Science
                  </h4>
                  <p className="text-gray-600 dark:text-gray-400 text-center sm:text-left">
                    Jefferson Community College
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
    </>
  );
}
