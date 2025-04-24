
import React from "react";
import { NavLink, useLocation } from "react-router-dom";
import {
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  useSidebar,
} from "@/components/ui/sidebar";

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
  includeUniversalRoutes = true 
}) => {
  const location = useLocation();
  const { state } = useSidebar();

  return (
    <SidebarMenu>
      {routes.map((route) => (
        <SidebarMenuItem key={route.href}>
          <SidebarMenuButton
            asChild
            isActive={location.pathname === route.href}
            tooltip={state === "collapsed" ? route.name : undefined}
          >
            <NavLink 
              to={route.href} 
              className={({ isActive }) =>
                isActive ? "text-primary" : "text-muted-foreground hover:text-foreground"
              }
            >
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
