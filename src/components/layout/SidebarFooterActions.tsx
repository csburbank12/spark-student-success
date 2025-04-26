
import React from "react";
import { useSidebar } from "@/components/ui/sidebar/sidebar-context";
import { useAuth } from "@/contexts/AuthContext";
import { LogOut, Settings, User } from "lucide-react";
import { SidebarMenu, SidebarMenuItem, SidebarMenuButton } from "@/components/ui/sidebar/components/menu";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { Separator } from "@/components/ui/separator";

const SidebarFooterActions = () => {
  const { logout } = useAuth();
  const { state } = useSidebar();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      toast.success('Logged out successfully');
      navigate('/login');
    } catch (error) {
      console.error('Error logging out:', error);
      toast.error('Failed to log out. Please try again.');
    }
  };
  
  const handleProfile = () => {
    // All roles now use the /profile route
    navigate('/profile');
  };
  
  const handleSettings = () => {
    navigate('/settings');
  };

  return (
    <div className="space-y-2 px-1 py-2">
      <Separator className="my-1 opacity-20" />
      <SidebarMenu>
        <SidebarMenuItem>
          <SidebarMenuButton
            tooltip={state === "collapsed" ? "Profile" : undefined}
            onClick={handleProfile}
          >
            <User className="h-4 w-4 mr-2" />
            <span>Profile</span>
          </SidebarMenuButton>
        </SidebarMenuItem>
        <SidebarMenuItem>
          <SidebarMenuButton
            tooltip={state === "collapsed" ? "Settings" : undefined}
            onClick={handleSettings}
          >
            <Settings className="h-4 w-4 mr-2" />
            <span>Settings</span>
          </SidebarMenuButton>
        </SidebarMenuItem>
        <SidebarMenuItem>
          <SidebarMenuButton
            tooltip={state === "collapsed" ? "Logout" : undefined}
            onClick={handleLogout}
          >
            <LogOut className="h-4 w-4 mr-2" />
            <span>Logout</span>
          </SidebarMenuButton>
        </SidebarMenuItem>
      </SidebarMenu>
    </div>
  );
};

export default SidebarFooterActions;
