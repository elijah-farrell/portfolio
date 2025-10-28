import { useEffect, useState } from "react";
import { useTheme } from "../../hooks/use-theme";
import { getSafariThemeColor, type ResolvedTheme } from "../../config/theme";

/**
 * SafariThemeColorFix - Fixes Safari theme-color sync issues
 * 
 
 */
export function SafariThemeColorFix() {
  const { theme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Wait for hydration to complete
  useEffect(() => {
    setMounted(true);
  }, []);

  // Only update theme-color after mounted (post-hydration)
  useEffect(() => {
    if (!mounted || !resolvedTheme) return;

    const currentTheme = resolvedTheme as ResolvedTheme;
    const color = getSafariThemeColor(currentTheme);

    // FORCE Safari to recognize the change by removing and recreating
    const existingMeta = document.querySelector('meta[name="theme-color"]');
    if (existingMeta) {
      existingMeta.remove();
    }

    // Create new meta tag with unique ID to force Safari to recognize it
    const newMeta = document.createElement('meta');
    newMeta.setAttribute('name', 'theme-color');
    newMeta.setAttribute('content', color);
    newMeta.setAttribute('data-theme', currentTheme); // Add theme identifier
    newMeta.setAttribute('data-timestamp', Date.now().toString()); // Add timestamp
    document.head.appendChild(newMeta);

    // Force Safari to recognize the change by briefly changing the content
    setTimeout(() => {
      const meta = document.querySelector('meta[name="theme-color"]');
      if (meta) {
        // Temporarily set to a different color to force Safari to notice
        let tempColor;
        if (color === '#0a0a0a') {
          // Dark theme: flash to green for maximum visibility
          tempColor = '#0b0a0a';
        } else if (color === '#fefefe') {
          // Light theme: flash to green for maximum visibility
          tempColor = '#ffffff';
        } else {
          tempColor = color;
        }
        meta.setAttribute('content', tempColor);
        
        // Then set to the correct color
        setTimeout(() => {
          meta.setAttribute('content', color);
          
        }, 1);
      }
    }, 1);

  }, [theme, resolvedTheme, mounted]);

  return null;
}
