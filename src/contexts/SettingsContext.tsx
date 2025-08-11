import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface SettingsContextType {
  // Theme settings
  darkMode: boolean;
  currentColor: string;
  setDarkMode: (darkMode: boolean) => void;
  setCurrentColor: (color: string) => void;
  
  // Animation cache
  isInAnimationCache: (elementId: string) => boolean;
  addToAnimationCache: (elementId: string) => void;
  clearAnimationCache: () => void;
}

const SettingsContext = createContext<SettingsContextType | undefined>(undefined);

interface SettingsProviderProps {
  children: ReactNode;
}

export function SettingsProvider({ children }: SettingsProviderProps) {
  // Theme state
  const [darkMode, setDarkModeState] = useState(true);
  const [currentColor, setCurrentColorState] = useState('#EF4444');
  
  // Session-based animation cache using Set (clears on refresh and page navigation)
  const [animationCache, setAnimationCache] = useState<Set<string>>(new Set());
  const [currentPage, setCurrentPage] = useState<string>(window.location.pathname);
  
  // Load settings from localStorage on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem('portfolioSettings');
      if (saved) {
        const settings = JSON.parse(saved);
        
        // Load theme settings
        if (typeof settings.darkMode === 'boolean') {
          setDarkModeState(settings.darkMode);
        }
        
        if (typeof settings.currentColor === 'string') {
          setCurrentColorState(settings.currentColor);
        }
        
        // Animation cache is session-based only (not persisted)
        // It will start fresh on each page refresh
      }
    } catch (error) {
      console.error('Failed to load settings:', error);
    }
  }, []);
  
  // Apply dark mode to document
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  // Clear animation cache when page changes
  useEffect(() => {
    const handlePageChange = () => {
      const newPage = window.location.pathname;
      if (newPage !== currentPage) {
        setCurrentPage(newPage);
        setAnimationCache(new Set()); // Clear cache on page change
      }
    };

    // Listen for popstate (back/forward navigation)
    window.addEventListener('popstate', handlePageChange);
    
    // Listen for pushstate (programmatic navigation)
    const originalPushState = history.pushState;
    history.pushState = function(...args) {
      originalPushState.apply(history, args);
      handlePageChange();
    };

    return () => {
      window.removeEventListener('popstate', handlePageChange);
      history.pushState = originalPushState;
    };
  }, [currentPage]);
  
  // Save settings whenever they change
  useEffect(() => {
    try {
      const settings = {
        darkMode,
        currentColor,
        animationCache: Array.from(animationCache)
      };
      localStorage.setItem('portfolioSettings', JSON.stringify(settings));
    } catch (error) {
      console.error('Failed to save settings:', error);
    }
  }, [darkMode, currentColor, animationCache]);
  
  const setDarkMode = (newDarkMode: boolean) => {
    setDarkModeState(newDarkMode);
  };
  
  const setCurrentColor = (newColor: string) => {
    setCurrentColorState(newColor);
  };
  
  const addToAnimationCache = (elementId: string) => {
    if (!elementId) return;
    setAnimationCache(prev => new Set([...prev, elementId]));
  };
  
  const isInAnimationCache = (elementId: string): boolean => {
    if (!elementId) return false;
    return animationCache.has(elementId);
  };
  
  const clearAnimationCache = () => {
    setAnimationCache(new Set());
  };
  
  const value: SettingsContextType = {
    darkMode,
    currentColor,
    setDarkMode,
    setCurrentColor,
    isInAnimationCache,
    addToAnimationCache,
    clearAnimationCache
  };
  
  return (
    <SettingsContext.Provider value={value}>
      {children}
    </SettingsContext.Provider>
  );
}

export function useSettings() {
  const context = useContext(SettingsContext);
  if (context === undefined) {
    throw new Error('useSettings must be used within a SettingsProvider');
  }
  return context;
} 