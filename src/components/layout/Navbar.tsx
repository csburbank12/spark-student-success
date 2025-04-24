
import React from 'react';
import { Bell, Search, Menu, HelpCircle, Home } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useAuth } from '@/contexts/AuthContext';
import { UserRole } from '@/types/roles';
import { Link, useLocation } from 'react-router-dom';
import { useSidebar } from '@/components/ui/sidebar';
import NavBreadcrumbs from './NavBreadcrumbs';

export const Navbar = () => {
  const { user, logout, setRole } = useAuth();
  const { toggleSidebar } = useSidebar();
  const location = useLocation();

  const handleRoleSwitch = (role: UserRole) => {
    setRole(role);
  };
  
  const getPageTitle = () => {
    const path = location.pathname;
    
    // Common paths across all user roles
    if (path.includes('qa-dashboard')) return 'QA Dashboard';
    if (path.includes('profile')) return 'User Profile';
    if (path.includes('settings')) return 'Settings';
    if (path.includes('help')) return 'Help & Support';
    if (path === '/') return 'Home';
    if (path === '/dashboard') return 'Dashboard';
    
    // Role-specific paths
    if (user?.role === UserRole.admin) {
      if (path.includes('user-management')) return 'User Management';
      if (path.includes('data-analytics')) return 'Data Analytics';
      if (path.includes('school-management')) return 'School Management';
      if (path.includes('ferpa-compliance')) return 'FERPA Compliance';
      if (path.includes('system-settings')) return 'System Settings';
      if (path.includes('loopbot-logs')) return 'LoopBot Logs';
      if (path.includes('error-logs')) return 'Error Logs';
      if (path.includes('pulse-trends')) return 'Pulse Trends';
      if (path.includes('onboarding')) return 'School Onboarding';
      if (path.includes('integrations')) return 'Integrations';
      return 'Admin Console';
    }
    
    if (user?.role === UserRole.teacher) {
      if (path.includes('students')) return 'Student Management';
      if (path.includes('sel-pathway')) return 'SEL Pathway Management';
      if (path.includes('staff-assist')) return 'Staff Assist Mode';
      if (path.includes('predictive-support')) return 'Predictive Support';
      if (path.includes('emotion-aware')) return 'Emotion Scheduling';
      return 'Teacher Dashboard';
    }
    
    if (user?.role === UserRole.student) {
      if (path.includes('mental-health')) return 'Mental Health Toolkit';
      if (path.includes('digital-journal')) return 'Digital Journal';
      if (path.includes('reset-room')) return 'Reset Room';
      if (path.includes('check-in')) return 'Check-In';
      if (path.includes('sel-pathways')) return 'SEL Pathways';
      if (path.includes('trusted-adults')) return 'Trusted Adults';
      return 'Student Dashboard';
    }
    
    if (user?.role === UserRole.parent) {
      if (path.includes('child-activity')) return 'Child Activity';
      if (path.includes('child-wellness')) return 'Child Wellness';
      if (path.includes('messages')) return 'Messages';
      if (path.includes('parent-resources')) return 'Resources';
      return 'Parent Portal';
    }
    
    if (user?.role === UserRole.staff) {
      if (path.includes('staff-assist')) return 'Staff Assist Mode';
      if (path.includes('support-tools')) return 'Support Tools';
      return 'Staff Portal';
    }
    
    // If no specific title matches, extract from path
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
        <form className="hidden md:block relative w-64">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search..."
            className="w-full rounded-lg bg-background pl-8 md:w-64"
          />
        </form>
        <Button variant="ghost" size="icon" className="hidden md:flex" asChild>
          <Link to="/help">
            <HelpCircle className="h-5 w-5" />
          </Link>
        </Button>
        <Link to="/qa-dashboard">
          <Button variant="outline" size="sm">QA Dashboard</Button>
        </Link>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="icon" className="relative">
              <Bell className="h-5 w-5" />
              <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-[10px] text-white">
                3
              </span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-80">
            <DropdownMenuLabel>Notifications</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <div className="max-h-80 overflow-auto">
              <DropdownMenuItem className="cursor-pointer">
                <div className="flex flex-col gap-1">
                  <p className="font-medium">New check-in reminder</p>
                  <p className="text-sm text-muted-foreground">Don't forget your daily check-in today!</p>
                </div>
              </DropdownMenuItem>
              <DropdownMenuItem className="cursor-pointer">
                <div className="flex flex-col gap-1">
                  <p className="font-medium">Achievement unlocked!</p>
                  <p className="text-sm text-muted-foreground">5-day streak: You've completed 5 consecutive check-ins.</p>
                </div>
              </DropdownMenuItem>
              <DropdownMenuItem className="cursor-pointer">
                <div className="flex flex-col gap-1">
                  <p className="font-medium">Activity recommendation</p>
                  <p className="text-sm text-muted-foreground">Based on your recent mood patterns, try our new mindfulness exercise.</p>
                </div>
              </DropdownMenuItem>
            </div>
          </DropdownMenuContent>
        </DropdownMenu>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="flex items-center gap-2">
              <div className="h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center">
                <span className="text-xs font-medium text-primary">
                  {user?.name?.charAt(0) || 'U'}
                </span>
              </div>
              <span className="hidden md:inline-flex">{user?.name}</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="cursor-pointer" asChild>
              <Link to="/profile">View Profile</Link>
            </DropdownMenuItem>
            <DropdownMenuItem className="cursor-pointer" asChild>
              <Link to="/settings">Settings</Link>
            </DropdownMenuItem>
            <DropdownMenuItem className="cursor-pointer" asChild>
              <Link to="/help">Help & Support</Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuLabel>Switch View</DropdownMenuLabel>
            <DropdownMenuItem className="cursor-pointer" onClick={() => handleRoleSwitch(UserRole.student)}>
              Switch to Student View
            </DropdownMenuItem>
            <DropdownMenuItem className="cursor-pointer" onClick={() => handleRoleSwitch(UserRole.teacher)}>
              Switch to Teacher View
            </DropdownMenuItem>
            <DropdownMenuItem className="cursor-pointer" onClick={() => handleRoleSwitch(UserRole.admin)}>
              Switch to Admin View
            </DropdownMenuItem>
            <DropdownMenuItem className="cursor-pointer" onClick={() => handleRoleSwitch(UserRole.parent)}>
              Switch to Parent View
            </DropdownMenuItem>
            <DropdownMenuItem className="cursor-pointer" onClick={() => handleRoleSwitch(UserRole.staff)}>
              Switch to Staff View
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="cursor-pointer" onClick={() => logout()}>
              Log Out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
};
