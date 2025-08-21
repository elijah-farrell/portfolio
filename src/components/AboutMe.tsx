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
    </>
  );
}
