import { SiGithub, SiGoogleplay } from "react-icons/si";
import { Badge } from "@/components/ui/common/badge";
import { Button } from "@/components/ui/common/button";
import { GoLinkExternal } from "react-icons/go";

interface ProjectProps {
  title: string;
  description: string;
  techStack: string[];
  imageUrl: string;
  github?: string;
  liveUrl?: string;
  playstore?: string;
  live?: boolean;
}

const projects: ProjectProps[] = [
  {
    title: "Portfolio Website",
    description:
      "My personal portfolio showcasing my projects, experience, and skills with an interactive design.",
    techStack: [
      "React 18",
      "TypeScript",
      "Vite",
      "Tailwind CSS",
      "Three.js Effects",
      "Framer Motion",
      "Aceternity UI",
    ],
    imageUrl: "/assets/projects/portfolio-thumb.png",
    github: "https://github.com/elijah-farrell/portfolio",
    liveUrl: "https://elijahfarrell.com",
    live: true,
  },
  {
    title: "More-Armor Mod",
    description:
      "A comprehensive Minecraft Forge mod that adds 36 unique armor sets with beautiful animations and unique designs. Features fully configurable armor stats and stunning visual effects.",
    techStack: [
      "Java",
      "Minecraft 1.20.1",
      "Minecraft Forge",
      "Gradle",
    ],
    imageUrl: "/assets/projects/MoreArmorLogo.png",
    github: "https://github.com/elijah-farrell/More-Armor",
    liveUrl: "https://www.curseforge.com/minecraft/mc-mods/more-armorsets",
    live: true,
  },
  {
    title: "Portfolio Template",
    description:
      "Minimal portfolio template focused on showcasing your work without distractions.",
    techStack: [
      "Next.js 15",
      "React 19",
      "TypeScript",
      "Tailwind CSS",
      "Aceternity UI",
      "Shadcn UI",
      "Radix UI",
      "Framer Motion",
    ],
    imageUrl: "/assets/projects/minimal.png",
    github: "https://github.com/elijah-farrell/portfolio-tempalte03",
    liveUrl: "https://ef-portfolio03.vercel.app",
    live: true,
  },
  {
    title: "DownGit",
    description:
      "Download any GitHub repository or folder as a ZIP file with a simple link. No need to clone repos or use Git commands - just paste a GitHub URL and get your files instantly.",
    techStack: [
      "Next.js 14",
      "React 18",
      "TypeScript",
      "Three.js",
      "React Three Fiber",
      "Tailwind CSS",
      "Radix UI",
      "GitHub API",
    ],
    imageUrl: "/assets/projects/downgit.png",
    github: "https://github.com/elijah-farrell/downgit",
    liveUrl: "https://ef-downgit.vercel.app",
    live: true,
  },
];

export default function ProjectsModern() {
  return (
    <div className="pt-8" id="projects">
      <h1 className="text-3xl font-bold mb-2">FEATURED PROJECTS</h1>
      <p className="text-gray-600 dark:text-gray-400 mb-8">
        A showcase of my recent work, highlighting the technologies I've used and the problems I've solved.
      </p>
      
      <div className="space-y-12">
        {projects.map((project, index) => (
          <div key={index} className="group">
            <div className="flex flex-col lg:flex-row gap-8 items-start">
              {/* Image */}
              <div className="flex-shrink-0 w-full max-w-sm mx-auto lg:w-80 lg:mx-0">
                <div className="relative overflow-hidden rounded-xl bg-gray-100 dark:bg-gray-800">
                  <img
                    src={project.imageUrl}
                    alt={project.title}
                    className={`w-full h-48 lg:h-64 group-hover:scale-105 transition-transform duration-300 ${
                      project.title === "More-Armor Mod" ? "object-cover" : "object-contain"
                    }`}
                  />
                  {project.live && (
                    <div className="absolute top-4 right-4">
                      <span className="inline-block h-3 w-3 rounded-full bg-emerald-500"></span>
                    </div>
                  )}
                </div>
              </div>

              {/* Content */}
              <div className="flex-1 space-y-4">
                <div>
                  <h3 className="text-xl font-semibold mb-2">{project.title}</h3>
                  <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                    {project.description}
                  </p>
                </div>

                {/* Tech Stack */}
                <div>
                  <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">Technologies</h4>
                  <div className="flex flex-wrap gap-2">
                    {project.techStack.map((tech, techIndex) => (
                      <Badge
                        key={techIndex}
                        variant="outline"
                        className="font-normal rounded-full"
                      >
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Links */}
                <div className="flex gap-3 pt-2">
                  {project.github && (
                    <Button variant="outline" size="sm" className="transition-none" asChild>
                      <a href={project.github} target="_blank" rel="noopener noreferrer">
                        <SiGithub className="mr-2" />
                        Code
                      </a>
                    </Button>
                  )}
                  {project.playstore && (
                    <Button variant="outline" size="sm" asChild>
                      <a href={project.playstore} target="_blank" rel="noopener noreferrer">
                        <SiGoogleplay className="mr-2" />
                        App
                      </a>
                    </Button>
                  )}
                  {project.liveUrl && (
                    <Button variant="default" size="sm" asChild>
                      <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                        <GoLinkExternal className="mr-2" />
                        Live Demo
                      </a>
                    </Button>
                  )}
                </div>
              </div>
            </div>
            
            {/* Separator */}
            {index < projects.length - 1 && (
              <div className="mt-12 border-t border-gray-200 dark:border-gray-700"></div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
