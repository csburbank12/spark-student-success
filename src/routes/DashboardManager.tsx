
import React from "react";
import { useAuth } from "@/contexts/AuthContext";
import { UserRole } from "@/types/roles";
import { DashboardSelector } from "@/components/dashboard/DashboardSelector";
import { Loader } from "@/components/ui/loader";
import { Navigate } from "react-router-dom";

const DashboardManager = () => {
  const { user, isLoading } = useAuth();

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

  return <DashboardSelector userRole={user.role as UserRole} />;
};

export default DashboardManager;
