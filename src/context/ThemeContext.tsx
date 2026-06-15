import React, { useEffect, useState } from 'react';
import { safeGetStorage, safeSetStorage } from '../lib/safeStorage';
import { ThemeContext, type Theme } from './theme';

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>(() => {
    const stored = safeGetStorage('local', 'theme') as Theme | null;
    if (stored) return stored;
    if (typeof document !== 'undefined') {
      const currentTheme = document.documentElement.getAttribute('data-theme');
      if (currentTheme === 'light' || currentTheme === 'dark') return currentTheme;
    }
    return 'dark';
  });

  useEffect(() => {
    const root = document.documentElement;
    root.setAttribute('data-theme', theme);
    root.classList.toggle('dark', theme === 'dark');
    safeSetStorage('local', 'theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark');
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}
