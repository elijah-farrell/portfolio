import React, { useState, useEffect } from "react";
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
          <ModalContent>
            <ModalCloseProvider>
              {(onClose) => (
                <>
                  <h4 className="text-lg md:text-2xl text-neutral-600 dark:text-neutral-100 font-bold text-center mb-4">
                    Let's Talk About Your Project
                  </h4>
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
