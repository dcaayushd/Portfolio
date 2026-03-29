'use client';

import { MoonStar, SunMedium } from 'lucide-react';
import { useEffect, useState } from 'react';

const STORAGE_KEY = 'theme-mode';

type ThemeMode = 'dark' | 'light';

function applyTheme(mode: ThemeMode) {
  document.documentElement.dataset.theme = mode;
  document.documentElement.style.colorScheme = mode;
}

export function ThemeToggle() {
  const [mode, setMode] = useState<ThemeMode>('dark');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const current = document.documentElement.dataset.theme === 'light' ? 'light' : 'dark';
    setMode(current);
    setMounted(true);
  }, []);

  function toggle() {
    const next = mode === 'dark' ? 'light' : 'dark';
    setMode(next);
    applyTheme(next);
    window.localStorage.setItem(STORAGE_KEY, next);
  }

  return (
    <button
      className="button button-secondary theme-toggle"
      onClick={toggle}
      type="button"
      aria-label="Toggle color theme"
      aria-pressed={mode === 'light'}
      disabled={!mounted}
    >
      {mode === 'dark' ? <SunMedium size={18} /> : <MoonStar size={18} />}
      {mode === 'dark' ? 'Light' : 'Dark'}
    </button>
  );
}
