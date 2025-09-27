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
      elements.forEach(el => {
        if (el) {
          el.style.setProperty('overscroll-behavior-color', themeColor, 'important');
          el.style.setProperty('-webkit-overscroll-behavior-color', themeColor, 'important');
          el.style.setProperty('background-color', themeColor, 'important');
        }
      });
    };
    
    // Update immediately
    updateOverscrollColors();
    
    // Update again after a short delay to ensure it sticks
    setTimeout(updateOverscrollColors, 100);
    
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
