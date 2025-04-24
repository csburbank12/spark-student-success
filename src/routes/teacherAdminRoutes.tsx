
import React from "react";
import { ProtectedRoute } from "./ProtectedRoute";
import { UserRole } from "@/types/roles";
import TeacherDashboard from "@/pages/TeacherDashboard"; 
import TeacherDashboardEnhanced from "@/pages/TeacherDashboardEnhanced";
import StudentManagement from "@/pages/StudentManagement";
import BehaviorPrediction from "@/pages/BehaviorPrediction";
import SELPathwayManagement from "@/pages/SELPathwayManagement";
import EmotionAwareScheduling from "@/pages/EmotionAwareScheduling";
import WellLensDashboard from "@/pages/WellLensDashboard";
import PredictiveSupport from "@/pages/PredictiveSupport";

// Export the routes as both default and named export for backwards compatibility
export const teacherAdminRoutes = [
  {
    path: "/teacher-dashboard",
    element: (
      <ProtectedRoute requiredRole={[UserRole.teacher, UserRole.admin]}>
        <TeacherDashboard />
      </ProtectedRoute>
    ),
  },
  {
    path: "/teacher-dashboard-enhanced",
    element: (
      <ProtectedRoute requiredRole={[UserRole.teacher, UserRole.admin]}>
        <TeacherDashboardEnhanced />
      </ProtectedRoute>
    ),
  },
  {
    path: "/student-management",
    element: (
      <ProtectedRoute requiredRole={[UserRole.teacher, UserRole.admin]}>
        <StudentManagement />
      </ProtectedRoute>
    ),
  },
  {
    path: "/students",
    element: (
      <ProtectedRoute requiredRole={[UserRole.teacher, UserRole.admin]}>
        <StudentManagement />
      </ProtectedRoute>
    ),
  },
  {
    path: "/behavior-prediction",
    element: (
      <ProtectedRoute requiredRole={[UserRole.teacher, UserRole.admin]}>
        <BehaviorPrediction />
      </ProtectedRoute>
    ),
  },
  {
    path: "/sel-pathways-management",
    element: (
      <ProtectedRoute requiredRole={[UserRole.teacher, UserRole.admin]}>
        <SELPathwayManagement />
      </ProtectedRoute>
    ),
  },
  {
    path: "/emotion-aware-scheduling",
    element: (
      <ProtectedRoute requiredRole={[UserRole.teacher, UserRole.admin]}>
        <EmotionAwareScheduling />
      </ProtectedRoute>
    ),
  },
  {
    path: "/well-lens",
    element: (
      <ProtectedRoute requiredRole={[UserRole.teacher, UserRole.admin]}>
        <WellLensDashboard />
      </ProtectedRoute>
    ),
  },
  {
    path: "/predictive-support",
    element: (
      <ProtectedRoute requiredRole={[UserRole.teacher, UserRole.admin]}>
        <PredictiveSupport />
      </ProtectedRoute>
    ),
  },
];

export default teacherAdminRoutes;
