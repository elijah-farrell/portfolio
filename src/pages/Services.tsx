import React from "react";
import { SEO } from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import ContactForm from "@/components/ContactForm";
import { Boxes } from "@/components/ui/background-boxes";
import { WobbleCard } from "@/components/ui/wobble-card";
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
          <section className="h-[40vh] flex flex-col justify-center text-center relative overflow-hidden bg-white dark:bg-black">
            <div className="absolute inset-0 w-full h-full">
              <Boxes />
              <div className="absolute inset-0 w-full h-full bg-gradient-to-b from-white/90 via-white/70 to-white/50 dark:from-black/90 dark:via-black/70 dark:to-black/50 z-10 [mask-image:radial-gradient(ellipse_70%_50%_at_50%_50%,transparent,white)] dark:[mask-image:radial-gradient(ellipse_70%_50%_at_50%_50%,transparent,black)] pointer-events-none" />
            </div>
            
             <div className="max-w-7xl mx-auto relative z-20 px-4 lg:px-6 py-3 rounded-2xl transition-all duration-300 hover:bg-gradient-to-br hover:from-emerald-100/30 hover:to-emerald-200/30 dark:hover:from-emerald-950/20 dark:hover:to-emerald-900/20">
              <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white">
                Need Help with a <span className="text-emerald-600 whitespace-nowrap">Tech Project</span>?
              </h1>
               <p className="text-xl text-gray-700 dark:text-emerald-100 max-w-3xl mx-auto">
                 I'm a CS professional who builds things. Websites, apps, scripts, whatever. If you have an idea or need help with something technical, let's talk about it.
               </p>
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



          {/* Contact Form */}
          <section id="contact-form" className="py-12 bg-gray-50 dark:bg-neutral-900">
            <div className="max-w-7xl mx-auto px-4 lg:px-6">
              <div className="text-center md:text-center text-left mb-8">
                <h2 className="text-2xl md:text-3xl font-bold mb-4 text-gray-900 dark:text-white">Ready to Get Started?</h2>
                <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 mb-4">
                  Tell me about your project. No pressure, just a conversation about what you need.
                </p>
                <p className="text-base text-gray-500 dark:text-gray-400">
                  Fill out the form below and I'll get back to you within 24 hours to discuss your project, answer questions, and see how I can help.
                </p>
              </div>
              
              <ContactForm />
            </div>
          </section>
        </div>
      </main>
    </>
  );
}
