import { HeroHighlight, Highlight } from "@/components/ui/hero-highlight";
import { settings } from "@/config/settings";
import { FiMapPin, FiAward } from "react-icons/fi";

export default function AboutMe() {
  // Quick stats for visual appeal
  const quickStats = [
    {
      icon: <FiMapPin size={16} />,
      label: "Location",
      value: "New York",
    },
    { icon: <FiAward size={16} />, label: "Education", value: "Bachelor's in Computer Science" },
  ];

  return (
    <>
      <div className="pt-8 mb-10" id="about">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold mb-2">ABOUT ME</h1>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            Get to know me better - my journey, achievements, and passion for
            technology
          </p>

          {/* Quick Stats */}
          {settings.about.showStats && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              {quickStats.map((stat, index) => (
                <div
                  key={index}
                  className="flex items-center gap-3 p-4 bg-gray-50 dark:bg-neutral-900 rounded-xl border border-gray-200 dark:border-neutral-700 hover:border-emerald-200 dark:hover:border-emerald-700"
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

          <HeroHighlight className="max-w-3xl mx-auto p-6 text-justify text-gray-800 dark:text-gray-200 leading-loose hyphens-auto break-words">
            <p className="mb-4">
              I'm passionate about building software, managing data, solving system issues, and learning new tools. My tech journey began at <Highlight>Jefferson Community College</Highlight>, where I earned my <Highlight>A.S. in Computer Science</Highlight>. This foundation led me to <Highlight>SUNY Polytechnic Institute</Highlight>, where I graduated with a <Highlight>B.S. in Computer Science</Highlight>, <Highlight>Magna Cum Laude</Highlight>, and a <Highlight>3.88 GPA</Highlight>.
            </p>
            <p className="mb-4">
              I thrive on <Highlight>solving problems and figuring out how things work</Highlight>—whether debugging code, optimizing algorithms, or building systems from scratch. My academic background provided a solid foundation in both theory and practical development skills, which I've applied in various research projects and collaborative work.
            </p>
            <p className="mb-4">
              I'm excited by the diverse paths in tech and open to opportunities in <Highlight>software development, data analysis, IT, and other roles</Highlight> that foster continuous learning and growth. Outside of tech, I enjoy hiking, gaming, and watching sports with friends—activities that help me stay <Highlight>curious, creative, and adaptable</Highlight>.
            </p>
            <p>
              I'm always seeking new challenges that promote personal and professional development.
            </p>
          </HeroHighlight>
        </div>
      </div>
    </>
  );
}
