
import React from "react";
import { useAuth } from "@/contexts/AuthContext";
import { SidebarTrigger } from "@/components/ui/sidebar/components/sidebar-trigger";
import { useIsMobile } from "@/hooks/use-mobile";
import { TeacherDashboardHeader } from "@/components/teacher/TeacherDashboardHeader";
import { UserRole } from "@/types/roles";

export const RoleBasedHeader = () => {
  const { user } = useAuth();
  const isMobile = useIsMobile();

  if (user?.role === UserRole.teacher) {
    return (
      <header className="sticky top-0" style={{ zIndex: 'var(--z-header)' }}>
        <div className="border-b bg-navbar px-4 md:px-6 py-4 backdrop-blur-sm">
          {isMobile && <SidebarTrigger />}
          <TeacherDashboardHeader />
        </div>
      </header>
    );
  }

  return (
    <header className="sticky top-0" style={{ zIndex: 'var(--z-header)' }}>
      <div className="flex h-14 items-center gap-4 border-b bg-navbar px-4 md:px-6 backdrop-blur-sm">
        {isMobile && <SidebarTrigger />}
        <div className="flex-1">
          <h1 className="text-lg font-semibold">
            {user?.role ? `${user.role.charAt(0).toUpperCase() + user.role.slice(1)} Dashboard` : 'Dashboard'}
          </h1>
        </div>
      </div>
    </header>
  );
};
