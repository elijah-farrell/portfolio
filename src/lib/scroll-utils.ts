/**
 * Centralized scroll utilities for consistent behavior across the app
 */

export interface ScrollOptions {
  behavior?: 'smooth' | 'auto';
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
    
    // Use auto scroll (no animation, instant jump)
    element.scrollIntoView({ 
      behavior: 'auto', 
      block: 'start',
      inline: 'nearest'
    });
    
    console.log('ScrollIntoView called');
  } else {
    console.log('Element NOT found:', sectionId);
    
    if (sectionId === 'what-i-do' || sectionId === 'get-started' || sectionId === 'what-i-offer' || sectionId === 'full-stack-dev' || sectionId === 'my-projects') {
      // Services sections - navigate to services page
      console.log('Cross-page navigation needed for:', sectionId);
      // Store scroll target in sessionStorage for reliable scrolling after page load
      // Mark as mobile nav (scrollToSectionOnly is only used by mobile menu)
      sessionStorage.setItem('scrollToSection', sectionId);
      sessionStorage.setItem('isMobileNav', 'true');
      // Store approximate position to prevent top flash
      sessionStorage.setItem('pendingScroll', 'true');
      window.location.href = '/services';
    } else if (['about', 'experience', 'projects', 'skills', 'contact'].includes(sectionId)) {
      // Home page sections - navigate to home page
      console.log('Cross-page navigation needed for home section:', sectionId);
      // Store scroll target in sessionStorage for reliable scrolling after page load
      // Mark as mobile nav (scrollToSectionOnly is only used by mobile menu)
      sessionStorage.setItem('scrollToSection', sectionId);
      sessionStorage.setItem('isMobileNav', 'true');
      // Store approximate position to prevent top flash
      sessionStorage.setItem('pendingScroll', 'true');
      window.location.href = '/';
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
    const isMobileNav = sessionStorage.getItem('isMobileNav') === 'true';
    const isMobile = window.innerWidth < 830;
    // Use auto scroll (no animation) only if it's from mobile nav AND we're on mobile
    const scrollBehavior = (isMobileNav && isMobile) ? 'auto' : 'smooth';
    const isAuto = scrollBehavior === 'auto';
    
    // Check if inline script already handled the auto scroll
    const alreadyHandled = isAuto && sessionStorage.getItem('scrollHandled') === 'true';
    
    const attemptScroll = (retries = 10, delay = 200, isFirstAttempt = true) => {
      const element = document.getElementById(scrollToId);
      if (element) {
        if (isAuto && !alreadyHandled) {
          // For auto scrolls, inline script should have handled it, but ensure it happened
          // This is a backup in case inline script didn't find the element (lazy-loaded)
          scrollToElement(scrollToId, { behavior: 'auto', block: 'start' });
          // Clear the scroll target and mobile nav flag after scrolling
          sessionStorage.removeItem('scrollToSection');
          sessionStorage.removeItem('isMobileNav');
          sessionStorage.removeItem('scrollHandled');
        } else if (isAuto && alreadyHandled) {
          // Already handled by inline script, just clean up
          sessionStorage.removeItem('scrollToSection');
          sessionStorage.removeItem('isMobileNav');
          sessionStorage.removeItem('scrollHandled');
        } else {
          // For smooth scrolls, use a small delay to ensure page is rendered
          const scrollDelay = isFirstAttempt ? 50 : 100;
          setTimeout(() => {
            scrollToElement(scrollToId, { behavior: 'smooth', block: 'start' });
            // Clear the scroll target and mobile nav flag after scrolling
            sessionStorage.removeItem('scrollToSection');
            sessionStorage.removeItem('isMobileNav');
          }, scrollDelay);
        }
      } else if (retries > 0) {
        // Retry for lazy-loaded components (like Skills)
        setTimeout(() => attemptScroll(retries - 1, delay, false), delay);
      } else {
        // Clear if element doesn't exist after all retries
        sessionStorage.removeItem('scrollToSection');
        sessionStorage.removeItem('isMobileNav');
        sessionStorage.removeItem('scrollHandled');
      }
    };
    
    attemptScroll();
  }
  
  // Handle hash-based navigation if any exists
  const hash = window.location.hash;
  if (hash) {
    const elementId = hash.replace("#", "");
    const attemptHashScroll = (retries = 10, delay = 200) => {
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
      } else if (retries > 0) {
        // Retry for lazy-loaded components
        setTimeout(() => attemptHashScroll(retries - 1, delay), delay);
      }
    };
    
    attemptHashScroll();
  }
};
