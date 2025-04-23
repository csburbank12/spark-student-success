
import React from 'react';
import { Bell, Search, Menu } from 'lucide-react';
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
import { Link } from 'react-router-dom';
import { useSidebar } from '@/components/ui/sidebar';

export const Navbar = () => {
  const { user, logout, setRole } = useAuth();
  const { toggleSidebar } = useSidebar();

  const handleRoleSwitch = (role: UserRole) => {
    setRole(role);
  };

  return (
    <header className="sticky top-0 z-10 flex h-16 items-center gap-4 border-b bg-card px-4 md:px-6">
      <Button variant="outline" size="icon" className="md:hidden" onClick={toggleSidebar}>
        <Menu className="h-5 w-5" />
      </Button>
      <div className="hidden md:flex md:flex-1 md:items-center md:gap-4">
        <h1 className="text-xl font-heading font-semibold">
          {user?.role === 'student' && 'My Dashboard'}
          {user?.role === 'teacher' && 'Teacher Dashboard'}
          {user?.role === 'admin' && 'Admin Console'}
          {user?.role === 'parent' && 'Parent Portal'}
        </h1>
      </div>
      <div className="flex flex-1 items-center gap-4 md:justify-end">
        <form className="hidden md:block relative w-64">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search..."
            className="w-full rounded-lg bg-background pl-8 md:w-64"
          />
        </form>
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
            <DropdownMenuSeparator />
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
