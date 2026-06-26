// Types for skills
export interface Skill {
  name: string;
  description?: string;
}

export interface SkillCategory {
  category: string;
  items: Skill[];
}

export const skillsData: SkillCategory[] = [
  {
    category: "IT Systems",
    items: [
      {
        name: "Windows",
        description: "Desktop support, OS configuration, and system troubleshooting",
      },
      {
        name: "Linux",
        description: "Command line operations and basic system administration",
      },
      {
        name: "macOS",
        description: "Apple system support, setup, and troubleshooting",
      },
      {
        name: "Hardware Troubleshooting",
        description: "PC assembly, component diagnosis, and hardware issue resolution",
      },
      {
        name: "Software Installation & Configuration",
        description: "Installing, configuring, and maintaining end-user applications",
      },
      {
        name: "Basic Networking (TCP/IP, DHCP, DNS)",
        description: "Foundational networking concepts and troubleshooting",
      },
      {
        name: "Technical Troubleshooting",
        description: "Diagnosing and resolving software, system, and connectivity issues",
      },
    ],
  },
  {
    category: "Development",
    items: [
      {
        name: "C++",
        description: "Object-oriented and systems-level programming fundamentals",
      },
      {
        name: "Java",
        description: "Application development and OOP fundamentals",
      },
      {
        name: "Python",
        description: "Automation, scripting, and general-purpose development",
      },
      {
        name: "JavaScript",
        description: "Core web scripting and interactive application behavior",
      },
      {
        name: "TypeScript",
        description: "Type-safe JavaScript for maintainable frontend projects",
      },
      {
        name: "HTML/CSS",
        description: "Semantic page structure and responsive styling",
      },
      {
        name: "React",
        description: "Component-based frontend UI development",
      },
    ],
  },
  {
    category: "Tools",
    items: [
      {
        name: "Git/GitHub",
        description: "Version control, branching, and collaboration workflows",
      },
      {
        name: "Visual Studio Code",
        description: "Primary development environment and debugging workflows",
      },
      {
        name: "Microsoft Office",
        description: "Word, Excel, and PowerPoint for documentation and reporting",
      },
    ],
  },
];
