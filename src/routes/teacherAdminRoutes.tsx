
import React from "react";
import { ProtectedRoute } from "./ProtectedRoute";
import TeacherDashboard from "@/pages/TeacherDashboard";
import AdminDashboard from "@/pages/AdminDashboard";
import StudentManagement from "@/pages/StudentManagement";
import BehaviorPrediction from "@/pages/BehaviorPrediction";
import PredictiveSupport from "@/pages/PredictiveSupport";
import WellLensDashboard from "@/pages/WellLensDashboard";
import TrustedAdultDashboard from "@/pages/TrustedAdultDashboard";
import CulturePulseSurvey from "@/pages/CulturePulseSurvey";
import AdminPulseTrends from "@/pages/AdminPulseTrends";
import SELPathwayManagement from "@/pages/SELPathwayManagement";
import StaffAssistMode from "@/pages/StaffAssistMode";
import { UserRole } from "@/types/roles";

const teacherAdminRoutes = [
  {
    path: "/teacher-dashboard",
    element: (
      <ProtectedRoute requiredRole={[UserRole.staff, UserRole.admin]}>
        <TeacherDashboard />
      </ProtectedRoute>
    ),
  },
  {
    path: "/admin-dashboard",
    element: (
      <ProtectedRoute requiredRole={[UserRole.admin]}>
        <AdminDashboard />
      </ProtectedRoute>
    ),
  },
  {
    path: "/student-management",
    element: (
      <ProtectedRoute requiredRole={[UserRole.staff, UserRole.admin]}>
        <StudentManagement />
      </ProtectedRoute>
    ),
  },
  {
    path: "/behavior-prediction",
    element: (
      <ProtectedRoute requiredRole={[UserRole.staff, UserRole.admin]}>
        <BehaviorPrediction />
      </ProtectedRoute>
    ),
  },
  {
    path: "/predictive-support",
    element: (
      <ProtectedRoute requiredRole={[UserRole.staff, UserRole.admin]}>
        <PredictiveSupport />
      </ProtectedRoute>
    ),
  },
  {
    path: "/well-lens",
    element: (
      <ProtectedRoute requiredRole={[UserRole.staff, UserRole.admin]}>
        <WellLensDashboard />
      </ProtectedRoute>
    ),
  },
  {
    path: "/trusted-adult-dashboard",
    element: (
      <ProtectedRoute requiredRole={[UserRole.staff, UserRole.admin]}>
        <TrustedAdultDashboard />
      </ProtectedRoute>
    ),
  },
  {
    path: "/pulse-trends",
    element: (
      <ProtectedRoute requiredRole={[UserRole.admin]}>
        <AdminPulseTrends />
      </ProtectedRoute>
    ),
  },
  {
    path: "/pulse-survey",
    element: (
      <ProtectedRoute requiredRole={[UserRole.staff, UserRole.admin]}>
        <CulturePulseSurvey />
      </ProtectedRoute>
    ),
  },
  {
    path: "/sel-pathway-management",
    element: (
      <ProtectedRoute requiredRole={[UserRole.staff, UserRole.admin]}>
        <SELPathwayManagement />
      </ProtectedRoute>
    ),
  },
  {
    path: "/staff-assist",
    element: (
      <ProtectedRoute requiredRole={[UserRole.staff, UserRole.admin]}>
        <StaffAssistMode />
      </ProtectedRoute>
    ),
  },
];

export default teacherAdminRoutes;
