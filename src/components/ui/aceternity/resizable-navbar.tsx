"use client";
import { cn } from "@/lib/utils";
import { getTheme } from "@/lib/theme";
import { motion, AnimatePresence } from "framer-motion";
import React, { useRef, useState, useEffect } from "react";

interface NavbarProps {
  children: React.ReactNode;
  className?: string;
}

interface NavBodyProps {
  children: React.ReactNode;
  className?: string;
  visible?: boolean;
  scrollProgress?: number;
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
  scrollProgress?: number;
  isMenuOpen?: boolean;
  isNavComponent?: boolean;
}

interface MobileNavHeaderProps {
  children: React.ReactNode;
  className?: string;
  isMenuOpen?: boolean;
  /** Scroll progress (0–1) captured when menu was opened; used so X doesn’t jump when body is fixed and scrollY becomes 0 */
  scrollProgressWhenOpen?: number;
}

interface MobileNavMenuProps {
  children: React.ReactNode;
  className?: string;
  isOpen: boolean;
  onClose: () => void;
}

export const SCROLL_START = 0;
export const SCROLL_END = 120;

export const ResizableNavbar = ({ children, className }: NavbarProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const [, setMounted] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  // Gradual progress 0→1 over scroll range so navbar eases in instead of popping
  useEffect(() => {
    setMounted(true);

    const handleScroll = () => {
      const scrollY = window.scrollY || document.documentElement.scrollTop;
      const progress = Math.min(1, Math.max(0, (scrollY - SCROLL_START) / (SCROLL_END - SCROLL_START)));
      setScrollProgress(progress);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.div
      initial={false}
      ref={ref}
      className={cn("fixed inset-x-0 top-0 z-40 mx-auto max-w-[1279px]", "resizable-navbar", className)}
      style={{
        willChange: "transform",
        transform: "translateZ(0)",
        WebkitBackfaceVisibility: "hidden",
        backfaceVisibility: "hidden",
      }}
    >
      {React.Children.map(children, (child) => {
        if (React.isValidElement(child)) {
          const shouldReceiveVisible = (child.props as { isNavComponent?: boolean })?.isNavComponent === true;
          return React.cloneElement(child as React.ReactElement<{ visible?: boolean; scrollProgress?: number }>, {
            visible: shouldReceiveVisible ? scrollProgress >= 1 : undefined,
            scrollProgress: shouldReceiveVisible ? scrollProgress : undefined,
          });
        }
        return child;
      })}
    </motion.div>
  );
};

// Original desktop shadow/light effect – same values, alpha scaled by progress for gradual fade
const NAV_SHADOW_PARTS = [
  "0 8px 32px rgba(34, 42, 53, ALPHA)",
  "0 2px 8px rgba(0, 0, 0, ALPHA)",
  "0 0 0 1px rgba(34, 42, 53, ALPHA)",
  "0 0 8px rgba(34, 42, 53, ALPHA)",
  "0 20px 80px rgba(47, 48, 55, ALPHA)",
  "0 2px 0 rgba(255, 255, 255, ALPHA) inset",
] as const;
const NAV_ALPHAS = [0.12, 0.08, 0.06, 0.12, 0.08, 0.15] as const;

function navShadowWithOpacity(p: number): string {
  if (p <= 0) return "none";
  return NAV_SHADOW_PARTS.map((part, i) => part.replace("ALPHA", String(NAV_ALPHAS[i] * p))).join(", ");
}

export const NavBody = ({ children, className, scrollProgress = 0 }: NavBodyProps) => {
  const p = scrollProgress;
  const width = `${100 - 5 * p}%`;
  const backdropFilter = p <= 0 ? "none" : `blur(${10 * p}px)`;
  const boxShadow = navShadowWithOpacity(p);

  return (
    <motion.div
      initial={false}
      animate={{ width, backdropFilter, boxShadow }}
      transition={{ type: "spring", stiffness: 200, damping: 50 }}
      className={cn(
        "relative z-50 mx-auto hidden nav:flex w-full flex-row items-center justify-center py-4 px-6 rounded-full text-black dark:text-[var(--text)]",
        className,
      )}
      style={{ backgroundColor: "var(--background)" }}
    >
      <div className="w-full flex flex-row items-center relative">
        <motion.div
          className="absolute left-0 flex items-center"
          initial={false}
          animate={{ x: 12 * p }}
          transition={{ type: "spring", stiffness: 200, damping: 35 }}
        >
          {React.Children.toArray(children)[0]}
        </motion.div>
        <div className="w-full flex justify-center">
          {React.Children.toArray(children)[1]}
        </div>
        <motion.div
          className="absolute right-0 flex items-center"
          initial={false}
          animate={{ x: -12 * p }}
          transition={{ type: "spring", stiffness: 200, damping: 35 }}
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
        "flex flex-row items-center space-x-2 text-sm font-medium text-zinc-600 hover:text-zinc-800 mx-0 max-[900px]:space-x-0 max-[875px]:-space-x-1 max-[850px]:-space-x-2 max-[840px]:-space-x-3",
        className,
      )}
    >
      {items.map((item, idx) => {
        const isRouteLink =
          item.link.startsWith("/") || item.link.startsWith("http");
        const isHashLink = item.link.startsWith("#");
        const isPureScrollLink = !isRouteLink && !isHashLink && !item.isDropdown;

        const sharedContent = (
          <>
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
          </>
        );

        return (
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
          {isPureScrollLink ? (
            <button
              type="button"
              onClick={() => {
                setHovered(null);
                setOpenDropdown(null);
                _onItemClick?.(item.link);
              }}
              className="relative px-4 py-2 text-neutral-600 dark:text-neutral-300 hover:text-emerald-500 dark:hover:text-emerald-500 transition-colors duration-0 flex items-center bg-transparent border-0 outline-none cursor-pointer"
            >
              {sharedContent}
            </button>
          ) : (
            <a
              href={
                isRouteLink
                  ? item.link
                  : isHashLink
                  ? item.link
                  : `/#${item.link}`
              }
              onClick={(e) => {
                e.preventDefault();
                setHovered(null);
                setOpenDropdown(null);
                _onItemClick?.(item.link);
              }}
              className="relative px-4 py-2 text-neutral-600 dark:text-neutral-300 hover:text-emerald-500 dark:hover:text-emerald-500 transition-colors duration-0 flex items-center"
            >
              {sharedContent}
            </a>
          )}

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
                  className="absolute top-full left-0 mt-1 w-48 rounded-md shadow-lg bg-white dark:bg-neutral-900 ring-1 ring-black/5 dark:ring-white/10 z-30"
                >
                <div className="py-1">
                  {item.sections?.map((section, dropIdx) => (
                    <a
                      key={`dropdown-${idx}-${dropIdx}`}
                      href={`${item.link}#${section.sectionId}`}
                      onClick={(e) => {
                        e.preventDefault();
                        setOpenDropdown(null);
                        setHovered(null);
                        onSectionClick?.(section.sectionId);
                      }}
                      className="block px-4 py-2 text-sm text-neutral-700 dark:text-neutral-300 hover:bg-emerald-50 dark:hover:bg-emerald-900/30 hover:text-emerald-500 dark:hover:text-emerald-400 transition-colors duration-0"
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
      )})}
    </div>
  );
};

// Original mobile shadow/light – same values as before (light + dark), alpha scaled by progress
const MOBILE_SHADOW_LIGHT =
  "0 0 24px rgba(34,42,53,ALPHA), 0 1px 1px rgba(0,0,0,ALPHA), 0 0 0 1px rgba(34,42,53,ALPHA), 0 0 4px rgba(34,42,53,ALPHA), 0 16px 68px rgba(47,48,55,ALPHA), 0 1px 0 rgba(255,255,255,ALPHA) inset";
const MOBILE_ALPHAS_LIGHT = [0.06, 0.05, 0.04, 0.08, 0.05, 0.1] as const;
const MOBILE_SHADOW_DARK =
  "0 0 24px rgba(0,0,0,ALPHA), 0 1px 1px rgba(0,0,0,ALPHA), 0 0 0 1px rgba(255,255,255,ALPHA), 0 0 4px rgba(0,0,0,ALPHA), 0 16px 68px rgba(0,0,0,ALPHA), 0 1px 0 rgba(255,255,255,ALPHA) inset";
const MOBILE_ALPHAS_DARK = [0.3, 0.2, 0.05, 0.4, 0.25, 0.1] as const;

function mobileShadowWithOpacity(progress: number, isDark: boolean): string {
  if (progress <= 0) return "none";
  const alphas = isDark ? MOBILE_ALPHAS_DARK : MOBILE_ALPHAS_LIGHT;
  const template = isDark ? MOBILE_SHADOW_DARK : MOBILE_SHADOW_LIGHT;
  let i = 0;
  return template.replace(/ALPHA/g, () => String(alphas[i++] * progress));
}

export const MobileNav = ({ children, className, scrollProgress = 0, isMenuOpen }: MobileNavProps) => {
  const [isDark, setIsDark] = useState(false);
  useEffect(() => {
    setIsDark(getTheme() === "dark");
    const root = document.documentElement;
    const obs = new MutationObserver(() => setIsDark(getTheme() === "dark"));
    obs.observe(root, { attributes: true, attributeFilter: ["class"] });
    return () => obs.disconnect();
  }, []);

  const showShadow = !isMenuOpen && scrollProgress > 0;
  const boxShadow = showShadow ? mobileShadowWithOpacity(scrollProgress, isDark) : undefined;

  return (
    <div
      className={cn(
        "z-40 flex w-full flex-col nav:hidden [box-shadow:none]",
        isMenuOpen ? "fixed inset-0 max-w-none px-0 pt-1 pb-0" : "relative mx-auto max-w-full px-0 py-1",
        className,
      )}
      style={{
        height: isMenuOpen ? "100vh" : "auto",
        backgroundColor: "var(--background)",
        boxShadow,
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
  scrollProgressWhenOpen,
}: MobileNavHeaderProps) => {
  const [isTabletOrLarger, setIsTabletOrLarger] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
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

  // Gradual scroll progress (same range as ResizableNavbar) for smooth mobile bar animation
  useEffect(() => {
    if (!mounted) return;

    const handleScroll = () => {
      const scrollY = window.scrollY || document.documentElement.scrollTop;
      const progress = Math.min(1, Math.max(0, (scrollY - SCROLL_START) / (SCROLL_END - SCROLL_START)));
      setScrollProgress(progress);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [mounted]);

  const p = scrollProgress;
  // When menu is open, body is fixed so scrollY is 0; use progress captured at open so X doesn’t move
  const pFrozen = isMenuOpen && scrollProgressWhenOpen != null ? scrollProgressWhenOpen : null;
  const pForLayout = pFrozen ?? p;
  const paddingRem = 1.25 + 0.25 * pForLayout;
  const logoX = isTabletOrLarger && !isMenuOpen ? 8 * p : 0;
  const toggleX = -8 * pForLayout;

  return (
    <motion.div
      initial={false}
      animate={{
        paddingLeft: `${paddingRem}rem`,
        paddingRight: `${paddingRem}rem`,
      }}
      transition={{ type: "spring", stiffness: 200, damping: 35 }}
      className={cn(
        "flex w-full flex-row items-center justify-between lg:px-24 xl:px-40 2xl:px-52 py-1 relative z-40",
        isMenuOpen && "max-w-[1279px] mx-auto",
        className,
      )}
    >
      <motion.div
        className="flex items-center"
        initial={false}
        animate={{ x: logoX }}
        transition={{ type: "spring", stiffness: 200, damping: 35 }}
      >
        {React.Children.toArray(children)[0]}
      </motion.div>
      <motion.div
        className="flex items-center"
        initial={false}
        animate={{ x: toggleX }}
        transition={{ type: "spring", stiffness: 200, damping: 35 }}
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
            "fixed inset-x-0 top-[70px] z-50 flex w-full flex-col items-start justify-start gap-2 px-6 lg:px-24 xl:px-40 2xl:px-52 py-4 shadow-[0_4px_20px_rgba(0,_0,_0,_0.1),_0_1px_1px_rgba(0,_0,_0,_0.05)] border-t border-gray-200 dark:border-neutral-700 max-h-[calc(100vh-70px)] overflow-y-auto",
            className,
          )}
          style={{ backgroundColor: 'var(--background)' }}
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
        <span className="hidden xl:inline text-gray-900 dark:text-[var(--text)] relative z-10"> Farrell</span>
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

