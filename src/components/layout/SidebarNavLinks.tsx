
import React from "react";
import { NavLink, useLocation } from "react-router-dom";
import {
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  useSidebar,
} from "@/components/ui/sidebar";
import { universalRoutes } from "./routes/universalRoutes";

interface Route {
  name: string;
  href: string;
  icon: React.ElementType;
}

interface SidebarNavLinksProps {
  routes: Route[];
  includeUniversalRoutes?: boolean;
}

const SidebarNavLinks: React.FC<SidebarNavLinksProps> = ({ 
  routes, 
  includeUniversalRoutes = false 
}) => {
  const location = useLocation();
  const { state } = useSidebar();
  
  // Combine role-specific routes with universal routes if needed
  const displayRoutes = includeUniversalRoutes 
    ? [...routes, ...universalRoutes.filter(route => route.href !== "/dashboard")] 
    : routes;

  return (
    <SidebarMenu>
      {displayRoutes.map((route) => (
        <SidebarMenuItem key={route.href}>
          <SidebarMenuButton
            asChild
            isActive={location.pathname === route.href}
            tooltip={state === "collapsed" ? route.name : undefined}
          >
            <NavLink to={route.href}>
              <route.icon className="h-5 w-5" />
              <span>{route.name}</span>
            </NavLink>
          </SidebarMenuButton>
        </SidebarMenuItem>
      ))}
    </SidebarMenu>
  );
};

export default SidebarNavLinks;
