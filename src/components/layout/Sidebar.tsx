
import React from "react";
import {
  Sidebar as SidebarContainer,
  SidebarContent,
  SidebarFooter,
} from "@/components/ui/sidebar/components/sidebar-base";
import { RoleBasedNavigation } from "@/components/navigation/RoleBasedNavigation";
import SidebarFooterActions from "./SidebarFooterActions";
import { SidebarHeader } from "@/components/ui/sidebar/components/sidebar-group";
import { useSidebar } from "@/components/ui/sidebar/sidebar-context";
import { SidebarTrigger } from "@/components/ui/sidebar/components/sidebar-trigger";

const Sidebar = () => {
  const { isMobile } = useSidebar();

  return (
    <SidebarContainer>
      {isMobile && (
        <SidebarHeader className="flex items-center justify-between p-4 border-b">
          <div className="font-bold">School Connect</div>
          <SidebarTrigger />
        </SidebarHeader>
      )}
      <SidebarContent className="bg-sidebar relative">
        <div className="absolute inset-0 bg-gradient-to-b from-primary-800/5 to-transparent" />
        <RoleBasedNavigation />
      </SidebarContent>
      <SidebarFooter className="bg-sidebar/80 backdrop-blur-sm border-t border-white/10">
        <SidebarFooterActions />
      </SidebarFooter>
    </SidebarContainer>
  );
};

export default Sidebar;
