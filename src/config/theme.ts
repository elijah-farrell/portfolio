// Theme configuration and constants
export const THEME_CONFIG = {
  storageKey: 'vite-ui-theme',
  defaultTheme: 'dark' as const,
  enableSystem: true,
  enableColorScheme: true,
  disableTransitionOnChange: false,
} as const;

// Theme colors for consistent usage across the app
export const THEME_COLORS = {
  light: {
    background: '#ffffff',
    foreground: '#0a0a0a',
    primary: '#0a0a0a',
    secondary: '#f4f4f5',
    accent: '#f4f4f5',
    muted: '#f4f4f5',
    border: '#e4e4e7',
    input: '#e4e4e7',
    ring: '#0a0a0a',
  },
  dark: {
    background: '#0a0a0a',
    foreground: '#fafafa',
    primary: '#fafafa',
    secondary: '#27272a',
    accent: '#27272a',
    muted: '#27272a',
    border: '#27272a',
    input: '#27272a',
    ring: '#fafafa',
  },
} as const;

// Brand accent colors reused across light and dark themes
export const BRAND_COLORS = {
  light: {
    primary: '#0303fc', // Tailwind emerald-600
    accent: '#34D399',  // Tailwind emerald-400
    focus: '#10B981',   // Tailwind emerald-500
  },
  dark: {
    primary: '#34D399', // Tailwind emerald-400
    accent: '#059669',  // Tailwind emerald-600
    focus: '#10B981',   // Tailwind emerald-500
  },
  shared: {
    focus: '#10B981',
  },
} as const;

// Safari-specific theme colors for status bar
export const SAFARI_THEME_COLORS = {
  light: '#ffffff',
  dark: '#0a0a0a',
} as const;

// Theme type definitions
export type Theme = 'light' | 'dark' | 'system';
export type ResolvedTheme = 'light' | 'dark';

// Theme utilities
export const getThemeColor = (theme: ResolvedTheme, color: keyof typeof THEME_COLORS.light) => {
  return THEME_COLORS[theme][color];
};

export const getSafariThemeColor = (theme: ResolvedTheme) => {
  return SAFARI_THEME_COLORS[theme];
};
