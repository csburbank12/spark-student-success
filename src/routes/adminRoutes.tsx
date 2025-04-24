
import React from "react";
import { ProtectedRoute } from "./ProtectedRoute";
import { UserRole } from "@/types/roles";
import AdminDashboard from "@/pages/AdminDashboard";
import UserManagement from "@/pages/admin/UserManagement";
import DataAnalytics from "@/pages/admin/DataAnalytics";
import SchoolManagement from "@/pages/admin/SchoolManagement";
import SystemSettings from "@/pages/admin/SystemSettings";
import LoopBotLogs from "@/pages/admin/LoopBotLogs";
import FERPACompliance from "@/pages/admin/FERPACompliance";
import ErrorLogsDashboard from "@/pages/admin/ErrorLogsDashboard";
import AdminPulseTrends from "@/pages/AdminPulseTrends";
import SchoolOnboarding from "@/pages/admin/SchoolOnboarding";
import IntegrationsManager from "@/pages/admin/IntegrationsManager";

const adminRoutes = [
  {
    path: "/admin-dashboard",
    element: (
      <ProtectedRoute requiredRole={[UserRole.admin]}>
        <AdminDashboard />
      </ProtectedRoute>
    ),
  },
  {
    path: "/admin/user-management",
    element: (
      <ProtectedRoute requiredRole={[UserRole.admin]}>
        <UserManagement />
      </ProtectedRoute>
    ),
  },
  {
    path: "/admin/data-analytics",
    element: (
      <ProtectedRoute requiredRole={[UserRole.admin]}>
        <DataAnalytics />
      </ProtectedRoute>
    ),
  },
  {
    path: "/admin/school-management",
    element: (
      <ProtectedRoute requiredRole={[UserRole.admin]}>
        <SchoolManagement />
      </ProtectedRoute>
    ),
  },
  {
    path: "/admin/ferpa-compliance",
    element: (
      <ProtectedRoute requiredRole={[UserRole.admin]}>
        <FERPACompliance />
      </ProtectedRoute>
    ),
  },
  {
    path: "/admin/system-settings",
    element: (
      <ProtectedRoute requiredRole={[UserRole.admin]}>
        <SystemSettings />
      </ProtectedRoute>
    ),
  },
  {
    path: "/admin/loopbot-logs",
    element: (
      <ProtectedRoute requiredRole={[UserRole.admin]}>
        <LoopBotLogs />
      </ProtectedRoute>
    ),
  },
  {
    path: "/admin/error-logs",
    element: (
      <ProtectedRoute requiredRole={[UserRole.admin]}>
        <ErrorLogsDashboard />
      </ProtectedRoute>
    ),
  },
  {
    path: "/admin/pulse-trends",
    element: (
      <ProtectedRoute requiredRole={[UserRole.admin]}>
        <AdminPulseTrends />
      </ProtectedRoute>
    ),
  },
  {
    path: "/admin/onboarding",
    element: (
      <ProtectedRoute requiredRole={[UserRole.admin]}>
        <SchoolOnboarding />
      </ProtectedRoute>
    ),
  },
  {
    path: "/admin/integrations",
    element: (
      <ProtectedRoute requiredRole={[UserRole.admin]}>
        <IntegrationsManager />
      </ProtectedRoute>
    ),
  },
];

export default adminRoutes;
