// components/ThemeProvider.jsx
import { useEffect } from 'react';
import { useThemeStore } from '../store/useThemeStore';

export const ThemeProvider = ({ children }) => {
  const { theme } = useThemeStore();
  
  useEffect(() => {
    // Apply theme to document root
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  return <>{children}</>;
};