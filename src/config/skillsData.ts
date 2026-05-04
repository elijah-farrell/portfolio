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
        name: "Windows",
        experience: "2+ years",
        description: "Desktop support, troubleshooting, and system management",
      },
      {
        name: "Linux",
        experience: "1+ years",
        description: "Command line operations and basic system administration",
      },
      {
        name: "macOS",
        experience: "1+ years",
        description: "Apple system support and troubleshooting",
      },
      {
        name: "Hardware",
        experience: "2+ years",
        description: "PC assembly, component diagnosis, and hardware repair",
      },
      {
        name: "Troubleshooting",
        experience: "2+ years",
        description: "Diagnosing and resolving software and OS issues",
      },
      {
        name: "Networking",
        experience: "1+ years",
        description: "TCP/IP, DHCP, DNS, and basic network troubleshooting",
      },
      {
        name: "Software",
        experience: "2+ years",
        description: "Application deployment and configuration",
      },
      {
        name: "Mobile",
        experience: "1+ years",
        description: "iOS and Android troubleshooting and configuration",
      },
      {
        name: "Security",
        experience: "1+ years",
        description: "Antivirus, firewalls, and basic security practices",
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
        name: "Vite",
        experience: "4 months",
        description: "Fast build tool for modern web projects",
      },
      {
        name: "Vercel",
        experience: "2+ years",
        description: "Frontend deployment and hosting platform",
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
