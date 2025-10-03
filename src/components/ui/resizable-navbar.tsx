"use client";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import React, { useRef, useState, useEffect } from "react";
import { ChevronDown } from "lucide-react";

interface NavbarProps {
  children: React.ReactNode;
  className?: string;
}

interface NavBodyProps {
  children: React.ReactNode;
  className?: string;
  visible?: boolean;
  isNavComponent?: boolean;
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
  isNavComponent?: boolean;
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
  const [, setMounted] = useState(false);
  const [visible, setVisible] = useState<boolean>(false);

  // Ensure component is mounted before accessing window
  useEffect(() => {
    setMounted(true);
    
    const handleScroll = () => {
      const threshold = 10;
      const scrollY = window.scrollY || document.documentElement.scrollTop;
      
      if (scrollY > threshold) {
        setVisible(true);
      } else {
        setVisible(false);
      }
    };
    
    // Set initial state
    handleScroll();
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.div
      ref={ref}
      className={cn("fixed inset-x-0 z-40 w-full", className)}
    >
      {React.Children.map(children, (child) => {
        if (React.isValidElement(child)) {
          // Check if this component should receive the visible prop
          const shouldReceiveVisible = (child.props as { isNavComponent?: boolean })?.isNavComponent === true;
          
          return React.cloneElement(
            child as React.ReactElement<{ visible?: boolean }>,
            { visible: shouldReceiveVisible ? visible : undefined },
          );
        }
        return child;
      })}
    </motion.div>
  );
};

export const NavBody = ({ children, className, visible }: NavBodyProps) => {
  const [isTabletOrLarger, setIsTabletOrLarger] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const checkScreenSize = () => {
      setIsTabletOrLarger(window.innerWidth >= 768);
    };
    
    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);


  return (
    <motion.div
      animate={mounted ? {
        width: visible && isTabletOrLarger ? "95%" : "100%",
        backdropFilter: visible ? "blur(12px)" : "blur(0px)",
        boxShadow: visible
          ? "0 8px 32px rgba(34, 42, 53, 0.12), 0 2px 8px rgba(0, 0, 0, 0.08), 0 0 0 1px rgba(34, 42, 53, 0.06), 0 0 8px rgba(34, 42, 53, 0.12), 0 20px 80px rgba(47, 48, 55, 0.08), 0 2px 0 rgba(255, 255, 255, 0.15) inset"
          : "0 0 0 rgba(0, 0, 0, 0)",
      } : {}}
      transition={{
        type: "spring",
        stiffness: 300,
        damping: 40,
        duration: 0.8,
        ease: "easeOut",
      }}
      className={cn(
        "relative z-50 mx-auto hidden lg:flex w-full max-w-6xl xl:max-w-7xl 2xl:max-w-8xl flex-row items-center justify-center py-4 px-6 bg-white/80 backdrop-blur-md dark:bg-neutral-950/80 rounded-full",
        className,
      )}
    >
      <div className="w-full flex flex-row items-center relative">
        <motion.div 
          className="absolute left-0 flex items-center"
          animate={mounted ? {
            x: visible && isTabletOrLarger ? 12 : 0,
          } : {}}
          transition={{
            type: "spring",
            stiffness: 300,
            damping: 40,
            duration: 0.8,
            ease: "easeOut",
          }}
        >
          {React.Children.toArray(children)[0]}
        </motion.div>
        <div className="w-full flex justify-center">
          {React.Children.toArray(children)[1]}
        </div>
        <motion.div 
          className="absolute right-0 flex items-center"
          animate={mounted ? {
            x: visible && isTabletOrLarger ? -12 : 0,
          } : {}}
          transition={{
            type: "spring",
            stiffness: 300,
            damping: 40,
            duration: 0.8,
            ease: "easeOut",
          }}
        >
          {React.Children.toArray(children)[2]}
        </motion.div>
      </div>
    </motion.div>
  );
};

export const NavItems = ({ items, className, onItemClick: _onItemClick, onSectionClick }: NavItemsProps) => {
  const [openDropdown, setOpenDropdown] = useState<number | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setOpenDropdown(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div
      ref={dropdownRef}
      className={cn(
        "flex flex-row items-center space-x-2 text-sm font-medium text-zinc-600 transition duration-200 hover:text-zinc-800 mx-0",
        className,
      )}
    >
      {items.map((item, idx) => (
        <div key={`nav-item-${idx}`} className="relative">
          {item.isDropdown ? (
            <div 
              className="relative"
              onMouseEnter={() => {
                setOpenDropdown(idx);
              }}
              onMouseLeave={() => {
                setOpenDropdown(null);
              }}
            >
                <div className={`flex items-center rounded-md hover:bg-accent hover:text-accent-foreground transition-colors duration-200 ${
                  item.isActive 
                    ? 'text-emerald-500 dark:text-emerald-400 font-semibold' 
                    : 'text-neutral-600 dark:text-neutral-300'
                }`}>
                 <a 
                   href={item.link}
                   onClick={(e) => {
                     e.preventDefault();
                     window.location.href = item.link;
                   }}
                   className="relative px-2 py-2 flex items-center text-sm font-medium"
                 >
                   {item.icon && <span className="relative z-20 -mr-1">{item.icon}</span>}
                   <span className="relative z-20">{item.name}</span>
                 </a>
                 <button
                   onClick={(e) => {
                     e.preventDefault();
                     e.stopPropagation();
                     const newOpenDropdown = openDropdown === idx ? null : idx;
                     setOpenDropdown(newOpenDropdown);
                   }}
                   className="pr-2 py-2 text-sm font-medium"
                 >
                   <ChevronDown className={`w-4 h-4 transition-all duration-200 relative z-20 ${
                     openDropdown === idx ? 'rotate-180' : ''
                   }`} />
                 </button>
                </div>
              
              {/* Dropdown */}
              <AnimatePresence>
                {openDropdown === idx && (
                  <>
                    {/* Invisible bridge to prevent dropdown from closing */}
                    <div className="absolute top-full left-0 w-48 h-1 bg-transparent" />
                    <motion.div
                      initial={{ opacity: 0, y: -10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -10, scale: 0.95 }}
                      transition={{ duration: 0.2, ease: "easeOut" }}
                      className="absolute top-full left-0 mt-1 w-48 bg-white dark:bg-neutral-950 rounded-lg shadow-lg border border-gray-200 dark:border-neutral-700 py-1 z-[9999"
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
                        className="block w-full text-left px-4 py-1.5 text-sm transition-colors duration-150 rounded-md text-neutral-600 dark:text-neutral-300 hover:bg-accent hover:text-accent-foreground"
                      >
                        {section.name}
                      </a>
                      ))}
                    </motion.div>
                  </>
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
    </div>
  );
};

export const MobileNav = ({ children, className, visible, isMenuOpen }: MobileNavProps) => {
  const [isTabletOrLarger, setIsTabletOrLarger] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const checkScreenSize = () => {
      setIsTabletOrLarger(window.innerWidth >= 768);
    };
    
    const checkTheme = () => {
      setIsDarkMode(document.documentElement.classList.contains('dark'));
    };
    
    checkScreenSize();
    checkTheme();
    window.addEventListener('resize', checkScreenSize);
    
    // Watch for theme changes
    const observer = new MutationObserver(checkTheme);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
    
    return () => {
      window.removeEventListener('resize', checkScreenSize);
      observer.disconnect();
    };
  }, []);

  return (
    <motion.div
      animate={mounted ? {
        width: visible && isTabletOrLarger ? "95%" : "100%",
        backgroundColor: visible 
          ? (isDarkMode ? "rgba(10, 10, 10, 0.9)" : "rgba(255, 255, 255, 0.9)")
          : (isDarkMode ? "rgba(10, 10, 10, 0)" : "rgba(255, 255, 255, 0)"),
        boxShadow: visible
          ? "0 4px 16px rgba(34, 42, 53, 0.08), 0 1px 4px rgba(0, 0, 0, 0.06), 0 0 0 1px rgba(34, 42, 53, 0.04)"
          : "0 0 0 rgba(0, 0, 0, 0)",
      } : {}}
      transition={{
        type: "spring",
        stiffness: 300,
        damping: 40,
        duration: 0.8,
        ease: "easeOut",
      }}
      className={cn(
        "relative z-50 mx-auto flex w-full max-w-full flex-col items-center justify-center px-0 py-1 lg:hidden backdrop-blur-md",
        isTabletOrLarger && "rounded-full",
        visible && "shadow-lg",
        isMenuOpen && "bg-white dark:bg-neutral-950",
        className,
      )}
    >
      {children}
    </motion.div>
  );
};

export const MobileNavHeader = ({
  children,
  className,
  isMenuOpen,
}: MobileNavHeaderProps) => {
  const [isTabletOrLarger, setIsTabletOrLarger] = useState(false);
  const [visible, setVisible] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const checkScreenSize = () => {
      setIsTabletOrLarger(window.innerWidth >= 768);
    };
    
    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  // Get visible state from parent (this is a bit hacky but works)
  useEffect(() => {
    if (!mounted) return;
    
    const handleScroll = () => {
      const scrollY = window.scrollY || document.documentElement.scrollTop;
      setVisible(scrollY > 10);
    };
    
    // Set initial state
    handleScroll();
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [mounted]);

  return (
    <div
      className={cn(
        "flex w-full flex-row items-center justify-between px-6 lg:px-24 xl:px-40 2xl:px-52 py-1",
        isMenuOpen && "bg-white dark:bg-neutral-950",
        className,
      )}
    >
      <motion.div 
        className="flex items-center"
        animate={mounted ? {
          x: visible && isTabletOrLarger ? 8 : 0,
        } : {}}
        transition={{
          type: "spring",
          stiffness: 300,
          damping: 25,
          duration: 0.4,
        }}
      >
        {React.Children.toArray(children)[0]}
      </motion.div>
      <motion.div 
        className="flex items-center"
        animate={mounted ? {
          x: visible && isTabletOrLarger ? -8 : 0,
        } : {}}
        transition={{
          type: "spring",
          stiffness: 300,
          damping: 25,
          duration: 0.4,
        }}
      >
        {React.Children.toArray(children)[1]}
      </motion.div>
    </div>
  );
};

export const MobileNavMenu = ({
  children,
  className,
  isOpen,
  onClose: _onClose,
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
            "fixed inset-x-0 top-[60px z-50 flex w-full flex-col items-start justify-start gap-2 bg-white px-6 lg:px-24 xl:px-40 2xl:px-52 py-4 shadow-[0_4px_20px_rgba(0,_0,_0,_0.1),_0_1px_1px_rgba(0,_0,_0,_0.05) dark:bg-neutral-950 border-t border-gray-200 dark:border-neutral-700 max-h-[calc(100vh-60px)] overflow-y-auto",
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
    <div className={`flex items-center ${visible ? 'ml-0 mr-1' : 'ml-0 mr-0'}`}>
      <a 
        href="/"
        onClick={(e) => {
          e.preventDefault();
          window.location.href = '/';
        }}
        className="relative text-lg md:text-xl whitespace-nowrap transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 rounded py-1"
      >
        <span className="text-xl bg-gradient-to-r from-emerald-500 to-emerald-900 dark:from-emerald-300 dark:to-emerald-600 bg-clip-text text-transparent relative z-10">Elijah</span>
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
      className="p-2.5 rounded-lg bg-white dark:bg-[#0A0A0A border border-gray-200 dark:border-neutral-700 hover:bg-gray-50 hover:border-emerald-500 dark:hover:border-emerald-700 transition-all duration-200 shadow-sm hover:shadow-md"
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

