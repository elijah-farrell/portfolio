import { useEffect } from "react";
import { useTheme } from "../../hooks/use-theme";
import { getSafariThemeColor, type ResolvedTheme } from "../../config/theme";

/**
 * BodyThemeSync - Handles body background color and color-scheme updates
 * Separate from SafariThemeColorFix to keep concerns separated
 */
export function BodyThemeSync() {
  const { resolvedTheme } = useTheme();

  useEffect(() => {
    if (!resolvedTheme) return;

    const theme = resolvedTheme as ResolvedTheme;
    const color = getSafariThemeColor(theme);

    // Update body background color for overscroll areas
    document.body.style.backgroundColor = color;
    document.documentElement.style.backgroundColor = color;

    // Update color-scheme for Safari UI elements
    document.documentElement.style.colorScheme = theme;

    // Also add class for other components
    document.body.classList.remove('light', 'dark');
    document.body.classList.add(theme);
  }, [resolvedTheme]);

  return null;
}
