
import React from "react";
import { useSidebar } from "@/components/ui/sidebar/sidebar-context";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";
import { SidebarMenu, SidebarMenuItem, SidebarMenuButton } from "@/components/ui/sidebar/components/menu";

const SidebarFooterActions = () => {
  const { logout } = useAuth();
  const { state } = useSidebar();

  return (
    <SidebarMenu>
      {/* All previous menu items removed as per user request */}
    </SidebarMenu>
  );
};

export default SidebarFooterActions;
