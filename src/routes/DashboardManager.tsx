
import React, { useEffect, useState, useCallback } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { UserRole } from "@/types/roles";
import { DashboardSelector } from "@/components/dashboard/DashboardSelector";
import { Loader } from "@/components/ui/loader";
import { supabase } from "@/integrations/supabase/client";
import GlobalErrorBoundary from "@/components/error-handling/GlobalErrorBoundary";
import FallbackErrorPage from "@/components/error-handling/FallbackErrorPage";
import { ErrorLoggingService } from "@/services/ErrorLoggingService";
import { ErrorMonitoringService } from "@/services/ErrorMonitoringService";
import { useOnboardingStatus } from "@/hooks/useOnboardingStatus";
import { toast } from "sonner";

const DashboardManager = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [isErrorRecovering, setIsErrorRecovering] = useState(false);
  const [dashboardError, setDashboardError] = useState<Error | null>(null);
  const { isCompleted, isLoading: isCheckingOnboarding } = useOnboardingStatus();
  
  // Initialize error monitoring on component mount
  useEffect(() => {
    ErrorMonitoringService.initialize().catch(err => 
      console.error("Failed to initialize error monitoring:", err)
    );
  }, []);
  
  if (!user) {
    return <Navigate to="/login" />;
  }

  // Only check onboarding after we know the user is authenticated
  if (isCheckingOnboarding) {
    return (
      <div className="flex h-full w-full items-center justify-center p-8">
        <Loader size="lg" />
      </div>
    );
  }

  // Redirect to appropriate onboarding if needed
  if (!isCompleted) {
    const onboardingPath = `/onboarding/${user.role.toLowerCase()}`;
    if (window.location.pathname !== onboardingPath) {
      return <Navigate to={onboardingPath} />;
    }
  }

  // User has completed onboarding, show dashboard
  return (
    <GlobalErrorBoundary 
      component="DashboardSelector" 
      fallback={<FallbackErrorPage />}
    >
      <DashboardSelector userRole={user.role as UserRole} />
    </GlobalErrorBoundary>
  );
};

export default DashboardManager;
