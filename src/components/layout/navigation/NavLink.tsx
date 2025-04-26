
import React from "react";
import { NavLink as RouterNavLink, useLocation } from "react-router-dom";
import { SidebarMenuButton } from "@/components/ui/sidebar/components/menu/menu-button";
import { useSidebar } from "@/components/ui/sidebar/sidebar-context";
import { isPathActive } from "@/utils/routeUtils";

interface NavLinkProps {
  to: string;
  name: string;
  icon: React.ElementType;
  isActive?: boolean;
  badge?: number | string;
  isDisabled?: boolean;
  onClick?: () => void;
}

export const NavLink: React.FC<NavLinkProps> = ({ 
  to, 
  name, 
  icon: Icon, 
  isActive: isActiveProp,
  badge,
  isDisabled = false,
  onClick
}) => {
  const { state } = useSidebar();
  const location = useLocation();
  
  const isActive = isActiveProp !== undefined 
    ? isActiveProp 
    : isPathActive(to, location.pathname);

  const handleClick = (e: React.MouseEvent) => {
    if (isDisabled) {
      e.preventDefault();
    }
    if (onClick) {
      onClick();
    }
  };

  return (
    <SidebarMenuButton
      asChild
      isActive={isActive}
      tooltip={state === "collapsed" ? name : undefined}
      aria-label={name}
      aria-current={isActive ? "page" : undefined}
      onClick={handleClick}
    >
      <RouterNavLink 
        to={to} 
        className={`flex items-center gap-2 w-full transition-colors duration-200 ${
          isDisabled ? "opacity-50 cursor-not-allowed pointer-events-none" : ""
        } ${isActive ? "text-primary font-medium" : "text-muted-foreground hover:text-foreground"}`}
      >
        <Icon className="h-5 w-5" aria-hidden="true" />
        <span>{name}</span>
        
        {badge !== undefined && (
          <span className="ml-auto flex h-5 min-w-5 items-center justify-center rounded-full bg-primary px-2 text-xs text-white">
            {badge}
          </span>
        )}
      </RouterNavLink>
    </SidebarMenuButton>
  );
};
