import React, { useEffect } from "react";
import ContactForm from "./ContactForm";
import {
  Modal,
  ModalBody,
  ModalContent,
  useModal,
} from "@/components/ui/shadcn/animated-modal";

interface ServicesModalProps {
  isOpen: boolean;
  onClose: () => void;
}

// Custom Modal Trigger Component for Services
const ServicesModalTrigger = ({ isOpen, onClose }: ServicesModalProps) => {
  const { setOpen } = useModal();
  
  useEffect(() => {
    if (isOpen) {
      setOpen(true);
    }
  }, [isOpen, setOpen]);
  
  // Listen for modal close and call onClose
  useEffect(() => {
    const handleModalClose = () => {
      onClose();
    };
    
    // Custom event listener for when modal closes
    const checkModalState = () => {
      const modalElement = document.querySelector('[data-modal-open="true"]');
      if (!modalElement && isOpen) {
        onClose();
      }
    };
    
    const interval = setInterval(checkModalState, 100);
    
    return () => {
      clearInterval(interval);
    };
  }, [isOpen, onClose]);
  
  return null;
};

export default function ServicesModal({ isOpen, onClose }: ServicesModalProps) {
  return (
    <Modal>
      <ServicesModalTrigger isOpen={isOpen} onClose={onClose} />
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
  );
}
