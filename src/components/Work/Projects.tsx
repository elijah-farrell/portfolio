import React from 'react';
import { motion } from 'framer-motion';
import { Tilt } from 'react-tilt';
import { useSettings } from '@/contexts/SettingsContext';
import { FadeInOnScroll } from '@/components/ScrollReveal';

import efRedLogo from '@/assets/work/ef-red.png';
import laptopPreview from '@/assets/work/3d-laptop-preview.png';

// Helper function to get portfolio image
const getPortfolioImage = (): string => {
  return efRedLogo;
};

// Types
interface TProject {
  title: string;
  description: string;
  image: string; // Can be path, 'portfolio' for dynamic image, or placeholder path
  technologies: string[];
  githubUrl?: string;
  liveUrl?: string;
}

// Project data
const projects: TProject[] = [
  {
    title: 'Portfolio Website',
    description: 'A modern, responsive portfolio website built with React, TypeScript, and Three.js. Features 3D models, smooth animations, and a contact form with EmailJS integration.',
    image: 'portfolio', // Special identifier for dynamic image
    technologies: ['React', 'TypeScript', 'Three.js', 'Tailwind CSS', 'Framer Motion', 'EmailJS'],
    githubUrl: 'https://github.com/elijah-farrell/portfolio',
    liveUrl: 'https://elijahfarrell.com'
  },
  {
    title: 'Project 2',
    description: 'Coming Soon - This project is currently in development. Stay tuned for updates on this exciting new addition to my portfolio.',
    image: '/project2-preview.jpg',
    technologies: ['Coming Soon', 'In Development', 'Stay Tuned'],
    githubUrl: undefined,
    liveUrl: undefined
  },
  {
    title: '3D Floating Laptop',
    description: 'Interactive 3D application featuring a floating laptop with a fully functional website interface rendered directly on the 3D screen.',
    image: '3d-laptop-preview',
    technologies: ['React', 'Three.js', '@react-three/fiber', '@react-three/drei', 'Vite', 'Tailwind CSS'],
    githubUrl: 'https://github.com/elijah-farrell/3d-floating-laptop',
    liveUrl: 'https://3d-floating-laptop.vercel.app/'
  },
  {
    title: 'Project 4',
    description: 'Coming Soon - The final project in this series is being carefully crafted to demonstrate advanced techniques and innovative solutions.',
    image: '/project4-preview.jpg',
    technologies: ['Coming Soon', 'Advanced Tech', 'Innovation'],
    githubUrl: undefined,
    liveUrl: undefined
  }
];

// Project Card Component
const ProjectCard: React.FC<TProject & { index: number }> = ({ title, description, image, technologies, githubUrl, liveUrl, index }) => {
  const { currentColor } = useSettings();
  
  return (
    <FadeInOnScroll direction="up" duration={800} delay={index * 200} elementId={`project-${index}`}>
      <Tilt
        options={{
          max: 25,
          scale: 1.05,
          speed: 450,
        }}
        className="cursor-pointer"
      >
                <div className="bg-white dark:bg-neutral-800 rounded-2xl p-4 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-200 dark:border-neutral-600 h-[500px] flex flex-col justify-between">
          {/* Project Image */}
          <div className="relative w-full h-56 mb-3 rounded-xl overflow-hidden bg-gray-100 dark:bg-neutral-700 flex-shrink-0 border-2 border-gray-200 dark:border-neutral-600">
            {image === '3d-laptop-preview' ? (
              <img 
                src={laptopPreview} 
                alt={`${title} preview`}
                className="w-full h-full object-contain bg-white dark:bg-neutral-800"
                onError={(e) => {
                  console.error('Image failed to load:', image);
                  (e.currentTarget as HTMLElement).style.display = 'none';
                  ((e.currentTarget as HTMLElement).nextElementSibling as HTMLElement).style.display = 'flex';
                }}
              />
            ) : image === 'portfolio' ? (
              <img 
                src={getPortfolioImage()}
                alt={`${title} preview`}
                className="w-full h-full object-contain bg-white dark:bg-neutral-800"
                onError={(e) => {
                  console.error('Portfolio image failed to load');
                  (e.currentTarget as HTMLElement).style.display = 'none';
                  ((e.currentTarget as HTMLElement).nextElementSibling as HTMLElement).style.display = 'flex';
                }}
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 dark:from-neutral-800 dark:to-neutral-700">
                <div className="text-gray-500 dark:text-gray-400 text-center">
                  <div className="text-4xl mb-2">📱</div>
                  <div className="text-sm font-medium">Project Preview</div>
                </div>
              </div>
            )}
          </div>
          
          {/* Project Info */}
          <div className="space-y-2 flex flex-col flex-1">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white">{title}</h3>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed text-sm flex-1 min-h-[60px]">{description}</p>
            
            {/* Technologies */}
            <div className="flex flex-wrap gap-1.5 mt-1 flex-shrink-0 min-h-[32px]">
              {technologies.map((tech, techIndex) => (
                <span
                  key={techIndex}
                  className="px-2.5 py-1 text-xs font-medium rounded-md"
                  style={{ 
                    backgroundColor: `${currentColor}15`,
                    color: currentColor,
                    border: `1px solid ${currentColor}30`
                  }}
                >
                  {tech}
                </span>
              ))}
            </div>
            
            {/* Links */}
            <div className="flex gap-3 pt-2 mt-auto flex-shrink-0">
              {githubUrl ? (
                <a
                  href={githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200"
                  style={{ 
                    backgroundColor: `${currentColor}20`,
                    color: currentColor,
                    border: `1px solid ${currentColor}40`
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = `${currentColor}30`;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = `${currentColor}20`;
                  }}
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                  </svg>
                  Code
                </a>
              ) : (
                <div className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium opacity-50 text-gray-500 dark:text-gray-400">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                  </svg>
                  Code
                </div>
              )}
              {liveUrl ? (
                <a
                  href={liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200"
                  style={{ 
                    backgroundColor: `${currentColor}20`,
                    color: currentColor,
                    border: `1px solid ${currentColor}40`
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = `${currentColor}30`;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = `${currentColor}20`;
                  }}
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                  Live Site
                </a>
              ) : (
                <div className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium opacity-50 text-gray-500 dark:text-gray-400">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                  Live Site
                </div>
              )}
            </div>
          </div>
        </div>
      </Tilt>
    </FadeInOnScroll>
  );
};

// Main Projects Component
const Projects: React.FC = () => {
  const { currentColor } = useSettings();
  
  return (
    <section className="py-20 px-4 sm:px-6 bg-gray-50 dark:bg-neutral-900">
      <div className="max-w-7xl mx-auto">
        {/* Section Title */}
        <div className="mb-16 text-center">
          <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white">
            Featured Projects
          </h2>
          <h3 className="text-2xl sm:text-3xl font-semibold mt-2" style={{ color: currentColor }}>
            My Work.
          </h3>
        </div>
        
        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 items-stretch !items-stretch">
          {projects.map((project, index) => (
            <ProjectCard key={index} {...project} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects; 