import { ThemeProvider as NextThemesProvider } from "next-themes"
import type { ThemeProviderProps } from "next-themes"
import { THEME_CONFIG } from "../../config/theme"
import { ThemeColorUpdater } from "./ThemeColorUpdater"
import { BodyThemeSync } from "./BodyThemeSync"

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  return (
    <NextThemesProvider 
      {...props}
      defaultTheme={THEME_CONFIG.defaultTheme}
      enableSystem={THEME_CONFIG.enableSystem}
      storageKey={THEME_CONFIG.storageKey}
      attribute="class"
      enableColorScheme={THEME_CONFIG.enableColorScheme}
      disableTransitionOnChange={THEME_CONFIG.disableTransitionOnChange}
    >
      <ThemeColorUpdater />
      <BodyThemeSync />
      {children}
    </NextThemesProvider>
  )
}

