// Types for skills
export interface Skill {
  name: string;
  experience?: string;
  description?: string;
}

export interface SkillCategory {
  category: string;
  items: Skill[];
}

export const skillsData: SkillCategory[] = [
  {
    category: "Programming Languages",
    items: [
      {
        name: "Python",
        experience: "2+ years",
        description:
          "Primary language for data analysis, automation, and AI/ML projects",
      },
      {
        name: "Java",
        experience: "3+ years",
        description: "Object-oriented programming and application development",
      },
      {
        name: "C",
        experience: "1+ years",
        description: "Systems programming and low-level development",
      },
      {
        name: "C++",
        experience: "2+ years",
        description: "Systems programming and performance-critical applications",
      },
    ],
  },
  {
    category: "IT Support",
    items: [
      {
        name: "Linux",
        experience: "4+ years",
        description: "System administration, troubleshooting, and scripting",
      },
      {
        name: "Windows",
        experience: "4+ years",
        description: "Desktop support, troubleshooting, and system management",
      },
      {
        name: "macOS/Unix",
        experience: "4+ years",
        description: "Unix-based system administration and support",
      },
      {
        name: "System Troubleshooting",
        experience: "4+ years",
        description: "Diagnosing and resolving hardware and software issues",
      },
      {
        name: "Scripting",
        experience: "2+ years",
        description: "Automation and system administration scripts",
      },
      {
        name: "Networking (TCP/IP, DHCP, DNS)",
        experience: "4+ years",
        description: "Network configuration, troubleshooting, and protocols",
      },
      {
        name: "Software Installation",
        experience: "4+ years",
        description: "Deploying and configuring software applications",
      },
      {
        name: "Virtualization",
        experience: "4+ years",
        description: "VM management and container technologies",
      },
      {
        name: "Basic System Security",
        experience: "4+ years",
        description: "Security best practices and system hardening",
      },
    ],
  },
  {
    category: "Web Development",
    items: [
      {
        name: "HTML",
        experience: "3+ years",
        description: "Web markup and structure",
      },
      {
        name: "CSS",
        experience: "3+ years",
        description: "Web styling and responsive design",
      },
      {
        name: "JavaScript",
        experience: "2+ years",
        description: "Web development and interactive applications",
      },
      {
        name: "TypeScript",
        experience: "4 months",
        description: "Type-safe JavaScript for robust applications",
      },
      {
        name: "React",
        experience: "4 months",
        description: "Frontend library for building dynamic user interfaces",
      },
      {
        name: "Tailwind CSS",
        experience: "4 months",
        description: "Utility-first CSS framework for rapid UI development",
      },
      {
        name: "Three.js",
        experience: "4 months",
        description: "3D graphics library for web applications",
      },
      {
        name: "Material-UI",
        experience: "4 months",
        description: "React component library for Material Design",
      },
      {
        name: "Vite",
        experience: "4 months",
        description: "Fast build tool for modern web projects",
      },
      {
        name: "EmailJS",
        experience: "1+ years",
        description: "Email service integration for web applications",
      },
    ],
  },
  {
    category: "Frameworks & Libraries",
    items: [
      {
        name: "Flask",
        experience: "1+ years",
        description: "Python web framework for building APIs and applications",
      },
      {
        name: "Pandas",
        experience: "1+ years",
        description: "Data manipulation and analysis library",
      },
      {
        name: "NumPy",
        experience: "1+ years",
        description: "Numerical computing and array operations",
      },
      {
        name: "PyTorch",
        experience: "6 months",
        description: "Machine learning framework for AI applications",
      },
      {
        name: "OpenCV",
        experience: "6 months",
        description: "Computer vision and image processing library",
      },
      {
        name: "HuggingFace",
        experience: "6 months",
        description: "AI model library and transformers",
      },
    ],
  },
  {
    category: "Tools & Platforms",
    items: [
      {
        name: "Git",
        experience: "3+ years",
        description: "Version control for code management",
      },
      {
        name: "Node.js",
        experience: "1+ years",
        description: "JavaScript runtime for server-side development",
      },
      {
        name: "Render",
        experience: "1+ years",
        description: "Cloud platform for hosting web applications",
      },
      {
        name: "Vercel",
        experience: "2+ years",
        description: "Frontend deployment and hosting platform",
      },
      {
        name: "Supabase",
        experience: "1+ years",
        description: "Open source Firebase alternative for backend services",
      },
      {
        name: "GCC",
        experience: "1+ years",
        description: "GNU Compiler Collection for C/C++ development",
      },
      {
        name: "CMake",
        experience: "1+ years",
        description: "Cross-platform build system generator for C/C++ projects",
      },
      {
        name: "Vim",
        experience: "1+ years",
        description: "Text editor for efficient coding",
      },
    ],
  },
  {
    category: "Databases",
    items: [
      {
        name: "MySQL",
        experience: "2+ years",
        description: "Relational database for data storage and management",
      },
      {
        name: "SQLite",
        experience: "1+ years",
        description: "Lightweight database for embedded applications",
      },
      {
        name: "Firebase",
        experience: "1+ years",
        description: "Google's mobile and web application platform",
      },
      {
        name: "PostgreSQL",
        experience: "1+ years",
        description: "Advanced open source relational database",
      },
    ],
  },
];
