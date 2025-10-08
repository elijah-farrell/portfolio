import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

interface FullscreenMobileNavProps {
  isOpen: boolean;
  onClose: () => void;
  mainNavItems: Array<{
    name: string;
    link: string;
    isDropdown: boolean;
    sections?: Array<{ name: string; sectionId: string }>;
    isActive: boolean;
  }>;
  onModalOpen?: () => void;
}

export function FullscreenMobileNav({ isOpen, onClose, mainNavItems, onModalOpen }: FullscreenMobileNavProps) {
  const [openDropdowns, setOpenDropdowns] = useState<number[]>([]);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "unset";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);


  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ x: "-100%" }}
          animate={{ x: "0%" }}
          exit={{ x: "-100%" }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="fixed inset-0 z-50 bg-white dark:bg-neutral-950 flex flex-col items-center justify-center p-6 overflow-y-auto md:hidden pt-20"
        >
          {/* Logo */}
          <a
            href="/"
            onClick={(e) => {
              e.preventDefault();
              onClose();
              window.location.href = "/";
            }}
            className="text-2xl font-bold bg-gradient-to-r from-emerald-500 to-emerald-900 dark:from-emerald-300 dark:to-emerald-600 bg-clip-text text-transparent mb-6"
          >
            Elijah Farrell
          </a>

          {/* Navigation */}
          <nav className="flex flex-col items-center w-full gap-0 text-lg text-neutral-800 dark:text-neutral-100 font-medium mb-6">
            {mainNavItems.map((item, index) => (
              <div key={index} className="w-full max-w-sm">
                <div className={cn(
                  "w-full px-6 py-3 text-lg font-medium transition-all duration-200 rounded-lg inline-flex items-center justify-center",
                  item.isActive
                    ? "text-emerald-600 dark:text-emerald-400 bg-emerald-50/50 dark:bg-emerald-950/20"
                    : "text-neutral-800 dark:text-neutral-100 hover:text-emerald-600 dark:hover:text-emerald-400 hover:bg-neutral-100 dark:hover:bg-neutral-800/50"
                )}>
                  <button
                    onClick={() => {
                      onClose();
                      window.location.href = item.link;
                    }}
                    className="text-center"
                  >
                    {item.name}
                  </button>
                  {item.isDropdown && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setOpenDropdowns(prev => prev.includes(index) ? prev.filter(i => i !== index) : [...prev, index]);
                      }}
                      className="text-neutral-600 dark:text-neutral-400 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors"
                    >
                      <ChevronDown 
                        size={18} 
                        className={cn(
                          "transition-transform duration-200",
                          openDropdowns.includes(index) && "rotate-180"
                        )} 
                      />
                    </button>
                  )}
                </div>

                <AnimatePresence>
                  {openDropdowns.includes(index) && item.sections && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.2, ease: "easeOut" }}
                      className="overflow-hidden"
                    >
                      <div className="px-6 space-y-1 pt-2">
                        {item.sections.map((section, sectionIndex) => (
                          <button
                            key={sectionIndex}
                            onClick={() => {
                              onClose();
                              if (section.sectionId === "modal") {
                                onModalOpen?.();
                                return;
                              }
                              window.location.href = `/services#${section.sectionId}`;
                            }}
                            className="block w-full text-center text-base text-neutral-600 dark:text-neutral-300 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors py-2 px-3 rounded-md hover:bg-neutral-100 dark:hover:bg-neutral-800/30"
                          >
                            {section.name}
                          </button>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </nav>

          
        </motion.div>
      )}
    </AnimatePresence>
  );
}