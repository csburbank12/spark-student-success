
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
}

const SidebarNavLinks: React.FC<SidebarNavLinksProps> = ({ routes }) => {
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
