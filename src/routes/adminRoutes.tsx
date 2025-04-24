
import React from 'react';
import { ProtectedRoute } from "./ProtectedRoute";
import { UserRole } from "@/types/roles";

import AdminDashboard from "@/pages/AdminDashboard";
import AdminDashboardEnhanced from "@/pages/AdminDashboardEnhanced";
import AdminPulseTrends from "@/pages/AdminPulseTrends";
import UserManagement from "@/pages/admin/UserManagement";
import ErrorLogsDashboard from "@/pages/admin/ErrorLogsDashboard";
import DataAnalytics from "@/pages/admin/DataAnalytics";
import SchoolOnboarding from "@/pages/admin/SchoolOnboarding";
import SchoolManagement from "@/pages/admin/SchoolManagement";
import LoopBotLogs from "@/pages/admin/LoopBotLogs";
import IntegrationsManager from "@/pages/admin/IntegrationsManager";
import SystemSettings from "@/pages/admin/SystemSettings";
import FERPACompliance from "@/pages/admin/FERPACompliance";

export const AdminRoutes = () => {
  return [
    {
      path: "admin-dashboard",
      element: (
        <ProtectedRoute requiredRole={[UserRole.admin]}>
          <AdminDashboard />
        </ProtectedRoute>
      )
    },
    {
      path: "admin-dashboard-enhanced",
      element: (
        <ProtectedRoute requiredRole={[UserRole.admin]}>
          <AdminDashboardEnhanced />
        </ProtectedRoute>
      )
    },
    {
      path: "admin/pulse-trends",
      element: (
        <ProtectedRoute requiredRole={[UserRole.admin]}>
          <AdminPulseTrends />
        </ProtectedRoute>
      )
    },
    {
      path: "admin/user-management",
      element: (
        <ProtectedRoute requiredRole={[UserRole.admin]}>
          <UserManagement />
        </ProtectedRoute>
      )
    },
    {
      path: "admin/error-logs",
      element: (
        <ProtectedRoute requiredRole={[UserRole.admin]}>
          <ErrorLogsDashboard />
        </ProtectedRoute>
      )
    },
    {
      path: "admin/data-analytics",
      element: (
        <ProtectedRoute requiredRole={[UserRole.admin]}>
          <DataAnalytics />
        </ProtectedRoute>
      )
    },
    {
      path: "admin/school-onboarding",
      element: (
        <ProtectedRoute requiredRole={[UserRole.admin]}>
          <SchoolOnboarding />
        </ProtectedRoute>
      )
    },
    {
      path: "admin/school-management",
      element: (
        <ProtectedRoute requiredRole={[UserRole.admin]}>
          <SchoolManagement />
        </ProtectedRoute>
      )
    },
    {
      path: "admin/loopbot-logs",
      element: (
        <ProtectedRoute requiredRole={[UserRole.admin]}>
          <LoopBotLogs />
        </ProtectedRoute>
      )
    },
    {
      path: "admin/integrations",
      element: (
        <ProtectedRoute requiredRole={[UserRole.admin]}>
          <IntegrationsManager />
        </ProtectedRoute>
      )
    },
    {
      path: "admin/system-settings",
      element: (
        <ProtectedRoute requiredRole={[UserRole.admin]}>
          <SystemSettings />
        </ProtectedRoute>
      )
    },
    {
      path: "admin/ferpa-compliance",
      element: (
        <ProtectedRoute requiredRole={[UserRole.admin]}>
          <FERPACompliance />
        </ProtectedRoute>
      )
    }
  ];
};
