import {
  MobileNav,
  MobileNavHeader,
  MobileNavMenu,
  MobileNavToggle,
  ResizableNavbar,
  NavbarLogo,
  NavBody,
  NavItems,
} from "./resizable-navbar";
import {
  Modal,
  ModalBody,
  ModalContent,
  useModal,
} from "@/components/ui/shadcn/animated-modal";
import { useEffect, useState } from "react";
import ContactForm from "../services/ContactForm";
import { Monitor, ChevronDown } from "lucide-react";
import { ThemeToggle } from "../theme/theme-toggle";

export function Navbar() {
  const [mounted, setMounted] = useState(false);
  const [currentPath, setCurrentPath] = useState('');

  useEffect(() => {
    setMounted(true);
    setCurrentPath(window.location.pathname);
  }, []);

  const servicesSections = [
    { name: "What I Do", sectionId: "what-i-do" },
    { name: "Get Started", sectionId: "modal" },
  ];

  const mainNavItems = [
    {
      name: "About",
      link: "/#about",
      isDropdown: false,
      isActive: mounted && currentPath === "/" && window.location.hash === "#about",
    },
    {
      name: "Experience",
      link: "/#experience",
      isDropdown: false,
      isActive: mounted && currentPath === "/" && window.location.hash === "#experience",
    },
    {
      name: "Projects",
      link: "/#projects",
      isDropdown: false,
      isActive: mounted && currentPath === "/" && window.location.hash === "#projects",
    },
    {
      name: "Skills",
      link: "/#skills",
      isDropdown: false,
      isActive: mounted && currentPath === "/" && window.location.hash === "#skills",
    },
    {
      name: "Contact",
      link: "/#contact",
      isDropdown: false,
      isActive: mounted && currentPath === "/" && window.location.hash === "#contact",
    },
    {
      name: "Services", 
      link: "/services",
      isDropdown: true,
      sections: servicesSections,
      isActive: mounted && currentPath === "/services",
    },
  ];

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [openDropdowns, setOpenDropdowns] = useState<number[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);



  // Custom Modal Trigger Component
  const CustomModalTrigger = () => {
    const { setOpen } = useModal();
    
    useEffect(() => {
      if (isModalOpen) {
        setOpen(true);
        setIsModalOpen(false);
      }
    }, [isModalOpen, setOpen]);
    
    return null;
  };


  return (
    <div className="relative w-full">
      <ResizableNavbar>
        {/* Desktop Navigation */}
        <NavBody isNavComponent={true}>
          <div className="flex items-center">
            <NavbarLogo />
          </div>
          <NavItems 
            items={mainNavItems}
            onSectionClick={(sectionId) => {
              if (sectionId === "modal") {
                setIsModalOpen(true);
              }
            }}
          />

          <div className="flex items-center gap-4 relative z-50">
            {/* Theme Toggle Switch */}
            <ThemeToggle />
          </div>
        </NavBody>

        {/* Mobile Navigation */}
        <MobileNav isMenuOpen={isMobileMenuOpen} isNavComponent={true}>
          <MobileNavHeader isMenuOpen={isMobileMenuOpen}>
            <NavbarLogo visible={false} />
            <div className="flex items-center gap-2 mr-0">
              <MobileNavToggle
                isOpen={isMobileMenuOpen}
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              />
            </div>
          </MobileNavHeader>

          <MobileNavMenu
            isOpen={isMobileMenuOpen}
            onClose={() => setIsMobileMenuOpen(false)}
          >
            {/* Main nav items */}
            {mainNavItems.map((item, idx) => (
              <div key={`mobile-nav-${idx}`} className="w-full">
                {item.isDropdown ? (
                  <div className="flex items-center rounded-lg overflow-hidden border border-gray-200 dark:border-neutral-700">
                    <a
                      href={item.link}
                      onClick={(e) => {
                        e.preventDefault();
                        window.location.href = item.link;
                      }}
                      className={`relative flex items-center text-left flex-1 py-3 px-4 transition-colors duration-200 rounded-l-lg hover:bg-accent hover:text-accent-foreground ${
                        item.isActive 
                          ? "text-emerald-600 dark:text-emerald-400 font-medium bg-emerald-50/80 dark:bg-emerald-950/30" 
                          : "text-neutral-700 dark:text-neutral-200 bg-gray-50/50 dark:bg-neutral-800/20"
                      }`}
                    >
                      {item.icon && item.icon}
                      <span className="block font-medium ml-2">{item.name}</span>
                    </a>
                    <button
                      onClick={() => {
                        // Close other dropdowns and toggle current one
                        if (openDropdowns.includes(idx)) {
                          setOpenDropdowns([]);
                        } else {
                          setOpenDropdowns([idx]);
                        }
                      }}
                      className="px-3 py-3 transition-colors border-l border-gray-200 dark:border-neutral-700 h-full bg-gray-50 dark:bg-neutral-800/30 text-neutral-600 dark:text-neutral-300 hover:bg-accent hover:text-accent-foreground rounded-r-lg"
                    >
                      <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${
                        openDropdowns.includes(idx) ? 'rotate-180' : ''
                      }`} />
                    </button>
                  </div>
                ) : (
                  <a
                    href={item.link}
                    onClick={(e) => {
                      e.preventDefault();
                      setIsMobileMenuOpen(false);
                      
                      if (item.link.includes('#')) {
                        // Section link - scroll to section
                        const sectionId = item.link.split('#')[1];
                        if (mounted && currentPath === '/') {
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
                    className={`relative flex items-center text-left w-full py-3 px-4 transition-colors duration-200 rounded-lg hover:bg-accent hover:text-accent-foreground border border-gray-200 dark:border-neutral-700 ${
                      item.isActive 
                        ? "text-emerald-600 dark:text-emerald-400 font-medium bg-emerald-50/80 dark:bg-emerald-950/30" 
                        : "text-neutral-700 dark:text-neutral-200 bg-gray-50/50 dark:bg-neutral-800/20"
                    }`}
                  >
                    <span className="block font-medium">{item.name}</span>
                  </a>
                )}
                
                {/* Dropdown sections for Services */}
                {item.isDropdown && (
                  <div className={`ml-4 mt-2 space-y-1.5 transition-all duration-200 ${
                    openDropdowns.includes(idx) ? 'block opacity-100' : 'hidden opacity-0'
                  }`}>
                    {item.sections?.map((section, sectionIdx) => (
                      <div key={`mobile-${item.name}-${sectionIdx}`} className="flex items-center">
                        <span className="w-1.5 h-1.5 rounded-full bg-neutral-400 dark:bg-neutral-500 ml-1 mr-3 flex-shrink-0"></span>
                        <a
                          href={section.sectionId === "modal" ? "#" : `${item.link}#${section.sectionId}`}
                          onClick={(e) => {
                            e.preventDefault();
                            setIsMobileMenuOpen(false);
                            
                            if (section.sectionId === "modal") {
                              setIsModalOpen(true);
                            } else {
                              if (mounted && currentPath === item.link) {
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
                          className="flex-1 text-sm transition-colors text-left py-2.5 px-3 rounded-md text-neutral-600 dark:text-neutral-300 bg-gray-50/30 dark:bg-neutral-800/10 hover:bg-accent hover:text-accent-foreground border border-gray-200 dark:border-neutral-700"
                        >
                          {section.name}
                        </a>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
            
            {/* Theme Toggle at Bottom of Mobile Menu */}
            <div className="w-full pt-4 mt-2 border-t border-gray-200 dark:border-neutral-700">
              <ThemeToggle />
            </div>
          </MobileNavMenu>
        </MobileNav>
      </ResizableNavbar>
      
      {/* Modal for Get Started */}
      <Modal>
        <CustomModalTrigger />
        <ModalBody>
          <ModalContent>
            <h4 className="text-lg md:text-2xl text-neutral-600 dark:text-neutral-100 font-bold text-center mb-4">
              Let's Talk About Your Project
            </h4>
            <p className="text-neutral-600 dark:text-neutral-400 text-center mb-6">
              Tell me about what you need help with. I'll get back to you within 24 hours to discuss your project and see how I can help.
            </p>
            <ContactForm />
          </ModalContent>
        </ModalBody>
      </Modal>
      
    </div>
  );
}
