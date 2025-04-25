
import React, { useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { UserRole } from "@/types/roles";
import { DashboardSelector } from "@/components/dashboard/DashboardSelector";
import { Loader } from "@/components/ui/loader";
import { supabase } from "@/integrations/supabase/client";

const DashboardManager = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [isCheckingOnboarding, setIsCheckingOnboarding] = useState(true);
  
  // Check if user has completed onboarding
  useEffect(() => {
    const checkOnboardingStatus = async () => {
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
        setIsCheckingOnboarding(false);
      }
    };
    
    checkOnboardingStatus();
  }, [user, navigate]);

  if (!user) {
    return <Navigate to="/login" />;
  }

  if (isCheckingOnboarding) {
    return (
      <div className="flex h-full w-full items-center justify-center p-8">
        <Loader size="lg" />
      </div>
    );
  }

  return <DashboardSelector userRole={user.role as UserRole} />;
};

export default DashboardManager;
