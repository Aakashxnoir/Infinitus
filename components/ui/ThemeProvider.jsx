'use client';

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';

const STORAGE_KEY = 'infinitus-theme';
const ThemeContext = createContext({
  theme: 'light',
  isDark: false,
  toggleTheme: () => {},
  setTheme: () => {},
});

export function ThemeProvider({ children }) {
  const [theme, setThemeState] = useState('light');
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    const next = stored === 'dark' || stored === 'light' ? stored : 'light';
    setThemeState(next);
    document.documentElement.classList.toggle('dark', next === 'dark');
    setReady(true);
  }, []);

  const setTheme = useCallback((next) => {
    const value = next === 'dark' ? 'dark' : 'light';
    setThemeState(value);
    document.documentElement.classList.toggle('dark', value === 'dark');
    window.localStorage.setItem(STORAGE_KEY, value);
  }, []);

  const toggleTheme = useCallback(() => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  }, [setTheme, theme]);

  const value = useMemo(
    () => ({
      theme,
      isDark: theme === 'dark',
      toggleTheme,
      setTheme,
      ready,
    }),
    [theme, toggleTheme, setTheme, ready]
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
  return useContext(ThemeContext);
}
