import React from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { User, LogOut, Settings, HelpCircle } from "lucide-react";
import {
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "@/components/ui/sidebar/components/menu";
import { useSidebar } from "@/components/ui/sidebar/sidebar-context";
import { useAuth } from "@/contexts/AuthContext";
import { useTheme } from "@/contexts/ThemeContext";
import { toast } from "sonner";

const SidebarFooterActions = () => {
  const { logout, user } = useAuth();
  const location = useLocation();
  const { state } = useSidebar();
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/login');
    toast.success('Successfully logged out');
  };

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <SidebarMenuButton
          asChild
          isActive={location.pathname === "/profile"}
          tooltip={state === "collapsed" ? "Profile" : undefined}
        >
          <NavLink to="/profile">
            <User className="h-5 w-5" />
            <span>Profile</span>
          </NavLink>
        </SidebarMenuButton>
      </SidebarMenuItem>
      
      <SidebarMenuItem>
        <SidebarMenuButton
          asChild
          isActive={location.pathname === "/settings"}
          tooltip={state === "collapsed" ? "Settings" : undefined}
        >
          <NavLink to="/settings">
            <Settings className="h-5 w-5" />
            <span>Settings</span>
          </NavLink>
        </SidebarMenuButton>
      </SidebarMenuItem>
      
      <SidebarMenuItem>
        <SidebarMenuButton
          asChild
          isActive={location.pathname === "/help"}
          tooltip={state === "collapsed" ? "Help" : undefined}
        >
          <NavLink to="/help">
            <HelpCircle className="h-5 w-5" />
            <span>Help</span>
          </NavLink>
        </SidebarMenuButton>
      </SidebarMenuItem>

      <SidebarMenuItem>
        <SidebarMenuButton
          onClick={toggleTheme}
          tooltip={state === "collapsed" ? (theme === 'dark' ? "Light Mode" : "Dark Mode") : undefined}
        >
          {theme === 'dark' ? (
            <>
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5"><circle cx="12" cy="12" r="5"/><path d="M12 1v2M12 21v2M4.2 4.2l1.4 1.4M18.4 18.4l1.4 1.4M1 12h2M21 12h2M4.2 19.8l1.4-1.4M18.4 5.6l1.4-1.4"/></svg>
              <span>Light Mode</span>
            </>
          ) : (
            <>
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5"><path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/></svg>
              <span>Dark Mode</span>
            </>
          )}
        </SidebarMenuButton>
      </SidebarMenuItem>
      
      <SidebarMenuItem>
        <SidebarMenuButton
          onClick={handleLogout}
          tooltip={state === "collapsed" ? "Sign Out" : undefined}
        >
          <LogOut className="h-5 w-5" />
          <span>Sign Out</span>
        </SidebarMenuButton>
      </SidebarMenuItem>
    </SidebarMenu>
  );
};

export default SidebarFooterActions;
