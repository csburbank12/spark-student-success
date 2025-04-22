
import React from "react";
import { useAuth } from "@/contexts/AuthContext";
import StudentDashboardEnhanced from "@/pages/StudentDashboardEnhanced";
import TeacherDashboardEnhanced from "@/pages/TeacherDashboardEnhanced";
import AdminDashboardEnhanced from "@/pages/AdminDashboardEnhanced";
import ParentDashboardEnhanced from "@/pages/ParentDashboardEnhanced";
import { UserRole } from "@/types";

const DashboardManager: React.FC = () => {
  const { user } = useAuth();

  if (!user) {
    return <div>Loading...</div>;
  }

  // Render the appropriate dashboard based on user role
  switch (user.role as UserRole) {
    case "student":
      return <StudentDashboardEnhanced />;
    case "teacher":
      return <TeacherDashboardEnhanced />;
    case "admin":
      return <AdminDashboardEnhanced />;
    case "parent":
      return <ParentDashboardEnhanced />;
    default:
      return <div>Unknown user role</div>;
  }
};

export default DashboardManager;
