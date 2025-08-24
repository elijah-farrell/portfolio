// Types for skills
export interface Skill {
  name: string;
  level: "Beginner" | "Intermediate" | "Advanced" | "Expert";
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
        level: "Advanced",
        experience: "2+ years",
        description:
          "Primary language for data analysis, automation, and AI/ML projects",
      },
      {
        name: "Java",
        level: "Intermediate",
        experience: "1+ years",
        description: "Object-oriented programming and application development",
      },
      {
        name: "C",
        level: "Intermediate",
        experience: "1+ years",
        description: "Systems programming and low-level development",
      },
      {
        name: "C++",
        level: "Intermediate",
        experience: "1+ years",
        description: "Systems programming and performance-critical applications",
      },
      {
        name: "JavaScript",
        level: "Advanced",
        experience: "2+ years",
        description: "Web development and interactive applications",
      },
      {
        name: "TypeScript",
        level: "Advanced",
        experience: "2+ years",
        description: "Type-safe JavaScript for robust applications",
      },
      {
        name: "HTML",
        level: "Expert",
        experience: "3+ years",
        description: "Web markup and structure",
      },
      {
        name: "CSS",
        level: "Advanced",
        experience: "2+ years",
        description: "Web styling and responsive design",
      },
    ],
  },
  {
    category: "Frameworks & Libraries",
    items: [
      {
        name: "React",
        level: "Advanced",
        experience: "2+ years",
        description: "Frontend library for building dynamic user interfaces",
      },
      {
        name: "Flask",
        level: "Intermediate",
        experience: "1+ years",
        description: "Python web framework for building APIs and applications",
      },
      {
        name: "Pandas",
        level: "Intermediate",
        experience: "1+ years",
        description: "Data manipulation and analysis library",
      },
      {
        name: "NumPy",
        level: "Intermediate",
        experience: "1+ years",
        description: "Numerical computing and array operations",
      },
      {
        name: "PyTorch",
        level: "Beginner",
        experience: "6 months",
        description: "Machine learning framework for AI applications",
      },
      {
        name: "OpenCV",
        level: "Beginner",
        experience: "6 months",
        description: "Computer vision and image processing library",
      },
      {
        name: "HuggingFace",
        level: "Beginner",
        experience: "6 months",
        description: "AI model library and transformers",
      },
      {
        name: "Tailwind CSS",
        level: "Advanced",
        experience: "2+ years",
        description: "Utility-first CSS framework for rapid UI development",
      },
      {
        name: "EmailJS",
        level: "Intermediate",
        experience: "1+ years",
        description: "Email service integration for web applications",
      },
      {
        name: "Three.js",
        level: "Intermediate",
        experience: "1+ years",
        description: "3D graphics library for web applications",
      },
      {
        name: "Material-UI",
        level: "Intermediate",
        experience: "1+ years",
        description: "React component library for Material Design",
      },
    ],
  },
  {
    category: "Tools & Platforms",
    items: [
      {
        name: "Git",
        level: "Advanced",
        experience: "2+ years",
        description: "Version control for code management",
      },
      {
        name: "Vite",
        level: "Advanced",
        experience: "2+ years",
        description: "Fast build tool for modern web projects",
      },
      {
        name: "Node.js",
        level: "Intermediate",
        experience: "1+ years",
        description: "JavaScript runtime for server-side development",
      },
      {
        name: "Render",
        level: "Intermediate",
        experience: "1+ years",
        description: "Cloud platform for hosting web applications",
      },
      {
        name: "Vercel",
        level: "Advanced",
        experience: "2+ years",
        description: "Frontend deployment and hosting platform",
      },
      {
        name: "Supabase",
        level: "Intermediate",
        experience: "1+ years",
        description: "Open source Firebase alternative for backend services",
      },
      {
        name: "GCC",
        level: "Intermediate",
        experience: "1+ years",
        description: "GNU Compiler Collection for C/C++ development",
      },
      {
        name: "Vim",
        level: "Intermediate",
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
        level: "Intermediate",
        experience: "1+ years",
        description: "Relational database for data storage and management",
      },
      {
        name: "SQLite",
        level: "Intermediate",
        experience: "1+ years",
        description: "Lightweight database for embedded applications",
      },
      {
        name: "Firebase",
        level: "Intermediate",
        experience: "1+ years",
        description: "Google's mobile and web application platform",
      },
      {
        name: "PostgreSQL",
        level: "Intermediate",
        experience: "1+ years",
        description: "Advanced open source relational database",
      },
    ],
  },
  {
    category: "IT Support",
    items: [
      {
        name: "Linux",
        level: "Intermediate",
        experience: "1+ years",
        description: "System administration, troubleshooting, and scripting",
      },
      {
        name: "Windows",
        level: "Intermediate",
        experience: "1+ years",
        description: "Desktop support, troubleshooting, and system management",
      },
      {
        name: "macOS/Unix",
        level: "Intermediate",
        experience: "1+ years",
        description: "Unix-based system administration and support",
      },
      {
        name: "System Troubleshooting",
        level: "Intermediate",
        experience: "1+ years",
        description: "Diagnosing and resolving hardware and software issues",
      },
      {
        name: "Scripting",
        level: "Intermediate",
        experience: "1+ years",
        description: "Automation and system administration scripts",
      },
      {
        name: "Networking (TCP/IP, DHCP, DNS)",
        level: "Intermediate",
        experience: "1+ years",
        description: "Network configuration, troubleshooting, and protocols",
      },
      {
        name: "Software Installation",
        level: "Intermediate",
        experience: "1+ years",
        description: "Deploying and configuring software applications",
      },
      {
        name: "Virtualization",
        level: "Intermediate",
        experience: "1+ years",
        description: "VM management and container technologies",
      },
      {
        name: "Basic System Security",
        level: "Intermediate",
        experience: "1+ years",
        description: "Security best practices and system hardening",
      },
    ],
  },
  {
    category: "Soft Skills",
    items: [
      {
        name: "Problem-solving",
        level: "Advanced",
        experience: "2+ years",
        description: "Analytical thinking and systematic issue resolution",
      },
      {
        name: "Teamwork",
        level: "Advanced",
        experience: "2+ years",
        description: "Collaboration and effective group dynamics",
      },
      {
        name: "Customer Service",
        level: "Advanced",
        experience: "2+ years",
        description: "User support and satisfaction-focused assistance",
      },
      {
        name: "Written Communication",
        level: "Advanced",
        experience: "2+ years",
        description: "Clear documentation and technical writing",
      },
      {
        name: "Research",
        level: "Advanced",
        experience: "2+ years",
        description: "Information gathering and solution discovery",
      },
      {
        name: "GRIT",
        level: "Advanced",
        experience: "2+ years",
        description: "Perseverance and determination in challenging situations",
      },
    ],
  },
];
