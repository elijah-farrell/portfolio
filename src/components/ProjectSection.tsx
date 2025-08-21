import ProjectCard from "./ProjectCard";

const projects = [
  {
    title: "Portfolio Website",
    description:
      "A modern, responsive portfolio website built with React 18, TypeScript, and Vite. Features smooth animations, 3D card effects, interactive UI components, and a beautiful design system. Includes custom animations, responsive layouts, and modern web technologies for optimal performance.",
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
    title: "NexusChat",
    description:
      "Full-stack real-time chat app with 3D landing page. Features instant messaging, friend management, JWT authentication, and WebSocket communication. Built with React 18, Node.js, Express.js, PostgreSQL, Socket.IO, Material-UI, and Three.js. Deployed with Vite for optimal performance.",
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
      "Real-time Chat",
    ],
            imageUrl: "/assets/projects/nexuschat.png",
    github: "https://github.com/elijah-farrell/nexuschat",
    liveUrl: "https://nexxuschat.vercel.app",
    live: true,
  },
  {
    title: "3D Floating Laptop",
    description:
      "Interactive 3D application featuring a floating laptop with a fully functional website interface rendered directly on the 3D screen. Built with React 18, Three.js, React Three Fiber, and Vite for fast 3D rendering and development.",
    techStack: [
      "React 18",
      "Three.js",
      "React Three Fiber",
      "Vite",
      "3D Rendering",
      "Interactive 3D",
      "WebGL",
    ],
            imageUrl: "/assets/projects/3d-laptop-preview.png",
    github: "https://github.com/elijah-farrell/3d-floating-laptop",
    liveUrl: "https://3d-floating-laptop.vercel.app/",
    live: true,
  },
  {
    title: "Portfolio Template",
    description:
      "A modern, responsive portfolio template built with React 19, TypeScript, and Vite. Features smooth animations, optimized performance, and accessibility-first design. Includes customizable sections for Hero, Projects, About, Services, Experience, and Contact.",
    techStack: [
      "React 19",
      "TypeScript",
      "Vite",
      "Responsive Design",
      "Smooth Animations",
      "Accessibility",
      "Customizable",
      "Performance Optimized",
    ],
            imageUrl: "/assets/projects/portfolio-template01.png",
    github: "https://github.com/elijah-farrell/portfolio-template",
    liveUrl: "https://ef-portfolio01.vercel.app/",
    live: true,
  },
];

export default function ProjectsSection() {
  return (
    <div className="pt-5" id="projects">
      <h1 className="text-3xl font-bold mb-2">FEATURED PROJECTS</h1>
      <p className="text-gray-600 dark:text-gray-400 mb-2">
        My Work.
      </p>
      <section className="p-6 md:p-12 bg-gradient-to-b max-w-4xl mx-auto transition-colors duration-300">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 auto-rows-fr">
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
