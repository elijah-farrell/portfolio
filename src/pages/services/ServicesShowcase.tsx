"use client";

import React, { useState } from "react";
import {
  FiGlobe,
  FiCode,
  FiDatabase,
  FiCloud,
  FiTool,
  FiUsers,
  FiSearch,
  FiSmartphone,
} from "react-icons/fi";
import { HoverEffect } from "@/components/ui/aceternity/card-hover-effect";
import { TextAnimate } from "../../components/ui/magic/text-animate";
import { settings } from "../../config/settings";

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
    title: "Custom Business Websites",
    icon: <FiGlobe className="h-6 w-6 text-emerald-500" />,
    onClick: onGetStarted,
  },
  {
    title: "Personal & Portfolio Sites",
    icon: <FiUsers className="h-6 w-6 text-emerald-500" />,
    onClick: onGetStarted,
  },
  {
    title: "Backend & Database Development",
    icon: <FiDatabase className="h-6 w-6 text-emerald-500" />,
    onClick: onGetStarted,
  },
  {
    title: "Fast, Reliable Hosting",
    icon: <FiCloud className="h-6 w-6 text-emerald-500" />,
    onClick: onGetStarted,
  },
  {
    title: "Ongoing Support & Maintenance",
    icon: <FiTool className="h-6 w-6 text-emerald-500" />,
    onClick: onGetStarted,
  },
  {
    title: "Mobile-Responsive Design",
    icon: <FiSmartphone className="h-6 w-6 text-emerald-500" />,
    onClick: onGetStarted,
  },
  {
    title: "SEO & Search Optimization",
    icon: <FiSearch className="h-6 w-6 text-emerald-500" />,
    onClick: onGetStarted,
  },
  {
    title: "Technical Consulting",
    icon: <FiCode className="h-6 w-6 text-emerald-500" />,
    onClick: onGetStarted,
  },
];

const servicesItems = [
  {
    title: "Full-Stack Development",
    description: "Get a professional website that brings in more customers. I build and host custom websites for businesses and individuals of all types. Fast turnaround, ongoing support, and hands-on guidance.",
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
    myProjects: [
       {
         title: "Minimal Portfolio",
         description: "Perfect for professionals, freelancers, or creatives who want a clean, distraction-free website to showcase their work. I'll customize this template with your content, branding, and deploy it for you.",
         image: "/assets/projects/minimal.png",
         link: "https://mnml-portfolio.vercel.app/",
         tech: ["Next.js", "React", "Tailwind CSS"],
         type: "project",
         price: "$39",
       },
       {
         title: "Lawn Care Website",
         description: "Ready-to-launch website for lawn care and landscaping businesses. Includes service pages, contact forms, and mobile-responsive design. I'll customize it with your business details and get it live.",
         image: "/assets/projects/lawn_care_template.png",
         link: "https://themewagon.com/themes/free-bootstrap-4-html5-lawn-care-website-template-lawncare/?utm_source=chatgpt.com",
         price: "$75/month",
         type: "template",
       },
       {
         title: "Welding Services Website",
         description: "Professional website designed specifically for welding and metalwork businesses. Features service galleries, project showcases, and contact forms. I'll personalize it for your business.",
         image: "/assets/projects/welding_template.png",
         link: "https://themewagon.github.io/Weldork/index.html",
         price: "$75/month",
         type: "template",
       },
       {
         title: "E-commerce Store",
         description: "Complete online store solution with shopping cart, product catalog, and payment integration. Perfect for small businesses wanting to sell products online. I'll set up everything for you.",
         image: "/assets/projects/stylish_template.png",
         link: "https://themewagon.github.io/stylish/",
         price: "$75/month",
         type: "template",
       },
       {
         title: "Custom Website Development",
         description: "Don't see what you need? I'll create a completely custom website tailored to your specific business requirements. From unique designs to specialized functionality, I'll bring your vision to life. Much more coming soon!",
         image: "/assets/animated.png",
         link: "#",
         price: "Contact Us",
         type: "custom",
         isCustom: true,
       },
    ],
  },
];

const SERVICES_CARD_HOVER_STYLES = `
  .services-card:hover .services-card__image {
    transform: scale(1.05);
  }
  .services-card:hover .services-card__overlay {
    opacity: 1;
  }
  .services-card:hover .services-card__button {
    transform: scale(1);
  }
  .services-card:hover .services-card__title {
    color: #10b981;
  }
  .dark .services-card:hover .services-card__title {
    color: #34d399;
  }
  .services-card__button {
    background-color: #10b981;
  }
  .dark .services-card__button {
    background-color: #34d399;
  }
  .services-card__badge {
    background-color: #10b981;
  }
  .dark .services-card__badge {
    background-color: #34d399;
  }
`;

interface ServicesShowcaseProps {
  onGetStarted?: () => void;
}

export default function ServicesShowcase({ onGetStarted }: ServicesShowcaseProps) {
  const [projectsScrollPosition, setProjectsScrollPosition] = useState(0);
  
  // Development mode - hide templates section
  const showTemplatesSection = settings.services.showTemplatesSection;

  const scrollProjects = (direction: 'left' | 'right') => {
    const container = document.getElementById('my-projects');
    if (container) {
      const scrollAmount = 300;
      const newPosition = direction === 'left' 
        ? projectsScrollPosition - scrollAmount 
        : projectsScrollPosition + scrollAmount;
      setProjectsScrollPosition(Math.max(0, Math.min(newPosition, container.scrollWidth - container.clientWidth)));
      container.scrollTo({ left: newPosition, behavior: 'smooth' });
    }
  };

  return (
    <div className="w-full max-w-5xl mx-auto mt-8 px-4">
      <style>{SERVICES_CARD_HOVER_STYLES}</style>
      {/* Service Header */}
      <div className="pt-8 mb-10" id="what-i-offer">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold mb-2">
            <TextAnimate animation="blurInUp" by="word-character" once>
              {servicesItems[0].title}
            </TextAnimate>
          </h1>
          <p className="text-neutral-600 dark:text-neutral-400 mb-6">{servicesItems[0].description}</p>
          
          {/* Services Grid */}
          <HoverEffect items={getServicesList(onGetStarted)} className="gap-4 mt-6 py-0" />
        </div>
      </div>

      {/* Portfolio Showcase Section */}
      {servicesItems[0].myProjects && showTemplatesSection && (
        <div className="mb-3">
          {/* Section Header */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">Website Templates & Examples</h2>
            <p className="text-gray-600 dark:text-gray-400 max-w-3xl">
              Here are some examples of websites I could use to build your site. Choose from these ready-made templates or let me create something custom for your brand or style. We can also find more templates to suit your specific needs.
            </p>
          </div>

          {/* Carousel Container */}
          <div className="relative group">
            {/* Navigation Arrows */}
            <button
              onClick={() => scrollProjects('left')}
              className="absolute -left-12 top-1/2 -translate-y-1/2 z-20 p-2 rounded-full bg-black/60 backdrop-blur-sm text-white hover:bg-black/80 transition-all duration-300 opacity-0 group-hover:opacity-100 shadow-xl"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button
              onClick={() => scrollProjects('right')}
              className="absolute -right-12 top-1/2 -translate-y-1/2 z-20 p-2 rounded-full bg-black/60 backdrop-blur-sm text-white hover:bg-black/80 transition-all duration-300 opacity-0 group-hover:opacity-100 shadow-xl"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>

            {/* Carousel Content */}
            <div 
              id="my-projects"
              className="flex gap-6 overflow-x-auto scrollbar-hide py-4"
              style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
               {servicesItems[0].myProjects.map((work, idx) => (
               work.isCustom ? (
                   <div key={idx} className="flex-shrink-0 w-96 services-card cursor-pointer" onClick={onGetStarted}>
                     {/* Image Container */}
                     <div className="relative h-64 overflow-hidden rounded-lg bg-background">
                      {/* Placeholder instead of real custom image */}
                      <div className="w-full h-full rounded-lg bg-gray-200 dark:bg-neutral-800 border border-dashed border-gray-300 dark:border-neutral-600 flex items-center justify-center">
                        <span className="text-xs sm:text-sm text-gray-600 dark:text-gray-200">
                          Custom build
                        </span>
                      </div>
                      {/* Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 transition-opacity duration-300 services-card__overlay"></div>
                      
                      {/* Action Button */}
                      <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-300 services-card__overlay">
                        <div className="px-6 py-3 text-white rounded-full font-medium shadow-lg transform scale-95 transition-transform duration-300 services-card__button">
                          Contact Us
                        </div>
                      </div>
                     </div>

                     {/* Content */}
                     <div className="mt-4">
                       <h3 className="font-semibold text-gray-900 dark:text-white text-lg mb-2 transition-colors duration-300 services-card__title">
                         {work.title}
                       </h3>
                       <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                         {work.description}
                       </p>
                     </div>
                   </div>
                 ) : (
                   <a key={idx} href={work.link} target="_blank" rel="noopener noreferrer" className="flex-shrink-0 w-96 services-card cursor-pointer block">
                     {/* Image Container */}
                     <div className="relative h-64 overflow-hidden rounded-lg bg-background">
                       {/* Placeholder instead of real template screenshot */}
                       <div className="w-full h-full rounded-lg bg-gray-200 dark:bg-neutral-800 border border-dashed border-gray-300 dark:border-neutral-600 flex items-center justify-center">
                         <span className="text-xs sm:text-sm text-gray-600 dark:text-gray-200">
                           Preview coming soon
                         </span>
                       </div>
                       {/* Overlay */}
                       <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 transition-opacity duration-300 services-card__overlay"></div>
                      
                       {/* Action Button */}
                       <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-300 services-card__overlay">
                         <div className="px-6 py-3 text-white rounded-full font-medium shadow-lg transform scale-95 transition-transform duration-300 services-card__button">
                           View {work.type === "project" ? "Project" : "Template"}
                         </div>
                       </div>

                       {/* Price Badge */}
                       {work.price && (
                         <div className="absolute top-3 right-3">
                           <span className="px-3 py-1 text-white text-sm font-semibold rounded-full services-card__badge">
                             {work.price}
                           </span>
                         </div>
                       )}
                     </div>

                     {/* Content */}
                     <div className="mt-4">
                       <h3 className="font-semibold text-gray-900 dark:text-white text-lg mb-2 transition-colors duration-300 services-card__title">
                         {work.title}
                       </h3>
                       <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                         {work.description}
                       </p>
                     </div>
                   </a>
                 )
               ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
