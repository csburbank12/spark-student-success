
import React from 'react';
import { Button } from '@/components/ui/button';
import { useTheme } from '@/contexts/ThemeContext';
import NotificationMenu from './navbar/NotificationMenu';
import UserMenu from './navbar/UserMenu';

export const Navbar: React.FC = () => {
  const { theme, toggleTheme } = useTheme();
  
  return (
    <header className="sticky top-0 z-10 flex h-16 items-center justify-end gap-4 border-b bg-card px-4 md:px-6 shadow-sm">
      <Button 
        variant="ghost" 
        size="icon"
        onClick={toggleTheme}
        title={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
      >
        {theme === 'dark' ? (
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="5"/><path d="M12 1v2M12 21v2M4.2 4.2l1.4 1.4M18.4 18.4l1.4 1.4M1 12h2M21 12h2M4.2 19.8l1.4-1.4M18.4 5.6l1.4-1.4"/></svg>
        ) : (
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/></svg>
        )}
      </Button>
      
      <NotificationMenu />
      <UserMenu />
    </header>
  );
};
