import { useState, useEffect } from 'react';

const STORAGE_PREFIX = 'ui.theme';

const DEFAULT_THEME = 'light';

function getStoredTheme(userId) {
  if (!userId) return null;
  return localStorage.getItem(`${STORAGE_PREFIX}.${userId}`);
}

function applyTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme);
}

export function useTheme(userId = null) {
  const [theme, setTheme] = useState(() => {
    const stored = getStoredTheme(userId);
    return stored || DEFAULT_THEME;
  });

  useEffect(() => {
    const stored = getStoredTheme(userId);
    const next = stored || DEFAULT_THEME;
    setTheme(next);
    applyTheme(next);
  }, [userId]);

  useEffect(() => {
    applyTheme(theme);
    if (userId) {
      localStorage.setItem(`${STORAGE_PREFIX}.${userId}`, theme);
    }
  }, [theme, userId]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  return { theme, toggleTheme };
}
