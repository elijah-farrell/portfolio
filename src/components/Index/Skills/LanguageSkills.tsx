import { HoverCard } from "@/components/ScrollReveal";
import pythonLogo from '@/assets/technologies/python.jpeg';
import javaLogo from '@/assets/technologies/java.png';
import javascriptLogo from '@/assets/technologies/javascript.png';
import cppLogo from '@/assets/technologies/cpp.png';
import cLogo from '@/assets/technologies/c.png';
import typescriptLogo from '@/assets/technologies/typescript.png';
import htmlLogo from '@/assets/technologies/html.png';
import cssLogo from '@/assets/technologies/css.svg';
import tinyChefsImg from "@/assets/technologies/pixar_chefs.png";

interface LanguageSkillsProps {
  currentColor: string;
}

export default function LanguageSkills({ currentColor }: LanguageSkillsProps) {
  const languages = [
    { 
      name: 'Python', 
      image: pythonLogo
    },
    { 
      name: 'Java', 
      image: javaLogo
    },
    { 
      name: 'C', 
      image: cLogo
    },
    { 
      name: 'C++', 
      image: cppLogo
    },
    { 
      name: 'JavaScript', 
      image: javascriptLogo
    },
    { 
      name: 'TypeScript', 
      image: typescriptLogo
    },
    { 
      name: 'HTML', 
      image: htmlLogo
    },
    { 
      name: 'CSS', 
      image: cssLogo
    }
  ];

  return (
    <div className="mb-16">
      {/* Section Header */}
      <div className="text-center mb-12">
        <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-3">
          Languages
        </h3>
        <p className="text-lg text-gray-600 dark:text-gray-300 mt-4 max-w-2xl mx-auto">
          Programming, markup, and styling languages I use to build solutions
        </p>
      </div>

      {/* Languages Layout with Integrated Image */}
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          {/* Languages Grid */}
          <div className="order-2 lg:order-1">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {languages.map((skill, index) => (
                <HoverCard 
                  key={skill.name} 
                  scale={1.05} 
                  shadowIntensity={12} 
                  className="group relative"
                >
                  <div className="bg-white dark:bg-black rounded-xl p-4 shadow-md border border-gray-200 dark:border-neutral-700 transition-all duration-300 hover:shadow-lg">
                    <div className="text-center">
                      <div className="w-12 h-12 mx-auto mb-3 rounded-lg flex items-center justify-center overflow-hidden bg-white shadow-sm">
                        <img 
                          src={skill.image} 
                          alt={skill.name}
                          className="w-10 h-10 object-cover transition-transform duration-300 group-hover:scale-110"
                        />
                      </div>
                      <h4 className="font-semibold text-sm text-gray-900 dark:text-white">
                        {skill.name}
                      </h4>
                    </div>
                  </div>
                </HoverCard>
              ))}
            </div>
          </div>

          {/* Integrated Tiny Chefs Image */}
          <div className="order-1 lg:order-2 flex justify-center">
            <div className="relative">
              <div className="relative overflow-hidden rounded-[24px] shadow-2xl ring-1 ring-gray-200 dark:ring-neutral-700">
                <img
                  src={tinyChefsImg}
                  alt="Pixar-style chefs cooking with programming languages"
                  className="w-full max-w-md h-auto object-cover"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/15 via-transparent to-transparent"></div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
} 