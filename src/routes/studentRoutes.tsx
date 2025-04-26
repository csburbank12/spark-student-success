import React, { lazy } from "react";
import LayoutWrapper from "@/components/Layout"; // Changed to use LayoutWrapper
import { ProtectedRoute } from "./ProtectedRoute";
import { UserRole } from "@/types/roles";

// Lazy load student pages to improve initial load performance
const StudentDashboard = lazy(() => import("@/pages/StudentDashboard"));
const SELPathways = lazy(() => import("@/pages/PersonalizedSELPathways"));
const CheckIn = lazy(() => import("@/pages/CheckIn"));
const MentalHealthToolkit = lazy(() => import("@/pages/MentalHealthToolkit"));
const DigitalJournal = lazy(() => import("@/pages/DigitalJournal"));
const ResetRoom = lazy(() => import("@/pages/ResetRoom"));
const TrustedAdults = lazy(() => import("@/pages/TrustedAdults"));
const UserProfile = lazy(() => import("@/pages/profile/UserProfile"));
const StudentOnboarding = lazy(() => import("@/pages/onboarding/StudentOnboarding"));

const studentRoutes = [
  {
    path: "/student-dashboard",
    element: (
      <ProtectedRoute requiredRole={[UserRole.student]}>
        <LayoutWrapper>
          <StudentDashboard />
        </LayoutWrapper>
      </ProtectedRoute>
    )
  },
  // Remove duplicate dashboard route
  {
    path: "/sel-pathways",
    element: (
      <ProtectedRoute requiredRole={[UserRole.student]}>
        <LayoutWrapper>
          <SELPathways />
        </LayoutWrapper>
      </ProtectedRoute>
    )
  },
  {
    path: "/check-in",
    element: (
      <ProtectedRoute requiredRole={[UserRole.student]}>
        <LayoutWrapper>
          <CheckIn />
        </LayoutWrapper>
      </ProtectedRoute>
    )
  },
  {
    path: "/mental-health-toolkit",
    element: (
      <ProtectedRoute requiredRole={[UserRole.student]}>
        <LayoutWrapper>
          <MentalHealthToolkit />
        </LayoutWrapper>
      </ProtectedRoute>
    )
  },
  {
    path: "/digital-journal",
    element: (
      <ProtectedRoute requiredRole={[UserRole.student]}>
        <LayoutWrapper>
          <DigitalJournal />
        </LayoutWrapper>
      </ProtectedRoute>
    )
  },
  {
    path: "/reset-room",
    element: (
      <ProtectedRoute requiredRole={[UserRole.student]}>
        <LayoutWrapper>
          <ResetRoom />
        </LayoutWrapper>
      </ProtectedRoute>
    )
  },
  {
    path: "/trusted-adults",
    element: (
      <ProtectedRoute requiredRole={[UserRole.student]}>
        <LayoutWrapper>
          <TrustedAdults />
        </LayoutWrapper>
      </ProtectedRoute>
    )
  },
  {
    path: "/profile",
    element: (
      <ProtectedRoute requiredRole={[UserRole.student]}>
        <LayoutWrapper>
          <UserProfile />
        </LayoutWrapper>
      </ProtectedRoute>
    )
  },
  {
    path: "/onboarding/student",
    element: (
      <ProtectedRoute requiredRole={[UserRole.student]}>
        <StudentOnboarding />
      </ProtectedRoute>
    )
  }
];

export default studentRoutes;
