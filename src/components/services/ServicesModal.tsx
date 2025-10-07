import React, { useState, useEffect } from "react";
import ContactForm from "./ContactForm";
import {
  Modal,
  ModalBody,
  ModalContent,
} from "@/components/ui/shadcn/animated-modal";

interface ServicesModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ServicesModal({ isOpen, onClose }: ServicesModalProps) {
  const [internalOpen, setInternalOpen] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setInternalOpen(true);
    }
  }, [isOpen]);

  const handleClose = () => {
    setInternalOpen(false);
    onClose();
  };

  if (!internalOpen) return null;

  return (
    <Modal>
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
