
import React from "react";
import { Route } from "react-router-dom";
import TeacherOnboarding from "@/pages/onboarding/TeacherOnboarding";
import StudentOnboarding from "@/pages/onboarding/StudentOnboarding";
import ParentOnboarding from "@/pages/onboarding/ParentOnboarding";
import { UserRole } from "@/types/roles";
import GlobalErrorBoundary from "@/components/error-handling/GlobalErrorBoundary";
import FallbackErrorPage from "@/components/error-handling/FallbackErrorPage";

// Onboarding routes should be public routes not requiring authentication
const onboardingRoutes = [
  {
    path: "/onboarding/teacher",
    element: (
      <GlobalErrorBoundary 
        component="TeacherOnboarding"
        fallback={<FallbackErrorPage />}
      >
        <TeacherOnboarding />
      </GlobalErrorBoundary>
    ),
  },
  {
    path: "/onboarding/student",
    element: (
      <GlobalErrorBoundary 
        component="StudentOnboarding"
        fallback={<FallbackErrorPage />}
      >
        <StudentOnboarding />
      </GlobalErrorBoundary>
    ),
  },
  {
    path: "/onboarding/parent",
    element: (
      <GlobalErrorBoundary 
        component="ParentOnboarding"
        fallback={<FallbackErrorPage />}
      >
        <ParentOnboarding />
      </GlobalErrorBoundary>
    ),
  },
];

export default onboardingRoutes;
