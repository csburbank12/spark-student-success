
import { useTheme } from '@/contexts/ThemeContext';
import { useState, useCallback, useEffect } from 'react';

export const useThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();
  const [isMounted, setIsMounted] = useState(false);
  
  // Handle theme toggle with animation
  const handleToggleTheme = useCallback(() => {
    const root = window.document.documentElement;
    root.classList.add('theme-transition');
    
    toggleTheme();
    
    setTimeout(() => {
      root.classList.remove('theme-transition');
    }, 300); // Match this with the CSS transition duration
  }, [toggleTheme]);
  
  // Client-side only to avoid hydration issues
  useEffect(() => {
    setIsMounted(true);
  }, []);

  return { theme, toggleTheme: handleToggleTheme, isMounted };
};
