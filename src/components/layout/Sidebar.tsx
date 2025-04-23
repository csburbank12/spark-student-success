
import React from "react";
import {
  Sidebar as SidebarContainer,
  SidebarContent,
  SidebarHeader,
  SidebarFooter,
  useSidebar,
} from "@/components/ui/sidebar";
import SidebarNavLinks from "./SidebarNavLinks";
import SidebarFooterActions from "./SidebarFooterActions";
import { useAuth } from "@/contexts/AuthContext";
import {
  teacherAdminRoutes,
  studentRoutes,
  adminRoutes,
  parentRoutes,
} from "./sidebarRoutes";

const Sidebar = () => {
  const { user } = useAuth();

  const isTeacherOrAdmin =
    user?.role === "teacher" || user?.role === "administrator";
  const isStudent = user?.role === "student";
  const isAdmin = user?.role === "admin";
  const isParent = user?.role === "parent";

  let routes = [];
  if (isTeacherOrAdmin) {
    routes = teacherAdminRoutes;
  } else if (isStudent) {
    routes = studentRoutes;
  } else if (isAdmin) {
    routes = adminRoutes;
  } else if (isParent) {
    routes = parentRoutes;
  }

  return (
    <SidebarContainer>
      <SidebarHeader>
        <div className="flex h-14 items-center px-4">
          <span className="font-semibold text-xl">Beacon</span>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarNavLinks routes={routes} />
      </SidebarContent>
      <SidebarFooter>
        <SidebarFooterActions />
      </SidebarFooter>
    </SidebarContainer>
  );
};

export default Sidebar;
