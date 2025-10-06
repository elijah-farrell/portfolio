import React, { useState, useEffect } from "react";
import { SEO } from "@/components/SEO";
import ContactForm from "@/components/ContactForm";
import ServicesBentoGrid from "@/components/ui/services-bento-grid";
import { TracingBeam } from "@/components/ui/tracing-beam";
import { AuroraText } from "@/components/ui/aurora-text";
import {
  Modal,
  ModalBody,
  ModalContent,
  useModal,
} from "@/components/ui/shadcn-io/animated-modal";
import { 
  FiArrowRight
} from "react-icons/fi";

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

      <main className="mt-10 relative">
        
        <div id="services">
          {/* Hero Section */}
          <section className="pt-16 pb-8 flex flex-col justify-center bg-white dark:bg-neutral-950 relative">
            
            <div className="max-w-7xl mx-auto px-4 lg:px-6 py-3 relative z-10">
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-left">
                My <AuroraText colors={["#34D399", "#10B981", "#059669", "#047857", "#065F46"]}>Services</AuroraText>
              </h1>
            </div>
          </section>

          {/* What I Can Help With */}
          <section id="what-i-do" className="pt-8 pb-12 bg-white dark:bg-neutral-950">
            <div className="max-w-7xl mx-auto px-4 lg:px-6">
              <TracingBeam className="px-6">
                <div className="text-left mb-6 pt-8">
                  <h2 className="text-2xl md:text-3xl font-bold mb-4 text-gray-900 dark:text-white">What I Can Help With</h2>
                </div>
                
                <div className="flex justify-center">
                  <ServicesBentoGrid />
                </div>
              </TracingBeam>
            </div>
          </section>



          {/* Contact Section */}
          <section id="contact-form" className="pb-12 bg-white dark:bg-neutral-950">
            <div className="max-w-7xl mx-auto px-4 lg:px-6">
              <div className="text-center mb-8">
                <h2 className="text-2xl md:text-3xl font-bold mb-4 text-gray-900 dark:text-white">Let's Work Together</h2>
              </div>
              
              <div className="flex justify-center">
                <button
                  onClick={() => setIsModalOpen(true)}
                  className="relative px-8 py-4 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-lg font-semibold transition-transform duration-300 flex items-center gap-2 cursor-pointer shadow-sm hover:shadow-lg hover:scale-105 hover:-translate-y-0.5 active:scale-95 active:translate-y-0 group overflow-hidden"
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
