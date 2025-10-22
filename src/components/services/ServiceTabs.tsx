
"use client";

import React, { useState } from "react";
import {
  FiGlobe,
  FiCode,
  FiDatabase,
  FiSettings,
  FiShoppingCart,
  FiCloud,
  FiTool,
} from "react-icons/fi";
import { HoverEffect } from "@/components/ui/card-hover-effect";

const FullStackSkeleton = () => {
  return (
    <div className="w-full h-32 bg-gradient-to-br from-emerald-50 to-emerald-100 dark:from-emerald-950 dark:to-emerald-900 rounded-lg p-4 items-center justify-center flex">
      <div className="text-center">
        <div className="h-12 w-12 rounded-full bg-emerald-500 mx-auto mb-2 flex items-center justify-center">
          <FiGlobe className="h-6 w-6 text-white" />
        </div>
        <div className="h-2 bg-emerald-200 dark:bg-emerald-800 rounded-full w-20 mx-auto mb-1"></div>
        <div className="h-1.5 bg-emerald-100 dark:bg-emerald-900 rounded-full w-12 mx-auto"></div>
      </div>
    </div>
  );
};

const getServicesList = (onGetStarted?: () => void) => [
  {
    title: "Custom Web Applications & Websites",
    icon: <FiGlobe className="h-6 w-6 text-emerald-500" />,
    onClick: onGetStarted,
  },
  {
    title: "Frontend & Backend Development",
    icon: <FiCode className="h-6 w-6 text-emerald-500" />,
    onClick: onGetStarted,
  },
  {
    title: "Database Design & API Development",
    icon: <FiDatabase className="h-6 w-6 text-emerald-500" />,
    onClick: onGetStarted,
  },
  {
    title: "Content Management Systems (CMS)",
    icon: <FiSettings className="h-6 w-6 text-emerald-500" />,
    onClick: onGetStarted,
  },
  {
    title: "E-commerce Solutions",
    icon: <FiShoppingCart className="h-6 w-6 text-emerald-500" />,
    onClick: onGetStarted,
  },
  {
    title: "Deployment & Hosting Solutions",
    icon: <FiCloud className="h-6 w-6 text-emerald-500" />,
    onClick: onGetStarted,
  },
  {
    title: "Website Maintenance & Support",
    icon: <FiTool className="h-6 w-6 text-emerald-500" />,
    onClick: onGetStarted,
  },
  {
    title: "Technical Consulting",
    icon: <FiSettings className="h-6 w-6 text-emerald-500" />,
    onClick: onGetStarted,
  },
];

const servicesItems = [
  {
    title: "Full-Stack Development",
    description: "Complete web development solutions from concept to deployment. I specialize in building modern, responsive websites and web applications that help businesses establish their online presence. From simple landing pages to complex web applications, I handle both frontend and backend development to bring your ideas to life.",
    header: <FullStackSkeleton />,
    className: "",
    icon: <FiGlobe className="h-4 w-4 text-emerald-500" />,
    examples: [
      "Custom Web Applications & Websites",
      "Frontend & Backend Development",
      "Database Design & API Development",
      "Content Management Systems (CMS)",
      "E-commerce Solutions",
      "Deployment & Hosting Solutions",
      "Website Maintenance & Support"
    ],
    // No main image - focused on work showcase
    recentWork: [
      {
        title: "Minimal Portfolio Template",
        description: "Minimal portfolio template focused on showcasing your work without distractions.",
        image: "/assets/projects/minimal.png",
        link: "https://ef-portfolio03.vercel.app",
        tech: ["Next.js", "React", "Tailwind CSS"]
      }
    ],
    templates: [
      {
        title: "Lawn Care Website",
        description: "Custom lawn care website template with a modern design and responsive layout. Ready to customize and deploy.",
        image: "/assets/projects/lawn_care_template.png",
        link: "https://themewagon.com/themes/free-bootstrap-4-html5-lawn-care-website-template-lawncare/?utm_source=chatgpt.com",
        price: "$75"
      },
      {
        title: "Welding Services Website",
        description: "Professional welding and metalwork website with modern design and responsive layout",
        image: "/assets/projects/welding_template.png",
        link: "https://themewagon.github.io/Weldork/index.html",
        price: "$75"
      },
      {
        title: "E-commerce Store",
        description: "Modern online store with shopping cart, product catalog, and responsive design",
        image: "/assets/projects/stylish_template.png",
        link: "https://themewagon.github.io/stylish/",
        price: "$75"
      }
    ]
  },
];

interface ServiceTabsProps {
  onGetStarted?: () => void;
}

export default function ServiceTabs({ onGetStarted }: ServiceTabsProps) {
  const [workScrollPosition, setWorkScrollPosition] = useState(0);
  const [templateScrollPosition, setTemplateScrollPosition] = useState(0);

  const scrollWork = (direction: 'left' | 'right') => {
    const container = document.getElementById('work-container');
    if (container) {
      const scrollAmount = 300;
      const newPosition = direction === 'left' 
        ? workScrollPosition - scrollAmount 
        : workScrollPosition + scrollAmount;
      setWorkScrollPosition(Math.max(0, Math.min(newPosition, container.scrollWidth - container.clientWidth)));
      container.scrollTo({ left: newPosition, behavior: 'smooth' });
    }
  };

  const scrollTemplates = (direction: 'left' | 'right') => {
    const container = document.getElementById('template-container');
    if (container) {
      const scrollAmount = 300;
      const newPosition = direction === 'left' 
        ? templateScrollPosition - scrollAmount 
        : templateScrollPosition + scrollAmount;
      setTemplateScrollPosition(Math.max(0, Math.min(newPosition, container.scrollWidth - container.clientWidth)));
      container.scrollTo({ left: newPosition, behavior: 'smooth' });
    }
  };

  return (
    <div className="w-full max-w-5xl mx-auto mt-8 px-4">
      {/* Service Header */}
      <div className="pt-8 mb-10">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold mb-2">{servicesItems[0].title}</h1>
          <p className="text-gray-600 dark:text-gray-400 mb-6">{servicesItems[0].description}</p>
          
          {/* Services Grid */}
          <HoverEffect items={getServicesList(onGetStarted)} className="gap-4 mt-6 py-0" />
        </div>
      </div>

      {/* Recent Sites I've Made Section - Outside the main card */}
      {servicesItems[0].recentWork && (
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h4 className="text-lg font-semibold text-gray-900 dark:text-white">Recent Sites I've Made</h4>
            <div className="flex gap-2">
              <button
                onClick={() => scrollWork('left')}
                className="p-2 rounded-full bg-gray-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-300 hover:text-emerald-500 dark:hover:text-emerald-500 transition-colors"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <button
                onClick={() => scrollWork('right')}
                className="p-2 rounded-full bg-gray-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-300 hover:text-emerald-500 dark:hover:text-emerald-500 transition-colors"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>
          <div 
            id="work-container"
            className="flex gap-4 overflow-x-auto scrollbar-hide py-8 px-2 pb-12"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {servicesItems[0].recentWork.map((work, idx) => (
              <div key={idx} className="flex-shrink-0 w-80 bg-white dark:bg-[#0a0a0a] rounded-2xl overflow-hidden hover:shadow-lg hover:scale-[1.02] transition-all duration-300 border border-gray-100 dark:border-neutral-800 hover:border-gray-200 dark:hover:border-neutral-700">
                <div className="relative h-48 overflow-hidden">
                  <img 
                    src={work.image} 
                    alt={work.title}
                    className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                </div>
                <div className="p-5">
                  <h5 className="font-semibold text-gray-900 dark:text-white mb-2 text-lg leading-tight">{work.title}</h5>
                  <p className="text-sm text-gray-600 dark:text-gray-300 mb-3 leading-relaxed">{work.description}</p>
                  <div className="flex flex-wrap gap-1 mb-4">
                    {work.tech.map((tech, techIdx) => (
                      <span key={techIdx} className="px-2 py-1 bg-emerald-100 dark:bg-emerald-900 text-emerald-700 dark:text-emerald-300 text-xs rounded-full font-medium">
                        {tech}
                      </span>
                    ))}
                  </div>
                  <a 
                    href={work.link} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-flex items-center text-emerald-600 dark:text-emerald-400 text-sm font-medium hover:text-emerald-700 dark:hover:text-emerald-300 transition-colors duration-200"
                  >
                    View Project 
                    <svg className="ml-1 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Templates Section - Outside the main card */}
      {servicesItems[0].templates && (
        <div>
          <div className="flex items-center justify-between mb-4">
            <h4 className="text-lg font-semibold text-gray-900 dark:text-white">Available Templates</h4>
            <div className="flex gap-2">
              <button
                onClick={() => scrollTemplates('left')}
                className="p-2 rounded-full bg-gray-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-300 hover:text-emerald-500 dark:hover:text-emerald-500 transition-colors"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <button
                onClick={() => scrollTemplates('right')}
                className="p-2 rounded-full bg-gray-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-300 hover:text-emerald-500 dark:hover:text-emerald-500 transition-colors"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>
          <div 
            id="template-container"
            className="flex gap-4 overflow-x-auto scrollbar-hide py-8 px-2 pb-12"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {servicesItems[0].templates.map((template, idx) => (
              <div key={idx} className="flex-shrink-0 w-80 bg-white dark:bg-[#0a0a0a] rounded-2xl overflow-hidden hover:shadow-lg hover:scale-[1.02] transition-all duration-300 border border-gray-100 dark:border-neutral-800 hover:border-gray-200 dark:hover:border-neutral-700">
                <div className="relative h-48 overflow-hidden">
                  <img 
                    src={template.image} 
                    alt={template.title}
                    className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                </div>
                <div className="p-6">
                  <div className="flex justify-between items-start mb-3">
                    <h5 className="font-semibold text-gray-900 dark:text-white text-lg leading-tight">{template.title}</h5>
                    <span className="text-emerald-600 dark:text-emerald-400 font-bold text-lg">{template.price}</span>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-300 mb-4 leading-relaxed">{template.description}</p>
                  <a 
                    href={template.link} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-flex items-center text-emerald-600 dark:text-emerald-400 text-sm font-medium hover:text-emerald-700 dark:hover:text-emerald-300 transition-colors duration-200"
                  >
                    View Template 
                    <svg className="ml-1 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
