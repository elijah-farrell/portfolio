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
      "Three.js Effects",
      "Responsive Design",
    ],
            imageUrl: "/assets/projects/portfolio-thumb.png",
    github: "https://github.com/elijah-farrell/portfolio",
    liveUrl: "https://elijahfarrell.com",
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
  {
    title: "NexusChat",
    description:
      "A real-time chat application where users can send instant messages, manage friends, and communicate seamlessly. Features secure authentication and live messaging with a modern 3D interface.",
    techStack: [
      "React 18",
      "Node.js",
      "Express.js",
      "PostgreSQL",
      "Socket.IO",
      "Material-UI",
      "Three.js",
      "JWT Authentication",
      "WebSockets",
    ],
            imageUrl: "/assets/projects/nexuschat.png",
    github: "https://github.com/elijah-farrell/nexuschat",
    liveUrl: "https://nexxuschat.vercel.app",
    live: true,
  },
  {
    title: "3D Floating Laptop",
    description:
      "A 3D floating laptop that displays a fully functional website on its screen. Users can interact with the website directly through the 3D interface, creating an immersive browsing experience.",
    techStack: [
      "React 18",
      "Three.js",
      "React Three Fiber",
      "Vite",
      "WebGL",
    ],
            imageUrl: "/assets/projects/3d-laptop-preview.png",
    github: "https://github.com/elijah-farrell/3d-floating-laptop",
    liveUrl: "https://3d-floating-laptop.vercel.app/",
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
