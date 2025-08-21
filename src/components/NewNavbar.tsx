import {
  MobileNav,
  MobileNavHeader,
  MobileNavMenu,
  MobileNavToggle,
  Navbar,
  NavbarButton,
  NavbarLogo,
  NavBody,
  NavItems,
} from "@/components/ui/resizable-navbar";
import { useEffect, useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import ResumeButton from "./DownloadResumeBtn";
import { Switch } from "./ui/switch";
import { useTheme } from "./theme-provider";
import { Monitor, Home, ChevronDown, Sun, Moon, Mail } from "lucide-react";

export function NewNavbar() {
  const { theme, setTheme } = useTheme();
  const location = useLocation();

  const isDark = theme === "dark";

  const toggleTheme = () => {
    setTheme(isDark ? "light" : "dark");
  };

  // Check if current page is active
  const isActivePage = (path: string) => {
    if (path === "/") {
      return location.pathname === "/" && !location.hash;
    }
    return location.pathname === path;
  };

  // Check if current section is active (for home sections)
  const isActiveSection = (hash: string) => {
    return location.hash === hash;
  };

  // Scroll to contact section without changing URL
  const scrollToContact = () => {
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  // Scroll to section without changing URL
  const scrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  // Scroll to services section
  const scrollToServicesSection = (sectionId: string) => {
    if (location.pathname !== '/services') {
      // Navigate to services page first, then scroll
      window.location.href = `/services#${sectionId}`;
    } else {
      // Already on services page, just scroll
      const section = document.getElementById(sectionId);
      if (section) {
        section.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  };

  const homeSections = [
    { name: "About", sectionId: "about" },
    { name: "Education", sectionId: "education" },
    { name: "Experience", sectionId: "experience" },
    { name: "Projects", sectionId: "projects" },
    { name: "Skills", sectionId: "skills" },
    { name: "Contact", sectionId: "contact" },
  ];

  const servicesSections = [
    { name: "Plans & Pricing", sectionId: "pricing" },
    { name: "Why Work With Me", sectionId: "why-me" },
    { name: "How It Works", sectionId: "how-it-works" },
    { name: "Get Started", sectionId: "contact" },
  ];

  const mainNavItems = [
    {
      name: "Home",
      link: "/",
      isDropdown: true,
      sections: homeSections,
      icon: <Home className="w-4 h-4 mr-2" />,
      isActive: isActivePage("/") || (location.pathname === "/" && location.hash.startsWith("#")),
    },
    {
      name: "Services",
      link: "/services",
      isDropdown: true,
      sections: servicesSections,
      icon: <Monitor className="w-4 h-4 mr-2" />,
      isActive: isActivePage("/services"),
    },
  ];

  useEffect(() => {
    if (location.hash) {
      const id = location.hash.replace("#", "");
      const element = document.getElementById(id);
      if (element) {
        // Reduced timeout for better performance
        setTimeout(() => {
          element.scrollIntoView({ behavior: "smooth", block: "start" });
        }, 50); // reduced from 100ms to 50ms
      }
    }
  }, [location]);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="relative w-full">
      <Navbar>
        {/* Desktop Navigation */}
        <NavBody>
          <NavbarLogo />
          <NavItems 
            items={mainNavItems} 
            scrollToSection={scrollToSection}
            scrollToServicesSection={scrollToServicesSection}
          />
          <div className="flex items-center gap-3 relative z-50">
            {/* Contact Button */}
            <button
              onClick={scrollToContact}
              className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-full text-sm font-medium transition-colors duration-200 flex items-center gap-2 cursor-pointer relative z-50"
            >
              <Mail className="w-4 h-4" />
              Contact
            </button>
            
            {/* Theme Toggle Button */}
            <button
              onClick={() => {
                const newTheme = isDark ? "light" : "dark";
                console.log('Theme toggle clicked, switching from', theme, 'to', newTheme);
                setTheme(newTheme);
              }}
              className="px-4 py-2 bg-white dark:bg-neutral-900 border border-gray-200 dark:border-neutral-700 hover:bg-gray-50 dark:hover:bg-neutral-800 text-neutral-700 dark:text-neutral-300 rounded-full text-sm font-medium transition-colors duration-200 cursor-pointer relative z-50"
            >
              {isDark ? (
                <Sun className="w-4 h-4" />
              ) : (
                <Moon className="w-4 h-4" />
              )}
            </button>
          </div>
        </NavBody>

        {/* Mobile Navigation */}
        <MobileNav>
          <MobileNavHeader>
            <NavbarLogo />
            <MobileNavToggle
              isOpen={isMobileMenuOpen}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            />
          </MobileNavHeader>

          <MobileNavMenu
            isOpen={isMobileMenuOpen}
            onClose={() => setIsMobileMenuOpen(false)}
          >
            {/* Main nav items with dropdowns */}
            {mainNavItems.map((item, idx) => (
              <div key={`mobile-nav-${idx}`} className="w-full">
                <div className="flex items-center justify-between">
                  <a
                    href={item.link}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="relative text-neutral-600 dark:text-neutral-300 flex items-center"
                  >
                    {item.icon && item.icon}
                    <span className="block">{item.name}</span>
                  </a>
                  {item.isDropdown && (
                    <button
                      onClick={() => {
                        const dropdown = document.getElementById(`mobile-dropdown-${idx}`);
                        if (dropdown) {
                          dropdown.classList.toggle('hidden');
                        }
                      }}
                      className="text-neutral-600 dark:text-neutral-300 hover:text-emerald-500 dark:hover:text-emerald-500 transition-colors"
                    >
                      <ChevronDown className="w-4 h-4" />
                    </button>
                  )}
                </div>
                
                {/* Dropdown sections */}
                {item.isDropdown && (
                  <div id={`mobile-dropdown-${idx}`} className="hidden ml-4 mt-2 space-y-2">
                    {item.sections?.map((section, sectionIdx) => (
                      <a
                        key={`mobile-${item.name}-${sectionIdx}`}
                        href={section.link}
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="relative text-neutral-600 dark:text-neutral-300 text-sm block hover:text-emerald-500 dark:hover:text-emerald-500 transition-colors"
                      >
                        <span className="block">{section.name}</span>
                      </a>
                    ))}
                  </div>
                )}
              </div>
            ))}
            
            {/* Contact Button in Mobile */}
            <div className="flex gap-3 -ml-2">
              <button
                onClick={() => {
                  scrollToContact();
                  setIsMobileMenuOpen(false);
                }}
                className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-full text-sm font-medium transition-colors duration-200 flex items-center gap-2"
              >
                <Mail className="w-4 h-4" />
                Contact
              </button>
              
              <button
                onClick={() => {
                  const newTheme = isDark ? "light" : "dark";
                  console.log('Mobile theme toggle clicked, switching from', theme, 'to', newTheme);
                  setTheme(newTheme);
                }}
                className="p-2.5 rounded-full bg-white dark:bg-neutral-900 border border-gray-200 dark:border-neutral-700 hover:bg-gray-50 dark:hover:bg-neutral-800 transition-all duration-200 shadow-sm hover:shadow-md"
              >
                {isDark ? (
                  <Sun className="w-4 h-4 text-neutral-700 dark:text-neutral-300" />
                ) : (
                  <Moon className="w-4 h-4 text-neutral-700 dark:text-neutral-300" />
                )}
              </button>
            </div>
          </MobileNavMenu>
        </MobileNav>
      </Navbar>
      <div className="min-h-screen pt-4 ">
        <Outlet />
      </div>
    </div>
  );
}
