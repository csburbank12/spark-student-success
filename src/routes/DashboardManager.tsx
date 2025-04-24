
import React from "react";
import { useAuth } from "@/contexts/AuthContext";
import { Loader } from "@/components/ui/loader";
import { NotLoggedInView } from "@/components/dashboard/NotLoggedInView";
import { DashboardSelector } from "@/components/dashboard/DashboardSelector";
import { UserRole } from "@/types/roles";
import Layout from "@/components/Layout";

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
    return <NotLoggedInView />;
  }

  // Return the dashboard selector without any additional redirects
  return <DashboardSelector userRole={user.role as UserRole} />;
};

export default DashboardManager;
