import {
  MobileNav,
  MobileNavHeader,
  MobileNavToggle,
  ResizableNavbar,
  NavbarLogo,
  NavBody,
  NavItems,
} from "../components/ui/aceternity/resizable-navbar";
import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";
import { ThemeToggle } from "@/components/ui/common/theme-toggle";
import { settings } from "@/config/settings";

const MOBILE_BREAKPOINT = 768;
const NAV_OFFSET_MOBILE = 25;
const NAV_OFFSET_DESKTOP = 60;

export function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pendingNavAction = useRef<(() => void) | null>(null);
  const savedScrollY = useRef(0);

  useLayoutEffect(() => {
    if (typeof document === "undefined") return;

    if (isMobileMenuOpen) {
      savedScrollY.current = window.scrollY;
      const { body } = document;
      body.style.position = "fixed";
      body.style.top = `-${savedScrollY.current}px`;
      body.style.left = "0";
      body.style.right = "0";
      body.style.width = "100%";

      const onTouchMove = (e: TouchEvent) => {
        if ((e.target as Element).closest(".mobile-menu-container")) return;
        e.preventDefault();
      };
      document.addEventListener("touchmove", onTouchMove, { passive: false });

      return () => {
        document.removeEventListener("touchmove", onTouchMove);
        const { body } = document;
        body.style.position = "";
        body.style.top = "";
        body.style.left = "";
        body.style.right = "";
        body.style.width = "";
        window.scrollTo({ top: savedScrollY.current, left: 0, behavior: "instant" });
        const fn = pendingNavAction.current;
        pendingNavAction.current = null;
        if (fn) {
          requestAnimationFrame(() => requestAnimationFrame(fn));
        }
      };
    }
  }, [isMobileMenuOpen]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const closeOnWide = () => {
      if (window.innerWidth >= MOBILE_BREAKPOINT) setIsMobileMenuOpen(false);
    };
    window.addEventListener("resize", closeOnWide);
    window.addEventListener("orientationchange", closeOnWide);
    return () => {
      window.removeEventListener("resize", closeOnWide);
      window.removeEventListener("orientationchange", closeOnWide);
    };
  }, []);

  const scrollToSection = useCallback((sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (!el) return;
    const isMobile = window.innerWidth < MOBILE_BREAKPOINT;
    const offset = isMobile ? NAV_OFFSET_MOBILE : NAV_OFFSET_DESKTOP;
    const top = window.scrollY + el.getBoundingClientRect().top - offset;
    window.scrollTo({ top, behavior: "smooth" });
  }, []);

  const handleNavClick = useCallback(
    (target: string) => {
      if (target.startsWith("/") || target.startsWith("http")) {
        navigate(target);
        return;
      }

      const sectionId = target.replace(/^#/, "");

      if (location.pathname !== "/") {
        navigate("/", { state: { scrollToSection: sectionId } });
        return;
      }

      scrollToSection(sectionId);
    },
    [location.pathname, navigate, scrollToSection],
  );

  const handleServicesSectionClick = useCallback(
    (sectionId: string) => {
      if (sectionId === "contact-form") {
        if (window.location.pathname === "/services") {
          window.dispatchEvent(new CustomEvent("openContactModal"));
          return;
        }
        navigate("/services", { state: { openModal: true } });
        return;
      }

      if (window.location.pathname === "/services") {
        scrollToSection(sectionId);
        return;
      }

      navigate("/services", { state: { scrollToSection: sectionId } });
    },
    [navigate, scrollToSection],
  );

  const closeMenuAnd = useCallback((fn: () => void) => {
    pendingNavAction.current = fn;
    setIsMobileMenuOpen(false);
  }, []);

  const baseNavItems = [
    { name: "About", link: "about" },
    { name: "Experience", link: "experience" },
    { name: "Projects", link: "projects" },
    { name: "Skills", link: "skills" },
    { name: "Contact", link: "contact" },
  ];

  const servicesSections = [
    { name: "What I Offer", sectionId: "what-i-offer" },
    ...(settings.services?.showTemplatesSection
      ? [{ name: "My Websites and Templates", sectionId: "my-projects" }]
      : []),
    { name: "Start a Project", sectionId: "contact-form" },
  ];

  const mainNavItems = settings.services?.enabled
    ? [
        ...baseNavItems,
        {
          name: "Services",
          link: "/services",
          isDropdown: true,
          sections: servicesSections,
        },
      ]
    : baseNavItems;

  return (
    <div className="relative w-full">
      <ResizableNavbar>
        <NavBody isNavComponent={true}>
          <div className="flex items-center">
            <NavbarLogo visible={true} />
          </div>
          <NavItems
            items={mainNavItems}
            onItemClick={handleNavClick}
            onSectionClick={handleServicesSectionClick}
          />
          <div className="flex items-center gap-2">
            <ThemeToggle />
          </div>
        </NavBody>

        <MobileNav isMenuOpen={isMobileMenuOpen} isNavComponent={true}>
          <MobileNavHeader isMenuOpen={isMobileMenuOpen}>
            <NavbarLogo visible={!isMobileMenuOpen} />
            <div className="flex items-center gap-2 mr-0 relative">
              <MobileNavToggle
                isOpen={isMobileMenuOpen}
                onClick={() => setIsMobileMenuOpen((open) => !open)}
              />
            </div>
          </MobileNavHeader>

          {isMobileMenuOpen && (
            <div
              className="mobile-menu-container absolute inset-0 flex flex-col items-center justify-center px-6 max-[475px]:px-5 py-8 w-full pt-20 overflow-y-auto"
              style={{ backgroundColor: "var(--background)" }}
            >
              <a
                href="/"
                onClick={(e) => {
                  e.preventDefault();
                  setIsMobileMenuOpen(false);
                  navigate("/");
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
                className="mobile-menu-logo text-2xl font-bold bg-gradient-to-r from-emerald-500 to-emerald-900 dark:from-emerald-300 dark:to-emerald-600 bg-clip-text text-transparent mb-4"
              >
                Elijah Farrell
              </a>

              <nav className="flex flex-col items-center w-full gap-0 text-lg text-neutral-800 dark:text-neutral-100 font-medium mb-4">
                {mainNavItems.map((item, index) => {
                  const isRouteLink =
                    item.link.startsWith("/") || item.link.startsWith("http");

                  return (
                    <div
                      key={index}
                      className="w-full max-w-sm flex justify-center"
                    >
                      {isRouteLink ? (
                        <a
                          href={item.link}
                          onClick={(e) => {
                            e.preventDefault();
                            closeMenuAnd(() => handleNavClick(item.link));
                          }}
                          className={cn(
                            "px-6 py-3 text-lg font-medium transition-colors duration-0 rounded-lg block text-center",
                            "text-neutral-800 dark:text-neutral-100 hover:text-emerald-600 dark:hover:text-emerald-400 hover:bg-neutral-100 dark:hover:bg-neutral-800/50",
                          )}
                        >
                          {item.name}
                        </a>
                      ) : (
                        <button
                          type="button"
                          onClick={() =>
                            closeMenuAnd(() => handleNavClick(item.link))
                          }
                          className={cn(
                            "px-6 py-3 text-lg font-medium transition-colors duration-0 rounded-lg block text-center bg-transparent border-0 outline-none cursor-pointer",
                            "text-neutral-800 dark:text-neutral-100 hover:text-emerald-600 dark:hover:text-emerald-400 hover:bg-neutral-100 dark:hover:bg-neutral-800/50",
                          )}
                        >
                          {item.name}
                        </button>
                      )}
                    </div>
                  );
                })}
              </nav>

              <div className="flex justify-center">
                <ThemeToggle />
              </div>
            </div>
          )}
        </MobileNav>
      </ResizableNavbar>
      <style>{`
        @media (max-height: 450px) {
          .mobile-menu-container {
            justify-content: flex-start !important;
            padding-top: 1.5rem !important;
          }
        }
      `}</style>
    </div>
  );
}
