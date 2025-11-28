import { ThemeProvider as CustomThemeProvider } from "../../hooks/use-theme";
import { THEME_CONFIG } from "../../config/theme";
import { SafariThemeColorFix } from "./SafariThemeColorFix";

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  return (
    <CustomThemeProvider 
      defaultTheme={THEME_CONFIG.defaultTheme}
      storageKey={THEME_CONFIG.storageKey}
    >
      <SafariThemeColorFix />
      {children}
    </CustomThemeProvider>
  );
}
