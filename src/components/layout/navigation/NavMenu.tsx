
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
  onNavigate?: (route: Route) => void;
}

export const NavMenu: React.FC<NavMenuProps> = ({ 
  routes, 
  className = "",
  onNavigate 
}) => {
  if (!routes || routes.length === 0) {
    return null;
  }
  
  const handleClick = (route: Route) => {
    if (onNavigate) {
      onNavigate(route);
    }
  };
  
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
            onClick={() => handleClick(route)}
          />
        </SidebarMenuItem>
      ))}
    </SidebarMenu>
  );
};
