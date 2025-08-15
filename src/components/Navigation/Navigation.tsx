import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useSettings } from '@/contexts/SettingsContext';

interface NavItem {
  href: string;
  label: string;
  icon: React.ReactNode | null;
}

export default function Navigation() {
  const { darkMode, currentColor, setDarkMode, setCurrentColor } = useSettings();
  const location = useLocation();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [colorPickerOpen, setColorPickerOpen] = useState(false);
  const [isNavbarVisible, setIsNavbarVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isAtTop, setIsAtTop] = useState(true);
  const [lastScrollTime, setLastScrollTime] = useState(Date.now());
  const [mobileDropdowns, setMobileDropdowns] = useState({
    home: false,
    services: false
  });
  const [desktopDropdowns, setDesktopDropdowns] = useState({
    home: false,
    services: false
  });
  
  const colors = ['#F59E0B', '#EF4444', '#3B82F6', '#8B5CF6'];

  // Home page navigation items for dropdown
  const homePageItems: NavItem[] = [
    { href: '#about', label: 'About', icon: null },
    { href: '#education', label: 'Education', icon: null },
    { href: '#work', label: 'Work', icon: null },
    { href: '#projects', label: 'Projects', icon: null },
    { href: '#skills', label: 'Skills', icon: null }
  ];

  // Main navigation items
  const navItems: NavItem[] = [
    { href: '/', label: 'Home', icon: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"/>
      </svg>
    ) },
    { href: '/services', label: 'Services', icon: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
      </svg>
    ) },
    { href: '/contact', label: 'Contact', icon: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>
      </svg>
    ) }
  ];

  // Services page items for dropdown
  const servicesPageItems: NavItem[] = [
    { href: 'https://cal.com/elijahfarrell', label: 'Book Call', icon: null }
  ];

  // Handle scroll events to hide/show navbar and detect top position
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // Check if at top of page
      const newIsAtTop = currentScrollY < 100;
      setIsAtTop(newIsAtTop);
      
      // Show navbar at the top of the page
      if (currentScrollY < 100) {
        setIsNavbarVisible(true);
        setLastScrollY(currentScrollY);
        return;
      }
      
      // Don't hide navbar when mobile menu is open
      if (mobileMenuOpen) {
        setIsNavbarVisible(true);
        setLastScrollY(currentScrollY);
        return;
      }
      
      // Keep navbar visible when navigating to specific sections (hash changes)
      if (location.hash) {
        setIsNavbarVisible(true);
        setLastScrollY(currentScrollY);
        return;
      }
      
      // Keep navbar visible for a short time after scrolling to allow for section navigation
      const timeSinceLastScroll = Date.now() - lastScrollTime;
      if (timeSinceLastScroll < 2000) { // 2 seconds
        setIsNavbarVisible(true);
        setLastScrollY(currentScrollY);
        return;
      }
      
      // Hide navbar when scrolling down, show when scrolling up
      if (currentScrollY > lastScrollY && isNavbarVisible) {
        setIsNavbarVisible(false);
      } else if (currentScrollY < lastScrollY && !isNavbarVisible) {
        setIsNavbarVisible(true);
      }
      
      setLastScrollY(currentScrollY);
      setLastScrollTime(Date.now());
    };

    // Check initial scroll position when component mounts or location changes
    // Use setTimeout to ensure DOM is ready
    setTimeout(handleScroll, 0);

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY, isNavbarVisible, location.pathname]);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      // Store current scroll position
      const scrollY = window.scrollY;
      document.body.style.overflow = 'hidden';
      document.body.style.position = 'fixed';
      document.body.style.width = '100%';
      document.body.style.top = `-${scrollY}px`;
      // Store scroll position in data attribute for restoration
      document.body.setAttribute('data-scroll-y', scrollY.toString());
    } else {
      // Restore scroll position
      const scrollY = document.body.getAttribute('data-scroll-y');
      if (scrollY) {
        document.body.style.overflow = '';
        document.body.style.position = '';
        document.body.style.width = '';
        document.body.style.top = '';
        document.body.removeAttribute('data-scroll-y');
        // Restore scroll position
        window.scrollTo(0, parseInt(scrollY));
      }
    }

    return () => {
      // Cleanup: restore scroll position if component unmounts
      const scrollY = document.body.getAttribute('data-scroll-y');
      if (scrollY) {
        document.body.style.overflow = '';
        document.body.style.position = '';
        document.body.style.width = '';
        document.body.style.top = '';
        document.body.removeAttribute('data-scroll-y');
        window.scrollTo(0, parseInt(scrollY));
      }
    };
  }, [mobileMenuOpen]);

  // Close desktop dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Element;
      if (!target.closest('.desktop-dropdown-container')) {
        setDesktopDropdowns({ home: false, services: false });
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Separate effect to handle location changes and check scroll position
  useEffect(() => {
    // Reset scroll state on location change
    setLastScrollY(0);
    setIsAtTop(true);
    setIsNavbarVisible(true);
  }, [location.pathname]);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const toggleMobileDropdown = (dropdown: 'home' | 'services') => {
    setMobileDropdowns(prev => {
      // Close other dropdowns when opening a new one
      const newState = {
        home: false,
        services: false
      };
      // Only open the clicked dropdown if it wasn't already open
      if (!prev[dropdown]) {
        newState[dropdown] = true;
      }
      return newState;
    });
  };

  const toggleDesktopDropdown = (dropdown: 'home' | 'services') => {
    setDesktopDropdowns(prev => {
      // Close other dropdowns when opening a new one
      const newState = {
        home: false,
        services: false
      };
      // Only open the clicked dropdown if it wasn't already open
      if (!prev[dropdown]) {
        newState[dropdown] = true;
      }
      return newState;
    });
  };

  const setColor = (color: string) => {
    setCurrentColor(color);
    setColorPickerOpen(false);
  };

  // Only make navbar transparent on home page when at top
  const shouldBeTransparent = isAtTop && location.pathname === '/';

  // Handle mouse events for FaultyTerminal when navbar is transparent
  const handleMouseMove = (e: React.MouseEvent) => {
    if (shouldBeTransparent) {
      // Pass mouse events to the FaultyTerminal
      const faultTerminal = document.querySelector('[data-faulty-terminal]');
      if (faultTerminal) {
        const rect = faultTerminal.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width;
        const y = 1 - (e.clientY - rect.top) / rect.height;
        // Dispatch a custom event to document that FaultyTerminal can listen to
        document.dispatchEvent(new CustomEvent('globalmousemove', {
          detail: { x, y }
        }));
      }
    }
  };

  return (
    <nav 
              className={`fixed top-0 w-full z-[60] transition-all duration-300 ${
        isNavbarVisible ? 'translate-y-0' : '-translate-y-full'
      } ${
        (shouldBeTransparent && !mobileMenuOpen) 
          ? 'bg-transparent backdrop-blur-none' 
          : 'bg-white dark:bg-black'
      }`}
      onMouseMove={handleMouseMove}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-24">
          {/* Logo */}
          <div className="flex items-center">
            <a 
              href="#" 
              onClick={(e) => {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="hover:scale-105 transition-transform duration-200 flex items-center justify-center group relative"
            >
                             <div className="relative">
                 <img 
                   src={darkMode ? "/favicon_dark.png" : "/favicon_light.png"} 
                   alt="Elijah Farrell - Click to scroll to top" 
                   className="w-8 h-8 rounded-full cursor-pointer"
                 />
               </div>
            </a>
          </div>
          
                     {/* Desktop Navigation - Centered */}
           <div className="hidden md:flex items-center gap-8 absolute left-1/2 transform -translate-x-1/2">
                        {navItems.map((item) => {
              const isActive = (item.href === '/' && location.pathname === '/') || 
                              (item.href === '/services' && location.pathname === '/services') ||
                              (item.href === '/contact' && location.pathname === '/contact') ||
                              (item.href.startsWith('#') && location.pathname === '/');
              
              console.log('Item:', item.href, 'Pathname:', location.pathname, 'isActive:', isActive);
              
              // Handle anchor links for home page sections
              const handleClick = (e: React.MouseEvent, href: string) => {
                if (href.startsWith('#')) {
                  e.preventDefault();
                  const element = document.querySelector(href) as HTMLElement;
                  if (element) {
                    const navbarHeight = 80; // Approximate navbar height
                    const elementTop = element.offsetTop - navbarHeight; // Align with navbar bottom
                    window.scrollTo({
                      top: elementTop,
                      behavior: 'smooth'
                    });
                  }
                }
              };
              
              // Special handling for Home item with dropdown
              if (item.href === '/') {
                return (
                  <div className="relative inline-block text-left group" key={item.href}>
                    <div className={`relative font-medium transition-all duration-300 ${
                      isActive 
                        ? (shouldBeTransparent ? 'text-gray-900 dark:text-white' : 'text-gray-900 dark:text-white')
                        : (shouldBeTransparent ? 'text-gray-800 dark:text-gray-200 hover:text-gray-900 dark:hover:text-white' : 'text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-900')
                    }`}>
                      <button 
                        onClick={() => {
                          if (isActive) {
                            window.scrollTo({ top: 0, behavior: 'smooth' });
                          } else {
                            navigate('/');
                          }
                        }}
                        className="relative z-10 px-2 py-1 rounded-md transition-all duration-300 flex items-center gap-2"
                      >
                        {item.icon && item.icon}
                        {item.label}
                      </button>
                      {/* Active indicator */}
                      {isActive && (
                        <span 
                          className="absolute -bottom-1 left-0 w-full h-0.5 rounded-full transition-all duration-300"
                          style={{ backgroundColor: currentColor }}
                        />
                      )}
                      {/* Hover effect */}
                      <span className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-all duration-300 transform scale-x-0 group-hover:scale-x-100 origin-left rounded-md ${
                        shouldBeTransparent ? 'bg-white/20' : 'bg-gradient-to-r from-transparent via-gray-200 dark:via-neutral-700 to-transparent'
                      }`}></span>
                      {/* Hover underline */}
                      <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gray-400 dark:bg-gray-500 group-hover:w-full transition-all duration-300 rounded-full"></span>
                    </div>
                    
                    {/* Completely separate dropdown button for Home */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleDesktopDropdown('home');
                      }}
                      className="absolute -right-8 top-1/2 transform -translate-y-1/2 p-2 rounded hover:bg-gray-100 dark:hover:bg-neutral-700 transition-colors duration-200"
                    >
                      <svg className={`w-4 h-4 text-gray-500 dark:text-gray-400 transition-transform duration-200 ${
                        desktopDropdowns.home ? 'rotate-180' : ''
                      }`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>
                    
                    {/* Click dropdown for Home */}
                    <div className={`absolute top-full left-0 mt-2 w-full bg-white dark:bg-neutral-800 rounded-lg shadow-lg border border-gray-200 dark:border-neutral-700 overflow-hidden transition-all duration-300 z-50 ${
                      desktopDropdowns.home ? 'opacity-100 visible' : 'opacity-0 invisible'
                    }`}>
                      {homePageItems.map((dropdownItem) => (
                        <button
                          key={dropdownItem.href}
                          onClick={() => {
                            if (location.pathname === '/') {
                              // On home page, scroll to section with navbar offset
                              const element = document.querySelector(dropdownItem.href) as HTMLElement;
                              if (element) {
                                const navbarHeight = 80; // Approximate navbar height
                                const elementTop = element.offsetTop - navbarHeight; // Align with navbar bottom
                                window.scrollTo({
                                  top: elementTop,
                                  behavior: 'smooth'
                                });
                              }
                            } else {
                              // On other pages, navigate to home page first
                              navigate('/');
                              // Wait for navigation then scroll with navbar offset
                              setTimeout(() => {
                                const element = document.querySelector(dropdownItem.href) as HTMLElement;
                                if (element) {
                                  const navbarHeight = 80; // Approximate navbar height
                                  const elementTop = element.offsetTop - navbarHeight; // Align with navbar bottom
                                  window.scrollTo({
                                    top: elementTop,
                                    behavior: 'smooth'
                                  });
                                }
                              }, 100);
                            }
                            // Close dropdown after selection
                            setDesktopDropdowns({ home: false, services: false });
                          }}
                          className="w-full px-3 py-2 text-left text-sm font-medium transition-all duration-200 hover:bg-gray-50 dark:hover:bg-neutral-700 text-gray-700 dark:text-gray-300"
                        >
                          {dropdownItem.label}
                        </button>
                      ))}
                    </div>
                    
                    {/* Extended hover area that covers the entire dropdown region */}
                    <div className="absolute top-0 left-0 w-full h-32 bg-transparent pointer-events-none group-hover:pointer-events-auto"></div>
                  </div>
                );
              }

              // Special handling for Services item with dropdown
              if (item.href === '/services') {
                return (
                  <div className="relative inline-block text-left group" key={item.href}>
                    <div className={`relative font-medium transition-all duration-300 ${
                      isActive 
                        ? (shouldBeTransparent ? 'text-gray-900 dark:text-white' : 'text-gray-900 dark:text-white')
                        : (shouldBeTransparent ? 'text-gray-800 dark:text-gray-200 hover:text-gray-900 dark:hover:text-white' : 'text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-900')
                    }`}>
                      <button 
                        onClick={() => {
                          if (isActive) {
                            window.scrollTo({ top: 0, behavior: 'smooth' });
                          } else {
                            navigate('/services');
                          }
                        }}
                        className="relative z-10 px-2 py-1 rounded-md transition-all duration-300 flex items-center gap-2"
                      >
                        {item.icon && item.icon}
                        {item.label}
                      </button>
                      {/* Active indicator */}
                      {isActive && (
                        <span 
                          className="absolute -bottom-1 left-0 w-full h-0.5 rounded-full transition-all duration-300"
                          style={{ backgroundColor: currentColor }}
                        />
                      )}
                      {/* Hover effect */}
                      <span className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-all duration-300 transform scale-x-0 group-hover:scale-x-100 origin-left rounded-md ${
                        shouldBeTransparent ? 'bg-white/20' : 'bg-gradient-to-r via-gray-200 dark:via-neutral-700 to-transparent'
                      }`}></span>
                      {/* Hover underline */}
                      <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gray-400 dark:bg-gray-500 group-hover:w-full transition-all duration-300 rounded-full"></span>
                    </div>
                    
                    {/* Completely separate dropdown button for Services */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleDesktopDropdown('services');
                      }}
                      className="absolute -right-8 top-1/2 transform -translate-y-1/2 p-2 rounded hover:bg-gray-100 dark:hover:bg-neutral-700 transition-colors duration-200"
                    >
                      <svg className={`w-4 h-4 text-gray-500 dark:text-gray-400 transition-transform duration-200 ${
                        desktopDropdowns.services ? 'rotate-180' : ''
                      }`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>
                    
                    {/* Click dropdown for Services */}
                    <div className={`absolute top-full left-0 mt-2 w-full bg-white dark:bg-neutral-800 rounded-lg shadow-lg border border-gray-200 dark:border-neutral-700 overflow-hidden transition-all duration-300 z-50 ${
                      desktopDropdowns.services ? 'opacity-100 visible' : 'opacity-0 invisible'
                    }`}>
                      {servicesPageItems.map((dropdownItem) => (
                        <a
                          key={dropdownItem.href}
                          href={dropdownItem.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={() => {
                            // Close dropdown after selection
                            setDesktopDropdowns({ home: false, services: false });
                          }}
                          className="w-full px-3 py-2 text-left text-sm font-medium transition-all duration-200 hover:bg-gray-50 dark:hover:bg-neutral-700 text-gray-700 dark:text-gray-300 flex items-center gap-2 whitespace-nowrap"
                        >
                          <span>{dropdownItem.label}</span>
                          <svg className="w-3 h-3 text-gray-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"/>
                          </svg>
                        </a>
                      ))}
                    </div>
                    
                    {/* Extended hover area that covers the entire dropdown region */}
                    <div className="absolute top-0 left-0 w-full h-32 bg-transparent pointer-events-none group-hover:pointer-events-auto"></div>
                  </div>
                );
              }
              
              // Regular navigation items
              return (
                <Link 
                  key={item.href}
                  to={item.href}
                  onClick={(e) => {
                    // If already on the active page, scroll to top
                    if (isActive) {
                      e.preventDefault();
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    } else {
                      // Handle anchor links
                      handleClick(e, item.href);
                    }
                  }}
                  className={`relative font-medium group transition-all duration-300 ${
                    isActive 
                      ? (shouldBeTransparent ? 'text-gray-900 dark:text-white' : 'text-gray-900 dark:text-white')
                      : (shouldBeTransparent ? 'text-gray-800 dark:text-gray-200 hover:text-gray-900 dark:hover:text-white' : 'text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-900')
                  }`}
                >
                  <span className="relative z-10 px-2 py-1 rounded-md transition-all duration-300 flex items-center gap-2">
                    {item.icon && item.icon}
                    {item.label}
                  </span>
                  {/* Active indicator */}
                  {isActive && (
                    <span 
                      className="absolute -bottom-1 left-0 w-full h-0.5 rounded-full transition-all duration-300"
                      style={{ backgroundColor: currentColor }}
                    />
                  )}
                  {/* Hover effect */}
                  <span className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-all duration-300 transform scale-x-0 group-hover:scale-x-100 origin-left rounded-md ${
                    shouldBeTransparent ? 'bg-white/20' : 'bg-gradient-to-r from-transparent via-gray-200 dark:via-neutral-700 to-transparent'
                  }`}></span>
                  {/* Hover underline */}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gray-400 dark:bg-gray-500 group-hover:w-full transition-all duration-300 rounded-full"></span>
                </Link>
              );
            })}
          </div>
          
          {/* Controls */}
          <div className="flex items-center gap-3">
            {/* Color Picker */}
            <div className="relative">
              <button 
                onClick={() => setColorPickerOpen(!colorPickerOpen)}
                className={`p-2 rounded-lg transition-all duration-200 hover:scale-105 hover:shadow-md ${
                  shouldBeTransparent 
                    ? 'bg-white/40 text-gray-900 dark:text-white hover:bg-white/50' 
                    : 'bg-gray-100 dark:bg-neutral-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-neutral-600'
                }`}
                style={{
                  backgroundColor: shouldBeTransparent 
                    ? darkMode ? '#0B0B0B' : undefined
                    : darkMode ? '#0B0B0B' : undefined
                }}
              >
                <svg className="w-5 h-5" style={{ color: currentColor }} fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M4 2a2 2 0 00-2 2v11a2 2 0 002 2h12a2 2 0 002-2V4a2 2 0 00-2-2H4zm0 2h12v11H4V4zm2 2a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm0 3a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm0 3a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1z" clipRule="evenodd"></path>
                </svg>
              </button>
              {colorPickerOpen && (
                <div className="absolute right-0 top-12 bg-white dark:bg-neutral-800 rounded-xl shadow-xl border border-gray-200 dark:border-neutral-700 p-4 w-48 animate-in slide-in-from-top-2 duration-200 z-[70]">
                  <div className="space-y-3">
                    <div className="text-xs font-medium text-gray-600 dark:text-gray-400 mb-2">
                      Theme Color
                    </div>
                    <div className="grid grid-cols-4 gap-3">
                      {colors.map((color) => (
                        <button
                          key={color}
                          onClick={() => setColor(color)}
                          className={`w-10 h-10 rounded-lg border-2 transition-all duration-200 hover:scale-110 hover:shadow-lg ${
                            currentColor === color 
                              ? 'border-gray-400 dark:border-gray-300 shadow-md' 
                              : 'border-gray-200 dark:border-neutral-500 hover:border-gray-300 dark:hover:border-neutral-400'
                          }`}
                          style={{ backgroundColor: color }}
                        >
                          {currentColor === color && (
                            <div className="w-full h-full flex items-center justify-center">
                              <svg className="w-5 h-5 text-white drop-shadow-sm" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                              </svg>
                            </div>
                          )}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
            
            {/* Dark Mode Toggle */}
            <button 
              onClick={() => setDarkMode(!darkMode)}
              className={`p-2 rounded-lg transition-all duration-200 hover:scale-105 hover:shadow-md ${
                shouldBeTransparent 
                  ? 'bg-white/40 text-gray-900 dark:text-white hover:bg-white/50' 
                  : 'bg-gray-100 dark:bg-neutral-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-neutral-600'
              }`}
              style={{
                backgroundColor: shouldBeTransparent 
                  ? darkMode ? '#0B0B0B' : undefined
                  : darkMode ? '#0B0B0B' : undefined
              }}
            >
              {!darkMode ? (
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clipRule="evenodd"></path>
                </svg>
              ) : (
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z"></path>
                </svg>
              )}
            </button>
            
            {/* Mobile Menu Toggle */}
            <button 
              onClick={toggleMobileMenu}
              className={`md:hidden p-2 rounded-lg transition-all duration-200 hover:scale-105 hover:shadow-md ${
                shouldBeTransparent 
                  ? 'bg-white/40 text-gray-900 dark:text-white hover:bg-white/50' 
                  : 'bg-gray-100 dark:bg-neutral-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-neutral-600'
              }`}
              style={{
                backgroundColor: shouldBeTransparent 
                  ? darkMode ? '#0B0B0B' : undefined
                  : darkMode ? '#0B0B0B' : undefined
              }}
            >
              {!mobileMenuOpen ? (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
                </svg>
              ) : (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                </svg>
              )}
            </button>
          </div>
        </div>
        
                 {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className={`md:hidden fixed top-0 left-0 w-screen h-screen z-[70] bg-white dark:bg-black transition-all duration-300 overflow-hidden`}>
            {/* Mobile Menu Header - Positioned absolutely to maintain X button position */}
            <div className="absolute top-4 right-4 z-10">
              <button 
                onClick={toggleMobileMenu}
                className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-neutral-800 transition-colors duration-200"
              >
                <svg className="w-6 h-6 text-gray-600 dark:text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                </svg>
              </button>
            </div>
            
            {/* Mobile Menu Content - Responsive layout for smaller screens */}
            <div className="flex flex-col h-full min-h-0">
              {/* Logo Section - Top with reduced padding */}
              <div className="flex justify-center pt-16 pb-6">
                <div className="flex items-center justify-center group relative">
                  <div className="relative">
                    <img 
                      src={darkMode ? "/favicon_dark.png" : "/favicon_light.png"} 
                      alt="Elijah Farrell" 
                      className="w-14 h-14 rounded-full"
                    />
                  </div>
                </div>
              </div>
              
              {/* Navigation Items - Centered vertically with smooth shifting */}
              <div className="flex-1 flex flex-col items-center justify-start space-y-4 px-6 overflow-y-auto min-h-0 transition-all duration-300 pt-3">
                {navItems.map((item) => {
                  const isActive = (item.href === '/' && location.pathname === '/') || 
                                  (item.href === '/services' && location.pathname === '/services') ||
                                  (item.href === '/contact' && location.pathname === '/contact') ||
                                  (item.href.startsWith('#') && location.pathname === '/');
                  
                  console.log('Item:', item.href, 'Pathname:', location.pathname, 'isActive:', isActive);
                  
                  return (
                    <React.Fragment key={item.href}>
                      {/* Main navigation item */}
                      <div className="w-full flex flex-col items-center">
                        <div className="relative">
                          <button 
                            onClick={() => {
                              console.log('Button clicked:', item.href, 'isActive:', isActive, 'current path:', location.pathname);
                              // If already on the active page, scroll to top
                              if (isActive) {
                                console.log('Scrolling to top for active page:', item.href);
                                setMobileMenuOpen(false);
                                // Force scroll to top with a small delay to ensure menu closes first
                                setTimeout(() => {
                                  window.scrollTo({ 
                                    top: 0, 
                                    behavior: 'smooth' 
                                  });
                                }, 100);
                              } else {
                                console.log('Navigating to new page:', item.href);
                                // Navigate to the page
                                navigate(item.href);
                                setMobileMenuOpen(false);
                              }
                            }}
                            className={`text-center font-medium py-3 px-6 rounded-lg transition-all duration-300 flex items-center justify-center gap-2 ${
                              isActive 
                                ? 'text-gray-900 dark:text-white bg-gray-100 dark:bg-neutral-800' 
                                : 'text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-neutral-800'
                            }`}
                            style={isActive ? { 
                              borderColor: currentColor,
                              border: `2px solid ${currentColor}`,
                              boxShadow: `0 0 0 1px ${currentColor}20`
                            } : {}}
                          >
                            {item.icon && <span className="text-xl">{item.icon}</span>}
                            <span className="text-lg">{item.label}</span>
                          </button>
                          
                          {/* Separate dropdown toggle button for Home and Services - absolutely positioned to the right */}
                          {(item.href === '/' || item.href === '/services') && (
                            <button
                              onClick={() => toggleMobileDropdown(item.href === '/' ? 'home' : 'services')}
                              className="absolute -right-10 top-1/2 transform -translate-y-1/2 p-2 rounded-lg transition-all duration-200 hover:bg-gray-100 dark:hover:bg-neutral-800 text-gray-600 dark:text-gray-300"
                            >
                              <svg 
                                className={`w-5 h-5 transition-transform duration-200 ${
                                  mobileDropdowns[item.href === '/' ? 'home' : 'services'] ? 'rotate-180' : ''
                                }`} 
                                fill="none" 
                                stroke="currentColor" 
                                viewBox="0 0 24 24"
                              >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                              </svg>
                            </button>
                          )}
                        </div>
                        
                        {/* Dropdown content for Home */}
                        {item.href === '/' && mobileDropdowns.home && (
                          <div className="mt-3 space-y-2 animate-in slide-in-from-top-2 duration-200 flex flex-col items-center w-full pb-4">
                            {homePageItems.map((sectionItem) => {
                              const isSectionActive = location.hash === sectionItem.href;
                              return (
                                <button 
                                  key={sectionItem.href}
                                  onClick={() => {
                                    const element = document.querySelector(sectionItem.href) as HTMLElement;
                                    if (element) {
                                      // Close mobile menu first, then scroll with updated navbar height
                                      setMobileMenuOpen(false);
                                      setTimeout(() => {
                                        const navbar = document.querySelector('nav');
                                        const navbarHeight = navbar ? navbar.offsetHeight : 96;
                                        const elementTop = element.offsetTop - navbarHeight + 1; // Minimal buffer for secondary links
                                        window.scrollTo({
                                          top: elementTop,
                                          behavior: 'smooth'
                                        });
                                      }, 100); // Wait for mobile menu to close
                                    }
                                  }}
                                  className={`text-center font-medium py-2 px-4 rounded-lg transition-all duration-300 flex items-center justify-center gap-2 ${
                                    isSectionActive 
                                      ? 'text-gray-900 dark:text-white bg-gray-100 dark:bg-neutral-800' 
                                      : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 hover:bg-gray-50 dark:hover:bg-neutral-800'
                                  }`}
                                  style={isSectionActive ? { 
                                    borderColor: currentColor,
                                    border: `2px solid ${currentColor}`,
                                    boxShadow: `0 0 0 1px ${currentColor}20`
                                  } : {}}
                                >
                                  <span className="text-gray-400 dark:text-gray-500">•</span>
                                  <span className="text-sm">{sectionItem.label}</span>
                                </button>
                              );
                            })}
                          </div>
                        )}

                        {/* Dropdown content for Services */}
                        {item.href === '/services' && mobileDropdowns.services && (
                          <div className="mt-3 space-y-2 animate-in slide-in-from-top-2 duration-200 flex flex-col items-center w-full pb-4">
                            {servicesPageItems.map((serviceItem) => (
                              <a 
                                key={serviceItem.href}
                                href={serviceItem.href}
                                target="_blank"
                                rel="noopener noreferrer"
                                onClick={() => setMobileMenuOpen(false)}
                                className="text-center font-medium py-2 px-4 rounded-lg transition-all duration-300 flex items-center justify-center gap-2 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 hover:bg-gray-50 dark:hover:bg-neutral-800"
                              >
                                <span className="text-gray-400 dark:text-gray-500">•</span>
                                <span className="text-sm">{serviceItem.label}</span>
                                <svg className="w-3 h-3 text-gray-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"/>
                                </svg>
                              </a>
                            ))}
                          </div>
                        )}
                      </div>
                    </React.Fragment>
                  );
                })}
              </div>
              
              {/* Theme Controls - Bottom with reduced padding */}
              <div className="flex justify-center items-center gap-4 py-4">
                {/* Color Picker */}
                <button 
                  onClick={() => setColorPickerOpen(!colorPickerOpen)}
                  className="p-2 rounded-lg transition-all duration-200 hover:scale-105 hover:shadow-md bg-gray-100 dark:bg-neutral-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-neutral-600"
                >
                  <svg className="w-5 h-5" style={{ color: currentColor }} fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M4 2a2 2 0 00-2 2v11a2 2 0 002 2h12a2 2 0 002-2V4a2 2 0 00-2-2H4zm0 2h12v11H4V4zm2 2a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm0 3a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm0 3a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1z" clipRule="evenodd"></path>
                  </svg>
                </button>
                
                {/* Dark Mode Toggle */}
                <button 
                  onClick={() => setDarkMode(!darkMode)}
                  className="p-2 rounded-lg transition-all duration-200 hover:scale-105 hover:shadow-md bg-gray-100 dark:bg-neutral-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-neutral-600"
                >
                  {!darkMode ? (
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clipRule="evenodd"></path>
                    </svg>
                  ) : (
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z"></path>
                    </svg>
                  )}
                </button>
              </div>
              
              {/* Color Picker Dropdown */}
              {colorPickerOpen && (
                <div className="absolute bottom-20 left-1/2 transform -translate-x-1/2 bg-white dark:bg-neutral-800 rounded-xl shadow-xl border border-gray-200 dark:border-neutral-700 p-4 w-48 animate-in slide-in-from-bottom-2 duration-200 z-[80]">
                  <div className="space-y-3">
                    <div className="text-xs font-medium text-gray-600 dark:text-gray-400 mb-2 text-center">
                      Theme Color
                    </div>
                    <div className="grid grid-cols-4 gap-3">
                      {colors.map((color) => (
                        <button
                          key={color}
                          onClick={() => setColor(color)}
                          className={`w-10 h-10 rounded-lg border-2 transition-all duration-200 hover:scale-110 hover:shadow-lg ${
                            currentColor === color 
                              ? 'border-gray-400 dark:border-gray-300 shadow-md' 
                              : 'border-gray-200 dark:border-neutral-500 hover:border-gray-300 dark:hover:border-neutral-400'
                          }`}
                          style={{ backgroundColor: color }}
                        >
                          {currentColor === color && (
                            <div className="w-full h-full flex items-center justify-center">
                              <svg className="w-5 h-5 text-white drop-shadow-sm" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                              </svg>
                            </div>
                          )}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
} 