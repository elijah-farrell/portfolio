import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { SEO } from "@/components/seo/SEO";
import ServicesHero from "@/pages/services/ServicesHero";
import ServicesShowcase from "@/pages/services/ServicesShowcase";
import StartProjectButton from "@/pages/services/StartProjectButton";
import ContactForm from "@/pages/services/ContactForm";
import {
  Modal,
  ModalBody,
  ModalContent,
  useModal,
} from "@/components/ui/shadcn/animated-modal";
import { TracingBeam } from "@/components/ui/aceternity/tracing-beam";

// Modal Trigger Component
const ModalTrigger = ({ isOpen, onOpened }: { isOpen: boolean; onOpened: () => void }) => {
  const { setOpen } = useModal();
  
  useEffect(() => {
    if (isOpen) {
      setOpen(true);
      onOpened(); // Reset the state after opening
    }
  }, [isOpen, setOpen, onOpened]);
  
  return null;
};

// Modal Close Component - provides close function to children
const ModalCloseProvider = ({ children }: { children: (onClose: () => void) => React.ReactNode }) => {
  const { setOpen } = useModal();
  return <>{children(() => setOpen(false))}</>;
};

export default function Services(): JSX.Element {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const location = useLocation();

  // Handle modal open requests from navbar
  useEffect(() => {
    const handleOpenModal = () => {
      setIsModalOpen(true);
    };

    window.addEventListener("openContactModal", handleOpenModal);
    return () => {
      window.removeEventListener("openContactModal", handleOpenModal);
    };
  }, []);

  // Reset scroll position when navigating to this page (don't preserve scroll from previous page)
  useEffect(() => {
    // Always start at top when navigating to services page
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [location.pathname]);

  // Handle scroll requests and modal open requests passed via navigation state
  useEffect(() => {
    const state = location.state as { scrollToSection?: string; openModal?: boolean } | null;
    
    // Check if modal should be opened
    if (state?.openModal) {
      // Scroll down to contact form section, then open modal
      const scrollTimeout = window.setTimeout(() => {
        const element = document.getElementById("contact-form");
        if (element) {
          const isMobile = window.innerWidth < 768;
          const navOffset = isMobile ? 25 : 60;
          const rect = element.getBoundingClientRect();
          const targetTop = window.scrollY + rect.top - navOffset;

          window.scrollTo({
            top: targetTop,
            behavior: "smooth",
          });
        }
        
        // Open modal after scrolling
        setIsModalOpen(true);
      }, 150);

      // Clear state so back/forward navigation doesn't keep opening modal
      window.history.replaceState({}, "", location.pathname);
      
      return () => window.clearTimeout(scrollTimeout);
    }

    if (!state?.scrollToSection) return;

    const sectionId = state.scrollToSection;

    // Scroll down to the requested section
    const timeout = window.setTimeout(() => {
      const element = document.getElementById(sectionId);
      if (!element) return;

      const isMobile = window.innerWidth < 768;
      const navOffset = isMobile ? 25 : 60;
      const rect = element.getBoundingClientRect();
      const targetTop = window.scrollY + rect.top - navOffset;

      window.scrollTo({
        top: targetTop,
        behavior: "smooth",
      });
    }, 150);

    // Clear state so back/forward navigation doesn't keep re-scrolling
    window.history.replaceState({}, "", location.pathname);

    return () => window.clearTimeout(timeout);
  }, [location]);

  return (
    <div>
      <SEO
        title="Technical Services by Elijah Farrell – Web Development & Consulting"
        description="CS professional offering web development, backend services, and technical consulting. Let's build something together."
        keywords="web development, technical consulting, React, Python, backend development, CS professional"
        url="https://elijahfarrell.com/services"
      />
      
      <ServicesHero />
      
      <section id="what-i-do" className="pt-8 pb-12 bg-white dark:bg-neutral-950">
        <div className="max-w-7xl mx-auto">
          <TracingBeam className="px-6">
            <ServicesShowcase onGetStarted={() => setIsModalOpen(true)} />
          </TracingBeam>
        </div>
      </section>
      
      <StartProjectButton onGetStarted={() => setIsModalOpen(true)} />
      
      <Modal>
        <ModalTrigger 
          isOpen={isModalOpen} 
          onOpened={() => setIsModalOpen(false)}
        />
        <ModalBody>
          <ModalContent
            title={
              <h4 className="text-base max-[475px]:text-sm max-[380px]:text-xs md:text-xl text-neutral-900 dark:text-neutral-100 font-bold">
                Let's Talk About Your Project
              </h4>
            }
          >
            <ModalCloseProvider>
              {(onClose) => (
                <>
                  <p className="text-neutral-600 dark:text-neutral-400 text-center mb-6">
                    Tell me about what you need help with. I'll get back to you within 24 hours to discuss your project and see how I can help.
                  </p>
                  <ContactForm onClose={onClose} />
                </>
              )}
            </ModalCloseProvider>
          </ModalContent>
        </ModalBody>
      </Modal>
    </div>
  );
}
