'use client';

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { MotionConfig } from 'framer-motion';

const STORAGE_KEY = 'infinitus-theme';
const ThemeContext = createContext({
  theme: 'dark',
  isDark: true,
  toggleTheme: () => {},
  setTheme: () => {},
});

/**
 * Colours come from CSS variables (styles/globals.css), so components never need
 * the theme in JS to render correctly — this only drives the toggle button.
 */
export function ThemeProvider({ children }) {
  const [theme, setThemeState] = useState('dark');

  useEffect(() => {
    setThemeState(document.documentElement.classList.contains('dark') ? 'dark' : 'light');
  }, []);

  const setTheme = useCallback((next) => {
    const value = next === 'light' ? 'light' : 'dark';
    setThemeState(value);
    document.documentElement.classList.toggle('dark', value === 'dark');
    try {
      window.localStorage.setItem(STORAGE_KEY, value);
    } catch {
      // Storage blocked — theme still applies for this visit
    }
  }, []);

  const toggleTheme = useCallback(() => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  }, [setTheme, theme]);

  const value = useMemo(
    () => ({ theme, isDark: theme === 'dark', toggleTheme, setTheme }),
    [theme, toggleTheme, setTheme]
  );

  return (
    <ThemeContext.Provider value={value}>
      {/* Framer Motion skips transform animations for visitors who prefer reduced motion */}
      <MotionConfig reducedMotion="user">{children}</MotionConfig>
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}
