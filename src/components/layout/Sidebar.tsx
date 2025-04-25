
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
import { UserRole } from "@/types/roles";

const Sidebar = () => {
  const { user } = useAuth();
  const userRole = user?.role as UserRole || "";

  return (
    <SidebarContainer>
      <SidebarHeader>
        <div className="flex h-14 items-center px-4">
          <span className="font-semibold text-lg">ThriveTrackED</span>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <RoleBasedNavigation />
      </SidebarContent>
      <SidebarFooter>
        <SidebarFooterActions />
      </SidebarFooter>
    </SidebarContainer>
  );
};

export default Sidebar;
