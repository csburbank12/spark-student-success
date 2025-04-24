
import React from "react";
import {
  Sidebar as SidebarContainer,
  SidebarContent,
  SidebarHeader,
  SidebarFooter,
} from "@/components/ui/sidebar/components/sidebar-base";
import SidebarNavLinks from "./SidebarNavLinks";
import SidebarFooterActions from "./SidebarFooterActions";
import { useAuth } from "@/contexts/AuthContext";
import { getRoutesByRole } from "./sidebarRoutes";
import { UserRole } from "@/types/roles";

const Sidebar = () => {
  const { user } = useAuth();
  const userRole = user?.role as UserRole || "";
  const routes = getRoutesByRole(userRole);

  return (
    <SidebarContainer>
      <SidebarHeader>
        <div className="flex h-14 items-center px-4">
          {/* Logo removed */}
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarNavLinks routes={routes} includeUniversalRoutes={true} />
      </SidebarContent>
      <SidebarFooter>
        <SidebarFooterActions />
      </SidebarFooter>
    </SidebarContainer>
  );
};

export default Sidebar;
