
import React from "react";
import { useSidebar } from "@/components/ui/sidebar/sidebar-context";
import { useAuth } from "@/contexts/AuthContext";
import { LogOut } from "lucide-react";
import { SidebarMenu, SidebarMenuItem, SidebarMenuButton } from "@/components/ui/sidebar/components/menu";
import { toast } from "sonner";
import { Separator } from "@/components/ui/separator";

const SidebarFooterActions = () => {
  const { logout } = useAuth();
  const { state } = useSidebar();

  const handleLogout = async () => {
    try {
      await logout();
      toast.success('Logged out successfully');
      window.location.href = '/login';
    } catch (error) {
      console.error('Error logging out:', error);
      toast.error('Failed to log out. Please try again.');
    }
  };

  return (
    <div className="space-y-2 px-1 py-2">
      <Separator className="my-1 opacity-20" />
      <SidebarMenu>
        <SidebarMenuItem className="z-20">
          <SidebarMenuButton
            tooltip={state === "collapsed" ? "Logout" : undefined}
            onClick={handleLogout}
            className="w-full"
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
