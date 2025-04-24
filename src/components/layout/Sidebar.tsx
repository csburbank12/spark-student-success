
import React from "react";
import {
  Sidebar as SidebarContainer,
  SidebarContent,
  SidebarHeader,
  SidebarFooter,
  SidebarSeparator,
} from "@/components/ui/sidebar";
import SidebarNavLinks from "./SidebarNavLinks";
import SidebarFooterActions from "./SidebarFooterActions";
import { useAuth } from "@/contexts/AuthContext";
import { getRoutesByRole } from "./sidebarRoutes";
import { UserRole } from "@/types/roles";
import { Logo } from "@/components/branding/Logo";

const Sidebar = () => {
  const { user } = useAuth();
  
  const userRole = user?.role as UserRole || "";
  const routes = getRoutesByRole(userRole);

  return (
    <SidebarContainer>
      <SidebarHeader>
        <div className="flex h-14 items-center px-4">
          <Logo className="w-full" />
        </div>
      </SidebarHeader>
      <SidebarContent>
        <div className="px-4 py-2">
          <div className="text-xs font-semibold text-muted-foreground">
            {user?.role ? `${user.role.charAt(0).toUpperCase() + user.role.slice(1)} View` : "Navigation"}
          </div>
        </div>
        <SidebarNavLinks routes={routes} includeUniversalRoutes={false} />
        <SidebarSeparator />
      </SidebarContent>
      <SidebarFooter>
        <SidebarFooterActions />
      </SidebarFooter>
    </SidebarContainer>
  );
};

export default Sidebar;
