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
        name: "Active Directory",
        description: "User accounts, permissions, and directory services in a networked Windows environment",
      },
      {
        name: "Hardware & Software Troubleshooting",
        description: "Diagnosing and resolving issues with PCs, laptops, printers, phones, servers, and switches",
      },
      {
        name: "Basic Networking (TCP/IP, DNS, DHCP, VPN)",
        description: "Foundational networking concepts and connectivity troubleshooting",
      },
      {
        name: "Windows",
        description: "Proficiency with Windows OS for desktop support, configuration, and troubleshooting",
      },
      {
        name: "Linux",
        description: "Proficiency with Linux OS, including command line operations and system support",
      },
      {
        name: "macOS",
        description: "Proficiency with macOS for setup, support, and troubleshooting",
      },
      {
        name: "Remote Desktop (RDP, VNC)",
        description: "Remote support for users and systems using RDP and VNC",
      },
      {
        name: "Cybersecurity Basics",
        description: "Foundational security practices including access control, safe configuration, and protecting systems and user data",
      },
      {
        name: "Ticketing Systems (Zoho)",
        description: "Tracking, prioritizing, and resolving IT support requests in Zoho at Carthage Area Hospital",
      },
    ],
  },
  {
    category: "Programming",
    items: [
      {
        name: "Python",
        description: "Automation, scripting, and general-purpose development",
      },
      {
        name: "Java",
        description: "Application development and object-oriented programming",
      },
      {
        name: "C++",
        description: "Object-oriented and systems-level programming, including BorgChat",
      },
      {
        name: "JavaScript",
        description: "Core language for web applications and interactive interfaces",
      },
      {
        name: "TypeScript",
        description: "Typed JavaScript for maintainable frontend and application code",
      },
    ],
  },
  {
    category: "Web Development",
    items: [
      {
        name: "HTML",
        description: "Semantic page structure and accessible markup",
      },
      {
        name: "CSS",
        description: "Layout, responsive design, and visual styling",
      },
      {
        name: "React",
        description: "Component-based user interfaces",
      },
      {
        name: "Tailwind CSS",
        description: "Utility-first styling for consistent, responsive layouts",
      },
    ],
  },
  {
    category: "Databases",
    items: [
      {
        name: "SQL",
        description: "Querying, updating, and managing relational data",
      },
      {
        name: "MySQL",
        description: "Relational database design, queries, and administration",
      },
      {
        name: "PostgreSQL",
        description: "Relational database development and data management",
      },
      {
        name: "SQLite",
        description: "Lightweight embedded databases for local applications",
      },
      {
        name: "MongoDB",
        description: "Document-oriented NoSQL data storage",
      },
      {
        name: "SQL Server",
        description: "Microsoft relational database used in enterprise environments",
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
        name: "Microsoft 365",
        description: "Word, Excel, Outlook, Teams, and other Microsoft productivity apps",
      },
      {
        name: "Google Workspace",
        description: "Gmail, Drive, Docs, and related Google productivity services",
      },
    ],
  },
];
