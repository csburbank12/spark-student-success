
import React from "react";
import { UserRole } from "@/types/roles";
import StudentDashboard from "@/pages/StudentDashboard";
import TeacherDashboard from "@/pages/TeacherDashboard";
import AdminDashboard from "@/pages/AdminDashboard";
import ParentDashboard from "@/pages/ParentDashboard";
import { UnknownRoleView } from "./UnknownRoleView";

interface DashboardSelectorProps {
  userRole: UserRole;
}

export const DashboardSelector: React.FC<DashboardSelectorProps> = ({ userRole }) => {
  switch (userRole) {
    case UserRole.student:
      return <StudentDashboard />;
    case UserRole.teacher:
      return <TeacherDashboard />;
    case UserRole.admin:
      return <AdminDashboard />;
    case UserRole.parent:
      return <ParentDashboard />;
    default:
      return <UnknownRoleView />;
  }
};
