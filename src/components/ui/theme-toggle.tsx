import React from 'react';
import { useTheme } from '../theme-provider';
import { DarkModeToggle } from '@anatoliygatt/dark-mode-toggle';

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const isDark = theme === 'dark';

  const handleThemeChange = (mode: string) => {
    // Use View Transitions API for smooth theme switching
    if ('startViewTransition' in document) {
      (document as Document & { startViewTransition?: (callback: () => void) => void }).startViewTransition?.(() => {
        setTheme(mode);
      });
    } else {
      setTheme(mode);
    }
  };

  return (
    <DarkModeToggle
      mode={isDark ? 'dark' : 'light'}
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
