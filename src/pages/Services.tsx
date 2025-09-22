import React, { useState, useEffect } from "react";
import { SEO } from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import ContactForm from "@/components/ContactForm";
import { WobbleCard } from "@/components/ui/wobble-card";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalTrigger,
  useModal,
} from "@/components/ui/shadcn-io/animated-modal";
import { 
  FiCode, 
  FiGlobe, 
  FiDatabase, 
  FiServer,
  FiSmartphone,
  FiZap,
  FiArrowRight,
  FiCheck
} from "react-icons/fi";

const services = [
  {
    name: "Web Development",
    description: "Custom websites and web applications",
    icon: <FiGlobe className="text-2xl text-emerald-600" />,
    examples: [
      "Portfolio sites",
      "Business websites", 
      "Web apps with React/TypeScript",
      "Landing pages"
    ]
  },
  {
    name: "Backend & APIs",
    description: "Server-side development and database work",
    icon: <FiServer className="text-2xl text-emerald-600" />,
    examples: [
      "REST APIs",
      "Database design",
      "Authentication systems",
      "Data processing scripts"
    ]
  },
  {
    name: "Data & Automation",
    description: "Scripts and tools to make your life easier",
    icon: <FiZap className="text-2xl text-emerald-600" />,
    examples: [
      "Data analysis scripts",
      "Automation tools",
      "File processing",
      "API integrations"
    ]
  },
  {
    name: "Technical Consulting",
    description: "Help with your tech decisions and implementation",
    icon: <FiCode className="text-2xl text-emerald-600" />,
    examples: [
      "Tech stack recommendations",
      "Architecture planning",
      "Code review",
      "Performance optimization"
    ]
  }
];



export default function ServicesPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Custom Modal Trigger Component
  const CustomModalTrigger = () => {
    const { setOpen } = useModal();
    
    useEffect(() => {
      if (isModalOpen) {
        setOpen(true);
        setIsModalOpen(false);
      }
    }, [isModalOpen, setOpen]);
    
    return null;
  };

  return (
    <>
      <SEO
        title="Technical Services by Elijah Farrell – Web Development & Consulting"
        description="CS professional offering web development, backend services, and technical consulting. Let's build something together."
        keywords="web development, technical consulting, React, Python, backend development, CS professional"
        url="https://elijahfarrell.com/services"
      />

      <main className="mt-10">
        <div id="services">
          {/* Hero Section */}
          <section className="pt-16 pb-8 flex flex-col justify-center bg-white dark:bg-neutral-950">
            <div className="max-w-7xl mx-auto px-4 lg:px-6 py-3">
              <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white text-left">
                My Services
              </h1>
            </div>
          </section>

          {/* What I Can Help With */}
          <section id="what-i-do" className="py-12 bg-white dark:bg-neutral-950">
            <div className="max-w-7xl mx-auto px-4 lg:px-6">
              <div className="text-center md:text-center text-left mb-12">
                <h2 className="text-2xl md:text-3xl font-bold mb-4 text-gray-900 dark:text-white">What I Can Help With</h2>
                <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300">
                  Based on my background in CS and experience building things. Here's what I'm comfortable tackling:
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {services.map((service, index) => (
                  <WobbleCard 
                    key={index} 
                    containerClassName="bg-white dark:bg-neutral-950 border border-gray-200 dark:border-neutral-700 shadow-lg dark:shadow-white/10 dark:shadow-xl"
                    className="text-gray-900 dark:text-white py-8"
                  >
                    <div className="flex items-center gap-3 mb-4">
                      {service.icon}
                      <h3 className="text-xl font-semibold">{service.name}</h3>
                    </div>
                    <p className="text-gray-600 dark:text-gray-400 mb-6">{service.description}</p>
                    
                    <div className="mb-4">
                      <h4 className="font-semibold mb-2">Examples:</h4>
                      <ul className="space-y-1">
                        {service.examples.map((example, idx) => (
                          <li key={idx} className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                            <FiCheck className="text-emerald-500 flex-shrink-0" />
                            {example}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </WobbleCard>
                ))}
              </div>
            </div>
          </section>



          {/* Contact Section */}
          <section id="contact-form" className="py-12 bg-white dark:bg-neutral-950">
            <div className="max-w-7xl mx-auto px-4 lg:px-6">
              <div className="text-center md:text-center text-left mb-8">
                <h2 className="text-2xl md:text-3xl font-bold mb-4 text-gray-900 dark:text-white">Let's Work Together</h2>
              </div>
              
              <div className="flex justify-center">
                <button
                  onClick={() => setIsModalOpen(true)}
                  className="relative px-8 py-4 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-lg font-semibold transition-all duration-300 flex items-center gap-2 cursor-pointer shadow-sm hover:shadow-lg hover:scale-105 hover:-translate-y-0.5 active:scale-95 active:translate-y-0 group overflow-hidden"
                >
                  {/* Shimmer effect */}
                  <div className="absolute inset-0 -top-1 -left-1 bg-gradient-to-r from-transparent via-white/20 to-transparent w-[calc(100%+8px)] h-[calc(100%+8px)] opacity-0 group-hover:opacity-100 group-hover:animate-pulse transition-opacity duration-300"></div>
                  <FiArrowRight className="text-xl relative z-10" />
                  <span className="relative z-10">Get Started</span>
                </button>
              </div>
            </div>
          </section>
        </div>
      </main>
      
      {/* Modal for Get Started */}
      <Modal>
        <CustomModalTrigger />
        <ModalBody>
          <ModalContent>
            <h4 className="text-lg md:text-2xl text-neutral-600 dark:text-neutral-100 font-bold text-center mb-4">
              Let's Talk About Your Project
            </h4>
            <p className="text-neutral-600 dark:text-neutral-400 text-center mb-6">
              Tell me about what you need help with. I'll get back to you within 24 hours to discuss your project and see how I can help.
            </p>
            <ContactForm />
          </ModalContent>
        </ModalBody>
      </Modal>
    </>
  );
}
