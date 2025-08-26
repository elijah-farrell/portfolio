import {
  MobileNav,
  MobileNavHeader,
  MobileNavMenu,
  MobileNavToggle,
  Navbar,
  NavbarLogo,
  NavBody,
  NavItems,
} from "@/components/ui/resizable-navbar";
import { useEffect, useState } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import ResumeButton from "./DownloadResumeBtn";
import { Switch } from "./ui/switch";
import { useTheme } from "./theme-provider";
import { Monitor, Home, ChevronDown, Sun, Moon, Mail } from "lucide-react";

export function MainNavbar() {
  const { theme, setTheme } = useTheme();
  const location = useLocation();
  const navigate = useNavigate();

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
    if (location.pathname !== '/') {
      // If not on home page, navigate to home page first, then scroll to contact
      navigate('/');
      setTimeout(() => {
        const contactSection = document.getElementById('contact');
        if (contactSection) {
          contactSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 100);
    } else {
      // Already on home page, just scroll to contact
      const contactSection = document.getElementById('contact');
      if (contactSection) {
        contactSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  };

  // Scroll to section without changing URL
  const scrollToSection = (sectionId: string) => {
    if (location.pathname !== '/') {
      // If not on home page, navigate to home page first, then scroll to section
      navigate('/');
      // Store the section to scroll to after navigation
      sessionStorage.setItem('scrollToSection', sectionId);
    } else {
      // Already on home page, just scroll to section
      const section = document.getElementById(sectionId);
      if (section) {
        section.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  };

  // Scroll to services section
  const scrollToServicesSection = (sectionId: string) => {
    if (location.pathname !== '/services') {
      // Navigate to services page first, then scroll
      navigate('/services');
      // Store the section to scroll to after navigation
      sessionStorage.setItem('scrollToServicesSection', sectionId);
    } else {
      // Already on services page, just scroll without storing
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
    { name: "What I Do", sectionId: "what-i-do" },
    { name: "Get Started", sectionId: "contact-form" },
  ];

  const mainNavItems = [
    {
      name: "Home",
      link: "/",
      isDropdown: true,
      sections: homeSections,
      icon: <Home className="w-4 h-4 mr-2" />,
      isActive: isActivePage("/"),
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

    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [openDropdowns, setOpenDropdowns] = useState<number[]>([]);

  // Clear any leftover sessionStorage data on component mount
  useEffect(() => {
    // Clear any leftover section data when component mounts
    sessionStorage.removeItem('scrollToSection');
    sessionStorage.removeItem('scrollToServicesSection');
  }, []);

  // Handle automatic scrolling after navigation
  useEffect(() => {
    // Check if we need to scroll to a section after navigation
    const scrollToSection = sessionStorage.getItem('scrollToSection');
    const scrollToServicesSection = sessionStorage.getItem('scrollToServicesSection');
    
    if (scrollToSection && location.pathname === '/') {
      // Clear the stored section
      sessionStorage.removeItem('scrollToSection');
      // Scroll to the section
      setTimeout(() => {
        const section = document.getElementById(scrollToSection);
        if (section) {
          section.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 100);
    }
    
    if (scrollToServicesSection && location.pathname === '/services') {
      // Clear the stored section
      sessionStorage.removeItem('scrollToServicesSection');
      // Scroll to the section
      setTimeout(() => {
        const section = document.getElementById(scrollToServicesSection);
        if (section) {
          section.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 100);
    }
  }, [location.pathname]);

  const toggleDropdown = (idx: number) => {
    setOpenDropdowns(prev => 
      prev.includes(idx) 
        ? prev.filter(i => i !== idx)
        : [...prev, idx]
    );
  };

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
                  <button
                    onClick={() => {
                      if (item.name === "Services") {
                        window.location.href = item.link;
                      } else {
                        window.location.href = item.link;
                      }
                      setIsMobileMenuOpen(false);
                    }}
                    className={`relative flex items-center text-left w-full py-3 px-4 rounded-lg transition-all duration-200 ${
                      item.isActive 
                        ? "text-emerald-600 dark:text-emerald-400 font-medium bg-emerald-50 dark:bg-emerald-950/20" 
                        : "text-neutral-600 dark:text-neutral-300 hover:text-emerald-500 dark:hover:text-emerald-500 hover:bg-gray-100 dark:hover:bg-neutral-800/50"
                    }`}
                  >
                    {item.icon && item.icon}
                    <span className="block font-medium">{item.name}</span>
                  </button>
                  {item.isDropdown && (
                    <button
                      onClick={() => toggleDropdown(idx)}
                      className="ml-2 p-2 text-neutral-600 dark:text-neutral-300 hover:text-emerald-500 dark:hover:text-emerald-500 transition-colors rounded-lg hover:bg-gray-100 dark:hover:bg-neutral-800/50"
                    >
                      <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${
                        openDropdowns.includes(idx) ? 'rotate-180' : ''
                      }`} />
                    </button>
                  )}
                </div>
                
                {/* Dropdown sections */}
                {item.isDropdown && (
                  <div className={`ml-4 mt-2 space-y-2 transition-all duration-200 ${
                    openDropdowns.includes(idx) ? 'block opacity-100' : 'hidden opacity-0'
                  }`}>
                    {item.sections?.map((section, sectionIdx) => (
                      <button
                        key={`mobile-${item.name}-${sectionIdx}`}
                        onClick={() => {
                          if (item.name === "Services") {
                            scrollToServicesSection(section.sectionId);
                          } else {
                            // For Home sections, use scrollToSection which handles navigation
                            scrollToSection(section.sectionId);
                          }
                          setIsMobileMenuOpen(false);
                        }}
                        className={`relative text-sm block transition-colors text-left w-full py-2 px-4 rounded-md ${
                          (item.name === "Home" && isActiveSection(section.sectionId)) ||
                          (item.name === "Services" && location.pathname === "/services" && location.hash === `#${section.sectionId}`)
                            ? "text-emerald-600 dark:text-emerald-400 font-medium bg-emerald-50 dark:bg-emerald-950/20"
                            : "text-neutral-600 dark:text-neutral-300 hover:text-emerald-500 dark:hover:text-emerald-500 hover:bg-gray-100 dark:hover:bg-neutral-800/50"
                        }`}
                      >
                        <span className="block">{section.name}</span>
                      </button>
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
