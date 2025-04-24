
import React from "react";
import { useLocation } from "react-router-dom";
import { SidebarMenu } from "@/components/ui/sidebar/components/menu/menu";
import { SidebarMenuItem } from "@/components/ui/sidebar/components/menu/menu";
import { NavLink } from "./NavLink";

interface Route {
  name: string;
  href: string;
  icon: React.ElementType;
}

interface NavMenuProps {
  routes: Route[];
}

export const NavMenu: React.FC<NavMenuProps> = ({ routes }) => {
  const location = useLocation();

  return (
    <SidebarMenu>
      {routes.map((route) => (
        <SidebarMenuItem key={route.href}>
          <NavLink
            to={route.href}
            name={route.name}
            icon={route.icon}
            isActive={location.pathname === route.href}
          />
        </SidebarMenuItem>
      ))}
    </SidebarMenu>
  );
};
