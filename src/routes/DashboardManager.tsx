
import React from "react";
import { useAuth } from "@/contexts/AuthContext";
import { UserRole } from "@/types/roles";
import { DashboardSelector } from "@/components/dashboard/DashboardSelector";
import { Loader } from "@/components/ui/loader";
import { Navigate } from "react-router-dom";
import { toast } from "sonner";

const DashboardManager = () => {
  const { user, isLoading } = useAuth();

  React.useEffect(() => {
    // Show welcome toast when dashboard loads
    if (user) {
      toast.success(`Welcome, ${user.name || 'User'}`, {
        description: `You're logged in as ${user.role}`,
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
    return <Navigate to="/login" replace />;
  }

  // Always show the correct dashboard based on user role
  return <DashboardSelector userRole={user.role as UserRole} />;
};

export default DashboardManager;
