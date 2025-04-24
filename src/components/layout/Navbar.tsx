import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, HelpCircle, Home, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useSidebar } from '@/components/ui/sidebar/sidebar-context';
import NavBreadcrumbs from './NavBreadcrumbs';
import SearchBar from './navbar/SearchBar';
import NotificationMenu from './navbar/NotificationMenu';
import UserMenu from './navbar/UserMenu';
import { useTheme } from '@/contexts/ThemeContext';
import { Logo } from '@/components/branding/Logo';
import { NavigationMenu, NavigationMenuContent, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, NavigationMenuTrigger, navigationMenuTriggerStyle } from '@/components/ui/navigation-menu';
import { cn } from '@/lib/utils';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';

export const Navbar = () => {
  const { toggleSidebar } = useSidebar();
  const location = useLocation();
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();
  const { logout } = useAuth();
  
  const handleLogout = async () => {
    await logout();
    navigate('/login');
    toast.success('Successfully logged out');
  };
  
  return (
    <header className="sticky top-0 z-10 flex h-16 items-center gap-4 border-b bg-card px-4 md:px-6">
      <Button variant="outline" size="icon" className="md:hidden" onClick={toggleSidebar}>
        <Menu className="h-5 w-5" />
      </Button>
      
      <div className="hidden md:flex md:flex-1 md:items-center md:gap-4">
        <Logo />
      </div>

      <div className="flex items-center gap-4 ml-auto md:hidden">
        <Button variant="ghost" size="icon" onClick={() => navigate('/dashboard')} aria-label="Home">
          <Home className="h-5 w-5" />
        </Button>
        <Button variant="ghost" size="icon" onClick={() => navigate('/help')} aria-label="Support">
          <HelpCircle className="h-5 w-5" />
        </Button>
        <Button variant="ghost" size="icon" onClick={handleLogout} aria-label="Log Out">
          <LogOut className="h-5 w-5" />
        </Button>
      </div>

      <div className="hidden md:flex items-center gap-4">
        <NavigationMenu className="hidden md:flex">
          <NavigationMenuList>
            <NavigationMenuItem>
              <Link to="/dashboard" className={navigationMenuTriggerStyle()}>
                <Home className="h-4 w-4 mr-2" />
                Home
              </Link>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Link to="/dashboard" className={navigationMenuTriggerStyle()}>
                Dashboard
              </Link>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Link to="/help" className={navigationMenuTriggerStyle()}>
                <HelpCircle className="h-4 w-4 mr-2" />
                Support
              </Link>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      </div>

      <div className="hidden flex-1 items-center gap-4 md:flex">
        <NavBreadcrumbs />
      </div>

      <div className="flex flex-1 items-center gap-4 justify-end">
        <SearchBar />
        <Button 
          variant="outline" 
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
        <Button 
          variant="destructive" 
          size="sm" 
          className="hidden md:flex"
          onClick={handleLogout}
        >
          <LogOut className="h-4 w-4 mr-2" />
          Log Out
        </Button>
      </div>
    </header>
  );
};
