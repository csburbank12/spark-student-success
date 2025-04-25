
import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Menu, HelpCircle, Home, LogOut, Search, Bell, User, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useSidebar } from '@/components/ui/sidebar/sidebar-context';
import { useAuth } from '@/contexts/AuthContext';
import { useTheme } from '@/contexts/ThemeContext';
import { toast } from 'sonner';
import SearchBar from './navbar/SearchBar';
import NotificationMenu from './navbar/NotificationMenu';
import UserMenu from './navbar/UserMenu';
import { NavBreadcrumbs } from './NavBreadcrumbs';

interface NavbarProps {
  onToggleSidebar?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onToggleSidebar }) => {
  const { toggleSidebar } = useSidebar();
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();
  const location = useLocation();
  const { user, logout } = useAuth();
  const [isSearching, setIsSearching] = useState(false);
  
  const handleLogout = async () => {
    await logout();
    navigate('/login');
    toast.success('Successfully logged out');
  };

  // Mobile search toggle
  const toggleSearch = () => {
    setIsSearching(!isSearching);
  };
  
  return (
    <header className="sticky top-0 z-10 flex h-16 items-center gap-4 border-b bg-card px-4 md:px-6 shadow-sm">
      <Button variant="ghost" size="icon" className="md:hidden" onClick={() => {
        toggleSidebar();
        if (onToggleSidebar) onToggleSidebar();
      }}>
        <Menu className="h-5 w-5" />
      </Button>
      
      {!isSearching ? (
        <>
          <div className="flex items-center gap-4 lg:flex-1">
            <Link to="/dashboard" className="flex items-center gap-2">
              <span className="hidden font-semibold md:inline-block">ThriveTrackED</span>
            </Link>
            
            <div className="hidden md:block ml-4">
              <NavBreadcrumbs path={location.pathname} />
            </div>
          </div>

          <div className="flex flex-1 items-center justify-end gap-4">
            {/* Mobile search toggle button */}
            <Button variant="ghost" size="icon" className="md:hidden" onClick={toggleSearch}>
              <Search className="h-4 w-4" />
            </Button>

            {/* Desktop search */}
            <div className="hidden md:flex items-center gap-4 mr-4 flex-1 justify-end max-w-md">
              <SearchBar />
            </div>
            
            <div className="hidden md:flex items-center gap-4 mr-4">
              <Link to="/dashboard">
                <Button variant="ghost" size="sm" className="gap-2">
                  <Home className="h-4 w-4" />
                  Dashboard
                </Button>
              </Link>
              <Link to="/help">
                <Button variant="ghost" size="sm" className="gap-2">
                  <HelpCircle className="h-4 w-4" />
                  Help
                </Button>
              </Link>
            </div>

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

            <div className="hidden md:block">
              <Button 
                variant="destructive" 
                size="sm"
                onClick={handleLogout}
                className="gap-2"
              >
                <LogOut className="h-4 w-4" />
                Sign Out
              </Button>
            </div>
          </div>
        </>
      ) : (
        // Mobile search interface
        <div className="flex flex-1 items-center gap-2">
          <div className="flex-1">
            <Input
              type="search"
              placeholder="Search..."
              className="h-9 md:w-[200px] lg:w-[300px]"
              autoFocus
            />
          </div>
          <Button variant="ghost" size="sm" onClick={toggleSearch}>
            <X className="h-4 w-4" />
          </Button>
        </div>
      )}
    </header>
  );
};
