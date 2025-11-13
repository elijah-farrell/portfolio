import {
  MobileNav,
  MobileNavHeader,
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
import ContactForm from "../../pages/services/ContactForm";
import { ChevronDown } from "lucide-react";
import { ThemeToggle } from "../theme/theme-toggle";
import { cn } from "@/lib/utils";
import { scrollToSectionOnly } from "@/lib/scroll-utils";

export function Navbar() {
  const [mounted, setMounted] = useState(false);
  const [currentPath, setCurrentPath] = useState('');

  useEffect(() => {
    setMounted(true);
    setCurrentPath(window.location.pathname);
  }, []);

  // Development mode - hide templates section
  const showTemplatesSection = false;
  
  const servicesSections = [
    { name: "What I Offer", sectionId: "full-stack-dev" },
    ...(showTemplatesSection ? [{ name: "My Websites and Templates", sectionId: "my-projects" }] : []),
    { name: "Start a Project", sectionId: "modal" },
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
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [openMobileDropdown, setOpenMobileDropdown] = useState(false);

  // Close mobile menu when screen size changes to desktop
  useEffect(() => {
    const checkScreenSize = () => {
      if (window.innerWidth >= 830) {
        setIsMobileMenuOpen(false);
      }
    };
    
    window.addEventListener('resize', checkScreenSize);
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);



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
            <NavbarLogo visible={true} />
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
            <div className="absolute inset-0 flex flex-col items-center justify-center px-6 py-8 w-full pt-20">
                {/* Logo in center */}
                <a
                  href="/"
                  onClick={(e) => {
                    e.preventDefault();
                    setIsMobileMenuOpen(false);
                    window.location.href = '/';
                  }}
                  className="text-2xl font-bold bg-gradient-to-r from-emerald-500 to-emerald-900 dark:from-emerald-300 dark:to-emerald-600 bg-clip-text text-transparent mb-8"
                >
                  Elijah Farrell
                </a>

                {/* Navigation Links */}
                <nav className="flex flex-col items-center w-full gap-0 text-lg text-neutral-800 dark:text-neutral-100 font-medium mb-8">
                  {mainNavItems.map((item, index) => (
                    <div 
                      key={index} 
                      className="w-full max-w-sm"
                    >
                      {item.isDropdown ? (
                        <div className="w-full">
                          <div className={cn(
                            "w-full px-6 py-3 text-lg font-medium transition-colors duration-0 rounded-lg inline-flex items-center justify-center relative",
                            item.isActive
                              ? "text-emerald-600 dark:text-emerald-400 bg-emerald-50/50 dark:bg-emerald-950/20"
                              : "text-neutral-800 dark:text-neutral-100 hover:text-emerald-600 dark:hover:text-emerald-400 hover:bg-neutral-100 dark:hover:bg-neutral-800/50"
                          )}>
                            <button
                              onClick={() => {
                                setIsMobileMenuOpen(false);
                                if (item.link.includes('#')) {
                                  const sectionId = item.link.split('#')[1];
                                  scrollToSectionOnly(sectionId);
                                } else {
                                  window.location.href = item.link;
                                }
                              }}
                              className="text-center relative"
                            >
                              {item.name}
                            </button>
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                setOpenMobileDropdown(!openMobileDropdown);
                              }}
                              className="absolute left-1/2 translate-x-[calc(50%+2.5rem)] text-neutral-600 dark:text-neutral-400 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors duration-0 p-2"
                            >
                              <ChevronDown 
                                size={18} 
                                className={cn(
                                  "transition-transform duration-200",
                                  openMobileDropdown && "rotate-180"
                                )} 
                              />
                            </button>
                          </div>
                          
                          {/* Dropdown Content */}
                          {openMobileDropdown && (
                            <div className="px-6 space-y-1 pt-2">
                              {item.sections?.map((section, sectionIndex) => (
                                <button
                                  key={sectionIndex}
                                  onClick={() => {
                                    setIsMobileMenuOpen(false);
                                    setOpenMobileDropdown(false);
                                    if (section.sectionId === "modal") {
                                      setIsModalOpen(true);
                                      return;
                                    }
                                    scrollToSectionOnly(section.sectionId);
                                  }}
                                  className="block w-full text-center text-base text-neutral-600 dark:text-neutral-300 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors duration-0 py-2 px-3 rounded-md hover:bg-neutral-100 dark:hover:bg-neutral-800/30"
                                >
                                  {section.name}
                                </button>
                              ))}
                            </div>
                          )}
                        </div>
                      ) : (
                        <button
                          onClick={() => {
                            setIsMobileMenuOpen(false);
                            if (item.link.includes('#')) {
                              const sectionId = item.link.split('#')[1];
                              scrollToSectionOnly(sectionId);
                            } else {
                              window.location.href = item.link;
                            }
                          }}
                          className={cn(
                            "w-full px-6 py-3 text-lg font-medium transition-colors duration-0 rounded-lg",
                            item.isActive
                              ? "text-emerald-600 dark:text-emerald-400 bg-emerald-50/50 dark:bg-emerald-950/20"
                              : "text-neutral-800 dark:text-neutral-100 hover:text-emerald-600 dark:hover:text-emerald-400 hover:bg-neutral-100 dark:hover:bg-neutral-800/50"
                          )}
                        >
                          {item.name}
                        </button>
                      )}
                    </div>
                  ))}
                </nav>

                {/* Theme Toggle */}
                <div className="flex items-center justify-center">
                  <ThemeToggle />
                </div>
              </div>
            )}
        </MobileNav>

      </ResizableNavbar>
      
      {/* Modal for Start a Project */}
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
