
import React from "react";
import { SidebarMenu } from "@/components/ui/sidebar/components/menu/menu";
import { SidebarMenuItem } from "@/components/ui/sidebar/components/menu/menu";
import { NavLink } from "./NavLink";

interface Route {
  name: string;
  href: string;
  icon: React.ElementType;
  badge?: number | string;
  isDisabled?: boolean;
}

interface NavMenuProps {
  routes: Route[];
  className?: string;
}

export const NavMenu: React.FC<NavMenuProps> = ({ routes, className = "" }) => {
  if (!routes || routes.length === 0) {
    return null;
  }
  
  return (
    <SidebarMenu className={className}>
      {routes.map((route) => (
        <SidebarMenuItem key={`${route.name}-${route.href}`}>
          <NavLink
            to={route.href}
            name={route.name}
            icon={route.icon}
            badge={route.badge}
            isDisabled={route.isDisabled}
          />
        </SidebarMenuItem>
      ))}
    </SidebarMenu>
  );
};
