import React, { useEffect, useState } from 'react';
import { useTheme } from '../theme-provider';
import { DarkModeToggle } from '@anatoliygatt/dark-mode-toggle';

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  
  // Determine the actual current theme (resolve 'system' to actual theme)
  const [effectiveTheme, setEffectiveTheme] = useState<'dark' | 'light'>('light');
  
  useEffect(() => {
    setMounted(true);
    
    const updateEffectiveTheme = () => {
      if (theme === 'system') {
        const isDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        setEffectiveTheme(isDark ? 'dark' : 'light');
      } else {
        setEffectiveTheme(theme as 'dark' | 'light');
      }
    };
    
    updateEffectiveTheme();
    
    // Listen for system theme changes
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handler = () => {
      if (theme === 'system') {
        updateEffectiveTheme();
      }
    };
    
    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, [theme]);

  const handleThemeChange = (mode: string) => {
    // Update both states immediately - no delay for Safari
    setEffectiveTheme(mode as 'dark' | 'light');
    setTheme(mode as 'dark' | 'light');
  };

  // Don't render until mounted to avoid hydration mismatch
  if (!mounted) {
    return <div className="w-[48px] h-[24px]" />; // Placeholder with same dimensions
  }

  return (
    <DarkModeToggle
      mode={effectiveTheme}
      size="sm"
      inactiveTrackColor="#e2e8f0"
      inactiveTrackColorOnHover="#f8fafc"
      inactiveTrackColorOnActive="#cbd5e1"
      activeTrackColor="#0A0A0A"
      activeTrackColorOnHover="#1a1a1a"
      activeTrackColorOnActive="#000000"
      inactiveThumbColor="#0A0A0A"
      activeThumbColor="#ffffff"
      onChange={handleThemeChange}
    />
  );
}
