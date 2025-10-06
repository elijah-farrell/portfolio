import { useEffect, useState } from "react";
import { useTheme } from "../hooks/use-theme";
import { getSafariThemeColor, type ResolvedTheme } from "../config/theme";

/**
 * ThemeColorUpdater - Fixes the hydration issue with next-themes
 * 
 * The problem: next-themes hydrates client-side after SSR, so theme-color
 * gets set before the actual theme is determined, causing it to lag one theme behind.
 * 
 * The solution: Wait until mounted before setting theme-color meta tag.
 */
export function ThemeColorUpdater() {
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

    console.log('🎯 ThemeColorUpdater: Setting theme-color to', color, 'for theme', currentTheme);

    // FORCE Safari to recognize the change by removing and recreating
    const existingMeta = document.querySelector('meta[name="theme-color"]');
    if (existingMeta) {
      existingMeta.remove();
      console.log('🗑️ Removed existing theme-color meta tag');
    }

    // Create new meta tag with unique ID to force Safari to recognize it
    const newMeta = document.createElement('meta');
    newMeta.setAttribute('name', 'theme-color');
    newMeta.setAttribute('content', color);
    newMeta.setAttribute('data-theme', currentTheme); // Add theme identifier
    newMeta.setAttribute('data-timestamp', Date.now().toString()); // Add timestamp
    document.head.appendChild(newMeta);
    console.log('🆕 Created NEW theme-color meta tag with color:', color);

    // Force Safari to recognize the change by briefly changing the content
    setTimeout(() => {
      const meta = document.querySelector('meta[name="theme-color"]');
      if (meta) {
        // Temporarily set to a different color to force Safari to notice
        meta.setAttribute('content', color === '#0a0a0a' ? '#000000' : '#FFFFFF');
        console.log('🔄 Temporarily changed to force Safari update');
        
        // Then set to the correct color
        setTimeout(() => {
          meta.setAttribute('content', color);
          console.log('✅ Final theme-color set to:', color);
          
          // Try to force Safari to re-evaluate by triggering a visibility change
          if (document.hidden !== undefined) {
            const originalVisibility = document.hidden;
            // This is a hack to force Safari to re-evaluate meta tags
            document.dispatchEvent(new Event('visibilitychange'));
            console.log('🔄 Triggered visibility change to force Safari update');
          }
        }, 10);
      }
    }, 10);

  }, [theme, resolvedTheme, mounted]);

  return null;
}
