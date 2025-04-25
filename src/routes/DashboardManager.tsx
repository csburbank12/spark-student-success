
import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { UserRole } from "@/types/roles";
import { DashboardSelector } from "@/components/dashboard/DashboardSelector";
import GlobalErrorBoundary from "@/components/error-handling/GlobalErrorBoundary";
import FallbackErrorPage from "@/components/error-handling/FallbackErrorPage";
import { ErrorMonitoringService } from "@/services/ErrorMonitoringService";
import { AppShell } from "@/components/layout/AppShell";

const DashboardManager = () => {
  const { user } = useAuth();
  
  // Initialize error monitoring on component mount
  React.useEffect(() => {
    ErrorMonitoringService.initialize().catch(err => 
      console.error("Failed to initialize error monitoring:", err)
    );
  }, []);
  
  if (!user) {
    return <Navigate to="/login" />;
  }

  // User is authenticated, show appropriate dashboard
  return (
    <AppShell>
      <GlobalErrorBoundary 
        component="DashboardSelector" 
        fallback={<FallbackErrorPage />}
      >
        <DashboardSelector userRole={user.role as UserRole} />
      </GlobalErrorBoundary>
    </AppShell>
  );
};

export default DashboardManager;
