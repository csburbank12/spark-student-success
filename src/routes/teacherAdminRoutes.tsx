
import React from "react";
import { ProtectedRoute } from "./ProtectedRoute";
import { UserRole } from "@/types/roles";
import StaffAssistMode from "@/pages/StaffAssistMode";
import TeacherDashboard from "@/pages/TeacherDashboard";
import TeacherDashboardEnhanced from "@/pages/TeacherDashboardEnhanced";
import UserProfile from "@/pages/profile/UserProfile";
import EmotionAwareScheduling from "@/pages/EmotionAwareScheduling";
import PredictiveSupport from "@/pages/PredictiveSupport";
import SELPathwayManagement from "@/pages/SELPathwayManagement";

export const teacherAdminRoutes = [
  {
    path: "/teacher-dashboard",
    element: (
      <ProtectedRoute requiredRole={[UserRole.teacher, UserRole.staff]}>
        <TeacherDashboard />
      </ProtectedRoute>
    ),
  },
  {
    path: "/teacher-dashboard-enhanced",
    element: (
      <ProtectedRoute requiredRole={[UserRole.teacher, UserRole.staff]}>
        <TeacherDashboardEnhanced />
      </ProtectedRoute>
    ),
  },
  {
    path: "/staff-assist",
    element: (
      <ProtectedRoute requiredRole={[UserRole.teacher, UserRole.staff]}>
        <StaffAssistMode />
      </ProtectedRoute>
    ),
  },
  {
    path: "/sel-pathway-management",
    element: (
      <ProtectedRoute requiredRole={[UserRole.teacher, UserRole.staff]}>
        <SELPathwayManagement />
      </ProtectedRoute>
    ),
  },
  {
    path: "/emotion-aware-scheduling",
    element: (
      <ProtectedRoute requiredRole={[UserRole.teacher, UserRole.staff]}>
        <EmotionAwareScheduling />
      </ProtectedRoute>
    ),
  },
  {
    path: "/predictive-support",
    element: (
      <ProtectedRoute requiredRole={[UserRole.teacher, UserRole.staff]}>
        <PredictiveSupport />
      </ProtectedRoute>
    ),
  },
  {
    path: "/teacher-profile",
    element: (
      <ProtectedRoute requiredRole={[UserRole.teacher, UserRole.staff]}>
        <UserProfile />
      </ProtectedRoute>
    ),
  },
];
