
import React from "react";
import {
  Sidebar as SidebarContainer,
  SidebarContent,
  SidebarHeader,
  SidebarFooter,
} from "@/components/ui/sidebar/components/sidebar-base";
import { RoleBasedNavigation } from "@/components/navigation/RoleBasedNavigation";
import SidebarFooterActions from "./SidebarFooterActions";

const Sidebar = () => {
  return (
    <SidebarContainer>
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
