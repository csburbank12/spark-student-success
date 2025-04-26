
import React from "react";
import { NavLink as RouterNavLink, useLocation } from "react-router-dom";
import { SidebarMenuButton } from "@/components/ui/sidebar/components/menu/menu-button";
import { useSidebar } from "@/components/ui/sidebar/sidebar-context";

interface NavLinkProps {
  to: string;
  name: string;
  icon: React.ElementType;
  isActive?: boolean;
  badge?: number | string;
  isDisabled?: boolean;
}

export const NavLink: React.FC<NavLinkProps> = ({ 
  to, 
  name, 
  icon: Icon, 
  isActive: isActiveProp,
  badge,
  isDisabled = false
}) => {
  const { state } = useSidebar();
  const location = useLocation();
  
  // Enhanced matching to consider nested routes and dashboard
  const isPathActive = (path: string, currentPath: string) => {
    // Exact match
    if (path === currentPath) return true;
    
    // Special case for root and dashboard
    if (path === '/student-dashboard' && (currentPath === '/' || currentPath === '/student-dashboard')) return true;
    
    // Nested route match
    return path !== '/' && currentPath.startsWith(`${path}/`);
  };
  
  // Use provided isActive prop or calculate based on location
  const isActive = isActiveProp !== undefined 
    ? isActiveProp 
    : isPathActive(to, location.pathname);

  const navLinkContent = (
    <RouterNavLink 
      to={to} 
      className={`flex items-center gap-2 w-full ${
        isDisabled ? "opacity-50 cursor-not-allowed pointer-events-none" : ""
      } ${isActive ? "text-primary font-medium" : "text-muted-foreground hover:text-foreground"}`}
      onClick={(e) => {
        if (isDisabled) {
          e.preventDefault();
        }
      }}
    >
      <Icon className="h-5 w-5" />
      <span>{name}</span>
      
      {badge !== undefined && (
        <span className="ml-auto flex h-5 min-w-5 items-center justify-center rounded-full bg-primary px-2 text-xs text-white">
          {badge}
        </span>
      )}
    </RouterNavLink>
  );

  return (
    <SidebarMenuButton
      asChild
      isActive={isActive}
      tooltip={state === "collapsed" ? name : undefined}
    >
      {navLinkContent}
    </SidebarMenuButton>
  );
};

