import {
  SiCplusplus,
  SiCss3,
  SiGithub,
  SiGoogle,
  SiHtml5,
  SiJavascript,
  SiMongodb,
  SiMysql,
  SiPostgresql,
  SiPython,
  SiReact,
  SiSqlite,
  SiTailwindcss,
  SiTypescript,
  SiZoho,
} from "react-icons/si";
import {
  FaApple,
  FaCode,
  FaCogs,
  FaDatabase,
  FaDesktop,
  FaGlobe,
  FaJava,
  FaLinux,
  FaMicrosoft,
  FaNetworkWired,
  FaShieldAlt,
  FaTools,
  FaUsers,
  FaWindows,
  FaWrench,
} from "react-icons/fa";
import { DiMsqlServer } from "react-icons/di";
import { TbSql } from "react-icons/tb";
import { VscVscode } from "react-icons/vsc";
import { CardSpotlight } from "../../components/ui/aceternity/card-spotlight";
import { useEffect, useState } from "react";
import { skillsData, type SkillCategory } from "../../config/skillsData";
import {
  Modal,
  ModalBody,
  ModalContent,
  useModal,
} from "../../components/ui/shadcn/animated-modal";

// Tooltip component (desktop & wide screens)
interface TooltipProps {
  children: React.ReactNode;
  content: React.ReactNode;
}

const Tooltip = ({ children, content }: TooltipProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    if (typeof document === "undefined") return;

    const update = () => {
      setIsDark(document.documentElement.classList.contains("dark"));
    };

    update();

    const observer = new MutationObserver(update);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div
      className="relative inline-block"
      onMouseEnter={() => setIsVisible(true)}
      onMouseLeave={() => setIsVisible(false)}
    >
      {children}
      {isVisible && (
        <div
          className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 rounded-lg shadow-xl z-50 border text-xs"
          style={{
            backgroundColor: isDark ? "#171717" : "#F8FAFB",
            borderColor: "#404040",
          }}
        >
          <div className="w-60 break-words">{content}</div>
          <div
            className="absolute top-full left-1/2 transform -translate-x-1/2 border-4 border-transparent"
            style={{ borderTopColor: "#171717" }}
          ></div>
        </div>
      )}
    </div>
  );
};

const iconMap: Record<string, JSX.Element> = {
  "Active Directory": <FaUsers />,
  "Hardware & Software Troubleshooting": <FaWrench />,
  "Basic Networking (TCP/IP, DNS, DHCP, VPN)": <FaNetworkWired />,
  Windows: <FaWindows />,
  Linux: <FaLinux />,
  macOS: <FaApple />,
  "Remote Desktop (RDP, VNC)": <FaDesktop />,
  "Cybersecurity Basics": <FaShieldAlt />,
  "Ticketing Systems (Zoho)": <SiZoho />,
  Python: <SiPython />,
  Java: <FaJava />,
  "C++": <SiCplusplus />,
  JavaScript: <SiJavascript />,
  TypeScript: <SiTypescript />,
  HTML: <SiHtml5 />,
  CSS: <SiCss3 />,
  React: <SiReact />,
  "Tailwind CSS": <SiTailwindcss />,
  SQL: <TbSql />,
  MySQL: <SiMysql />,
  PostgreSQL: <SiPostgresql />,
  SQLite: <SiSqlite />,
  MongoDB: <SiMongodb />,
  "SQL Server": <DiMsqlServer />,
  "Git/GitHub": <SiGithub />,
  "Visual Studio Code": <VscVscode />,
  "Microsoft 365": <FaMicrosoft />,
  "Google Workspace": <SiGoogle />,
};

// Category icon map
const categoryIconMap: Record<string, JSX.Element> = {
  "IT Systems": <FaCogs />,
  Programming: <FaCode />,
  "Web Development": <FaGlobe />,
  Databases: <FaDatabase />,
  Tools: <FaTools />,
};

interface SkillCategoryCardMobileProps {
  skillCategory: SkillCategory;
}

const SkillCategoryCardMobile: React.FC<SkillCategoryCardMobileProps> = ({
  skillCategory,
}) => {
  const { setOpen } = useModal();

  const handleClick = () => {
    setOpen(true);
  };

  return (
    <CardSpotlight
      className="p-4 rounded-2xl shadow-sm hover:shadow-lg transition-shadow duration-500 ease-in-out"
      onClick={handleClick}
    >
      <h3 className="text-xl mb-3 font-bold relative z-20 flex items-center gap-2 text-[var(--text)]">
        {categoryIconMap[skillCategory.category] && (
          <span className="text-emerald-600">
            {categoryIconMap[skillCategory.category]}
          </span>
        )}
        {skillCategory.category}
      </h3>
      <ul className="flex flex-wrap gap-2">
        {skillCategory.items.map((item, i) => {
          const content = (
            <span
              className="relative z-20 flex items-center gap-2 px-3 py-1 rounded-2xl text-sm transition-transform ease-in-out duration-300 bg-gray-100 dark:bg-neutral-900 text-neutral-900 dark:text-white cursor-pointer hover:bg-emerald-600 dark:hover:bg-emerald-600 hover:text-white hover:scale-105"
            >
              {iconMap[item.name] && (
                <span className="text-lg">{iconMap[item.name]}</span>
              )}
              <span>{item.name}</span>
            </span>
          );

          return (
            <li key={i}>{content}</li>
          );
        })}
      </ul>
    </CardSpotlight>
  );
};

interface SkillCategoryCardDesktopProps {
  skillCategory: SkillCategory;
}

const SkillCategoryCardDesktop: React.FC<SkillCategoryCardDesktopProps> = ({
  skillCategory,
}) => {
  return (
    <CardSpotlight className="p-4 rounded-2xl shadow-sm hover:shadow-lg transition-shadow duration-500 ease-in-out">
      <h3 className="text-xl mb-3 font-bold relative z-20 flex items-center gap-2 text-[var(--text)]">
        {categoryIconMap[skillCategory.category] && (
          <span className="text-emerald-600">
            {categoryIconMap[skillCategory.category]}
          </span>
        )}
        {skillCategory.category}
      </h3>
      <ul className="flex flex-wrap gap-2">
        {skillCategory.items.map((item, i) => {
          const content = (
            <span
              className="relative z-20 flex items-center gap-2 px-3 py-1 rounded-2xl text-sm transition-transform ease-in-out duration-300 bg-gray-100 dark:bg-neutral-900 text-neutral-900 dark:text-white cursor-help hover:bg-emerald-600 dark:hover:bg-emerald-600 hover:text-white hover:scale-105"
            >
              {iconMap[item.name] && (
                <span className="text-lg">{iconMap[item.name]}</span>
              )}
              <span>{item.name}</span>
            </span>
          );

          return (
            <li key={i}>
              <Tooltip
                content={
                  <div className="text-left space-y-2 text-neutral-900 dark:text-white">
                    <div className="font-semibold">{item.name}</div>
                    {item.description && (
                      <div className="text-xs text-gray-700 dark:text-gray-200 leading-relaxed">
                        {item.description}
                      </div>
                    )}
                  </div>
                }
              >
                {content}
              </Tooltip>
            </li>
          );
        })}
      </ul>
    </CardSpotlight>
  );
};

interface SkillCategoryModalContentProps {
  skillCategory: SkillCategory;
}

const SkillCategoryModalContent: React.FC<SkillCategoryModalContentProps> = ({
  skillCategory,
}) => {
  return (
    <div className="space-y-4">
      <ul className="space-y-3 max-h-[70vh] overflow-y-auto pr-1 scrollbar-hide">
        {skillCategory.items.map((item, i) => (
          <li
            key={i}
            className="flex gap-3 items-start border-b border-neutral-200/60 dark:border-neutral-800/80 pb-3 last:border-0 last:pb-0"
          >
            {iconMap[item.name] && (
              <span className="mt-1 text-xl text-emerald-500">
                {iconMap[item.name]}
              </span>
            )}
            <div className="space-y-1">
              <div className="font-semibold text-[var(--text)]">
                {item.name}
              </div>
              {item.description && (
                <div className="text-xs text-gray-700 dark:text-gray-200 leading-relaxed">
                  {item.description}
                </div>
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default function Skills() {
  const [isBelow950, setIsBelow950] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const handleResize = () => {
      setIsBelow950(window.innerWidth < 950);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="pt-8" id="skills">
      <h1 className="text-3xl font-bold mb-2 text-[var(--text)]">TECHNICAL SKILLS</h1>
      <p className="text-neutral-600 dark:text-neutral-400 mb-4">
        Technical skills I use as an Information Systems Specialist, built on my CS education and hands-on troubleshooting.
      </p>

      <section className="p-4 md:p-8 bg-gradient-to-b max-w-4xl">
        <div className="grid grid-cols-1 md:grid-cols-1 gap-6">
          {skillsData.map((skillCategory, idx) => (
            isBelow950 ? (
              <Modal key={idx}>
                <SkillCategoryCardMobile skillCategory={skillCategory} />
                <ModalBody>
                  <ModalContent
                    title={
                      <h3 className="text-2xl max-[475px]:text-xl max-[380px]:text-lg font-bold flex items-center gap-2 text-[var(--text)] leading-tight">
                        {categoryIconMap[skillCategory.category] && (
                          <span className="text-emerald-600">
                            {categoryIconMap[skillCategory.category]}
                          </span>
                        )}
                        {skillCategory.category}
                      </h3>
                    }
                  >
                    <SkillCategoryModalContent skillCategory={skillCategory} />
                  </ModalContent>
                </ModalBody>
              </Modal>
            ) : (
              <SkillCategoryCardDesktop key={idx} skillCategory={skillCategory} />
            )
          ))}
        </div>
      </section>
    </div>
  );
}
