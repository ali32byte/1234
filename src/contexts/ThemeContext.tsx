import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { ThemeType } from '../types';

interface ThemeContextType {
  theme: ThemeType;
  setTheme: (theme: ThemeType) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const themes = {
  light: {
    name: 'روشن',
    bg: 'bg-gray-50',
    card: 'bg-white',
    text: 'text-gray-900',
    textSecondary: 'text-gray-600',
    border: 'border-gray-200',
    accent: 'bg-blue-500',
    accentHover: 'hover:bg-blue-600',
  },
  dark: {
    name: 'تیره',
    bg: 'bg-gray-900',
    card: 'bg-gray-800',
    text: 'text-gray-100',
    textSecondary: 'text-gray-400',
    border: 'border-gray-700',
    accent: 'bg-blue-600',
    accentHover: 'hover:bg-blue-700',
  },
  pastel: {
    name: 'پاستلی',
    bg: 'bg-pink-50',
    card: 'bg-white',
    text: 'text-gray-800',
    textSecondary: 'text-gray-600',
    border: 'border-pink-200',
    accent: 'bg-pink-400',
    accentHover: 'hover:bg-pink-500',
  },
  neon: {
    name: 'نئون',
    bg: 'bg-slate-900',
    card: 'bg-slate-800',
    text: 'text-cyan-100',
    textSecondary: 'text-cyan-300',
    border: 'border-cyan-500',
    accent: 'bg-cyan-500',
    accentHover: 'hover:bg-cyan-400',
  },
};

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setThemeState] = useState<ThemeType>(() => {
    const saved = localStorage.getItem('theme');
    return (saved as ThemeType) || 'light';
  });

  const setTheme = (newTheme: ThemeType) => {
    setThemeState(newTheme);
    localStorage.setItem('theme', newTheme);
  };

  useEffect(() => {
    const root = document.documentElement;
    root.className = themes[theme].bg;
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}
