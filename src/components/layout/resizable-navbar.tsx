"use client";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence, useMotionValueEvent, useScroll } from "framer-motion";
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
  const { scrollY } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const [visible, setVisible] = useState<boolean>(false);

  // Use framer-motion's useMotionValueEvent for smoother scroll tracking
  useMotionValueEvent(scrollY, "change", (latest) => {
    // Trigger animation on any scroll, even first scroll
    if (latest > 10) {
      setVisible(true);
    } else {
      setVisible(false);
    }
  });

  return (
    <motion.div
      ref={ref}
      className={cn("fixed inset-x-0 top-0 z-40 w-full", className)}
      style={{
        // Force GPU acceleration for better Safari compatibility
        willChange: 'transform',
        transform: 'translateZ(0)',
        WebkitBackfaceVisibility: 'hidden',
        backfaceVisibility: 'hidden',
      }}
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
  const [slideAmount, setSlideAmount] = useState(0);
  const [paddingAmount, setPaddingAmount] = useState({ normal: "1.5rem", scrolled: "2.5rem" });

  useEffect(() => {
    // Calculate slide amount and padding based on screen width
    const checkScreenSize = () => {
      const width = window.innerWidth;
      
      // 1280px+: Subtle animation that keeps items close to edges
      if (width >= 1280) {
        setSlideAmount(4);
        setPaddingAmount({ normal: "1.5rem", scrolled: "1.8rem" });
      } 
      // 830-1280px: NO slide, NO padding change - items stay at edges
      else if (width >= 830) {
        setSlideAmount(0);
        setPaddingAmount({ normal: "1.5rem", scrolled: "1.5rem" });
      } else {
        setSlideAmount(0);
        setPaddingAmount({ normal: "1.5rem", scrolled: "1.5rem" });
      }
    };
    
    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  return (
    <motion.div
      animate={{
        width: visible ? "90%" : "100%",
        backdropFilter: visible ? "blur(10px)" : "blur(0px)",
        boxShadow: visible
          ? "0 0 24px rgba(34, 42, 53, 0.06), 0 1px 1px rgba(0, 0, 0, 0.05), 0 0 0 1px rgba(34, 42, 53, 0.04), 0 0 4px rgba(34, 42, 53, 0.08), 0 16px 68px rgba(47, 48, 55, 0.05), 0 1px 0 rgba(255, 255, 255, 0.1) inset"
          : "0 0 0 rgba(0, 0, 0, 0)",
        paddingTop: visible ? "1rem" : "1rem",
        paddingBottom: visible ? "1rem" : "1rem",
        paddingLeft: visible ? paddingAmount.scrolled : paddingAmount.normal,
        paddingRight: visible ? paddingAmount.scrolled : paddingAmount.normal,
      }}
      transition={{
        type: "spring",
        stiffness: 200,
        damping: 50,
      }}
      className={cn(
        "relative z-50 mx-auto hidden nav:flex w-full max-w-6xl xl:max-w-7xl 2xl:max-w-8xl flex-row items-center justify-center bg-white/80 backdrop-blur-md dark:bg-neutral-950/80 rounded-full",
        className,
      )}
    >
      <div className="w-full flex flex-row items-center relative">
        <motion.div 
          className="absolute left-0 flex items-center"
          animate={{ x: visible ? slideAmount : 0 }}
          transition={{
            type: "spring",
            stiffness: 200,
            damping: 50,
          }}
        >
          {React.Children.toArray(children)[0]}
        </motion.div>
        <div className="w-full flex justify-center">
          {React.Children.toArray(children)[1]}
        </div>
        <motion.div 
          className="absolute right-0 flex items-center"
          animate={{ x: visible ? -slideAmount : 0 }}
          transition={{
            type: "spring",
            stiffness: 200,
            damping: 50,
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
        "flex flex-row items-center space-x-2 text-sm font-medium text-zinc-600 hover:text-zinc-800 mx-0",
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
                <div className={`flex items-center rounded-md hover:bg-accent hover:text-accent-foreground ${
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
                   className="pr-1 py-2 text-sm font-medium"
                 >
                   <ChevronDown className={`w-4 h-4 transition-transform duration-200 relative z-20 ${
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
                        className="block w-full text-left px-4 py-1.5 text-sm rounded-md text-neutral-600 dark:text-neutral-300 hover:bg-accent hover:text-accent-foreground"
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
              className={`relative px-2 py-2 flex items-center rounded-lg hover:bg-accent hover:text-accent-foreground ${
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

  return (
    <motion.div
      animate={{
        width: "100%",
        height: isMenuOpen ? "100vh" : "auto",
        backdropFilter: visible && !isMenuOpen ? "blur(10px)" : "blur(0px)",
      }}
      transition={{
        type: isMenuOpen ? "tween" : "spring",
        stiffness: 200,
        damping: 50,
        duration: isMenuOpen ? 0.3 : undefined,
        ease: isMenuOpen ? "easeInOut" : undefined,
      }}
      className={cn(
        "relative z-40 mx-auto flex w-full max-w-full flex-col px-0 py-1 nav:hidden [background-color:transparent] [box-shadow:none]",
        visible && !isMenuOpen && "!shadow-[0_0_24px_rgba(34,42,53,0.06),0_1px_1px_rgba(0,0,0,0.05),0_0_0_1px_rgba(34,42,53,0.04),0_0_4px_rgba(34,42,53,0.08),0_16px_68px_rgba(47,48,55,0.05),0_1px_0_rgba(255,255,255,0.1)_inset] !bg-white/90 dark:!bg-neutral-950/90 dark:!shadow-[0_4px_16px_rgba(0,0,0,0.3),0_1px_4px_rgba(0,0,0,0.2),0_0_0_1px_rgba(255,255,255,0.05)]",
        isMenuOpen && "!bg-white dark:!bg-neutral-950",
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
  const [slideAmount, setSlideAmount] = useState(0);
  const [paddingAmount, setPaddingAmount] = useState({ normal: "1.25rem", scrolled: "1.5rem" });
  const [visible, setVisible] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Check for 830px+ screens and calculate slide amount
    const checkScreenSize = () => {
      const width = window.innerWidth;
      setIsTabletOrLarger(width >= 830);
      
      // 1280px+: Subtle animation that keeps items close to edges
      if (width >= 1280) {
        setSlideAmount(3);
        setPaddingAmount({ normal: "1.25rem", scrolled: "1.4rem" });
      }
      // 830-1280px: NO slide, NO padding change - items stay at edges
      else if (width >= 830) {
        setSlideAmount(0);
        setPaddingAmount({ normal: "1.25rem", scrolled: "1.25rem" });
      } else {
        setSlideAmount(0);
        setPaddingAmount({ normal: "1.25rem", scrolled: "1.25rem" });
      }
    };
    
    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  // Track scroll position for animations
  useEffect(() => {
    if (!mounted) return;
    
    const handleScroll = () => {
      const scrollY = window.scrollY || document.documentElement.scrollTop;
      // Trigger animation on any scroll, even first scroll
      setVisible(scrollY > 10);
    };
    
    // Set initial state
    handleScroll();
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [mounted]);

  return (
    <motion.div
      animate={{
        paddingLeft: visible && isTabletOrLarger && !isMenuOpen ? paddingAmount.scrolled : paddingAmount.normal,
        paddingRight: visible && isTabletOrLarger && !isMenuOpen ? paddingAmount.scrolled : paddingAmount.normal,
      }}
      transition={{
        type: "spring",
        stiffness: 200,
        damping: 50,
      }}
      className={cn(
        "flex w-full flex-row items-center justify-between lg:px-24 xl:px-40 2xl:px-52 py-1 relative z-40",
        className,
      )}
    >
      <motion.div 
        className="flex items-center"
        animate={{ x: visible && isTabletOrLarger && !isMenuOpen ? slideAmount : 0 }}
        transition={{
          type: "spring",
          stiffness: 200,
          damping: 50,
        }}
      >
        {React.Children.toArray(children)[0]}
      </motion.div>
      <motion.div 
        className="flex items-center"
        animate={{ x: visible && isTabletOrLarger && !isMenuOpen ? -slideAmount : 0 }}
        transition={{
          type: "spring",
          stiffness: 200,
          damping: 50,
        }}
      >
        {React.Children.toArray(children)[1]}
      </motion.div>
    </motion.div>
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
            "fixed inset-x-0 top-[70px] z-50 flex w-full flex-col items-start justify-start gap-2 bg-white px-6 lg:px-24 xl:px-40 2xl:px-52 py-4 shadow-[0_4px_20px_rgba(0,_0,_0,_0.1),_0_1px_1px_rgba(0,_0,_0,_0.05)] dark:bg-neutral-950 border-t border-gray-200 dark:border-neutral-700 max-h-[calc(100vh-70px)] overflow-y-auto",
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
    <div className={`flex items-center ml-0 mr-1 ${!visible ? 'opacity-0 pointer-events-none' : ''}`}>
      <a 
        href="/"
        onClick={(e) => {
          e.preventDefault();
          window.location.href = '/';
        }}
        className="relative text-lg md:text-xl whitespace-nowrap outline-none py-1"
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
      className="p-0 relative -left-[2px]"
    >
      <div className="w-4 h-4 flex flex-col justify-center items-start">
        <span className={`block w-4 h-[2px] bg-neutral-700 dark:bg-neutral-200 transition-transform duration-300 ${
          isOpen ? 'rotate-45 translate-y-[5px]' : ''
        }`} />
        <span className={`block w-4 h-[2px] bg-neutral-700 dark:bg-neutral-200 transition-opacity duration-300 mt-[3px] ${
          isOpen ? 'opacity-0' : ''
        }`} />
        <span className={`block w-4 h-[2px] bg-neutral-700 dark:bg-neutral-200 transition-transform duration-300 mt-[3px] ${
          isOpen ? '-rotate-45 -translate-y-[5px]' : ''
        }`} />
      </div>
    </button>
  );
};

