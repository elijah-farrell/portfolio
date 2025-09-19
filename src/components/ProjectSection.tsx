import ProjectCard from "./ProjectCard";

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
      "Framer Motion",
      "Radix UI",
      "Aceternity UI",
      "Three.js Effects",
      "Responsive Design",
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
      "A modern, responsive portfolio website template built with Next.js and shadcn/ui components. Features clean minimal design, dark mode support, and optimized performance for all devices.",
    techStack: [
      "Next.js 15",
      "React 19",
      "TypeScript",
      "Tailwind CSS",
      "shadcn/ui",
      "next-themes",
      "Responsive Design",
      "Framer Motion",
    ],
    imageUrl: "/assets/projects/thumbnail.png",
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
      "3D Graphics",
    ],
    imageUrl: "/assets/projects/downgit.png",
    github: "https://github.com/elijah-farrell/downgit",
                liveUrl: "https://ef-downgit.vercel.app", // Update with actual URL when deployed
    live: true,
  },
  // Temporarily removed Portfolio Template project
  // {
  //   title: "Portfolio Template",
  //   description:
  //     "A modern, responsive portfolio template built with React 19, TypeScript, and Vite. Features smooth animations, optimized performance, and accessibility-first design. Includes customizable sections for Hero, Projects, About, Services, Experience, and Contact.",
  //   techStack: [
  //     "React 19",
  //     "TypeScript",
  //     "Vite",
  //     "Responsive Design",
  //     "Smooth Animations",
  //     "Accessibility",
  //     "Customizable",
  //     "Performance Optimized",
  //   ],
  //   imageUrl: "/assets/projects/portfolio-template01.png",
  //   github: "https://github.com/elijah-farrell/portfolio-template",
  //   liveUrl: "https://ef-portfolio01.vercel.app/",
  //   live: true,
  // },
];

export default function ProjectsSection() {
  return (
    <div className="pt-5" id="projects">
      <h1 className="text-3xl font-bold mb-2">FEATURED PROJECTS</h1>
      <p className="text-gray-600 dark:text-gray-400 mb-2">
        My Work.
      </p>
      <section className="p-6 md:p-12 bg-gradient-to-b max-w-4xl mx-auto transition-colors duration-300">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 auto-rows-fr justify-items-center">
          {projects.map((project, index) => (
            <ProjectCard
              key={index}
              title={project.title}
              description={project.description}
              techStack={project.techStack}
              imageUrl={project.imageUrl}
              github={project.github}
              liveUrl={project.liveUrl}
              live={project.live}
            />
          ))}
        </div>
      </section>
    </div>
  );
}
