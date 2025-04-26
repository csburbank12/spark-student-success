
import React from "react";
import { useAuth } from "@/contexts/AuthContext";
import { SidebarTrigger } from "@/components/ui/sidebar/components/sidebar-trigger";
import { useIsMobile } from "@/hooks/use-mobile";
import { TeacherHeaderActions } from "@/components/teacher/TeacherHeaderActions";
import { UserRole } from "@/types/roles";

export const RoleBasedHeader = () => {
  const { user } = useAuth();
  const isMobile = useIsMobile();

  const getHeaderTitle = () => {
    if (!user?.role) return 'Dashboard';
    
    switch(user.role) {
      case UserRole.student:
        return 'Student Dashboard';
      case UserRole.teacher:
        return 'Teacher Dashboard';
      case UserRole.admin:
        return 'Admin Dashboard';
      case UserRole.parent:
        return 'Parent Dashboard';
      case UserRole.staff:
        return 'Staff Dashboard';
      case UserRole.counselor:
        return 'Counselor Dashboard';
      default:
        return 'Dashboard';
    }
  };

  return (
    <header className="sticky top-0 z-40">
      <div className="flex items-center gap-4 border-b bg-navbar px-4 md:px-6 py-4 backdrop-blur-sm">
        {isMobile && <SidebarTrigger />}
        <div className="flex flex-1 items-center justify-between">
          <h2 className="text-lg font-semibold">
            {getHeaderTitle()}
          </h2>
          {user?.role === UserRole.teacher && <TeacherHeaderActions />}
        </div>
      </div>
    </header>
  );
};
