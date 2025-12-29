import React, { useEffect, useState } from 'react';
import { DarkModeToggle } from '@anatoliygatt/dark-mode-toggle';
import { getTheme, setTheme } from '@/lib/theme';

export function ThemeToggle() {
  // Read the current theme from the DOM once (set by the head script).
  const [currentTheme, setCurrentTheme] = useState<'light' | 'dark'>(() => {
    return getTheme();
  });

  const [mounted, setMounted] = useState(false);

  // Track when we've mounted (hydrated) so Safari meta fix runs post-hydration.
  useEffect(() => {
    setMounted(true);
  }, []);

  // Safari theme-color fix:
  // - Runs after hydration
  // - Runs whenever the current theme changes (initial load + toggles)
  useEffect(() => {
    if (!mounted) return;

    const theme = currentTheme;
    const color = theme === 'dark' ? '#0a0a0a' : '#fefefe';

    // Remove existing meta to force Safari to notice the change
    const existingMeta = document.querySelector(
      'meta[name="theme-color"]'
    ) as HTMLMetaElement | null;
    if (existingMeta) {
      existingMeta.remove();
    }

    // Create new meta tag with identifiers
    const newMeta = document.createElement('meta');
    newMeta.setAttribute('name', 'theme-color');
    newMeta.setAttribute('content', color);
    newMeta.setAttribute('data-theme', theme);
    newMeta.setAttribute('data-timestamp', Date.now().toString());
    document.head.appendChild(newMeta);

    // Force Safari to recognize the change by briefly changing the content
    setTimeout(() => {
      const meta = document.querySelector(
        'meta[name="theme-color"]'
      ) as HTMLMetaElement | null;
      if (!meta) return;

      let tempColor: string;
      if (color === '#0a0a0a') {
        tempColor = '#0b0a0a';
      } else if (color === '#fefefe') {
        tempColor = '#ffffff';
      } else {
        tempColor = color;
      }

      meta.setAttribute('content', tempColor);

      setTimeout(() => {
        const finalMeta = document.querySelector(
          'meta[name="theme-color"]'
        ) as HTMLMetaElement | null;
        if (!finalMeta) return;
        finalMeta.setAttribute('content', color);
      }, 1);
    }, 1);
  }, [currentTheme, mounted]);

  const handleThemeChange = (mode: string) => {
    const normalized = mode === 'light' ? 'light' : 'dark';
    setTheme(normalized);
    setCurrentTheme(normalized);
  };

  // Use CSS variables for all colors so the toggle
  // stays in sync with your global text/background.
  const focusRingColor = 'var(--text)';

  // Track = the background bar the toggle slides on
  // Note: "active" = light mode, "inactive" = dark mode
  // In light mode: black track, white thumb
  // In dark mode: white track, dark thumb
  const trackWhenInLightMode = 'var(--text)';
  const trackWhenInLightModeHover = 'var(--text)';
  const trackWhenInDarkMode = 'var(--text)';
  const trackWhenInDarkModeHover = 'var(--text)';

  return (
    <div
      data-theme-toggle
      style={{ '--focus-ring-color': focusRingColor } as React.CSSProperties}
      className="[&_button]:outline-none [&_button]:focus:outline-none [&_button]:focus-visible:outline-none [&_button]:focus-visible:ring-2 [&_button]:focus-visible:ring-[color:var(--focus-ring-color)] [&_button]:focus-visible:ring-offset-2 [&_*]:outline-none [&_*]:focus:outline-none [&_*]:focus-visible:outline-none [&_*]:focus-visible:ring-2 [&_*]:focus-visible:ring-[color:var(--focus-ring-color)] [&_*]:focus-visible:ring-offset-2"
    >
      <DarkModeToggle
        mode={currentTheme}
        size="sm"
        inactiveTrackColor={trackWhenInDarkMode}
        inactiveTrackColorOnHover={trackWhenInDarkModeHover}
        inactiveTrackColorOnActive={trackWhenInDarkMode}
        activeTrackColor={trackWhenInLightMode}
        activeTrackColorOnHover={trackWhenInLightModeHover}
        activeTrackColorOnActive={trackWhenInLightMode}
        // Thumb: dark circle in dark mode, white circle in light mode
        inactiveThumbColor="var(--background)"
        activeThumbColor="var(--background)"
        onChange={handleThemeChange}
      />
    </div>
  );
}