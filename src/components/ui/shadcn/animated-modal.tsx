import React, { createContext, useContext, useState, ReactNode } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { FiX } from "react-icons/fi";
import { cn } from "@/lib/utils";

interface ModalContextValue {
  open: boolean;
  setOpen: (value: boolean) => void;
}

const ModalContext = createContext<ModalContextValue | undefined>(undefined);

export const useModal = () => {
  const ctx = useContext(ModalContext);
  if (!ctx) {
    throw new Error("useModal must be used within <Modal>");
  }
  return ctx;
};

interface ModalProps {
  children: ReactNode;
}

export const Modal: React.FC<ModalProps> = ({ children }) => {
  const [open, setOpen] = useState(false);

  return (
    <ModalContext.Provider value={{ open, setOpen }}>
      {children}
    </ModalContext.Provider>
  );
};

interface ModalBodyProps {
  children: ReactNode;
}

export const ModalBody: React.FC<ModalBodyProps> = ({ children }) => {
  const { open, setOpen } = useModal();

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm overflow-y-auto py-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setOpen(false)}
        >
          <motion.div
            className="w-full max-w-xl mx-4 my-auto"
            initial={{ scale: 0.9, opacity: 0, y: 10 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 10 }}
            transition={{ type: "spring", stiffness: 260, damping: 22 }}
            onClick={(e) => e.stopPropagation()}
          >
            {children}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

interface ModalContentProps {
  children: ReactNode;
  title?: ReactNode;
}

export const ModalContent: React.FC<ModalContentProps> = ({ children, title }) => {
  const { setOpen } = useModal();
  
  return (
    <div className="rounded-2xl bg-white dark:bg-neutral-900 shadow-xl border border-neutral-200/60 dark:border-neutral-800/80 max-h-[calc(100vh-1rem)] max-[380px]:max-h-[calc(100vh-0.5rem)] md:max-h-[90vh] overflow-hidden flex flex-col">
      {/* Header with title and close button */}
      <div className="flex items-center justify-between px-4 max-[380px]:px-3 pt-4 max-[380px]:pt-3 pb-3 max-[380px]:pb-2 border-b border-neutral-200 dark:border-neutral-800 flex-shrink-0">
        {title && (
          <div className="flex-1 pr-2 max-[380px]:pr-1 min-w-0">
            {title}
          </div>
        )}
        <button
          onClick={() => setOpen(false)}
          className={cn(
            "p-2 max-[380px]:p-1.5 rounded-lg flex-shrink-0",
            "text-neutral-400 dark:text-neutral-500",
            "hover:text-neutral-600 dark:hover:text-neutral-300",
            "hover:bg-neutral-100 dark:hover:bg-neutral-800",
            "transition-colors duration-150",
            "focus:outline-none focus:ring-2 focus:ring-neutral-400 focus:ring-offset-2",
            "dark:focus:ring-offset-neutral-900"
          )}
          aria-label="Close modal"
        >
          <FiX className="w-5 h-5 max-[380px]:w-4 max-[380px]:h-4" />
        </button>
      </div>
      
      {/* Scrollable content - scrollbar hidden but scrolling enabled */}
      <div className="overflow-y-auto flex-1 px-4 max-[380px]:px-3 py-4 max-[380px]:py-3 scrollbar-hide">
        <style>{`
          .scrollbar-hide {
            -ms-overflow-style: none;
            scrollbar-width: none;
          }
          .scrollbar-hide::-webkit-scrollbar {
            display: none;
          }
        `}</style>
        {children}
      </div>
    </div>
  );
};


