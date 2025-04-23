
import React from "react";
import TeacherDashboard from "@/pages/TeacherDashboard";
import TeacherDashboardEnhanced from "@/pages/TeacherDashboardEnhanced";
import PredictiveSupportEngine from "@/components/predictive-support/PredictiveSupportEngine";
import StaffAssistMode from "@/pages/StaffAssistMode";
import EmotionScheduling from "@/pages/EmotionScheduling";
import CheckIn from "@/pages/CheckIn";
import StudentInterventionView from "@/components/teacher/StudentInterventionView";
import { ProtectedRoute } from "./ProtectedRoute";
import { UserRole } from "@/types/roles";
import SELPathwayManagement from "@/pages/SELPathwayManagement";

export const teacherAdminRoutes = [
  {
    path: "/teacher-dashboard",
    element: (
      <ProtectedRoute requiredRole={[UserRole.teacher, UserRole.staff, UserRole.admin]}>
        <TeacherDashboard />
      </ProtectedRoute>
    ),
  },
  {
    path: "/teacher-dashboard-enhanced",
    element: (
      <ProtectedRoute requiredRole={[UserRole.teacher, UserRole.staff, UserRole.admin]}>
        <TeacherDashboardEnhanced />
      </ProtectedRoute>
    ),
  },
  {
    path: "/student/:studentId",
    element: (
      <ProtectedRoute requiredRole={[UserRole.teacher, UserRole.staff, UserRole.admin]}>
        <StudentInterventionView />
      </ProtectedRoute>
    ),
  },
  {
    path: "/predictive-support",
    element: (
      <ProtectedRoute requiredRole={[UserRole.teacher, UserRole.staff, UserRole.admin]}>
        <PredictiveSupportEngine />
      </ProtectedRoute>
    ),
  },
  {
    path: "/staff-assist",
    element: (
      <ProtectedRoute requiredRole={[UserRole.teacher, UserRole.staff, UserRole.admin]}>
        <StaffAssistMode />
      </ProtectedRoute>
    ),
  },
  {
    path: "/emotion-aware-scheduling",
    element: (
      <ProtectedRoute requiredRole={[UserRole.teacher, UserRole.staff, UserRole.admin]}>
        <EmotionScheduling />
      </ProtectedRoute>
    ),
  },
  {
    path: "/check-in",
    element: (
      <ProtectedRoute requiredRole={[UserRole.teacher, UserRole.student, UserRole.admin]}>
        <CheckIn />
      </ProtectedRoute>
    ),
  },
  {
    path: "/sel-pathway-management",
    element: (
      <ProtectedRoute requiredRole={[UserRole.teacher, UserRole.staff, UserRole.admin]}>
        <SELPathwayManagement />
      </ProtectedRoute>
    ),
  }
];
