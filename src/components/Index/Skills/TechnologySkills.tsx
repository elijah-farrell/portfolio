import { HoverCard } from "@/components/ScrollReveal";

interface TechnologySkillsProps {
  currentColor: string;
}

export default function TechnologySkills({ currentColor }: TechnologySkillsProps) {
  const technologyCategories = [
    {
      title: "Tools",
      technologies: [
        { name: 'Git' },
        { name: 'Vite' },
        { name: 'Node.js' },
        { name: 'Render' },
        { name: 'Vercel' },
        { name: 'Supabase' },
        { name: 'GCC' },
        { name: 'Vim' }
      ]
    },
    {
      title: "Frameworks",
      technologies: [
        { name: 'React' },
        { name: 'Flask' },
        { name: 'Pandas' },
        { name: 'NumPy' },
        { name: 'PyTorch' },
        { name: 'OpenCV' },
        { name: 'HuggingFace' },
        { name: 'Tailwind CSS' },
        { name: 'EmailJS' },
        { name: 'Three.js' },
        { name: 'Material-UI' }
      ]
    },
    {
      title: "Databases",
      technologies: [
        { name: 'MySQL' },
        { name: 'SQLite' },
        { name: 'Firebase' },
        { name: 'PostgreSQL' }
      ]
    }
  ];

  return (
    <div className="mb-16">
      <div className="text-center mb-12">
        <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          Technologies & Frameworks
        </h3>
        <p className="text-gray-600 dark:text-gray-300">Tools and platforms I have used to build solutions</p>
      </div>
      
      <div className="space-y-6">
        {technologyCategories.map((category) => (
          <div key={category.title} className="flex flex-col sm:flex-row sm:items-center gap-4">
            <h4 className="text-lg font-semibold text-gray-900 dark:text-white min-w-[120px]">
              {category.title}
            </h4>
            <div className="flex flex-wrap gap-3 text-gray-700 dark:text-gray-300">
              {category.technologies.map((tech, index) => (
                <span key={tech.name}>
                  {tech.name}{index < category.technologies.length - 1 ? ' •' : ''}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
} 