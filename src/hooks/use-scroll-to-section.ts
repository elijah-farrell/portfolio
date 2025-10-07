import { useEffect } from 'react';

export const useScrollToSection = () => {
  useEffect(() => {
    // Check for scroll target in sessionStorage
    const scrollToId = sessionStorage.getItem('scrollToSection');
    
    if (scrollToId) {
      const element = document.getElementById(scrollToId);
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: "smooth", block: "start" });
          // Clear the scroll target after scrolling
          sessionStorage.removeItem('scrollToSection');
        }, 100); // small delay after route loads
      } else {
        // Clear if element doesn't exist
        sessionStorage.removeItem('scrollToSection');
      }
    }
    
    // Also handle legacy hash-based navigation if any exists
    const hash = window.location.hash;
    if (hash) {
      const id = hash.replace("#", "");
      const element = document.getElementById(id);
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: "smooth", block: "start" });
          
          setTimeout(() => {
            const currentUrl = window.location.href.split('#')[0];
            window.history.replaceState(null, '', currentUrl);
          }, 150);
        }, 100);
      }
    }
  }, []);
};

