
import React from "react";
import { useAuth } from "@/contexts/AuthContext";
import { Loader } from "@/components/ui/loader";
import { NotLoggedInView } from "@/components/dashboard/NotLoggedInView";
import { DashboardSelector } from "@/components/dashboard/DashboardSelector";
import Layout from "@/components/Layout";
import { UserRole } from "@/types/roles";

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

  return <DashboardSelector userRole={user.role as UserRole} />;
};

export default DashboardManager;
