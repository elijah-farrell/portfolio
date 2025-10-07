import { useEffect, useState } from "react";
import { useTheme } from "../../hooks/use-theme";
import { getSafariThemeColor, type ResolvedTheme } from "../../config/theme";

/**
 * ThemeColorUpdater - Fixes Safari theme-color sync issues
 * 
 * Problems solved:
 * 1. Hydration issue: next-themes hydrates client-side after SSR, causing theme-color
 *    to lag one theme behind on first load
 * 2. Safari caching: Safari caches theme-color and doesn't visually update the status bar
 *    even when the meta tag changes
 * 
 * Solutions:
 * 1. Wait until mounted before setting theme-color meta tag (fixes hydration)
 * 2. Remove and recreate meta tag with unique attributes (forces Safari recognition)
 * 3. Temporary color flash technique (forces Safari to notice the change)
 * 4. Visibility change trigger (hacks Safari into re-evaluating meta tags)
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
        meta.setAttribute('content', color === '#0a0a0a' ? '#000000' : '#FFFFFF');
        
        // Then set to the correct color
        setTimeout(() => {
          meta.setAttribute('content', color);
          
          // Try to force Safari to re-evaluate by triggering a visibility change
          if (document.hidden !== undefined) {
            // This is a hack to force Safari to re-evaluate meta tags
            document.dispatchEvent(new Event('visibilitychange'));
          }
        }, 10);
      }
    }, 10);

  }, [theme, resolvedTheme, mounted]);

  return null;
}
