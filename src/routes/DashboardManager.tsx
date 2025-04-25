
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
import { toast } from "sonner";

const DashboardManager = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [isCheckingOnboarding, setIsCheckingOnboarding] = useState(true);
  const [dashboardError, setDashboardError] = useState<Error | null>(null);
  const [isErrorRecovering, setIsErrorRecovering] = useState(false);
  
  // Initialize error monitoring on component mount
  useEffect(() => {
    ErrorMonitoringService.initialize().catch(err => 
      console.error("Failed to initialize error monitoring:", err)
    );
  }, []);
  
  // Check if user has completed onboarding
  const checkOnboardingStatus = useCallback(async () => {
    if (!user) return;
    
    try {
      // In a real app, we would check the database for onboarding status
      // For now, we'll simulate this with localStorage
      const hasCompletedOnboarding = localStorage.getItem(`onboarding-${user.id}`);
      
      if (!hasCompletedOnboarding) {
        // Redirect to the appropriate onboarding flow based on user role
        switch(user.role) {
          case UserRole.teacher:
            navigate("/onboarding/teacher");
            break;
          case UserRole.student:
            navigate("/onboarding/student");
            break;
          case UserRole.parent:
            navigate("/onboarding/parent");
            break;
          case UserRole.admin:
            // Admins don't need onboarding in this flow
            setIsCheckingOnboarding(false);
            break;
          default:
            setIsCheckingOnboarding(false);
        }
      } else {
        setIsCheckingOnboarding(false);
      }
    } catch (error) {
      console.error("Error checking onboarding status:", error);
      
      // Log the error
      if (error instanceof Error) {
        ErrorLoggingService.logError({
          action: "dashboard_onboarding_check",
          error_message: error.message,
          profile_type: user.role as any || 'unknown'
        });
        
        // Store the error for potential display
        setDashboardError(error);
      }
      
      // Even if there's an error, allow users to continue to prevent them being stuck
      setIsCheckingOnboarding(false);
      
      // Attempt auto-recovery
      attemptErrorRecovery();
    }
  }, [user, navigate]);
  
  useEffect(() => {
    checkOnboardingStatus();
  }, [checkOnboardingStatus]);
  
  // Function to attempt auto-recovery from errors
  const attemptErrorRecovery = async () => {
    setIsErrorRecovering(true);
    
    try {
      // Try to reconnect to Supabase if that was the issue
      const { data, error } = await supabase.auth.getSession();
      
      if (error) {
        throw error;
      }
      
      if (data.session) {
        // Session exists but maybe there was an intermittent issue
        // Let's clear any previous errors and try again
        setDashboardError(null);
        toast.success("Connection restored", {
          description: "The system has recovered from a temporary issue"
        });
      }
    } catch (error) {
      console.error("Error recovery failed:", error);
      toast.error("Error recovery failed", {
        description: "Please try refreshing the page"
      });
    } finally {
      setIsErrorRecovering(false);
    }
  };

  // Handle error reset from the error boundary
  const handleErrorReset = () => {
    setDashboardError(null);
    checkOnboardingStatus();
  };
  
  if (!user) {
    return <Navigate to="/login" />;
  }

  if (isCheckingOnboarding || isErrorRecovering) {
    return (
      <div className="flex h-full w-full items-center justify-center p-8">
        <Loader size="lg" />
        {isErrorRecovering && (
          <div className="mt-4 text-center">
            <p className="text-muted-foreground">Attempting to recover...</p>
          </div>
        )}
      </div>
    );
  }

  if (dashboardError) {
    return (
      <FallbackErrorPage 
        error={dashboardError} 
        resetErrorBoundary={handleErrorReset} 
        isAdmin={user.role === UserRole.admin}
      />
    );
  }

  return (
    <GlobalErrorBoundary component="DashboardSelector" fallback={<FallbackErrorPage />}>
      <DashboardSelector userRole={user.role as UserRole} />
    </GlobalErrorBoundary>
  );
};

export default DashboardManager;
