
import React from "react";
import {
  Sidebar as SidebarContainer,
  SidebarContent,
  SidebarHeader,
  SidebarFooter,
} from "@/components/ui/sidebar/components/sidebar-base";
import { RoleBasedNavigation } from "@/components/navigation/RoleBasedNavigation";
import SidebarFooterActions from "./SidebarFooterActions";
import { useAuth } from "@/contexts/AuthContext";

const Sidebar = () => {
  const { user } = useAuth();

  return (
    <SidebarContainer>
      <SidebarHeader className="border-b border-white/10">
        <div className="flex h-14 items-center px-4 relative">
          <div className="absolute inset-0 bg-gradient-to-br from-primary-600 to-primary-800 opacity-80" />
          <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-10" />
          <span className="font-semibold text-lg relative z-10 text-white">Student Success</span>
        </div>
      </SidebarHeader>
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
