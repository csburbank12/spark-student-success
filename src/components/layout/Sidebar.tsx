
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
          <Link to="/dashboard" className="font-semibold text-xl hover:text-primary transition-colors flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6 mr-2 text-primary">
              <path d="M7 12a5 5 0 0 1 5-5" />
              <path d="M12 7v10" />
              <rect x="3" y="8" width="4" height="8" rx="1" />
              <rect x="17" y="8" width="4" height="8" rx="1" />
              <path d="M12 17a5 5 0 0 1-5-5" />
            </svg>
            Dashboard
          </Link>
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
