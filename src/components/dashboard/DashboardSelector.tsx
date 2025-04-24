
import React from "react";
import { UserRole } from "@/types/roles";
import StudentDashboardEnhanced from "@/pages/StudentDashboardEnhanced";
import TeacherDashboardEnhanced from "@/pages/TeacherDashboardEnhanced";
import AdminDashboardEnhanced from "@/pages/AdminDashboardEnhanced";
import ParentDashboardEnhanced from "@/pages/ParentDashboardEnhanced";
import { UnknownRoleView } from "./UnknownRoleView";

interface DashboardSelectorProps {
  userRole: UserRole;
}

export const DashboardSelector: React.FC<DashboardSelectorProps> = ({ userRole }) => {
  switch (userRole) {
    case UserRole.student:
      return <StudentDashboardEnhanced />;
    case UserRole.teacher:
      return <TeacherDashboardEnhanced />;
    case UserRole.admin:
      return <AdminDashboardEnhanced />;
    case UserRole.parent:
      return <ParentDashboardEnhanced />;
    default:
      return <UnknownRoleView />;
  }
};
