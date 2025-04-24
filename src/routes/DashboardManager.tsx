
import React from "react";
import { useAuth } from "@/contexts/AuthContext";
import StudentDashboardEnhanced from "@/pages/StudentDashboardEnhanced";
import TeacherDashboardEnhanced from "@/pages/TeacherDashboardEnhanced";
import AdminDashboardEnhanced from "@/pages/AdminDashboardEnhanced";
import ParentDashboardEnhanced from "@/pages/ParentDashboardEnhanced";
import { UserRole } from "@/types/roles";
import { Loader } from "@/components/ui/loader";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { DashboardLayout } from "@/components/Layout";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

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
          <p className="text-muted-foreground mb-4">Please log in to view your dashboard.</p>
          <Button asChild>
            <Link to="/login">Go to Login</Link>
          </Button>
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
            <p className="text-muted-foreground mb-4">Please contact an administrator.</p>
            <Button variant="outline" asChild>
              <Link to="/login">Back to Login</Link>
            </Button>
          </div>
        </div>
      );
  }
};

export default DashboardManager;
