import {
  SiCss3,
  SiGit,
  SiGithub,
  SiHtml5,
  SiJavascript,
  SiMysql,
  SiNodedotjs,
  SiPostgresql,
  SiPython,
  SiReact,
  SiTailwindcss,
  SiTypescript,
  SiVercel,
  SiVite,
  SiFirebase,
  SiSupabase,
  SiVim,
  SiFlask,
  SiPandas,
  SiNumpy,
  SiPytorch,
  SiOpencv,
  SiHuggingface,
  SiThreedotjs,
  SiGtk,
  SiWebgl,
  SiC,
  SiCplusplus,
  SiRender,
} from "react-icons/si";
import {
  FaCode,
  FaRobot,
  FaDatabase,
  FaCloud,
  FaBookOpen,
  FaPalette,
  FaCog,
  FaTools,
  FaCogs,
  FaProjectDiagram,
  FaLayerGroup,
  FaBrain,
  FaChartBar,
  FaUsers,
  FaSync,
  FaStream,
  FaTheaterMasks,
  FaJava,
} from "react-icons/fa";
import { VscAzure, VscVscode } from "react-icons/vsc";
import { BsFiletypeXml } from "react-icons/bs";
import { DiMsqlServer } from "react-icons/di";
import { GoCopilot } from "react-icons/go";
import { BiCodeBlock } from "react-icons/bi";
import { MdDesignServices, MdArchitecture } from "react-icons/md";
import { CardSpotlight } from "./ui/card-spotlight";
import { useState } from "react";
import { skillsData, type Skill } from "../config/skillsData";
import { PiOpenAiLogo } from "react-icons/pi";
import { LuMail } from "react-icons/lu";

// Tooltip component
interface TooltipProps {
  children: React.ReactNode;
  content: React.ReactNode;
}

const Tooltip = ({ children, content }: TooltipProps) => {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <div
      className="relative inline-block"
      onMouseEnter={() => setIsVisible(true)}
      onMouseLeave={() => setIsVisible(false)}
    >
      {children}
      {isVisible && (
        <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 bg-black text-white text-xs rounded-lg shadow-xl z-50 border border-gray-600">
          <div className="w-60 break-words">{content}</div>
          <div className="absolute top-full left-1/2 transform -translate-x-1/2 border-4 border-transparent border-t-black"></div>
        </div>
      )}
    </div>
  );
};

const iconMap: Record<string, JSX.Element> = {
  Python: <SiPython />,
  Java: <FaJava />,
  C: <SiC />,
  "C++": <SiCplusplus />,
  JavaScript: <SiJavascript />,
  TypeScript: <SiTypescript />,
  HTML: <SiHtml5 />,
  CSS: <SiCss3 />,
  React: <SiReact />,
  Flask: <SiFlask />,
  Pandas: <SiPandas />,
  NumPy: <SiNumpy />,
  PyTorch: <SiPytorch />,
  OpenCV: <SiOpencv />,
  HuggingFace: <SiHuggingface />,
  "Tailwind CSS": <SiTailwindcss />,
  EmailJS: <LuMail />,
  "Three.js": <SiThreedotjs />,
  "Material-UI": <SiReact />,
  Git: <SiGit />,
  Vite: <SiVite />,
  "Node.js": <SiNodedotjs />,
  Render: <SiRender />,
  Vercel: <SiVercel />,
  Supabase: <SiSupabase />,
  Vim: <SiVim />,
  MySQL: <SiMysql />,
  SQLite: <FaDatabase />,
  Firebase: <SiFirebase />,
  PostgreSQL: <SiPostgresql />,
  Ollama: <FaRobot />,
  "LLM Integration": <FaBrain />,
  "Multi-agent Systems": <FaProjectDiagram />,
  "Prompt Engineering": <FaBrain />,
  "Distributed Systems": <FaLayerGroup />,
  "Real-time Communication": <FaStream />,
  GTK: <SiGtk />,
  WebGL: <SiWebgl />,
};

// Category icon map
const categoryIconMap: Record<string, JSX.Element> = {
  "Programming Languages": <FaCode />,
  "IT Support": <FaCogs />,
  "Web Development": <SiReact />,
  "Frameworks & Libraries": <FaPalette />,
  "Tools & Platforms": <FaTools />,
  Databases: <FaDatabase />,
  "Soft Skills": <FaUsers />,
};

export default function SkillsSection() {
  return (
    <div className="pt-5" id="skills">
      <h1 className="text-3xl font-bold mb-2">TECHNICAL SKILLS</h1>
      <p className="text-gray-600 dark:text-gray-400 mb-6">
        These are many of the technical skills that I have acquired thus far in my computer science career. I am not claiming to be a master in all of these skills, that would be amazing, but it is simply not true. With that said, I am confident that I can hold a position that utilizes any of these following competencies and increase my mastery in any of these skills if needed.
      </p>

      <section className="p-6 md:p-12 bg-gradient-to-b max-w-4xl mx-auto transition-colors duration-300">
        <div className="grid grid-cols-1 md:grid-cols-1 gap-6">
          {skillsData.map((skill, idx) => (
            <CardSpotlight
              key={idx}
              className=" p-4 rounded-2xl shadow-sm hover:shadow-lg duration-500 ease-in-out transition-all"
            >
              <h3 className="text-xl mb-3 text-grey-700 font-bold dark:text-gray-100 relative z-20 flex items-center gap-2">
                {categoryIconMap[skill.category] && (
                  <span className="text-emerald-600">
                    {categoryIconMap[skill.category]}
                  </span>
                )}
                {skill.category}
              </h3>
              <ul className="flex flex-wrap gap-2">
                {skill.items.map((item, i) => (
                  <li key={i}>
                    <Tooltip
                      content={
                        <div className="text-left space-y-2">
                          <div className="font-semibold text-white">
                            {item.name}
                          </div>
                          {item.experience && (
                            <div className="text-xs text-gray-400">
                              Experience: {item.experience}
                            </div>
                          )}
                          {item.description && (
                            <div className="text-xs text-gray-300 leading-relaxed">
                              {item.description}
                            </div>
                          )}
                        </div>
                      }
                    >
                      <span
                        className={`relative z-20 flex items-center gap-2 px-3 py-1 rounded-2xl text-sm transition-all ease-in-out duration-300 bg-slate-100 dark:bg-zinc-900 text-slate-900 hover:text-slate-100 dark:text-gray-200 cursor-help hover:bg-emerald-600 dark:hover:bg-emerald-600 hover:scale-105`}
                      >
                        {iconMap[item.name] && (
                          <span className="text-lg">{iconMap[item.name]}</span>
                        )}
                        <span>{item.name}</span>
                      </span>
                    </Tooltip>
                  </li>
                ))}
              </ul>
            </CardSpotlight>
          ))}
        </div>
      </section>
    </div>
  );
}
