import ProjectCardNew from "../ui/common/ProjectCardNew";

const projects = [
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

export default function ProjectsNew() {
  return (
    <div className="pt-8" id="projects">
      <h1 className="text-3xl font-bold mb-2">FEATURED PROJECTS</h1>
      <p className="text-gray-600 dark:text-gray-400 mb-2">
        A showcase of my recent work, highlighting the technologies I've used and the problems I've solved.
      </p>
      <section className="p-6 md:p-12 bg-gradient-to-b max-w-4xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {projects.map((project, index) => (
            <div key={index} className="max-w-md mx-auto">
              <ProjectCardNew
                title={project.title}
                description={project.description}
                techStack={project.techStack}
                imageUrl={project.imageUrl}
                github={project.github}
                liveUrl={project.liveUrl}
                live={project.live}
              />
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
