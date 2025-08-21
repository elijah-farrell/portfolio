import { HeroHighlight, Highlight } from "@/components/ui/hero-highlight";
import { useMemo } from "react";
import { settings } from "@/config/settings";
import { FiMapPin, FiMail, FiCalendar, FiAward } from "react-icons/fi";

export default function AboutMe() {
  // Calculate experience dynamically
  const experience = useMemo(() => {
    const start = new Date("2021-08-01");
    const now = new Date();
    let months =
      (now.getFullYear() - start.getFullYear()) * 12 +
      (now.getMonth() - start.getMonth());
    if (now.getDate() < start.getDate()) months--;
    const years = Math.floor(months / 12);
    const remMonths = months % 12;
    if (years > 0 && remMonths > 0) {
      return `${years} year${years > 1 ? "s" : ""} ${remMonths} month${
        remMonths > 1 ? "s" : ""
      }`;
    } else if (years > 0) {
      return `${years} year${years > 1 ? "s" : ""}`;
    } else {
      return `${remMonths} month${remMonths > 1 ? "s" : ""}`;
    }
  }, []);

  // Quick stats for visual appeal
  const quickStats = [
    { icon: <FiCalendar size={16} />, label: "Experience", value: experience },
    {
      icon: <FiMapPin size={16} />,
      label: "Location",
      value: "Watertown, NY",
    },
    { icon: <FiAward size={16} />, label: "Education", value: "B.S. CS" },
  ];

  const education = [
    {
      institution: "SUNY Polytechnic Institute",
      degree: "B.S. in Computer Science",
      graduation: "May 2025",
      gpa: "3.88",
      honors: "Magna Cum Laude",
      logo: "/assets/suny-poly-logo.jpg",
      coursework: [
        "CS 108 – Computing Fundamentals",
        "CS 240 – Data Structures & Algorithms",
        "CS 220 – Computer Organization",
        "CS 330 – Operating Systems & Networking",
        "CS 249 – Object-Oriented Programming",
        "CS 370 – Software Engineering",
        "CS 431 – Principles of Programming Languages",
        "CS 350 – Information & Knowledge Management",
        "IS 320 – Systems Analysis & Design",
        "CS 324 – Internet Tools (Web Programming)",
        "CS 377 – Introduction to Theory of Computing",
        "CS 470 – Computer Vision and Image Processing",
        "CS 477 – Algorithms",
        "CS 498 – Capstone Project",
        "MAT 151 – Calculus I",
        "MAT 152 – Calculus II",
        "MAT 115 – Finite Math for CS",
        "PHY 101 – General Physics I",
        "CHE 110T/L – Chemistry Lecture & Lab"
      ]
    },
    {
      institution: "Jefferson Community College",
      degree: "A.S. in Computer Science",
      graduation: "2023",
      honors: "Phi Theta Kappa Honor Society",
      logo: "/assets/jcc-logo.png",
      coursework: []
    }
  ];

  return (
    <>
      <div className="pt-10 mb-10" id="about">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold mb-2">ABOUT ME</h1>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            Get to know me better - my journey, achievements, and passion for
            technology
          </p>

          {/* Quick Stats */}
          {settings.about.showStats && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
              {quickStats.map((stat, index) => (
                <div
                  key={index}
                  className="flex items-center gap-3 p-4 bg-gray-50 dark:bg-gray-800/50 rounded-xl border border-gray-200 dark:border-gray-700 hover:border-emerald-200 dark:hover:border-emerald-700 transition-colors duration-300"
                >
                  <div className="text-emerald-600 dark:text-emerald-400">
                    {stat.icon}
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {stat.label}
                    </p>
                    <p className="font-semibold text-gray-900 dark:text-gray-100">
                      {stat.value}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}

          <HeroHighlight className="max-w-3xl mx-auto p-6 text-justify text-gray-800 dark:text-gray-200 leading-loose">
            <p className="mb-4">
              I'm passionate about working with all sorts of technology whether it's <Highlight>building software</Highlight>, managing data, solving system issues, or learning new tools. I'm excited by the variety of paths within tech and open to opportunities in <Highlight>software development, data, IT, and other technical roles</Highlight>.
            </p>
            <p className="mb-4">
              At my core, I love <Highlight>solving problems and figuring out how things work</Highlight>. I enjoy diving into complex systems, simplifying workflows, and contributing to projects that make a real impact.
            </p>
            <p className="mb-4">
              Outside of tech, you'll usually find me on a hiking trail, playing video games, or watching sports and hanging out with my friends. I think staying curious and engaged in different areas of life helps me stay <Highlight>creative and adaptable in my work too</Highlight>.
            </p>
            <p>
              I'm always open to new opportunities that challenge me and help me grow.
            </p>
          </HeroHighlight>
        </div>
      </div>

      {/* Education Section */}
      <div id="education" className="mt-12">
        <h2 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white">
          EDUCATION
        </h2>
        <div className="space-y-6">
          <div className="flex items-start space-x-4 p-4 bg-white dark:bg-black rounded-lg shadow-sm border border-gray-200 dark:border-gray-800">
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

          <div className="flex items-start space-x-4 p-4 bg-white dark:bg-black rounded-lg shadow-sm border border-gray-200 dark:border-gray-800">
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

      {/* Coursework Section */}
      <div className="mt-4">
        <div className="max-w-4xl mx-auto p-6 md:p-12">
          <h4 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">
            Relevant Coursework
          </h4>
          <p className="text-gray-600 dark:text-gray-400 mb-4 text-sm">
            A comprehensive curriculum covering computer science fundamentals, advanced programming, and mathematical foundations
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <div className="bg-white dark:bg-black p-3 rounded-lg border border-gray-200 dark:border-gray-800">
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

            <div className="bg-white dark:bg-black p-3 rounded-lg border border-gray-200 dark:border-gray-800">
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

            <div className="bg-white dark:bg-black p-3 rounded-lg border border-gray-200 dark:border-gray-800">
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
        </div>
      </div>
    </>
  );
}
