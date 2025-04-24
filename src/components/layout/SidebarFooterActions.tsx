
import React from "react";
import { NavLink, useLocation } from "react-router-dom";
import { User, LogOut } from "lucide-react";
import {
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  useSidebar,
} from "@/components/ui/sidebar";
import { useAuth } from "@/contexts/AuthContext";
import { universalRoutes } from "./sidebarRoutes";

const SidebarFooterActions = () => {
  const { logout } = useAuth();
  const location = useLocation();
  const { state } = useSidebar();

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <SidebarMenuButton
          asChild
          isActive={location.pathname === "/profile"}
          tooltip={state === "collapsed" ? "Profile" : undefined}
        >
          <NavLink to="/profile">
            <User className="h-5 w-5" />
            <span>Profile</span>
          </NavLink>
        </SidebarMenuButton>
      </SidebarMenuItem>
      
      {/* Universal navigation items */}
      {universalRoutes.filter(route => route.href !== "/dashboard").map(route => (
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
      
      <SidebarMenuItem>
        <SidebarMenuButton
          onClick={logout}
          tooltip={state === "collapsed" ? "Sign Out" : undefined}
        >
          <LogOut className="h-5 w-5" />
          <span>Sign Out</span>
        </SidebarMenuButton>
      </SidebarMenuItem>
    </SidebarMenu>
  );
};

export default SidebarFooterActions;
