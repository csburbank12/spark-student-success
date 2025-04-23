
import React from "react";
import { useAuth } from "@/contexts/AuthContext";
import StudentDashboardEnhanced from "@/pages/StudentDashboardEnhanced";
import TeacherDashboardEnhanced from "@/pages/TeacherDashboardEnhanced";
import AdminDashboardEnhanced from "@/pages/AdminDashboardEnhanced";
import ParentDashboardEnhanced from "@/pages/ParentDashboardEnhanced";
import { UserRole } from "@/types/roles";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

// First fix the DashboardLayout component to accept children
const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  return (
    <div className="dashboard-layout">
      {/* You can add common dashboard elements here (like a header or sidebar) */}
      <div className="dashboard-content">
        {children}
      </div>
    </div>
  );
};

const DashboardManager: React.FC = () => {
  const { user } = useAuth();

  if (!user) {
    return <div>Loading...</div>;
  }

  // Render the appropriate dashboard based on user role
  const userRole = user.role;
  
  switch (userRole) {
    case UserRole.student.toString():
      return <StudentDashboardEnhanced />;
    case UserRole.teacher.toString():
    case UserRole.staff.toString():
      return <TeacherDashboardEnhanced />;
    case UserRole.admin.toString():
      return <AdminDashboardEnhanced />;
    case UserRole.parent.toString():
      return <ParentDashboardEnhanced />;
    default:
      return <div>Unknown user role</div>;
  }
};

export default DashboardManager;
export { DashboardLayout };
