/**
 * Centralized scroll utilities for consistent behavior across the app
 */

export interface ScrollOptions {
  behavior?: 'smooth' | 'auto' | 'instant';
  block?: 'start' | 'center' | 'end' | 'nearest';
  inline?: 'start' | 'center' | 'end' | 'nearest';
  preserveHash?: boolean;
}

const DEFAULT_SCROLL_OPTIONS: ScrollOptions = {
  behavior: 'smooth',
  block: 'start',
  inline: 'nearest',
  preserveHash: true, // Keep hash for link previews
};

/**
 * Scroll to an element by ID
 */
export const scrollToElement = (
  elementId: string, 
  options: ScrollOptions = DEFAULT_SCROLL_OPTIONS
): boolean => {
  const element = document.getElementById(elementId);
  
  if (!element) {
    console.warn(`Element with id "${elementId}" not found`);
    return false;
  }

  element.scrollIntoView({
    behavior: options.behavior || 'smooth',
    block: options.block || 'start',
    inline: options.inline || 'nearest',
  });

  return true;
};

/**
 * Scroll to a section from a hash link (e.g., "#about")
 */
export const scrollToSection = (
  hash: string, 
  options: ScrollOptions = DEFAULT_SCROLL_OPTIONS
): boolean => {
  const elementId = hash.replace('#', '');
  const success = scrollToElement(elementId, options);
  
  // If preserveHash is false, remove the hash from URL after scrolling
  if (success && !options.preserveHash) {
    setTimeout(() => {
      const currentUrl = window.location.href.split('#')[0];
      window.history.replaceState(null, '', currentUrl);
    }, 100);
  }
  
  return success;
};

/**
 * Handle navigation with scroll - for navbar and other navigation components
 */
export const handleNavigationWithScroll = (
  link: string,
  options: ScrollOptions = DEFAULT_SCROLL_OPTIONS
): void => {
  if (link.includes('#')) {
    // Section link - scroll to section
    const [path, hash] = link.split('#');
    const currentPath = window.location.pathname;
    
    if (currentPath === path || (path === '/' && currentPath === '/')) {
      // Same page - just scroll without changing URL
      scrollToSection(`#${hash}`, { ...options, preserveHash: false });
    } else {
      // Different page - store scroll target and navigate
      sessionStorage.setItem('scrollToSection', hash);
      window.location.href = path;
    }
  } else {
    // Page link - navigate directly
    window.location.href = link;
  }
};

/**
 * Handle internal navigation without setting URL hashes - for mobile nav and internal links
 */
export const handleInternalNavigation = (
  link: string,
  options: ScrollOptions = DEFAULT_SCROLL_OPTIONS
): void => {
  if (link.includes('#')) {
    // Section link - scroll to section without changing URL
    const [, hash] = link.split('#');
    scrollToSection(`#${hash}`, { ...options, preserveHash: false });
  } else {
    // Page link - navigate directly
    window.location.href = link;
  }
};

/**
 * Simple scroll function that NEVER sets URL hashes - for mobile nav
 */
export const scrollToSectionOnly = (sectionId: string): void => {
  console.log('scrollToSectionOnly called with:', sectionId);
  const element = document.getElementById(sectionId);
  
  if (element) {
    console.log('Element found, scrolling to:', sectionId);
    
    // Ensure body overflow is restored before scrolling (in case mobile menu was open)
    document.body.style.overflow = "unset";
    
    // Use instant scroll (no animation)
    element.scrollIntoView({ 
      behavior: 'instant', 
      block: 'start',
      inline: 'nearest'
    });
    
    console.log('ScrollIntoView called');
  } else {
    console.log('Element NOT found:', sectionId);
        
    if (sectionId === 'what-i-do' || sectionId === 'get-started') {
      // Services sections - navigate to services page
      console.log('Cross-page navigation needed for:', sectionId);
      window.location.href = `/services#${sectionId}`;
    } else if (['about', 'experience', 'projects', 'skills', 'contact'].includes(sectionId)) {
      // Home page sections - navigate to home page
      console.log('Cross-page navigation needed for home section:', sectionId);
      window.location.href = `/#${sectionId}`;
    } else {
      console.log('Unknown section:', sectionId);
    }
  }
};

/**
 * Initialize scroll behavior on page load
 */
export const initializeScrollBehavior = (): void => {
  // Check for scroll target in sessionStorage
  const scrollToId = sessionStorage.getItem('scrollToSection');
  
  if (scrollToId) {
    const element = document.getElementById(scrollToId);
    if (element) {
      setTimeout(() => {
        scrollToElement(scrollToId, { behavior: 'smooth', block: 'start' });
        // Clear the scroll target after scrolling
        sessionStorage.removeItem('scrollToSection');
      }, 100); // small delay after route loads
    } else {
      // Clear if element doesn't exist
      sessionStorage.removeItem('scrollToSection');
    }
  }
  
  // Handle hash-based navigation if any exists
  const hash = window.location.hash;
  if (hash) {
    const elementId = hash.replace("#", "");
    const element = document.getElementById(elementId);
    if (element) {
      setTimeout(() => {
        scrollToElement(elementId, { behavior: 'smooth', block: 'start' });
        // Clear hash after scrolling to prevent URL pollution
        setTimeout(() => {
          const currentUrl = window.location.href.split('#')[0];
          window.history.replaceState(null, '', currentUrl);
        }, 150);
      }, 100);
    }
  }
};
