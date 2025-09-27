import React, {createContext, useContext, useEffect, useState} from "react";

type Theme = "dark" | "light" | "system";

type ThemeProviderProps = {
  children: React.ReactNode;
  defaultTheme?: Theme;
  storageKey?: string;
};

type ThemeProviderState = {
  theme: Theme;
  setTheme: (theme: Theme) => void;
};

const initialState: ThemeProviderState = {
  theme: "system",
  setTheme: () => null,
};

const ThemeProviderContext = createContext<ThemeProviderState>(initialState);

export function ThemeProvider({
  children,
  defaultTheme = "system",
  storageKey = "vite-ui-theme",
  ...props
}: ThemeProviderProps) {
  const [theme, setTheme] = useState<Theme>(
    () => (localStorage.getItem(storageKey) as Theme) || defaultTheme
  );

  useEffect(() => {
    const root = window.document.documentElement;

    root.classList.remove("light", "dark");

    let currentTheme: "light" | "dark";
    
    if (theme === "system") {
      currentTheme = window.matchMedia("(prefers-color-scheme: dark)")
        .matches
        ? "dark"
        : "light";
    } else {
      currentTheme = theme;
    }

    root.classList.add(currentTheme);
    
    // FORCE Safari to recognize the initial theme state
    const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
    if (isSafari) {
      // Force Safari to "wake up" by temporarily switching to opposite theme
      const oppositeTheme = currentTheme === "dark" ? "light" : "dark";
      root.classList.add(oppositeTheme);
      
      // Immediately switch back to correct theme
      setTimeout(() => {
        root.classList.remove(oppositeTheme);
        root.classList.add(currentTheme);
      }, 1);
    }
    
    // Update meta theme-color for mobile browsers
    const themeColor = currentTheme === "dark" ? "#0a0a0a" : "#ffffff";
    const themeColorMeta = document.querySelector('meta[name="theme-color"]');
    if (themeColorMeta) {
      themeColorMeta.setAttribute('content', themeColor);
    }
    
    // Update msapplication-navbutton-color for Windows mobile
    const navButtonMeta = document.querySelector('meta[name="msapplication-navbutton-color"]');
    if (navButtonMeta) {
      navButtonMeta.setAttribute('content', themeColor);
    }
    
    // Force overscroll color update on mobile browsers
    const updateOverscrollColors = () => {
      const elements = [document.documentElement, document.body];
      const rootElement = document.querySelector(':root') as HTMLElement;
      
      // Add root element to the list
      if (rootElement) {
        elements.push(rootElement);
      }
      
      elements.forEach(el => {
        if (el) {
          // Force overscroll colors
          el.style.setProperty('overscroll-behavior-color', themeColor, 'important');
          el.style.setProperty('-webkit-overscroll-behavior-color', themeColor, 'important');
          el.style.setProperty('background-color', themeColor, 'important');
          
          // Also force CSS variable updates
          el.style.setProperty('--background', themeColor, 'important');
        }
      });
      
      // Force update on all elements with universal selector
      const allElements = document.querySelectorAll('*');
      allElements.forEach(el => {
        if (el instanceof HTMLElement) {
          el.style.setProperty('overscroll-behavior-color', themeColor, 'important');
          el.style.setProperty('-webkit-overscroll-behavior-color', themeColor, 'important');
        }
      });
    };
    
    // Safari-specific fixes for bottom toolbar - FORCE RECOGNITION
    const forceSafariUIUpdate = () => {
      // Detect Safari specifically
      const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
      
      if (isSafari) {
        const html = document.documentElement;
        const body = document.body;
        
        // Step 1: Force CSS variable update to "wake up" Safari
        const oppositeColor = currentTheme === "dark" ? "#ffffff" : "#0a0a0a";
        html.style.setProperty('--background', oppositeColor, 'important');
        
        setTimeout(() => {
          html.style.setProperty('--background', themeColor, 'important');
        }, 1);
        
        // Step 2: Force immediate background color update
        html.style.setProperty('background-color', themeColor, 'important');
        html.style.setProperty('-webkit-background-size', '100% 100%', 'important');
        body.style.setProperty('background-color', themeColor, 'important');
        
        // Step 3: Force Safari to recognize theme change by manipulating meta tags
        const themeMeta = document.querySelector('meta[name="theme-color"]');
        if (themeMeta) {
          // Set opposite color first, then correct color
          themeMeta.setAttribute('content', oppositeColor);
          setTimeout(() => {
            themeMeta.setAttribute('content', themeColor);
          }, 1);
        }
        
        // Step 4: Trigger events to force Safari UI refresh
        window.dispatchEvent(new Event('resize'));
        window.dispatchEvent(new Event('orientationchange'));
        
        // Step 5: Gentle DOM repaint
        html.style.setProperty('opacity', '0.999', 'important');
        setTimeout(() => {
          html.style.removeProperty('opacity');
        }, 10);
      }
    };
    
    // ENHANCED APPROACH: Force overscroll updates with CSS animation
    const enhancedOverscrollUpdate = () => {
      // Add CSS class to trigger repaint animation
      root.classList.add('theme-changing');
      
      // Update overscroll colors
      updateOverscrollColors();
      forceSafariUIUpdate();
      
      // Remove animation class after animation completes
      setTimeout(() => {
        root.classList.remove('theme-changing');
      }, 100);
    };
    
    // Immediate update
    enhancedOverscrollUpdate();
    
    // Update in next animation frame
    requestAnimationFrame(() => {
      enhancedOverscrollUpdate();
    });
    
    // Backup update
    setTimeout(enhancedOverscrollUpdate, 50);
    
  }, [theme]);

  const value = {
    theme,
    setTheme: (theme: Theme) => {
      localStorage.setItem(storageKey, theme);
      setTheme(theme);
    },
  };

  return (
    <ThemeProviderContext.Provider {...props} value={value}>
      {children}
    </ThemeProviderContext.Provider>
  );
}

export const useTheme = () => {
  const context = useContext(ThemeProviderContext);

  if (context === undefined)
    throw new Error("useTheme must be used within a ThemeProvider");

  return context;
};
