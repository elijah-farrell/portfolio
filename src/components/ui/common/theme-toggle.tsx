import React, { useState } from 'react';
import { DarkModeToggle } from '@anatoliygatt/dark-mode-toggle';
import { getTheme, setTheme } from '@/lib/theme';
import { useIsoLayoutEffect } from '@/lib/ssr';

export function ThemeToggle() {
  // Prerendered markup is the dark (unchecked) thumb. html.dark is set in
  // <head>, and CSS slides the thumb to light until this layout effect runs.
  const [currentTheme, setCurrentTheme] = useState<'light' | 'dark'>('dark');
  const [ssr, setSsr] = useState(true);

  useIsoLayoutEffect(() => {
    setCurrentTheme(getTheme());
    setSsr(false);
  }, []);

  const handleThemeChange = (mode: string) => {
    const normalized = mode === 'light' ? 'light' : 'dark';
    setTheme(normalized);
    setCurrentTheme(normalized);
  };

  const focusRingColor = 'var(--text)';
  const trackWhenInLightMode = 'var(--text)';
  const trackWhenInLightModeHover = 'var(--text)';
  const trackWhenInDarkMode = 'var(--text)';
  const trackWhenInDarkModeHover = 'var(--text)';

  return (
    <div
      data-theme-toggle
      data-ssr={ssr ? '' : undefined}
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
        inactiveThumbColor="var(--background)"
        activeThumbColor="var(--background)"
        onChange={handleThemeChange}
      />
    </div>
  );
}
