
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
import StudentSupportHeatmap from "@/pages/StudentSupportHeatmap";
import TeacherProfilePage from "@/pages/profile/TeacherProfilePage";
import Layout from "@/components/layout/Layout";

const teacherRoutes = [
  {
    path: "/teacher-dashboard",
    element: (
      <ProtectedRoute requiredRole={[UserRole.teacher, UserRole.admin]}>
        <Layout>
          <TeacherDashboard />
        </Layout>
      </ProtectedRoute>
    ),
  },
  {
    path: "/teacher-dashboard-enhanced",
    element: (
      <ProtectedRoute requiredRole={[UserRole.teacher, UserRole.admin]}>
        <Layout>
          <TeacherDashboardEnhanced />
        </Layout>
      </ProtectedRoute>
    ),
  },
  {
    path: "/students",
    element: (
      <ProtectedRoute requiredRole={[UserRole.teacher, UserRole.admin]}>
        <Layout>
          <StudentManagement />
        </Layout>
      </ProtectedRoute>
    ),
  },
  {
    path: "/behavior-prediction",
    element: (
      <ProtectedRoute requiredRole={[UserRole.teacher, UserRole.admin]}>
        <Layout>
          <BehaviorPrediction />
        </Layout>
      </ProtectedRoute>
    ),
  },
  {
    path: "/sel-pathway-management",
    element: (
      <ProtectedRoute requiredRole={[UserRole.teacher, UserRole.admin]}>
        <Layout>
          <SELPathwayManagement />
        </Layout>
      </ProtectedRoute>
    ),
  },
  {
    path: "/emotion-aware-scheduling",
    element: (
      <ProtectedRoute requiredRole={[UserRole.teacher, UserRole.admin]}>
        <Layout>
          <EmotionAwareScheduling />
        </Layout>
      </ProtectedRoute>
    ),
  },
  {
    path: "/well-lens",
    element: (
      <ProtectedRoute requiredRole={[UserRole.teacher, UserRole.admin]}>
        <Layout>
          <WellLensDashboard />
        </Layout>
      </ProtectedRoute>
    ),
  },
  {
    path: "/predictive-support",
    element: (
      <ProtectedRoute requiredRole={[UserRole.teacher, UserRole.admin]}>
        <Layout>
          <PredictiveSupport />
        </Layout>
      </ProtectedRoute>
    ),
  },
  {
    path: "/student-support-heatmap",
    element: (
      <ProtectedRoute requiredRole={[UserRole.teacher, UserRole.admin, UserRole.counselor]}>
        <Layout>
          <StudentSupportHeatmap />
        </Layout>
      </ProtectedRoute>
    ),
  },
  {
    path: "/profile",
    element: (
      <ProtectedRoute requiredRole={[UserRole.teacher, UserRole.admin]}>
        <Layout>
          <TeacherProfilePage />
        </Layout>
      </ProtectedRoute>
    ),
  },
];

export default teacherRoutes;
