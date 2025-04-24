
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
import { UserRole } from "@/types/roles";
import { Link } from "react-router-dom";

const Sidebar = () => {
  const { user } = useAuth();
  
  // Get routes based on user role, ensuring we use the UserRole enum
  const userRole = user?.role as UserRole || "";
  const routes = getRoutesByRole(userRole);

  return (
    <SidebarContainer>
      <SidebarHeader>
        <div className="flex h-14 items-center px-4">
          <Link to="/" className="font-semibold text-xl hover:text-primary transition-colors">Home</Link>
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
