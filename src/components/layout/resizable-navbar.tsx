"use client";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import React, { useRef, useState, useEffect } from "react";
import { ChevronDown } from "lucide-react";
import { handleNavigationWithScroll } from "@/lib/scroll-utils";

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


  return (
    <motion.div
      initial={{
        width: "100%",
        backdropFilter: "blur(0px)",
        boxShadow: "0 0 0 rgba(0, 0, 0, 0)",
      }}
      animate={{
        width: visible ? "95%" : "100%",
        backdropFilter: visible ? "blur(12px)" : "blur(0px)",
        boxShadow: visible
          ? "0 8px 32px rgba(34, 42, 53, 0.12), 0 2px 8px rgba(0, 0, 0, 0.08), 0 0 0 1px rgba(34, 42, 53, 0.06), 0 0 8px rgba(34, 42, 53, 0.12), 0 20px 80px rgba(47, 48, 55, 0.08), 0 2px 0 rgba(255, 255, 255, 0.15) inset"
          : "0 0 0 rgba(0, 0, 0, 0)",
      }}
      transition={{
        type: "spring",
        stiffness: 300,
        damping: 40,
        duration: 0.8,
        ease: "easeOut",
      }}
      className={cn(
        "relative z-50 mx-auto hidden nav:flex w-full max-w-6xl xl:max-w-7xl 2xl:max-w-8xl flex-row items-center justify-center py-4 px-6 bg-white/80 backdrop-blur-md dark:bg-neutral-950/80 rounded-full",
        className,
      )}
    >
      <div className="w-full flex flex-row items-center relative">
        <motion.div 
          className="absolute left-0 flex items-center"
          initial={{ x: 0 }}
          animate={{ x: visible ? 12 : 0 }}
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
          initial={{ x: 0 }}
          animate={{ x: visible ? -12 : 0 }}
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
  const [hovered, setHovered] = useState<number | null>(null);
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
      onMouseLeave={() => {
        setHovered(null);
        setOpenDropdown(null);
      }}
      className={cn(
        "flex flex-row items-center space-x-2 text-sm font-medium text-zinc-600 hover:text-zinc-800 mx-0 max-[900px]:space-x-0 max-[875px]:-space-x-1 max-[850px]:-space-x-2 max-[840px]:-space-x-3 max-[830px]:-space-x-4",
        className,
      )}
    >
      {items.map((item, idx) => (
        <div
          key={`link-${idx}`}
          className="relative"
          onMouseEnter={() => {
            setHovered(idx);
            if (item.isDropdown) {
              setOpenDropdown(idx);
            } else {
              setOpenDropdown(null);
            }
          }}
        >
          <a
            onClick={(e) => {
              if (item.isDropdown) {
                e.preventDefault();
              } else {
                e.preventDefault();
                handleNavigationWithScroll(item.link);
              }
            }}
            className="relative px-4 py-2 text-neutral-600 dark:text-neutral-300 hover:text-emerald-500 dark:hover:text-emerald-500 transition-all duration-500 ease-in-out flex items-center"
            href={item.link}
          >
            {hovered === idx && (
              <motion.div
                layoutId="hovered"
                className="absolute inset-0 h-full w-full rounded-full bg-gray-100 dark:bg-neutral-800"
              />
            )}
            <span className="relative z-20">{item.name}</span>
            {item.isDropdown && (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 ml-1 relative z-20 transition-transform duration-300 ease-in-out"
                style={{
                  transform:
                    openDropdown === idx ? "rotate(180deg)" : "rotate(0deg)",
                }}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            )}
          </a>

          {/* Dropdown Menu */}
          <AnimatePresence>
            {item.isDropdown && openDropdown === idx && (
              <>
                {/* Invisible bridge to prevent dropdown from closing */}
                <div className="absolute top-full left-0 w-48 h-1 bg-transparent" />
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="absolute top-full left-0 mt-1 w-48 rounded-md shadow-lg bg-white dark:bg-neutral-900 ring-1 ring-black ring-opacity-5 z-30"
                >
                <div className="py-1">
                  {item.sections?.map((section, dropIdx) => (
                    <a
                      key={`dropdown-${idx}-${dropIdx}`}
                      href={section.sectionId === "modal" ? "#" : `${item.link}#${section.sectionId}`}
                      onClick={(e) => {
                        e.preventDefault();
                        setOpenDropdown(null);
                        
                        if (section.sectionId === "modal") {
                          onSectionClick?.(section.sectionId);
                        } else {
                          handleNavigationWithScroll(`${item.link}#${section.sectionId}`);
                        }
                      }}
                      className="block px-4 py-2 text-sm text-neutral-700 dark:text-neutral-300 hover:bg-emerald-50 dark:hover:bg-emerald-900/30 hover:text-emerald-500 dark:hover:text-emerald-400"
                    >
                      {section.name}
                    </a>
                  ))}
                </div>
                </motion.div>
              </>
            )}
          </AnimatePresence>
        </div>
      ))}
    </div>
  );
};

export const MobileNav = ({ children, className, visible, isMenuOpen }: MobileNavProps) => {

  return (
    <div
      className={cn(
        "relative z-40 mx-auto flex w-full max-w-full flex-col px-0 py-1 nav:hidden [background-color:transparent] [box-shadow:none]",
        visible && !isMenuOpen && "!shadow-[0_4px_16px_rgba(34,42,53,0.08),0_1px_4px_rgba(0,0,0,0.06),0_0_0_1px_rgba(34,42,53,0.04)] !bg-white/90 dark:!bg-neutral-950/90 dark:!shadow-[0_4px_16px_rgba(0,0,0,0.3),0_1px_4px_rgba(0,0,0,0.2),0_0_0_1px_rgba(255,255,255,0.05)]",
        isMenuOpen && "!bg-white dark:!bg-neutral-950",
        className,
      )}
      style={{
        height: isMenuOpen ? "100vh" : "auto",
      }}
    >
      {children}
    </div>
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
      setIsTabletOrLarger(window.innerWidth >= 830);
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
    <motion.div
      initial={{
        paddingLeft: "1.25rem",
        paddingRight: "1.25rem",
      }}
      animate={{
        paddingLeft: visible ? "1.5rem" : "1.25rem",
        paddingRight: visible ? "1.5rem" : "1.25rem",
      }}
      transition={{
        type: "spring",
        stiffness: 300,
        damping: 40,
        duration: 0.8,
        ease: "easeOut",
      }}
      className={cn(
        "flex w-full flex-row items-center justify-between lg:px-24 xl:px-40 2xl:px-52 py-1 relative z-40",
        className,
      )}
    >
      <motion.div 
        className="flex items-center"
        initial={{ x: 0 }}
        animate={{ x: visible && isTabletOrLarger && !isMenuOpen ? 8 : 0 }}
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
        initial={{ x: 0 }}
        animate={{ x: visible && isTabletOrLarger && !isMenuOpen ? -8 : 0 }}
        transition={{
          type: "spring",
          stiffness: 300,
          damping: 25,
          duration: 0.4,
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

