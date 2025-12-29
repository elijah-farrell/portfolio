import { HeroHighlight, Highlight } from "@/components/ui/aceternity/hero-highlight";
import { settings } from "@/config/settings";
import { FiMapPin, FiAward, FiClock } from "react-icons/fi";
import { RealTimeAge } from "../../components/ui/common/real-time-age";

export default function AboutMe() {
  // Birth date: June 9, 2003 at 5:21 AM
  const birthDate = new Date(2003, 5, 9, 5, 21, 0); // Month is 0-indexed (5 = June)

  // Quick stats for visual appeal
  const quickStats = [
    {
      icon: <FiMapPin size={16} />,
      label: "Location",
      value: "Northern New York",
    },
    { 
      icon: <FiAward size={16} />, 
      label: "Education", 
      value: "B.S. Computer Science" 
    },
  ];

  const ageData = {
    icon: <FiClock size={16} />,
    label: "Age",
    value: <RealTimeAge birthDate={birthDate} />,
  };

  return (
    <>
      <div className="pt-8 mb-8" id="about">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold mb-2">ABOUT ME</h1>
          <p className="text-neutral-600 dark:text-neutral-400 mb-6">
            Get to know me better - my journey, achievements, and passion for
            technology
          </p>

          {/* Quick Stats */}
          {settings.about.showStats && (
            <>
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
                      <p className="font-semibold accent-text">
                        {stat.value}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
              
              {/* Age Stat - Full Width (hidden on screens < 640px) */}
              <div className="hidden sm:flex items-center gap-3 p-4 bg-gray-50 dark:bg-neutral-900 rounded-xl border border-gray-200 dark:border-neutral-700 hover:border-emerald-200 dark:hover:border-emerald-700 mb-4 min-h-[76px]">
                <div className="text-emerald-600 dark:text-emerald-400 flex-shrink-0">
                  {ageData.icon}
                </div>
                <div className="flex-1 min-w-0 overflow-hidden">
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {ageData.label}
                  </p>
                  <div className="font-semibold accent-text overflow-x-auto">
                    {ageData.value}
                  </div>
                </div>
              </div>
            </>
          )}

          <HeroHighlight className="max-w-3xl mx-auto p-6 text-justify accent-text leading-loose break-words">
            <p className="mb-4">
              My journey began at <Highlight>Jefferson Community College</Highlight>, where I earned my <Highlight>A.S. in Computer Science</Highlight>, and continued at <Highlight>SUNY Polytechnic Institute</Highlight>, where I graduated <Highlight>Magna Cum Laude</Highlight> with a <Highlight>B.S. in Computer Science</Highlight> and a <Highlight>3.88 GPA</Highlight>. I enjoy solving problems, debugging code, optimizing algorithms, and building systems from the ground up. My academic background gave me a strong foundation in both theory and practical development, which I've applied through research and collaborative projects.
            </p>
            <p className="mb-4">
              I'm open to opportunities in <Highlight>software development, data analysis, IT, and other roles</Highlight> that encourage growth and continuous learning. Outside of work, I enjoy hiking in the <Highlight>Adirondacks</Highlight>, playing video games, and watching sports with friends. These activities help me stay <Highlight>curious, creative, and balanced</Highlight>.
            </p>
          </HeroHighlight>
        </div>
      </div>
    </>
  );
}
