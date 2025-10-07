import React, { useEffect, useState } from 'react';
import { useTheme } from '../../hooks/use-theme';
import { DarkModeToggle } from '@anatoliygatt/dark-mode-toggle';
import { THEME_COLORS, type Theme, type ResolvedTheme } from '../../config/theme';

export function ThemeToggle() {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    setMounted(true);
  }, []);

  const handleThemeChange = (mode: string) => {
    const newTheme = mode as Theme;
    setTheme(newTheme);
  };

  // Don't render until mounted to avoid hydration mismatch
  if (!mounted) {
    return <div className="w-[48px] h-[24px]" />; // Placeholder with same dimensions
  }

  // Use resolvedTheme to get the actual theme (handles 'system' theme)
  const currentTheme = resolvedTheme as ResolvedTheme;

  return (
    <div className="[&_button]:outline-none [&_button]:focus:outline-none [&_button]:focus-visible:outline-none">
      <DarkModeToggle
        mode={currentTheme}
        size="sm"
        inactiveTrackColor={THEME_COLORS.light.secondary}
        inactiveTrackColorOnHover={THEME_COLORS.light.accent}
        inactiveTrackColorOnActive={THEME_COLORS.light.muted}
        activeTrackColor={THEME_COLORS.dark.background}
        activeTrackColorOnHover={THEME_COLORS.dark.secondary}
        activeTrackColorOnActive={THEME_COLORS.dark.accent}
        inactiveThumbColor={THEME_COLORS.dark.background}
        activeThumbColor={THEME_COLORS.light.background}
        onChange={handleThemeChange}
      />
    </div>
  );
}