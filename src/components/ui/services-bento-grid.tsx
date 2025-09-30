"use client";
import React, { useRef } from "react";
import {
  FiGlobe,
  FiZap,
  FiCode,
} from "react-icons/fi";

export default function ServicesBentoGrid() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-5xl mx-auto">
      {/* Data & Automation - Left */}
      <div className="md:col-span-1">
        <ServiceCard item={servicesItems[0]} index={0} />
      </div>
      
      {/* Full-Stack Development - Center, taller */}
      <div className="md:col-span-1">
        <ServiceCard item={servicesItems[1]} index={1} />
      </div>
      
      {/* Technical Consulting - Right */}
      <div className="md:col-span-1">
        <ServiceCard item={servicesItems[2]} index={2} />
      </div>
    </div>
  );
}

const ServiceCard = ({ item, index: _index }: { item: { id: string; title: string; description: string; link: string; icon: React.ReactNode }; index: number }) => {
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    cardRef.current.style.setProperty('--mouse-x', `${x}px`);
    cardRef.current.style.setProperty('--mouse-y', `${y}px`);
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      className="group/bento shadow-lg md:hover:shadow-xl flex flex-col rounded-xl border border-gray-200 md:hover:border-emerald-300 bg-white transition duration-300 md:hover:scale-105 dark:border-white/[0.2] dark:md:hover:border-emerald-500/50 dark:bg-black dark:shadow-none h-full relative overflow-hidden p-6"
    >
      {/* Spotlight effect */}
      <div 
        className="absolute inset-0 opacity-0 md:group-hover/bento:opacity-100 transition-opacity duration-300 pointer-events-none" 
        style={{
          background: 'radial-gradient(400px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(16, 185, 129, 0.25), transparent 40%)'
        }}
      />
      
      <div className="mb-4 relative z-10">
        {item.header}
      </div>
      <div className="transition duration-200 md:group-hover/bento:translate-x-2 flex-1 relative z-10">
        <div className="mb-3">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{item.title}</h3>
        </div>
        <p className="text-gray-600 dark:text-gray-400 mb-4 text-sm">{item.description}</p>
        
        <div>
          <ul className="space-y-2">
            {item.examples.map((example: string, idx: number) => (
              <li key={idx} className="flex items-center gap-2 text-xs text-gray-600 dark:text-gray-400">
                <div className="h-1.5 w-1.5 rounded-full bg-emerald-500 flex-shrink-0" />
                {example}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

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


const AutomationSkeleton = () => {
  return (
    <div className="w-full h-32 bg-gradient-to-br from-emerald-50 to-emerald-100 dark:from-emerald-950 dark:to-emerald-900 rounded-lg p-4 items-center justify-center flex">
      <div className="text-center">
        <div className="h-12 w-12 rounded-full bg-emerald-500 mx-auto mb-2 flex items-center justify-center">
          <FiZap className="h-6 w-6 text-white" />
        </div>
        <div className="h-2 bg-emerald-200 dark:bg-emerald-800 rounded-full w-20 mx-auto mb-1"></div>
        <div className="h-1.5 bg-emerald-100 dark:bg-emerald-900 rounded-full w-12 mx-auto"></div>
      </div>
    </div>
  );
};

const ConsultingSkeleton = () => {
  return (
    <div className="w-full h-32 bg-gradient-to-br from-emerald-50 to-emerald-100 dark:from-emerald-950 dark:to-emerald-900 rounded-lg p-4 items-center justify-center flex">
      <div className="text-center">
        <div className="h-12 w-12 rounded-full bg-emerald-500 mx-auto mb-2 flex items-center justify-center">
          <FiCode className="h-6 w-6 text-white" />
        </div>
        <div className="h-2 bg-emerald-200 dark:bg-emerald-800 rounded-full w-20 mx-auto mb-1"></div>
        <div className="h-1.5 bg-emerald-100 dark:bg-emerald-900 rounded-full w-12 mx-auto"></div>
      </div>
    </div>
  );
};

const servicesItems = [
  {
    title: "Data & Automation",
    description: "Custom scripts and automation tools designed to streamline your workflows, process data efficiently, and integrate systems seamlessly.",
    header: <AutomationSkeleton />,
    className: "",
    icon: <FiZap className="h-4 w-4 text-emerald-500" />,
    examples: [
      "Data analysis & visualization scripts",
      "Custom automation scripts (Python/JS)",
      "Spreadsheet & document processing"
    ]
  },
  {
    title: "Full-Stack Development",
    description: "Complete web development solutions building reliable, scalable applications. From modern frontends to efficient backend systems.",
    header: <FullStackSkeleton />,
    className: "",
    icon: <FiGlobe className="h-4 w-4 text-emerald-500" />,
    examples: [
      "Custom Web Applications",
      "API Development & Integration",
      "Database Design & Implementation"
    ]
  },
  {
    title: "Technical Consulting",
    description: "Strategic technical guidance to help you make informed decisions, optimize your existing systems, and plan for scalable growth.",
    header: <ConsultingSkeleton />,
    className: "",
    icon: <FiCode className="h-4 w-4 text-emerald-500" />,
    examples: [
      "Technology stack recommendations",
      "System architecture planning",
      "Code review & best practices",
      "Performance optimization strategies"
    ]
  },
];
