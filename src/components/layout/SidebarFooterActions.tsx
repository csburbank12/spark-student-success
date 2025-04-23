
import React from "react";
import { NavLink, useLocation } from "react-router-dom";
import { User } from "lucide-react";
import {
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  useSidebar,
} from "@/components/ui/sidebar";
import { useAuth } from "@/contexts/AuthContext";

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
      <SidebarMenuItem>
        <SidebarMenuButton
          onClick={logout}
          tooltip={state === "collapsed" ? "Sign Out" : undefined}
        >
          <User className="h-5 w-5" />
          <span>Sign Out</span>
        </SidebarMenuButton>
      </SidebarMenuItem>
    </SidebarMenu>
  );
};

export default SidebarFooterActions;
