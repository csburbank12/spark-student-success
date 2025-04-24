import React, { useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { UserRole } from "@/types/roles";
import { DashboardSelector } from "@/components/dashboard/DashboardSelector";
import { Loader } from "@/components/ui/loader";
import { Navigate, useNavigate } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";

const DashboardManager = () => {
  const { user, isLoading } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    // Show welcome toast when dashboard loads
    if (user) {
      toast({
        title: `Welcome, ${user.name || 'User'}`,
        description: `You're logged in as ${user.role}`,
      });
    }
  }, [user, toast]);

  if (isLoading) {
    return (
      <div className="flex h-full items-center justify-center">
        <Loader size="lg" />
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // Redirect to role-specific dashboard
  const getDashboardPath = (role: string) => {
    switch(role) {
      case UserRole.student:
        return "/student-dashboard";
      case UserRole.teacher:
        return "/teacher-dashboard";
      case UserRole.admin:
        return "/admin-dashboard";
      case UserRole.parent:
        return "/parent-dashboard";
      case UserRole.staff:
        return "/staff-dashboard";
      default:
        return "/dashboard";
    }
  };

  const dashboardPath = getDashboardPath(user.role);
  
  // If we're already on the specific dashboard path, render the dashboard
  // Otherwise, redirect to the proper path
  if (window.location.pathname === "/dashboard") {
    return <Navigate to={dashboardPath} replace />;
  }

  return <DashboardSelector userRole={user.role as UserRole} />;
};

export default DashboardManager;
