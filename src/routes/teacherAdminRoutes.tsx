
import React, { lazy } from "react";
import { RouteObject } from "react-router-dom";
import { ProtectedRoute } from "./ProtectedRoute";
import { UserRole } from "@/types/roles";
import { useAuth } from "@/contexts/AuthContext";

// Lazy load components for better performance
const TeacherDashboard = lazy(() => import("@/pages/TeacherDashboard"));
const TeacherDashboardEnhanced = lazy(() => import("@/pages/TeacherDashboardEnhanced"));
const StaffAssistMode = lazy(() => import("@/pages/StaffAssistMode"));
const SELPathwayManagement = lazy(() => import("@/pages/SELPathwayManagement"));
const StudentManagement = lazy(() => import("@/pages/StudentManagement"));
const PredictiveSupport = lazy(() => import("@/pages/PredictiveSupport"));
const BehaviorPrediction = lazy(() => import("@/pages/BehaviorPrediction"));
const CheckIn = lazy(() => import("@/pages/CheckIn"));
const TeacherProfile = lazy(() => import("@/pages/profile/TeacherProfile"));
const EmotionAwareScheduling = lazy(() => import("@/pages/EmotionAwareScheduling"));

// Create a wrapper component to provide user from context to TeacherProfile
const TeacherProfileWrapper = () => {
  const { user } = useAuth();
  return <TeacherProfile user={user} />;
};

export const teacherAdminRoutes: RouteObject[] = [
  {
    path: "/teacher-dashboard",
    element: (
      <ProtectedRoute requiredRole={[UserRole.teacher, UserRole.admin, UserRole.staff]}>
        <TeacherDashboard />
      </ProtectedRoute>
    ),
  },
  {
    path: "/teacher-dashboard-enhanced",
    element: (
      <ProtectedRoute requiredRole={[UserRole.teacher, UserRole.admin, UserRole.staff]}>
        <TeacherDashboardEnhanced />
      </ProtectedRoute>
    ),
  },
  {
    path: "/staff-assist",
    element: (
      <ProtectedRoute requiredRole={[UserRole.teacher, UserRole.admin, UserRole.staff]}>
        <StaffAssistMode />
      </ProtectedRoute>
    ),
  },
  {
    path: "/sel-pathways",
    element: (
      <ProtectedRoute requiredRole={[UserRole.teacher, UserRole.admin, UserRole.staff]}>
        <SELPathwayManagement />
      </ProtectedRoute>
    ),
  },
  {
    path: "/students",
    element: (
      <ProtectedRoute requiredRole={[UserRole.teacher, UserRole.admin, UserRole.staff]}>
        <StudentManagement />
      </ProtectedRoute>
    ),
  },
  {
    path: "/predictive-support",
    element: (
      <ProtectedRoute requiredRole={[UserRole.teacher, UserRole.admin, UserRole.staff]}>
        <PredictiveSupport />
      </ProtectedRoute>
    ),
  },
  {
    path: "/behavior-prediction",
    element: (
      <ProtectedRoute requiredRole={[UserRole.teacher, UserRole.admin, UserRole.staff]}>
        <BehaviorPrediction />
      </ProtectedRoute>
    ),
  },
  {
    path: "/check-in",
    element: (
      <ProtectedRoute>
        <CheckIn />
      </ProtectedRoute>
    ),
  },
  {
    path: "/profile/teacher",
    element: (
      <ProtectedRoute requiredRole={[UserRole.teacher]}>
        <TeacherProfileWrapper />
      </ProtectedRoute>
    ),
  },
  {
    path: "/profile/staff",
    element: (
      <ProtectedRoute requiredRole={[UserRole.staff]}>
        <TeacherProfileWrapper />
      </ProtectedRoute>
    ),
  },
  {
    path: "/emotion-aware-scheduling",
    element: (
      <ProtectedRoute requiredRole={[UserRole.teacher, UserRole.admin, UserRole.staff]}>
        <EmotionAwareScheduling />
      </ProtectedRoute>
    ),
  },
  {
    path: "/professional-development",
    element: (
      <ProtectedRoute requiredRole={[UserRole.teacher, UserRole.admin, UserRole.staff]}>
        <div className="container mx-auto py-6">
          <h1 className="text-3xl font-bold mb-6">Professional Development</h1>
          <p className="text-xl">Coming soon: Professional development courses for educators and staff.</p>
        </div>
      </ProtectedRoute>
    ),
  },
  {
    path: "/messages",
    element: (
      <ProtectedRoute requiredRole={[UserRole.teacher, UserRole.admin, UserRole.staff, UserRole.parent]}>
        <div className="container mx-auto py-6">
          <h1 className="text-3xl font-bold mb-6">Messages</h1>
          <p className="text-xl">Coming soon: Secure messaging with students, parents, and colleagues.</p>
        </div>
      </ProtectedRoute>
    ),
  },
];
