import { useEffect, useState, useRef } from "react";
import { useTheme } from "../../hooks/use-theme";
import { getSafariThemeColor, type ResolvedTheme } from "../../config/theme";

export function SafariThemeColorFix() {
  const { theme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const flashTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const currentThemeRef = useRef<ResolvedTheme | null>(null);
  const effectIdRef = useRef<number>(0); // Unique ID for each effect run

  // Wait for hydration to complete
  useEffect(() => {
    setMounted(true);
  }, []);

  // Only update theme-color after mounted (post-hydration)
  useEffect(() => {
    if (!mounted || !resolvedTheme) return;

    // Clear any pending timeouts from previous updates
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    if (flashTimeoutRef.current) {
      clearTimeout(flashTimeoutRef.current);
    }

    const currentTheme = resolvedTheme as ResolvedTheme;
    const color = getSafariThemeColor(currentTheme);
    
    // Increment effect ID to invalidate any pending timeouts from previous runs
    effectIdRef.current += 1;
    const currentEffectId = effectIdRef.current;
    
    // Update ref to track current theme
    currentThemeRef.current = currentTheme;
    
    console.log('🎨 SafariThemeColorFix: Starting update', {
      currentTheme,
      color,
      effectId: currentEffectId,
      timestamp: new Date().toISOString()
    });

    // Wait for body background to be updated first (use-theme.ts handles this)
    // Then update meta tag to ensure Safari sees both changes together
    requestAnimationFrame(() => {
      // Verify body background matches expected color
      const bodyBg = getComputedStyle(document.body).backgroundColor;
      const expectedRgb = color === '#ffffff' ? 'rgb(255, 255, 255)' : 'rgb(10, 10, 10)';
      console.log('🎨 SafariThemeColorFix: Body background check', {
        bodyBg,
        expectedRgb,
        matches: bodyBg === expectedRgb
      });

      // Remove existing meta tag to force Safari to recognize change (fixes top overscroll)
      const existingMeta = document.querySelector('meta[name="theme-color"]');
      if (existingMeta) {
        const oldColor = existingMeta.getAttribute('content');
        console.log('🗑️ SafariThemeColorFix: Removing existing meta tag', { oldColor });
        existingMeta.remove();
      }

      // Create new meta tag - Safari may cache the old one if we just update it
      const newMeta = document.createElement('meta');
      newMeta.setAttribute('name', 'theme-color');
      newMeta.setAttribute('content', color);
      document.head.appendChild(newMeta);
      console.log('✨ SafariThemeColorFix: Created new meta tag', { color });

      // Flash color to force Safari to recognize change (fixes both top and bottom UI)
      // Capture the expected color, theme, and effect ID in closure
      const expectedColor = color;
      const expectedTheme = currentTheme;
      const expectedEffectId = currentEffectId;
      
      timeoutRef.current = setTimeout(() => {
        // Check if this effect run is still valid
        if (effectIdRef.current !== expectedEffectId) {
          console.log('⏭️ SafariThemeColorFix: Effect ID mismatch, skipping flash', {
            expected: expectedEffectId,
            current: effectIdRef.current
          });
          return;
        }
        
        // Check if theme has changed - if so, skip this flash
        if (currentThemeRef.current !== expectedTheme) {
          console.log('⏭️ SafariThemeColorFix: Theme changed, skipping flash', {
            expected: expectedTheme,
            current: currentThemeRef.current
          });
          return;
        }
        
        const meta = document.querySelector('meta[name="theme-color"]');
        if (!meta) return;
        
        // Check if meta tag still has our expected color (if not, another effect changed it)
        const currentColor = meta.getAttribute('content');
        if (currentColor !== expectedColor) {
          console.log('⏭️ SafariThemeColorFix: Meta tag changed by another effect, skipping flash', {
            expected: expectedColor,
            actual: currentColor
          });
          return;
        }
        
        const tempColor = expectedColor === '#ffffff' ? '#fefefe' : '#0b0b0b';
        console.log('🔄 SafariThemeColorFix: Flashing color', { 
          currentColor, 
          tempColor, 
          finalColor: expectedColor 
        });
        meta.setAttribute('content', tempColor);
        
        flashTimeoutRef.current = setTimeout(() => {
          // Check if this effect run is still valid
          if (effectIdRef.current !== expectedEffectId) {
            console.log('⏭️ SafariThemeColorFix: Effect ID mismatch during flash, skipping final', {
              expected: expectedEffectId,
              current: effectIdRef.current
            });
            return;
          }
          
          // Check again if theme has changed
          if (currentThemeRef.current !== expectedTheme) {
            console.log('⏭️ SafariThemeColorFix: Theme changed during flash, skipping final', {
              expected: expectedTheme,
              current: currentThemeRef.current
            });
            return;
          }
          
          // Verify body background still matches expected color
          const bodyBg = getComputedStyle(document.body).backgroundColor;
          const expectedRgb = expectedColor === '#ffffff' ? 'rgb(255, 255, 255)' : 'rgb(10, 10, 10)';
          if (bodyBg !== expectedRgb) {
            console.log('⏭️ SafariThemeColorFix: Body background changed, skipping final', {
              expected: expectedRgb,
              actual: bodyBg
            });
            return;
          }
          
          const meta = document.querySelector('meta[name="theme-color"]');
          if (!meta) return;
          
          // Double-check: if meta tag doesn't have tempColor or expectedColor, another effect changed it
          const currentMetaColor = meta.getAttribute('content');
          if (currentMetaColor !== tempColor && currentMetaColor !== expectedColor) {
            console.log('⏭️ SafariThemeColorFix: Meta tag changed by another effect, skipping final', {
              expected: expectedColor,
              tempColor,
              actual: currentMetaColor
            });
            return;
          }
          
          const beforeFinal = meta.getAttribute('content');
          meta.setAttribute('content', expectedColor);
          const afterFinal = meta.getAttribute('content');
          console.log('✅ SafariThemeColorFix: Final color set', { 
            beforeFinal, 
            afterFinal, 
            expected: expectedColor 
          });
        }, 100);
      }, 50);
    });

    // Cleanup function
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      if (flashTimeoutRef.current) {
        clearTimeout(flashTimeoutRef.current);
      }
    };

  }, [theme, resolvedTheme, mounted]);

  return null;
}

