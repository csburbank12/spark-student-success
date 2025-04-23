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

const teacherAdminRoutes = [
  {
    path: "/teacher-dashboard",
    element: (
      <ProtectedRoute requiredRole={['staff', 'admin']}>
        <TeacherDashboard />
      </ProtectedRoute>
    ),
  },
  {
    path: "/admin-dashboard",
    element: (
      <ProtectedRoute requiredRole={['admin']}>
        <AdminDashboard />
      </ProtectedRoute>
    ),
  },
  {
    path: "/student-management",
    element: (
      <ProtectedRoute requiredRole={['staff', 'admin']}>
        <StudentManagement />
      </ProtectedRoute>
    ),
  },
  {
    path: "/behavior-prediction",
    element: (
      <ProtectedRoute requiredRole={['staff', 'admin']}>
        <BehaviorPrediction />
      </ProtectedRoute>
    ),
  },
  {
    path: "/predictive-support",
    element: (
      <ProtectedRoute requiredRole={['staff', 'admin']}>
        <PredictiveSupport />
      </ProtectedRoute>
    ),
  },
  {
    path: "/well-lens",
    element: (
      <ProtectedRoute requiredRole={['staff', 'admin']}>
        <WellLensDashboard />
      </ProtectedRoute>
    ),
  },
  {
    path: "/trusted-adult-dashboard",
    element: (
      <ProtectedRoute requiredRole={['staff', 'admin']}>
        <TrustedAdultDashboard />
      </ProtectedRoute>
    ),
  },
  {
    path: "/pulse-trends",
    element: (
      <ProtectedRoute requiredRole={['admin']}>
        <AdminPulseTrends />
      </ProtectedRoute>
    ),
  },
  {
    path: "/pulse-survey",
    element: (
      <ProtectedRoute requiredRole={['staff', 'admin']}>
        <CulturePulseSurvey />
      </ProtectedRoute>
    ),
  },
  {
    path: "/sel-pathway-management",
    element: (
      <ProtectedRoute requiredRole={['staff', 'admin']}>
        <SELPathwayManagement />
      </ProtectedRoute>
    ),
  },
  {
    path: "/staff-assist",
    element: (
      <ProtectedRoute requiredRole={['staff', 'admin']}>
        <StaffAssistMode />
      </ProtectedRoute>
    ),
  },
];

export default teacherAdminRoutes;
