"use client";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from "framer-motion";
import React, { useRef, useState, useEffect } from "react";
import { ScrollProgress } from "../magicui/scroll-progress";
import { ChevronDown } from "lucide-react";

interface NavbarProps {
  children: React.ReactNode;
  className?: string;
}

interface NavBodyProps {
  children: React.ReactNode;
  className?: string;
  visible?: boolean;
}

interface NavItemsProps {
  items: {
    name: string;
    link: string;
    isDropdown?: boolean;
    sections?: Array<{ name: string; sectionId: string }>;
    icon?: React.ReactNode;
    isActive?: boolean;
  }[];
  className?: string;
  onItemClick?: (itemName: string) => void;
  onSectionClick?: (sectionId: string) => void;
}

interface MobileNavProps {
  children: React.ReactNode;
  className?: string;
  visible?: boolean;
  isMenuOpen?: boolean;
}

interface MobileNavHeaderProps {
  children: React.ReactNode;
  className?: string;
  isMenuOpen?: boolean;
}

interface MobileNavMenuProps {
  children: React.ReactNode;
  className?: string;
  isOpen: boolean;
  onClose: () => void;
}

export const ResizableNavbar = ({ children, className }: NavbarProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const currentPath = window.location.pathname;
  const { scrollY } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
    layoutEffect: false,
  });
  const [visible, setVisible] = useState<boolean>(false);

  useMotionValueEvent(scrollY, "change", (latest) => {
    // Use smaller threshold (50px) for services page, 100px for other pages
    const threshold = currentPath === '/services' ? 50 : 100;
    
    if (latest > threshold) {
      setVisible(true);
    } else {
      setVisible(false);
    }
  });

  return (
    <motion.div
      ref={ref}
      className={cn("fixed inset-x-0 z-40 w-full", className)}
    >
      {React.Children.map(children, (child) =>
        React.isValidElement(child)
          ? React.cloneElement(
              child as React.ReactElement<{ visible?: boolean }>,
              { visible },
            )
          : child,
      )}
    </motion.div>
  );
};

export const NavBody = ({ children, className, visible }: NavBodyProps) => {
  return (
    <motion.div
      animate={{
        backdropFilter: visible ? "blur(10px)" : "none",
        boxShadow: visible
          ? "0 0 24px rgba(34, 42, 53, 0.06), 0 1px 1px rgba(0, 0, 0, 0.05), 0 0 0 1px rgba(34, 42, 53, 0.04), 0 0 4px rgba(34, 42, 53, 0.08), 0 16px 68px rgba(47, 48, 55, 0.05), 0 1px 0 rgba(255, 255, 255, 0.1) inset"
          : "none",
        width: visible ? "90%" : "100%",
        paddingTop: visible ? "15px" : "10px",
        paddingBottom: visible ? "10px" : "10px",
        paddingRight: visible ? "40px" : "0px",
        paddingLeft: visible ? "40px" : "0px",
        y: visible ? 0 : 0,
      }}
      transition={{
        type: "spring",
        stiffness: 200,
        damping: 50,
      }}
      className={cn(
        "relative z-50 mx-auto hidden lg:flex w-full max-w-7xl flex-row items-center justify-between px-4 lg:px-6 py-2 bg-white/80 backdrop-blur-md dark:bg-neutral-950/80 rounded-full",
        className,
      )}
    >
      <ScrollProgress className={visible ? `top-[52px] mx-9` : 'top-[39.6px] mx-9'} />
      {React.Children.map(children, (child) =>
        React.isValidElement(child)
          ? React.cloneElement(
              child as React.ReactElement<{ visible?: boolean }>,
              { visible },
            )
          : child,
      )}
    </motion.div>
  );
};

export const NavItems = ({ items, className, onItemClick, onSectionClick }: NavItemsProps) => {
  const [openDropdown, setOpenDropdown] = useState<number | null>(null);
  const [clickedDropdowns, setClickedDropdowns] = useState<Set<number>>(new Set());
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setOpenDropdown(null);
        setClickedDropdowns(new Set());
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <motion.div
      ref={dropdownRef}
      className={cn(
        "flex flex-row items-center justify-center space-x-2 text-sm font-medium text-zinc-600 transition duration-200 hover:text-zinc-800 mx-0",
        className,
      )}
    >
      {items.map((item, idx) => (
        <div key={`nav-item-${idx}`} className="relative">
          {item.isDropdown ? (
            <div 
              className="relative"
              onMouseEnter={() => setOpenDropdown(idx)}
              onMouseLeave={() => {
                // Only close if not clicked (locked)
                if (!clickedDropdowns.has(idx)) {
                  setOpenDropdown(null);
                }
              }}
            >
              <div className="flex items-center">
                <div className="flex items-center rounded-md hover:bg-accent hover:text-accent-foreground transition-colors duration-200 pr-1">
                  <a 
                    href={item.link}
                    onClick={(e) => {
                      e.preventDefault();
                      window.location.href = item.link;
                    }}
                    className={`relative px-2 py-2 flex items-center text-sm font-medium ${
                      item.isActive 
                        ? 'text-emerald-500 dark:text-emerald-400 font-semibold' 
                        : 'text-neutral-600 dark:text-neutral-300'
                    }`}
                  >
                    {item.icon && <span className="relative z-20 -mr-1">{item.icon}</span>}
                    <span className="relative z-20">{item.name}</span>
                  </a>
                  <button 
                    onClick={() => {
                      // Toggle dropdown and lock it when clicked
                      const newOpenDropdown = openDropdown === idx ? null : idx;
                      setOpenDropdown(newOpenDropdown);
                      
                      // Track clicked state
                      if (newOpenDropdown === idx) {
                        setClickedDropdowns(prev => new Set(prev).add(idx));
                      } else {
                        setClickedDropdowns(prev => {
                          const newSet = new Set(prev);
                          newSet.delete(idx);
                          return newSet;
                        });
                      }
                    }}
                    className={`py-2 -ml-1 transition-all duration-200 ${
                      clickedDropdowns.has(idx)
                        ? 'text-emerald-500 dark:text-emerald-400' 
                        : 'text-neutral-600 dark:text-neutral-300'
                    }`}
                  >
                    <ChevronDown className={`w-4 h-4 transition-all duration-200 ${
                      openDropdown === idx ? 'rotate-180' : ''
                    }`} />
                  </button>
                </div>
              </div>
              
              {/* Dropdown */}
              <AnimatePresence>
                {openDropdown === idx && (
                  <motion.div
                    initial={{ opacity: 0, y: -10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -10, scale: 0.95 }}
                    transition={{ duration: 0.2, ease: "easeOut" }}
                    className="absolute top-full left-0 mt-2 w-48 bg-white dark:bg-neutral-950 rounded-lg shadow-lg border border-gray-200 dark:border-neutral-700 py-2 z-[9999]"
                    onMouseEnter={() => setOpenDropdown(idx)}
                    onMouseLeave={() => {
                      // Only close if not clicked (locked)
                      if (!clickedDropdowns.has(idx)) {
                        setOpenDropdown(null);
                      }
                    }}
                  >
                    {item.sections?.map((section, sectionIdx) => (
                      <a
                        key={sectionIdx}
                        href={section.sectionId === "modal" ? "#" : `${item.link}#${section.sectionId}`}
                        onClick={(e) => {
                          e.preventDefault();
                          setOpenDropdown(null);
                          
                          if (section.sectionId === "modal") {
                            onSectionClick?.(section.sectionId);
                          } else {
                            const currentPath = window.location.pathname;
                            
                            if (currentPath === item.link) {
                              // Same page - just scroll without changing URL
                              const element = document.getElementById(section.sectionId);
                              if (element) {
                                element.scrollIntoView({ behavior: "smooth", block: "start" });
                              }
                            } else {
                              // Different page - store scroll target and navigate
                              sessionStorage.setItem('scrollToSection', section.sectionId);
                              window.location.href = item.link;
                            }
                          }
                        }}
                        className="block w-full text-left px-4 py-2 text-sm transition-colors duration-150 rounded-md text-neutral-600 dark:text-neutral-300 hover:bg-accent hover:text-accent-foreground"
                      >
                        {section.name}
                      </a>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ) : (
            <a
              href={item.link}
              onClick={(e) => {
                e.preventDefault();
                
                if (item.link.includes('#')) {
                  // Section link - scroll to section
                  const sectionId = item.link.split('#')[1];
                  const currentPath = window.location.pathname;
                  
                  if (currentPath === '/') {
                    // Same page - just scroll without changing URL
                    const element = document.getElementById(sectionId);
                    if (element) {
                      element.scrollIntoView({ behavior: "smooth", block: "start" });
                    }
                  } else {
                    // Different page - store scroll target and navigate
                    sessionStorage.setItem('scrollToSection', sectionId);
                    window.location.href = '/';
                  }
                } else {
                  // Page link - navigate directly
                  window.location.href = item.link;
                }
              }}
              className={`relative px-2 py-2 transition-all duration-300 ease-in-out flex items-center rounded-lg hover:bg-accent hover:text-accent-foreground ${
                item.isActive 
                  ? 'text-emerald-500 dark:text-emerald-400 font-semibold' 
                  : 'text-neutral-600 dark:text-neutral-300'
              }`}
            >
              {item.icon && <span className="relative z-20 mr-2">{item.icon}</span>}
              <span className="relative z-20">{item.name}</span>
            </a>
          )}
        </div>
      ))}
    </motion.div>
  );
};

export const MobileNav = ({ children, className, visible, isMenuOpen }: MobileNavProps) => {
  return (
    <motion.div
      animate={{
        backdropFilter: visible ? "blur(10px)" : "none",
        boxShadow: visible
          ? "0 0 24px rgba(34, 42, 53, 0.06), 0 1px 1px rgba(0, 0, 0, 0.05), 0 0 0 1px rgba(34, 42, 53, 0.04), 0 0 4px rgba(34, 42, 53, 0.08), 0 16px 68px rgba(47, 48, 55, 0.05), 0 1px 0 rgba(255, 255, 255, 0.1) inset"
          : "none",
        width: visible ? "100%" : "100%",
        paddingRight: visible ? "15px" : "10px",
        paddingLeft: visible ? "15px" : "10px",
        y: visible ? 0 : 0,
      }}
      transition={{
        type: "spring",
        stiffness: 200,
        damping: 50,
      }}
      className={cn(
        "relative z-50 mx-auto flex w-full max-w-full flex-col items-center justify-between px-0 py-0 lg:hidden bg-white/90 backdrop-blur-md dark:bg-neutral-950/90",
        isMenuOpen && "bg-white dark:bg-neutral-950",
        className,
      )}
    >
      <ScrollProgress className={'top-[52px]'} />
      {children}
    </motion.div>
  );
};

export const MobileNavHeader = ({
  children,
  className,
  isMenuOpen,
}: MobileNavHeaderProps) => {
  return (
    <div
      className={cn(
        "flex w-full flex-row items-center justify-between px-4 py-3",
        isMenuOpen && "bg-white dark:bg-neutral-950",
        className,
      )}
    >
      {children}
    </div>
  );
};

export const MobileNavMenu = ({
  children,
  className,
  isOpen,
  onClose,
}: MobileNavMenuProps) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.2, ease: "easeOut" }}
          className={cn(
            "absolute inset-x-0 top-full z-50 flex w-full flex-col items-start justify-start gap-2 bg-white px-4 py-4 shadow-[0_4px_20px_rgba(0,_0,_0,_0.1),_0_1px_1px_rgba(0,_0,_0,_0.05)] dark:bg-neutral-950 border-t border-gray-200 dark:border-neutral-700",
            className,
          )}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export const NavbarLogo = ({ visible }: { visible?: boolean }) => {
  return (
    <div className={`flex items-center ${visible ? 'ml-0 mr-1' : 'ml-2 mr-2'}`}>
      <a 
        href="/"
        onClick={(e) => {
          e.preventDefault();
          window.location.href = '/';
        }}
        className="relative text-lg md:text-xl font-bold whitespace-nowrap transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 rounded px-2 py-1 hover:scale-105 hover:-translate-y-0.5 active:scale-95 active:translate-y-0 group overflow-hidden"
      >
        {/* Shimmer effect */}
        <div className="absolute inset-0 -top-1 -left-1 bg-gradient-to-r from-transparent via-emerald-500/20 to-transparent w-[calc(100%+8px)] h-[calc(100%+8px)] opacity-0 group-hover:opacity-100 group-hover:animate-pulse transition-opacity duration-300 pointer-events-none"></div>
        <span className="text-emerald-600 dark:text-emerald-500 relative z-10">Elijah</span>
        <span className="hidden xl:inline text-gray-900 dark:text-white relative z-10"> Farrell</span>
      </a>
    </div>
  );
};

export const MobileNavToggle = ({
  isOpen,
  onClick,
}: {
  isOpen: boolean;
  onClick: () => void;
}) => {
  return (
    <button
      onClick={onClick}
      className="p-2.5 rounded-lg bg-white dark:bg-[#0A0A0A] border border-gray-200 dark:border-neutral-700 hover:bg-gray-50 hover:border-emerald-500 dark:hover:border-emerald-700 transition-all duration-200 shadow-sm hover:shadow-md"
    >
      <div className="w-4 h-4 flex flex-col justify-center items-center">
        <span className={`block w-3.5 h-0.5 bg-neutral-600 dark:bg-neutral-300 transition-all duration-300 ${
          isOpen ? 'rotate-45 translate-y-1' : ''
        }`} />
        <span className={`block w-3.5 h-0.5 bg-neutral-600 dark:bg-neutral-300 transition-all duration-300 mt-0.5 ${
          isOpen ? 'opacity-0' : ''
        }`} />
        <span className={`block w-3.5 h-0.5 bg-neutral-600 dark:bg-neutral-300 transition-all duration-300 mt-0.5 ${
          isOpen ? '-rotate-45 -translate-y-1' : ''
        }`} />
      </div>
    </button>
  );
};
