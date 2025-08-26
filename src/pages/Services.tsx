import React, { Suspense, lazy } from "react";
import { SEO } from "@/components/SEO";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import ContactForm from "@/components/ContactForm";
import { Boxes } from "@/components/ui/background-boxes";
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

// Lazy load the background boxes for better performance
const LazyBoxes = lazy(() => import("@/components/ui/background-boxes").then(module => ({ default: module.Boxes })));

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

      <main className="mt-14">
        <div id="services">
          {/* Hero Section */}
          <section className="py-12 px-6 text-center relative overflow-hidden bg-white dark:bg-black">
            <div className="absolute inset-0 w-full h-full">
              <Suspense fallback={
                <div className="absolute inset-0 w-full h-full bg-gradient-to-br from-emerald-50 to-blue-50 dark:from-emerald-950 dark:to-blue-950 animate-pulse" />
              }>
                <LazyBoxes />
              </Suspense>
              <div className="absolute inset-0 w-full h-full bg-gradient-to-b from-white/90 via-white/70 to-white/50 dark:from-black/90 dark:via-black/70 dark:to-black/50 z-10 [mask-image:radial-gradient(transparent,white)] pointer-events-none" />
            </div>
            
            <div className="max-w-4xl mx-auto relative z-20">
              <h1 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900 dark:text-white">
                Need Help with a <span className="text-emerald-600">Tech Project</span>?
              </h1>
              <p className="text-xl text-gray-700 dark:text-emerald-100 mb-8 max-w-3xl mx-auto">
                I'm a CS professional who builds things. Websites, apps, scripts, whatever. If you have an idea or need help with something technical, let's talk about it.
              </p>
              <div className="flex justify-center">
                <Button 
                  size="lg" 
                  className="text-lg px-8 py-3 bg-emerald-600 hover:bg-emerald-700 text-white border-emerald-600"
                  onClick={() => {
                    const formElement = document.getElementById("contact-form");
                    if (formElement) {
                      formElement.scrollIntoView({ behavior: "smooth", block: "start" });
                    }
                  }}
                >
                  Let's Talk <FiArrowRight className="ml-2" />
                </Button>
              </div>
            </div>
          </section>

          {/* What I Can Help With */}
          <section id="what-i-do" className="py-12 px-6 bg-white dark:bg-neutral-950">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold mb-4 text-gray-900 dark:text-white">What I Can Help With</h2>
                <p className="text-xl text-gray-600 dark:text-gray-300">
                  Based on my background in CS and experience building things. Here's what I'm comfortable tackling:
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {services.map((service, index) => (
                  <Card key={index} className="bg-white dark:bg-neutral-900 border-gray-200 dark:border-neutral-700 hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <div className="flex items-center gap-3 mb-4">
                        {service.icon}
                        <CardTitle className="text-xl text-gray-900 dark:text-white">{service.name}</CardTitle>
                      </div>
                      <p className="text-gray-600 dark:text-gray-400">{service.description}</p>
                    </CardHeader>
                    <CardContent>
                      <div className="mb-4">
                        <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Examples:</h4>
                        <ul className="space-y-1">
                          {service.examples.map((example, idx) => (
                            <li key={idx} className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                              <FiCheck className="text-emerald-500 flex-shrink-0" />
                              {example}
                            </li>
                          ))}
                        </ul>
                      </div>

                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </section>



          {/* Contact Form */}
          <section id="contact-form" className="py-12 px-6 bg-gray-50 dark:bg-neutral-900">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold mb-4 text-gray-900 dark:text-white">Ready to Get Started?</h2>
                <p className="text-xl text-gray-600 dark:text-gray-300">
                  Tell me about your project. No pressure, just a conversation about what you need.
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
