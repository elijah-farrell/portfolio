import ProjectCard from "../../components/ui/common/project-card";

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
            imageUrl: "/assets/projects/portfolio-thumb.webp",
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
    imageUrl: "/assets/projects/MoreArmorLogo.webp",
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
    imageUrl: "/assets/projects/minimal.webp",
    github: "https://github.com/elijah-farrell/portfolio-tempalte03",
    liveUrl: "https://ef-portfolio03.vercel.app",
    live: true,
  },
  {
    title: "3D Awwwards Portfolio Template",
    description:
      "A fully animated 3D developer portfolio template with scroll-based interactions designed to showcase work in an immersive way.",
    techStack: [
      "React 19",
      "JavaScript",
      "Vite",
      "Tailwind CSS",
      "Three.js",
      "GSAP",
      "Framer Motion",
    ],
    imageUrl: "/assets/projects/awwards.webp",
    github: "https://github.com/elijah-farrell/Awwwards-Portfolio",
    liveUrl: "https://awwwards-portfolio-template.vercel.app/",
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

export default function Projects() {
  return (
    <div className="pt-8" id="projects">
      <h1 className="text-3xl font-bold mb-2">FEATURED PROJECTS</h1>
      <p className="text-neutral-600 dark:text-neutral-400 mb-2">
        A showcase of my recent work, highlighting the technologies I've used and the problems I've solved.
      </p>
      <section className="p-6 md:p-12 bg-gradient-to-b max-w-4xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 auto-rows-[1fr] justify-items-center">
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
