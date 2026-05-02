import ProjectCard from "../../components/ui/common/project-card";

const projects = [
  {
    title: "More-Armor Mod",
    description:
      "A Minecraft Forge mod that adds 36 unique armor sets with beautiful animations and unique designs. Features fully configurable armor stats and stunning visual effects.",
    techStack: [
      "Java",
      "Minecraft 1.20.1",
      "Minecraft Forge",
      "Gradle",
    ],
    imageUrl: "/assets/projects/MoreArmorLogo.webp",
    imageSrcSet:
      "/assets/projects/MoreArmorLogo-400w.webp 400w, /assets/projects/MoreArmorLogo-800w.webp 800w",
    github: "https://github.com/elijah-farrell/More-Armor",
    liveUrl: "https://www.curseforge.com/minecraft/mc-mods/more-armorsets",
    live: true,
  },
  {
    title: "Awwwards Portfolio",
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
    imageSrcSet:
      "/assets/projects/awwards-400w.webp 400w, /assets/projects/awwards-800w.webp 800w",
    github: "https://github.com/elijah-farrell/Awwwards-Portfolio",
    liveUrl: "https://awwwards-portfolio-template.vercel.app/",
    live: true,
  },
  {
    title: "Olie's Island Adventure",
    description:
      "Godot 4.5 2D platformer — seaside setting, coins, enemies, and traps. Work in progress: a playable proof of concept I’m building out slowly in my spare time.",
    techStack: [
      "Godot 4.5",
      "GDScript",
      "2D Physics",
      "Mobile & Web Export",
    ],
    imageUrl: "/assets/projects/olies-island-adventure-cover-800w.webp",
    imageSrcSet:
      "/assets/projects/olies-island-adventure-cover-400w.webp 400w, /assets/projects/olies-island-adventure-cover-800w.webp 800w",
    liveUrl: "https://olies-island-adventure.vercel.app/",
    live: true,
  },
  {
    title: "Cyber Developer Portfolio",
    description:
      "Cyberpunk-inspired — magnetic UI, GSAP motion, command palette (Ctrl/Cmd+K), live Discord status, optional dashboards, Snake easter egg. Still in active development.",
    techStack: [
      "Next.js 16",
      "TypeScript",
      "Tailwind CSS v4",
      "GSAP",
      "Lanyard",
      "Vitest",
      "Playwright",
    ],
    imageUrl: "/assets/projects/cyber-developer-portfolio-800w.webp",
    imageSrcSet:
      "/assets/projects/cyber-developer-portfolio-400w.webp 400w, /assets/projects/cyber-developer-portfolio-800w.webp 800w",
    liveUrl: "https://elijahfarrell.vercel.app/",
    live: true,
  },
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
              imageSrcSet={project.imageSrcSet}
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
