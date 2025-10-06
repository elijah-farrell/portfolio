import { useEffect } from 'react';

export const useScrollPreservation = () => {
  useEffect(() => {
    // Check if this is a page refresh (not navigation)
    const getNavigationType = () => {
      const navEntry = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming | undefined;
      return navEntry?.type === 'reload';
    };
    
    const isPageRefresh = getNavigationType();
    
    // Only restore scroll position on page refresh, not on navigation
    if (isPageRefresh) {
      const savedScrollPosition = sessionStorage.getItem('scrollPosition');
      if (savedScrollPosition) {
        const scrollY = parseInt(savedScrollPosition, 10);
        // Use multiple attempts to ensure scroll restoration works on mobile
        const restoreScroll = () => {
          window.scrollTo(0, scrollY);
          // Try again after a short delay for mobile devices
          setTimeout(() => {
            window.scrollTo(0, scrollY);
          }, 100);
        };
        
        // Use requestAnimationFrame to ensure DOM is ready
        requestAnimationFrame(restoreScroll);
      }
    } else {
      // Clear saved scroll position on navigation to ensure fresh start
      sessionStorage.removeItem('scrollPosition');
    }

    // Save scroll position before page unload
    const handleBeforeUnload = () => {
      sessionStorage.setItem('scrollPosition', window.scrollY.toString());
    };

    // Save scroll position on page visibility change (mobile specific)
    const handleVisibilityChange = () => {
      if (document.hidden) {
        sessionStorage.setItem('scrollPosition', window.scrollY.toString());
      }
    };

    // Save scroll position periodically while scrolling
    let scrollTimeout: NodeJS.Timeout;
    const handleScroll = () => {
      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => {
        sessionStorage.setItem('scrollPosition', window.scrollY.toString());
      }, 100); // Debounce scroll saving
    };

    // Add event listeners
    window.addEventListener('beforeunload', handleBeforeUnload);
    window.addEventListener('scroll', handleScroll, { passive: true });
    document.addEventListener('visibilitychange', handleVisibilityChange);

    // Cleanup
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
      window.removeEventListener('scroll', handleScroll);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      clearTimeout(scrollTimeout);
    };
  }, []);
};
