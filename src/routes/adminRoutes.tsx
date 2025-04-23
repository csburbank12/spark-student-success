
import React from "react";
import { ProtectedRoute } from "./ProtectedRoute";
import { UserRole } from "@/types/roles";
import AdminDashboard from "@/pages/AdminDashboard";
import AdminDashboardEnhanced from "@/pages/AdminDashboardEnhanced";
import SystemSettings from "@/pages/admin/SystemSettings";
import UserManagement from "@/pages/admin/UserManagement";
import SchoolManagement from "@/pages/admin/SchoolManagement";
import SchoolOnboarding from "@/pages/admin/SchoolOnboarding";
import DataAnalytics from "@/pages/admin/DataAnalytics";
import LoopBotLogs from "@/pages/admin/LoopBotLogs";

// Admin-specific routes
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
    path: "/admin-dashboard-enhanced",
    element: (
      <ProtectedRoute requiredRole={[UserRole.admin]}>
        <AdminDashboardEnhanced />
      </ProtectedRoute>
    ),
  },
  {
    path: "/system-settings",
    element: (
      <ProtectedRoute requiredRole={[UserRole.admin]}>
        <SystemSettings />
      </ProtectedRoute>
    ),
  },
  {
    path: "/user-management",
    element: (
      <ProtectedRoute requiredRole={[UserRole.admin]}>
        <UserManagement />
      </ProtectedRoute>
    ),
  },
  {
    path: "/school-management",
    element: (
      <ProtectedRoute requiredRole={[UserRole.admin]}>
        <SchoolManagement />
      </ProtectedRoute>
    ),
  },
  {
    path: "/school-onboarding",
    element: (
      <ProtectedRoute requiredRole={[UserRole.admin]}>
        <SchoolOnboarding />
      </ProtectedRoute>
    ),
  },
  {
    path: "/data-analytics",
    element: (
      <ProtectedRoute requiredRole={[UserRole.admin]}>
        <DataAnalytics />
      </ProtectedRoute>
    ),
  },
  {
    path: "/loopbot-logs",
    element: (
      <ProtectedRoute requiredRole={[UserRole.admin]}>
        <LoopBotLogs />
      </ProtectedRoute>
    ),
  },
];

export default adminRoutes;
