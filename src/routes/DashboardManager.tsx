
import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { UserRole } from "@/types/roles";
import { DashboardSelector } from "@/components/dashboard/DashboardSelector";
import GlobalErrorBoundary from "@/components/error-handling/GlobalErrorBoundary";
import FallbackErrorPage from "@/components/error-handling/FallbackErrorPage";
import { ErrorMonitoringService } from "@/services/ErrorMonitoringService";
import Layout from "@/components/layout/Layout";

const DashboardManager = () => {
  const { user } = useAuth();
  
  React.useEffect(() => {
    ErrorMonitoringService.initialize().catch(err => 
      console.error("Failed to initialize error monitoring:", err)
    );
  }, []);
  
  if (!user) {
    return <Navigate to="/login" />;
  }

  return (
    <Layout>
      <GlobalErrorBoundary 
        component="DashboardSelector" 
        fallback={<FallbackErrorPage />}
      >
        <DashboardSelector userRole={user.role as UserRole} />
      </GlobalErrorBoundary>
    </Layout>
  );
};

export default DashboardManager;
