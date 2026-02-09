'use client';

import { useEffect, useState } from 'react';

type Theme = 'navy' | 'violet';

export function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>('navy');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const savedTheme = localStorage.getItem('openclaw-theme') as Theme;
    if (savedTheme && (savedTheme === 'navy' || savedTheme === 'violet')) {
      setTheme(savedTheme);
      document.documentElement.setAttribute('data-theme', savedTheme);
    }
  }, []);

  const handleThemeChange = (newTheme: Theme) => {
    setTheme(newTheme);
    localStorage.setItem('openclaw-theme', newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
  };

  if (!mounted) {
    return (
      <div className="theme-toggle opacity-0">
        <button className="theme-toggle-btn">Navy</button>
        <button className="theme-toggle-btn">Violet</button>
      </div>
    );
  }

  return (
    <div className="theme-toggle">
      <button
        onClick={() => handleThemeChange('navy')}
        className={`theme-toggle-btn ${theme === 'navy' ? 'active' : ''}`}
        aria-label="Navy theme"
      >
        🌊 Navy
      </button>
      <button
        onClick={() => handleThemeChange('violet')}
        className={`theme-toggle-btn ${theme === 'violet' ? 'active' : ''}`}
        aria-label="Violet theme"
      >
        💜 Violet
      </button>
    </div>
  );
}
