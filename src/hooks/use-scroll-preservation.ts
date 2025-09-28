import { useEffect } from 'react';

export const useScrollPreservation = () => {
  useEffect(() => {
    // Set overscroll color via JavaScript (allow normal overscroll behavior, theme-aware)
    const setOverscrollColor = () => {
      const isDark = document.documentElement.classList.contains('dark');
      const overscrollColor = isDark ? '#0a0a0a' : '#ffffff';
      const backgroundColor = isDark ? '#0a0a0a' : '#ffffff';
      
      // Apply to html element
      document.documentElement.style.setProperty('overscroll-behavior-color', overscrollColor, 'important');
      document.documentElement.style.setProperty('-webkit-overscroll-behavior-color', overscrollColor, 'important');
      document.documentElement.style.setProperty('background-color', backgroundColor, 'important');
      
      // Apply to body element
      document.body.style.setProperty('overscroll-behavior-color', overscrollColor, 'important');
      document.body.style.setProperty('-webkit-overscroll-behavior-color', overscrollColor, 'important');
      document.body.style.setProperty('background-color', backgroundColor, 'important');
      
      // Apply to root element
      const rootElement = document.querySelector(':root') as HTMLElement;
      if (rootElement) {
        rootElement.style.setProperty('overscroll-behavior-color', overscrollColor, 'important');
        rootElement.style.setProperty('-webkit-overscroll-behavior-color', overscrollColor, 'important');
        rootElement.style.setProperty('background-color', backgroundColor, 'important');
      }
      
      // Update meta tags dynamically
      const themeColorMeta = document.querySelector('meta[name="theme-color"]');
      const navButtonColorMeta = document.querySelector('meta[name="msapplication-navbutton-color"]');
      const statusBarStyleMeta = document.querySelector('meta[name="apple-mobile-web-app-status-bar-style"]');
      
      if (themeColorMeta) {
        themeColorMeta.setAttribute('content', backgroundColor);
      }
      if (navButtonColorMeta) {
        navButtonColorMeta.setAttribute('content', backgroundColor);
      }
      if (statusBarStyleMeta) {
        statusBarStyleMeta.setAttribute('content', isDark ? 'black-translucent' : 'default');
      }
      
      // Allow normal overscroll behavior
      document.documentElement.style.setProperty('overscroll-behavior', 'auto', 'important');
      document.body.style.setProperty('overscroll-behavior', 'auto', 'important');
      
      // Force update for Safari
      if (navigator.userAgent.includes('Safari') && !navigator.userAgent.includes('Chrome')) {
        document.documentElement.style.setProperty('overscroll-behavior-color', overscrollColor, 'important');
        document.documentElement.style.setProperty('-webkit-overscroll-behavior-color', overscrollColor, 'important');
      }
    };

    // Apply immediately
    setOverscrollColor();
    
    // Apply again after a short delay
    setTimeout(setOverscrollColor, 100);
    setTimeout(setOverscrollColor, 500);
    
    // Listen for theme changes
    const observer = new MutationObserver(() => {
      setOverscrollColor();
    });
    
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class']
    });
    
    // Check if this is a page refresh (not navigation)
    const isPageRefresh = performance.navigation.type === 1 || 
                         performance.getEntriesByType('navigation')[0]?.type === 'reload';
    
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
      observer.disconnect();
      window.removeEventListener('beforeunload', handleBeforeUnload);
      window.removeEventListener('scroll', handleScroll);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      clearTimeout(scrollTimeout);
    };
  }, []);
};
