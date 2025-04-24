
import React from "react";
import { NavLink as RouterNavLink } from "react-router-dom";
import { SidebarMenuButton } from "@/components/ui/sidebar/components/menu/menu-button";
import { useSidebar } from "@/components/ui/sidebar/sidebar-context";

interface NavLinkProps {
  to: string;
  name: string;
  icon: React.ElementType;
  isActive: boolean;
}

export const NavLink: React.FC<NavLinkProps> = ({ 
  to, 
  name, 
  icon: Icon, 
  isActive 
}) => {
  const { state } = useSidebar();

  return (
    <SidebarMenuButton
      asChild
      isActive={isActive}
      tooltip={state === "collapsed" ? name : undefined}
    >
      <RouterNavLink 
        to={to} 
        className={({ isActive }) =>
          isActive ? "text-primary" : "text-muted-foreground hover:text-foreground"
        }
      >
        <Icon className="h-5 w-5" />
        <span>{name}</span>
      </RouterNavLink>
    </SidebarMenuButton>
  );
};
