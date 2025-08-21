import React from "react";

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
            <div className="flex items-start space-x-4 p-4 bg-white dark:bg-black rounded-lg shadow-sm border border-gray-200 dark:border-neutral-700">
              <img
                src="/src/assets/logos/suny-poly-logo.jpg"
                alt="SUNY Polytechnic Institute"
                className="w-24 h-24 object-cover rounded-lg"
              />
              <div className="flex-1">
                <h4 className="text-lg font-semibold text-gray-900 dark:text-white">
                  SUNY Polytechnic Institute
                </h4>
                <p className="text-gray-600 dark:text-gray-400">
                  B.S. in Computer Science • May 2025
                </p>
                <p className="text-sm text-emerald-600 dark:text-emerald-400 font-medium">
                  GPA: 3.88 • Magna Cum Laude
                </p>
              </div>
            </div>
            
            <div className="flex items-start space-x-4 p-4 bg-white dark:bg-black rounded-lg shadow-sm border border-gray-200 dark:border-neutral-700">
              <img
                src="/src/assets/logos/jcc-logo.png"
                alt="Jefferson Community College"
                className="w-24 h-24 object-cover rounded-lg"
              />
              <div className="flex-1">
                <h4 className="text-lg font-semibold text-gray-900 dark:text-white">
                  Jefferson Community College
                </h4>
                <p className="text-gray-600 dark:text-gray-400">
                  A.S. in Computer Science • 2023
                </p>
                <p className="text-sm text-emerald-600 dark:text-emerald-400 font-medium">
                  Phi Theta Kappa Honor Society
                </p>
              </div>
            </div>
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
            <div className="bg-white dark:bg-black p-3 rounded-lg border border-gray-200 dark:border-neutral-700">
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
            </div>
            
            <div className="bg-white dark:bg-black p-3 rounded-lg border border-gray-200 dark:border-neutral-700">
              <h5 className="font-medium text-gray-900 dark:text-white mb-2 text-sm">Advanced Topics</h5>
              <ul className="space-y-1 text-xs text-gray-600 dark:text-gray-400">
                <li>IS 320 – Systems Analysis & Design</li>
                <li>CS 324 – Internet Tools (Web Programming)</li>
                <li>CS 377 – Introduction to Theory of Computing</li>
                <li>CS 470 – Computer Vision and Image Processing</li>
                <li>CS 477 – Algorithms</li>
                <li>CS 498 – Capstone Project</li>
              </ul>
            </div>
            
            <div className="bg-white dark:bg-black p-3 rounded-lg border border-gray-200 dark:border-neutral-700">
              <h5 className="font-medium text-gray-900 dark:text-white mb-2 text-sm">Mathematics & Sciences</h5>
              <ul className="space-y-1 text-xs text-gray-600 dark:text-gray-400">
                <li>MAT 151 – Calculus I</li>
                <li>MAT 152 – Calculus II</li>
                <li>MAT 115 – Finite Math for CS</li>
                <li>PHY 101 – General Physics I</li>
                <li>CHE 110T/L – Chemistry Lecture & Lab</li>
              </ul>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
