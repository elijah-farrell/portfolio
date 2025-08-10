import "./global.css";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { SettingsProvider } from "./contexts/SettingsContext";
import { useEffect, useRef } from "react";
import Index from "./pages/Index";
import Services from "./pages/Services";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";

// Scroll restoration component that works with GitHub Pages
const ScrollRestoration = () => {
  const { pathname } = useLocation();
  const restoredRef = useRef(false);
  const previousPathRef = useRef(pathname);

  // Helper function to get the actual path from GitHub Pages redirect format
  const getActualPath = (currentPath: string) => {
    // Check if this is a GitHub Pages redirect format (/?/path)
    if (currentPath.startsWith('/?/')) {
      return '/' + currentPath.slice(3);
    }
    return currentPath;
  };

  useEffect(() => {
    // Reset restored flag on pathname change
    restoredRef.current = false;
    
    // Check if this is a navigation (different path) or refresh (same path)
    const isNavigation = previousPathRef.current !== pathname;
    previousPathRef.current = pathname;
    
    // Get the actual path (handle GitHub Pages redirect format)
    const actualPath = getActualPath(pathname);
    
    // Wait for page to fully load before restoring scroll
    const restoreScroll = () => {
      if (restoredRef.current) return; // Only restore once
      
      // Try both the current pathname and the actual path for saved scroll position
      const savedScroll = sessionStorage.getItem(`scroll-${pathname}`) || 
                         sessionStorage.getItem(`scroll-${actualPath}`);
      
      if (savedScroll && !isNavigation) {
        // Only restore scroll on refresh, not navigation
        const scrollY = parseInt(savedScroll);
        if (scrollY > 0) {
          window.scrollTo(0, scrollY);
          restoredRef.current = true;
        }
      } else if (isNavigation) {
        // Scroll to top on navigation
        window.scrollTo(0, 0);
        restoredRef.current = true;
      }
    };

    // Try multiple times to ensure it works
    restoreScroll();
    const timer1 = setTimeout(restoreScroll, 100);
    const timer2 = setTimeout(restoreScroll, 500);
    const timer3 = setTimeout(restoreScroll, 1000);
    
    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
    };
  }, [pathname]);

  useEffect(() => {
    // Get the actual path (handle GitHub Pages redirect format)
    const actualPath = getActualPath(pathname);
    
    // Save scroll position on scroll (debounced)
    let timeoutId: NodeJS.Timeout;
    const handleScroll = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        const scrollY = window.scrollY;
        if (scrollY > 0) {
          // Save to both the current pathname and actual path
          sessionStorage.setItem(`scroll-${pathname}`, scrollY.toString());
          sessionStorage.setItem(`scroll-${actualPath}`, scrollY.toString());
        }
      }, 150);
    };

    // Save scroll position before page unload
    const handleBeforeUnload = () => {
      const scrollY = window.scrollY;
      if (scrollY > 0) {
        // Save to both the current pathname and actual path
        sessionStorage.setItem(`scroll-${pathname}`, scrollY.toString());
        sessionStorage.setItem(`scroll-${actualPath}`, scrollY.toString());
      }
    };

    // Save scroll position on page visibility change (mobile browsers)
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'hidden') {
        const scrollY = window.scrollY;
        if (scrollY > 0) {
          // Save to both the current pathname and actual path
          sessionStorage.setItem(`scroll-${pathname}`, scrollY.toString());
          sessionStorage.setItem(`scroll-${actualPath}`, scrollY.toString());
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('beforeunload', handleBeforeUnload);
    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('beforeunload', handleBeforeUnload);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      clearTimeout(timeoutId);
    };
  }, [pathname]);

  return null;
};

const App = () => (
  <SettingsProvider>
    <BrowserRouter>
      <ScrollRestoration />
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/services" element={<Services />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  </SettingsProvider>
);

createRoot(document.getElementById("root")!).render(<App />);