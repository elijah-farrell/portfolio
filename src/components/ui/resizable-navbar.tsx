"use client";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from "framer-motion";
import React, { useRef, useState } from "react";
import { ScrollProgress } from "../magicui/scroll-progress";
import { ChevronDown } from "lucide-react";
import { useLocation } from "react-router-dom";

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
  onItemClick?: () => void;
  scrollToSection?: (sectionId: string) => void;
  scrollToServicesSection?: (sectionId: string) => void;
}

interface MobileNavProps {
  children: React.ReactNode;
  className?: string;
  visible?: boolean;
}

interface MobileNavHeaderProps {
  children: React.ReactNode;
  className?: string;
}

interface MobileNavMenuProps {
  children: React.ReactNode;
  className?: string;
  isOpen: boolean;
  onClose: () => void;
}

export const Navbar = ({ children, className }: NavbarProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
    layoutEffect: false,
  });
  const [visible, setVisible] = useState<boolean>(false);

  useMotionValueEvent(scrollY, "change", (latest) => {
    if (latest > 100) {
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
        "relative z-50 mx-auto hidden lg:flex w-full max-w-7xl flex-row items-center justify-between px-4 py-2 bg-white/80 dark:bg-neutral-950/80 rounded-full",
        visible && "bg-white/80 dark:bg-neutral-950/80",
        className,
      )}
    >
      <ScrollProgress className={visible ? `top-[52px] mx-9` : 'top-[39.6px] mx-9'} />
      {children}
    </motion.div>
  );
};

export const NavItems = ({ items, className, onItemClick, scrollToSection, scrollToServicesSection }: NavItemsProps) => {
  const [openDropdown, setOpenDropdown] = useState<number | null>(null);
  const location = useLocation();

  return (
    <motion.div
      className={cn(
        "absolute inset-0 flex flex-row items-center justify-center space-x-6 text-sm font-medium text-zinc-600 transition duration-200 hover:text-zinc-800 ml-6",
        className,
      )}
    >
      {items.map((item, idx) => (
        <div key={`nav-item-${idx}`} className={`relative ${item.name === 'Home' ? 'ml-3' : ''}`}>
          {item.isDropdown ? (
            <div className="relative">
              <div className="flex items-center">
                <a 
                  href={item.link}
                  className={`relative px-4 py-2 transition-all duration-300 ease-in-out flex items-center rounded-lg ${
                    item.isActive 
                      ? 'text-emerald-500 dark:text-emerald-400 font-semibold hover:bg-gray-100 dark:hover:bg-neutral-800' 
                      : 'text-neutral-600 dark:text-neutral-300 hover:bg-gray-100 dark:hover:bg-neutral-800'
                  }`}
                >
                  {item.icon && <span className="relative z-20 mr-2">{item.icon}</span>}
                  <span className="relative z-20">{item.name}</span>
                </a>
                <button 
                  onClick={() => setOpenDropdown(openDropdown === idx ? null : idx)}
                  className="px-2 py-2 transition-all duration-200 ease-in-out rounded-md hover:bg-gray-100 dark:hover:bg-neutral-800 text-neutral-600 dark:text-neutral-300 hover:text-emerald-500 dark:hover:text-emerald-500"
                >
                  <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${
                    openDropdown === idx ? 'rotate-180' : ''
                  }`} />
                </button>
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
                  >
                    {item.sections?.map((section, sectionIdx) => (
                      <button
                        key={sectionIdx}
                        onClick={() => {
                          if (item.name === 'Home' && scrollToSection) {
                            scrollToSection(section.sectionId);
                          } else if (item.name === 'Services' && scrollToServicesSection) {
                            scrollToServicesSection(section.sectionId);
                          }
                          setOpenDropdown(null);
                        }}
                        className={`block w-full text-left px-4 py-2 text-sm transition-colors duration-150 ${
                          (item.name === 'Home' && location.pathname === '/' && location.hash === `#${section.sectionId}`) ||
                          (item.name === 'Services' && location.pathname === '/services' && location.hash === `#${section.sectionId}`)
                            ? 'text-emerald-500 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-900/20 font-medium'
                            : 'text-neutral-600 dark:text-neutral-300 hover:text-emerald-500 dark:hover:text-emerald-500 hover:bg-gray-50 dark:hover:bg-neutral-800'
                        }`}
                      >
                        {section.name}
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ) : (
            <a
              onClick={onItemClick}
              className={`relative px-4 py-2 transition-all duration-300 ease-in-out flex items-center rounded-lg ${
                item.isActive 
                  ? 'text-emerald-500 dark:text-emerald-400 font-semibold' 
                  : 'text-neutral-600 dark:text-neutral-300 hover:bg-gray-100 dark:hover:bg-neutral-800'
              }`}
              href={item.link}
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

export const MobileNav = ({ children, className, visible }: MobileNavProps) => {
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
        "relative z-50 mx-auto flex w-full max-w-full flex-col items-center justify-between px-0 py-2 lg:hidden bg-white/80 dark:bg-neutral-950/80",
        visible && "bg-white/80 dark:bg-neutral-950/80",
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
}: MobileNavHeaderProps) => {
  return (
    <div
      className={cn(
        "flex w-full flex-row items-center justify-between",
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
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className={cn(
            "absolute inset-x-0 top-16 z-50 flex w-full flex-col items-start justify-start gap-4 rounded-lg bg-white px-4 py-8 shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset] dark:bg-neutral-950",
            className,
          )}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export const NavbarLogo = () => {
  return (
    <div className="flex items-center">
      <a href="/" className="text-xl font-bold text-emerald-600 dark:text-emerald-400">
        Portfolio
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
      className="p-2 rounded-lg bg-gray-100 dark:bg-neutral-800 hover:bg-gray-200 dark:hover:bg-neutral-700 transition-colors"
    >
      <div className="w-5 h-5 flex flex-col justify-center items-center">
        <span className={`block w-4 h-0.5 bg-neutral-600 dark:bg-neutral-300 transition-all duration-300 ${
          isOpen ? 'rotate-45 translate-y-1' : ''
        }`} />
        <span className={`block w-4 h-0.5 bg-neutral-600 dark:bg-neutral-300 transition-all duration-300 mt-1 ${
          isOpen ? '-rotate-45 -translate-y-1' : ''
        }`} />
      </div>
    </button>
  );
};
