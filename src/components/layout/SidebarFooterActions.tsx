
import React from "react";
import { useSidebar } from "@/components/ui/sidebar/sidebar-context";
import { useAuth } from "@/contexts/AuthContext";
import { LogOut, Settings, HelpCircle } from "lucide-react";
import { SidebarMenu, SidebarMenuItem, SidebarMenuButton } from "@/components/ui/sidebar/components/menu";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

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

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <SidebarMenuButton
          tooltip={state === "collapsed" ? "Settings" : undefined}
          onClick={() => navigate('/settings')}
        >
          <Settings className="h-4 w-4 mr-2" />
          <span>Settings</span>
        </SidebarMenuButton>
      </SidebarMenuItem>
      <SidebarMenuItem>
        <SidebarMenuButton
          tooltip={state === "collapsed" ? "Help" : undefined}
          onClick={() => navigate('/help')}
        >
          <HelpCircle className="h-4 w-4 mr-2" />
          <span>Help & Support</span>
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
  );
};

export default SidebarFooterActions;
