import React from 'react';
import { useTheme } from '../../hooks/use-theme';
import { DarkModeToggle } from '@anatoliygatt/dark-mode-toggle';
import { THEME_COLORS, type Theme, type ResolvedTheme } from '../../config/theme';

export function ThemeToggle() {
  const { setTheme, resolvedTheme } = useTheme();
  
  const handleThemeChange = (mode: string) => {
    const newTheme = mode as Theme;
    setTheme(newTheme);
  };

  // Use resolvedTheme to get the actual theme (handles 'system' theme)
  const currentTheme = resolvedTheme as ResolvedTheme;

  return (
    <div
      data-theme-toggle
      role="group"
      aria-label="Color scheme toggle"
      className="[&_button]:outline-none [&_button]:focus:outline-none [&_button]:focus-visible:outline-none [&_button]:focus-visible:ring-2 [&_button]:focus-visible:ring-emerald-500 [&_button]:focus-visible:ring-offset-2 [&_button]:focus-visible:ring-offset-background [&_*]:outline-none [&_*]:focus:outline-none [&_*]:focus-visible:outline-none [&_*]:focus-visible:ring-2 [&_*]:focus-visible:ring-emerald-500 [&_*]:focus-visible:ring-offset-2 [&_*]:focus-visible:ring-offset-background"
    >
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
        aria-label="Toggle dark mode"
      />
    </div>
  );
}