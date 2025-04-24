
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, HelpCircle, Home } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useSidebar } from '@/components/ui/sidebar';
import NavBreadcrumbs from './NavBreadcrumbs';
import SearchBar from './navbar/SearchBar';
import NotificationMenu from './navbar/NotificationMenu';
import UserMenu from './navbar/UserMenu';

export const Navbar = () => {
  const { toggleSidebar } = useSidebar();
  const location = useLocation();
  
  const getPageTitle = () => {
    const path = location.pathname;
    
    // Common paths across all user roles
    if (path.includes('qa-dashboard')) return 'QA Dashboard';
    if (path.includes('profile')) return 'User Profile';
    if (path.includes('settings')) return 'Settings';
    if (path.includes('help')) return 'Help & Support';
    if (path === '/') return 'Home';
    if (path === '/dashboard') return 'Dashboard';
    
    // Extract from path if no specific match
    const pathSegments = path.split('/').filter(Boolean);
    if (pathSegments.length > 0) {
      const lastSegment = pathSegments[pathSegments.length - 1];
      return lastSegment
        .split('-')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
    }
    
    return 'Dashboard';
  };

  return (
    <header className="sticky top-0 z-10 flex h-16 items-center gap-4 border-b bg-card px-4 md:px-6">
      <Button variant="outline" size="icon" className="md:hidden" onClick={toggleSidebar}>
        <Menu className="h-5 w-5" />
      </Button>
      
      <div className="hidden md:flex md:flex-1 md:items-center md:gap-4">
        <h1 className="text-xl font-heading font-semibold">{getPageTitle()}</h1>
        {location.pathname !== '/dashboard' && (
          <Button variant="ghost" size="sm" asChild className="ml-2">
            <Link to="/dashboard">
              <Home className="h-4 w-4 mr-1" />
              Dashboard
            </Link>
          </Button>
        )}
      </div>

      <div className="flex items-center gap-4 ml-auto md:hidden">
        <Button variant="ghost" size="icon" asChild>
          <Link to="/dashboard">
            <Home className="h-5 w-5" />
          </Link>
        </Button>
        <Button variant="ghost" size="icon" asChild>
          <Link to="/help">
            <HelpCircle className="h-5 w-5" />
          </Link>
        </Button>
      </div>

      <div className="hidden flex-1 items-center gap-4 md:flex">
        <NavBreadcrumbs />
      </div>

      <div className="flex flex-1 items-center gap-4 justify-end">
        <SearchBar />
        <Button variant="ghost" size="icon" className="hidden md:flex" asChild>
          <Link to="/help">
            <HelpCircle className="h-5 w-5" />
          </Link>
        </Button>
        <Link to="/qa-dashboard">
          <Button variant="outline" size="sm">QA Dashboard</Button>
        </Link>
        <NotificationMenu />
        <UserMenu />
      </div>
    </header>
  );
};
