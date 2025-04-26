
import React from "react";
import { SidebarMenu } from "@/components/ui/sidebar/components/menu/menu";
import { SidebarMenuItem } from "@/components/ui/sidebar/components/menu/menu";
import { NavLink } from "./NavLink";
import { useLocation } from "react-router-dom";

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
  const location = useLocation();
  
  if (!routes || routes.length === 0) {
    return null;
  }
  
  return (
    <SidebarMenu className={className}>
      {routes.map((route) => (
        <SidebarMenuItem key={route.href} className="z-20">
          <NavLink
            to={route.href}
            name={route.name}
            icon={route.icon}
            badge={route.badge}
            isDisabled={route.isDisabled}
            isActive={location.pathname === route.href}
            onClick={() => onNavigate && onNavigate(route)}
          />
        </SidebarMenuItem>
      ))}
    </SidebarMenu>
  );
};
