import React, { useState, useEffect } from "react";
import { SEO } from "@/components/SEO";
import ContactForm from "@/components/ContactForm";
import ServicesBentoGrid from "@/components/ui/services-bento-grid";
import { TracingBeam } from "@/components/ui/tracing-beam";
import { AuroraText } from "@/components/ui/aurora-text";
import { HoverBorderGradient } from "@/components/ui/hover-border-gradient";
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
              
              <div className="flex justify-center">
                <HoverBorderGradient
                  containerClassName="rounded-full p-[2px]"
                  as="button"
                  className="group relative inline-flex h-12 items-center justify-center overflow-hidden rounded-full bg-black text-white dark:bg-white dark:text-black px-6 font-medium"
                  onClick={() => setIsModalOpen(true)}
                >
                  <span>Get Started</span>
                  <div className="relative ml-1 h-5 w-5 overflow-hidden">
                    <div className="absolute transition-all duration-200 group-hover:-translate-y-5 group-hover:translate-x-4">
                      <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-5 w-5"><path d="M3.64645 11.3536C3.45118 11.1583 3.45118 10.8417 3.64645 10.6465L10.2929 4L6 4C5.72386 4 5.5 3.77614 5.5 3.5C5.5 3.22386 5.72386 3 6 3L11.5 3C11.6326 3 11.7598 3.05268 11.8536 3.14645C11.9473 3.24022 12 3.36739 12 3.5L12 9.00001C12 9.27615 11.7761 9.50001 11.5 9.50001C11.2239 9.50001 11 9.27615 11 9.00001V4.70711L4.35355 11.3536C4.15829 11.5488 3.84171 11.5488 3.64645 11.3536Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"></path></svg><svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 -translate-x-4"><path d="M3.64645 11.3536C3.45118 11.1583 3.45118 10.8417 3.64645 10.6465L10.2929 4L6 4C5.72386 4 5.5 3.77614 5.5 3.5C5.5 3.22386 5.72386 3 6 3L11.5 3C11.6326 3 11.7598 3.05268 11.8536 3.14645C11.9473 3.24022 12 3.36739 12 3.5L12 9.00001C12 9.27615 11.7761 9.50001 11.5 9.50001C11.2239 9.50001 11 9.27615 11 9.00001V4.70711L4.35355 11.3536C4.15829 11.5488 3.84171 11.5488 3.64645 11.3536Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"></path></svg>
                    </div>
                  </div>
                </HoverBorderGradient>
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
