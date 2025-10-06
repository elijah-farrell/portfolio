import { useEffect } from "react";
import { getSafariThemeColor, type ResolvedTheme } from "../config/theme";

/**
 * Hook to dynamically update the theme-color meta tag for Safari/mobile browsers
 * This ensures the status bar color matches the current theme
 */
export function useThemeColor(theme: ResolvedTheme) {
  useEffect(() => {
    const color = getSafariThemeColor(theme);
    
    // Find existing meta tag or create new one
    let meta = document.querySelector('meta[name="theme-color"]');
    if (!meta) {
      meta = document.createElement('meta');
      meta.setAttribute('name', 'theme-color');
      document.head.appendChild(meta);
    }
    
    // Update the content with the current theme color
    meta.setAttribute('content', color);
    
    // Also update any media-specific theme-color tags
    const mediaMeta = document.querySelector('meta[name="theme-color"][media]');
    if (mediaMeta) {
      mediaMeta.setAttribute('content', color);
    }
  }, [theme]);
}
