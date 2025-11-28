import React, { createContext, useContext, useEffect, useState } from "react";
import { THEME_CONFIG, getSafariThemeColor, type Theme, type ResolvedTheme } from "../config/theme";

interface ThemeContextType {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  resolvedTheme: ResolvedTheme;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ 
  children, 
  defaultTheme = THEME_CONFIG.defaultTheme,
  storageKey = THEME_CONFIG.storageKey 
}: { 
  children: React.ReactNode;
  defaultTheme?: Theme;
  storageKey?: string;
}) {
  const [theme, setThemeState] = useState<Theme>(() => {
    if (typeof window === 'undefined') return defaultTheme;
    const stored = localStorage.getItem(storageKey) as Theme | null;
    
    // If no stored value (first visit), try system preference, fallback to dark
    if (!stored) {
      try {
        const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        return systemPrefersDark ? 'dark' : 'light';
      } catch {
        // If can't detect system preference, use dark
        return defaultTheme;
      }
    }
    
    // If user has manually set a theme, use that (never use 'system' as stored value)
    return stored === 'system' ? defaultTheme : stored;
  });

  const [resolvedTheme, setResolvedTheme] = useState<ResolvedTheme>(() => {
    if (typeof window === 'undefined') return 'dark';
    // Theme is always 'light' or 'dark' now (never 'system' as stored value)
    return theme as ResolvedTheme;
  });

  // Update resolved theme when theme changes
  // Note: We no longer support 'system' as a stored theme - it's only used on first visit
  useEffect(() => {
    // Theme is always 'light' or 'dark' now
    setResolvedTheme(theme as ResolvedTheme);
  }, [theme]);

  // Apply theme to DOM
  useEffect(() => {
    if (!resolvedTheme) return;

    const root = document.documentElement;
    root.classList.remove('light', 'dark');
    root.classList.add(resolvedTheme);
    root.style.colorScheme = resolvedTheme;

    // Update body background color for overscroll areas
    const color = getSafariThemeColor(resolvedTheme);
    document.body.style.backgroundColor = color;
    root.style.backgroundColor = color;

    // Update body class
    document.body.classList.remove('light', 'dark');
    document.body.classList.add(resolvedTheme);

    // Note: theme-color meta tag is handled by SafariThemeColorFix component
  }, [resolvedTheme]);

  const setTheme = (newTheme: Theme) => {
    // Only store 'light' or 'dark' - never store 'system'
    // 'system' is only used automatically on first visit
    const themeToStore = newTheme === 'system' ? defaultTheme : newTheme;
    setThemeState(themeToStore as 'light' | 'dark');
    localStorage.setItem(storageKey, themeToStore);
  };

  return React.createElement(
    ThemeContext.Provider,
    { value: { theme, setTheme, resolvedTheme } },
    children
  );
}

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider');
  }
  return context;
};
