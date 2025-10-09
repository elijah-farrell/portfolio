import React, { useState, useEffect } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { scrollToSectionOnly } from "@/lib/scroll-utils";

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
    console.log('FullscreenMobileNav mounted, isOpen:', isOpen);
    console.log('mainNavItems:', mainNavItems);
    document.body.style.overflow = isOpen ? "hidden" : "unset";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen, mainNavItems]);


  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 z-50 bg-white dark:bg-neutral-950 flex flex-col items-center justify-center p-6 overflow-y-auto md:hidden pt-20">
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
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      console.log('Main nav clicked:', item.link);
                      onClose();
                      if (item.link.includes('#')) {
                        const sectionId = item.link.split('#')[1];
                        console.log('Extracted sectionId:', sectionId);
                        scrollToSectionOnly(sectionId);
                      } else {
                        console.log('Regular page link, navigating to:', item.link);
                        window.location.href = item.link;
                      }
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

                {openDropdowns.includes(index) && item.sections && (
                  <div className="px-6 space-y-1 pt-2">
                    {item.sections.map((section, sectionIndex) => (
                      <button
                        key={sectionIndex}
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          console.log('Dropdown section clicked:', section.sectionId);
                          onClose();
                          if (section.sectionId === "modal") {
                            console.log('Modal clicked');
                            onModalOpen?.();
                            return;
                          }
                          console.log('Scrolling to section:', section.sectionId);
                          scrollToSectionOnly(section.sectionId);
                        }}
                        className="block w-full text-center text-base text-neutral-600 dark:text-neutral-300 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors py-2 px-3 rounded-md hover:bg-neutral-100 dark:hover:bg-neutral-800/30"
                      >
                        {section.name}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </nav>

          
        </div>
      )}
    </>
  );
}