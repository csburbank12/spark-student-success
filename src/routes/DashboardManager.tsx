
import React from "react";
import { useAuth } from "@/contexts/AuthContext";
import StudentDashboardEnhanced from "@/pages/StudentDashboardEnhanced";
import TeacherDashboardEnhanced from "@/pages/TeacherDashboardEnhanced";
import AdminDashboardEnhanced from "@/pages/AdminDashboardEnhanced";
import ParentDashboardEnhanced from "@/pages/ParentDashboardEnhanced";
import { UserRole } from "@/types/roles";
import { Loader } from "@/components/ui/loader";

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
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="flex h-full items-center justify-center">
        <Loader size="lg" />
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex h-full items-center justify-center">
        <div className="text-center">
          <h2 className="text-lg font-medium mb-2">Not logged in</h2>
          <p className="text-muted-foreground">Please log in to view your dashboard.</p>
        </div>
      </div>
    );
  }

  // Render the appropriate dashboard based on user role
  const userRole = user.role as UserRole;
  
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
      return (
        <div className="flex h-full items-center justify-center">
          <div className="text-center">
            <h2 className="text-lg font-medium mb-2">Unknown user role</h2>
            <p className="text-muted-foreground">Please contact an administrator.</p>
          </div>
        </div>
      );
  }
};

export default DashboardManager;
export { DashboardLayout };
