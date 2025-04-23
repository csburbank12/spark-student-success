
import React from "react";
import { ProtectedRoute } from "./ProtectedRoute";
import { UserRole } from "@/types/roles";
import StudentDashboard from "@/pages/StudentDashboard";
import StudentDashboardEnhanced from "@/pages/StudentDashboardEnhanced";
import MentalHealthToolkit from "@/pages/MentalHealthToolkit";
import DigitalJournal from "@/pages/DigitalJournal";
import ResetRoom from "@/pages/ResetRoom";
import CheckIn from "@/pages/CheckIn";
import TrustedAdults from "@/pages/TrustedAdults";
import PersonalizedSELPathways from "@/pages/PersonalizedSELPathways";

const studentRoutes = [
  {
    path: "/student-dashboard",
    element: (
      <ProtectedRoute requiredRole={[UserRole.student]}>
        <StudentDashboard />
      </ProtectedRoute>
    ),
  },
  {
    path: "/student-dashboard-enhanced",
    element: (
      <ProtectedRoute requiredRole={[UserRole.student]}>
        <StudentDashboardEnhanced />
      </ProtectedRoute>
    ),
  },
  {
    path: "/mental-health-toolkit",
    element: (
      <ProtectedRoute requiredRole={[UserRole.student]}>
        <MentalHealthToolkit />
      </ProtectedRoute>
    ),
  },
  {
    path: "/digital-journal",
    element: (
      <ProtectedRoute requiredRole={[UserRole.student]}>
        <DigitalJournal />
      </ProtectedRoute>
    ),
  },
  {
    path: "/reset-room",
    element: (
      <ProtectedRoute requiredRole={[UserRole.student]}>
        <ResetRoom />
      </ProtectedRoute>
    ),
  },
  {
    path: "/check-in",
    element: (
      <ProtectedRoute requiredRole={[UserRole.student]}>
        <CheckIn />
      </ProtectedRoute>
    ),
  },
  {
    path: "/trusted-adults",
    element: (
      <ProtectedRoute requiredRole={[UserRole.student]}>
        <TrustedAdults />
      </ProtectedRoute>
    ),
  },
  {
    path: "/sel-pathways",
    element: (
      <ProtectedRoute requiredRole={[UserRole.student]}>
        <PersonalizedSELPathways />
      </ProtectedRoute>
    ),
  },
];

export default studentRoutes;
