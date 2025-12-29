import {
  MobileNav,
  MobileNavHeader,
  MobileNavToggle,
  ResizableNavbar,
  NavbarLogo,
  NavBody,
  NavItems,
} from "../components/ui/aceternity/resizable-navbar";
import { useCallback, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";
import { ThemeToggle } from "@/components/ui/common/theme-toggle";
import { settings } from "@/config/settings";

export function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Close mobile menu automatically when switching to desktop/tablet width
  useEffect(() => {
    if (typeof window === "undefined") return;

    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsMobileMenuOpen(false);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    window.addEventListener("orientationchange", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("orientationchange", handleResize);
    };
  }, []);

  const handleNavClick = useCallback(
    (target: string) => {
      // If this is a routed page (e.g. "/services"), use client-side navigation
      if (target.startsWith("/")) {
        navigate(target);
        return;
      }

      const sectionId = target.replace(/^#/, "");

      // If we're not on the home page, navigate there and let Home handle scrolling via state
      if (location.pathname !== "/") {
        navigate("/", {
          state: { scrollToSection: sectionId },
        });
        return;
      }

      // Already on home - scroll directly (desktop & mobile)
      const element = document.getElementById(sectionId);
      if (!element) return;

      const isMobile = window.innerWidth < 768;
      const navOffset = isMobile ? 25 : 60;

      const rect = element.getBoundingClientRect();
      const targetTop = window.scrollY + rect.top - navOffset;

      window.scrollTo({
        top: targetTop,
        behavior: "smooth",
      });
    },
    [location.pathname, navigate],
  );

  const baseNavItems = [
    {
      name: "About",
      link: "about",
    },
    {
      name: "Experience",
      link: "experience",
    },
    {
      name: "Projects",
      link: "projects",
    },
    {
      name: "Skills",
      link: "skills",
    },
    // Contact stays as in-page anchor on the home route
    {
      name: "Contact",
      link: "contact",
    },
  ];

  const servicesSections = [
    { name: "What I Offer", sectionId: "what-i-offer" },
    ...(settings.services?.showTemplatesSection
      ? [{ name: "My Websites and Templates", sectionId: "my-projects" }]
      : []),
    { name: "Start a Project", sectionId: "contact-form" },
  ];

  const mainNavItems =
    settings.services?.enabled
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

  const handleServicesSectionClick = useCallback(
    (sectionId: string) => {
      // Special handling for "Start a Project" - open modal instead of scrolling
      if (sectionId === "contact-form") {
        // If already on /services, trigger modal open via custom event
        if (window.location.pathname === "/services") {
          window.dispatchEvent(new CustomEvent("openContactModal"));
          return;
        }
        // Otherwise navigate to /services with state to open modal
        navigate("/services", {
          state: { openModal: true },
        });
        return;
      }

      // If already on /services, scroll to the section directly
      if (window.location.pathname === "/services") {
        const element = document.getElementById(sectionId);
        if (!element) return;

        const isMobile = window.innerWidth < 768;
        const navOffset = isMobile ? 25 : 60;
        const rect = element.getBoundingClientRect();
        const targetTop = window.scrollY + rect.top - navOffset;

        window.scrollTo({
          top: targetTop,
          behavior: "smooth",
        });
        return;
      }

      // Otherwise navigate to /services and let the page handle scrolling via state
      navigate("/services", {
        state: { scrollToSection: sectionId },
      });
    },
    [navigate],
  );

  return (
    <div className="relative w-full">
      <ResizableNavbar>
        {/* Desktop Navigation */}
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

        {/* Mobile Navigation */}
          <MobileNav isMenuOpen={isMobileMenuOpen} isNavComponent={true}>
          <MobileNavHeader isMenuOpen={isMobileMenuOpen}>
            <NavbarLogo visible={!isMobileMenuOpen} />
            <div className="flex items-center gap-2 mr-0 relative">
              <MobileNavToggle
                isOpen={isMobileMenuOpen}
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              />
            </div>
          </MobileNavHeader>
          
          {/* Mobile Menu Content */}
          {isMobileMenuOpen && (
            <div className="mobile-menu-container absolute inset-0 flex flex-col items-center justify-center px-6 max-[475px]:px-5 py-8 w-full pt-20 overflow-y-auto">
                {/* Logo in center */}
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

                {/* Navigation Links */}
                <nav className="flex flex-col items-center w-full gap-0 text-lg text-neutral-800 dark:text-neutral-100 font-medium mb-4">
                  {mainNavItems.map((item, index) => {
                    const isRouteLink =
                      item.link.startsWith("/") ||
                      item.link.startsWith("http");

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
                              setIsMobileMenuOpen(false);
                              setTimeout(() => {
                                handleNavClick(item.link);
                              }, 0);
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
                            onClick={() => {
                              setIsMobileMenuOpen(false);
                              setTimeout(() => {
                                handleNavClick(item.link);
                              }, 0);
                            }}
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

                {/* Theme toggle centered under links */}
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
