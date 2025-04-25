
import React, { lazy } from "react";
import { Routes, Route } from "react-router-dom";
import Layout from "@/components/Layout";
import { ProtectedRoute } from "./ProtectedRoute";
import { UserRole } from "@/types/roles";

// Lazy load student pages to improve initial load performance
const StudentDashboard = lazy(() => import("@/pages/StudentDashboard"));
const StudentDashboardEnhanced = lazy(() => import("@/pages/StudentDashboardEnhanced"));
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
        <Layout>
          <StudentDashboard />
        </Layout>
      </ProtectedRoute>
    )
  },
  {
    path: "/student-dashboard-enhanced",
    element: (
      <ProtectedRoute requiredRole={[UserRole.student]}>
        <Layout>
          <StudentDashboardEnhanced />
        </Layout>
      </ProtectedRoute>
    )
  },
  {
    path: "/sel-pathways",
    element: (
      <ProtectedRoute requiredRole={[UserRole.student]}>
        <Layout>
          <SELPathways />
        </Layout>
      </ProtectedRoute>
    )
  },
  {
    path: "/check-in",
    element: (
      <ProtectedRoute requiredRole={[UserRole.student]}>
        <Layout>
          <CheckIn />
        </Layout>
      </ProtectedRoute>
    )
  },
  {
    path: "/mental-health-toolkit",
    element: (
      <ProtectedRoute requiredRole={[UserRole.student]}>
        <Layout>
          <MentalHealthToolkit />
        </Layout>
      </ProtectedRoute>
    )
  },
  {
    path: "/digital-journal",
    element: (
      <ProtectedRoute requiredRole={[UserRole.student]}>
        <Layout>
          <DigitalJournal />
        </Layout>
      </ProtectedRoute>
    )
  },
  {
    path: "/reset-room",
    element: (
      <ProtectedRoute requiredRole={[UserRole.student]}>
        <Layout>
          <ResetRoom />
        </Layout>
      </ProtectedRoute>
    )
  },
  {
    path: "/trusted-adults",
    element: (
      <ProtectedRoute requiredRole={[UserRole.student]}>
        <Layout>
          <TrustedAdults />
        </Layout>
      </ProtectedRoute>
    )
  },
  {
    path: "/profile",
    element: (
      <ProtectedRoute requiredRole={[UserRole.student]}>
        <Layout>
          <UserProfile />
        </Layout>
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
