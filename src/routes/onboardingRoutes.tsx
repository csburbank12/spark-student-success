
import React from "react";
import { Route } from "react-router-dom";
import TeacherOnboarding from "@/pages/onboarding/TeacherOnboarding";
import StudentOnboarding from "@/pages/onboarding/StudentOnboarding";
import ParentOnboarding from "@/pages/onboarding/ParentOnboarding";
import { UserRole } from "@/types/roles";
import GlobalErrorBoundary from "@/components/error-handling/GlobalErrorBoundary";
import FallbackErrorPage from "@/components/error-handling/FallbackErrorPage";
import Layout from "@/components/Layout";

// Onboarding routes should require authentication
const onboardingRoutes = [
  {
    path: "/onboarding/teacher",
    element: (
      <GlobalErrorBoundary 
        component="TeacherOnboarding"
        fallback={<FallbackErrorPage />}
      >
        <Layout>
          <TeacherOnboarding />
        </Layout>
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
        <Layout>
          <StudentOnboarding />
        </Layout>
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
        <Layout>
          <ParentOnboarding />
        </Layout>
      </GlobalErrorBoundary>
    ),
  },
];

export default onboardingRoutes;
