
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { UserRole } from '@/types/roles';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

const UserMenu = () => {
  const { user, logout, setRole } = useAuth();
  const navigate = useNavigate();

  const handleRoleSwitch = (role: UserRole) => {
    setRole(role, true); // Pass true to prevent auto-redirect
  };

  const handleLogout = async () => {
    await logout();
    navigate('/login');
    toast.success('Successfully logged out');
  };

  return (
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
        <DropdownMenuItem className="cursor-pointer" onClick={handleLogout}>
          Log Out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserMenu;
