
import React from 'react';
import { Link } from 'react-router-dom';
import NotificationMenu from './navbar/NotificationMenu';
import UserMenu from './navbar/UserMenu';
import SearchBar from './navbar/SearchBar';
import { ThemeToggle } from './navbar/ThemeToggle';
import { useThemeToggle } from '@/hooks/useThemeToggle';

export const Navbar = () => {
  const { theme, toggleTheme, isMounted } = useThemeToggle();
  
  return (
    <header className="sticky top-0 z-30 border-b bg-card/80 backdrop-blur-sm transition-colors duration-200 shadow-sm">
      <div className="container flex h-16 items-center justify-between px-4">
        <div className="flex items-center">
          <Link to="/" className="flex items-center">
            <div className="text-xl font-semibold bg-gradient-to-r from-primary to-primary-600 bg-clip-text text-transparent hover:brightness-110 transition-all">
              Student Success
            </div>
          </Link>
        </div>
        
        <div className="hidden md:flex max-w-md w-full px-4">
          <SearchBar />
        </div>
        
        <div className="flex items-center gap-4">
          {isMounted && (
            <ThemeToggle theme={theme} onToggle={toggleTheme} />
          )}
          <NotificationMenu />
          <UserMenu />
        </div>
      </div>
    </header>
  );
};
