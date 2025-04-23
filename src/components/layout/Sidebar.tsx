
import React from "react";
import {
  Sidebar as SidebarContainer,
  SidebarContent,
  SidebarHeader,
  SidebarFooter,
} from "@/components/ui/sidebar";
import SidebarNavLinks from "./SidebarNavLinks";
import SidebarFooterActions from "./SidebarFooterActions";
import { useAuth } from "@/contexts/AuthContext";
import { getRoutesByRole } from "./sidebarRoutes";

const Sidebar = () => {
  const { user } = useAuth();
  
  const routes = getRoutesByRole(user?.role || "");

  return (
    <SidebarContainer>
      <SidebarHeader>
        <div className="flex h-14 items-center px-4">
          <span className="font-semibold text-xl">Beacon</span>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarNavLinks routes={routes} />
      </SidebarContent>
      <SidebarFooter>
        <SidebarFooterActions />
      </SidebarFooter>
    </SidebarContainer>
  );
};

export default Sidebar;
