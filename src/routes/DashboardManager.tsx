
import React, { useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { UserRole } from "@/types/roles";
import { DashboardSelector } from "@/components/dashboard/DashboardSelector";
import { Loader } from "@/components/ui/loader";
import { Navigate, useLocation } from "react-router-dom";
import { toast } from "sonner";

const DashboardManager = () => {
  const { user, isLoading } = useAuth();
  const location = useLocation();

  useEffect(() => {
    // Show welcome toast when dashboard loads
    if (user) {
      const roleDisplay = user.role.charAt(0).toUpperCase() + user.role.slice(1);
      toast.success(`Welcome, ${user.name || 'User'}`, {
        description: `You're logged in as ${roleDisplay}`,
        duration: 5000,
      });
    }
  }, [user]);

  if (isLoading) {
    return (
      <div className="flex h-full items-center justify-center">
        <Loader size="lg" />
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" state={{ from: location.pathname }} replace />;
  }

  // Always show the correct dashboard based on user role
  return <DashboardSelector userRole={user.role as UserRole} />;
};

export default DashboardManager;
