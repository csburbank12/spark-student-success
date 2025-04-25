
import React from "react";
import { ProtectedRoute } from "./ProtectedRoute";
import { UserRole } from "@/types/roles";
import AdminDashboard from "@/pages/AdminDashboard";
import AdminDashboardEnhanced from "@/pages/AdminDashboardEnhanced";
import UserManagement from "@/pages/admin/UserManagement";
import DataAnalytics from "@/pages/admin/DataAnalytics";
import SchoolManagement from "@/pages/admin/SchoolManagement";
import SchoolProfilePage from "@/pages/admin/SchoolProfilePage";
import AddSchoolPage from "@/pages/admin/AddSchoolPage";
import EditSchoolPage from "@/pages/admin/EditSchoolPage";
import SchoolImportPage from "@/pages/admin/SchoolImportPage";
import SchoolOnboarding from "@/pages/admin/SchoolOnboarding";
import FERPACompliance from "@/pages/admin/FERPACompliance";
import SystemSettings from "@/pages/admin/SystemSettings";
import LoopBotLogs from "@/pages/admin/LoopBotLogs";
import AuditDashboard from "@/pages/admin/AuditDashboard";
import ErrorLogsDashboard from "@/pages/admin/ErrorLogsDashboard";

const adminRoutes = [
  {
    path: "/admin",
    element: (
      <ProtectedRoute requiredRole={[UserRole.admin]}>
        <AdminDashboard />
      </ProtectedRoute>
    ),
  },
  {
    path: "/admin-dashboard",
    element: (
      <ProtectedRoute requiredRole={[UserRole.admin]}>
        <AdminDashboardEnhanced />
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
    path: "/admin/schools",
    element: (
      <ProtectedRoute requiredRole={[UserRole.admin]}>
        <SchoolManagement />
      </ProtectedRoute>
    ),
  },
  {
    path: "/admin/schools/new",
    element: (
      <ProtectedRoute requiredRole={[UserRole.admin]}>
        <AddSchoolPage />
      </ProtectedRoute>
    ),
  },
  {
    path: "/admin/schools/import",
    element: (
      <ProtectedRoute requiredRole={[UserRole.admin]}>
        <SchoolImportPage />
      </ProtectedRoute>
    ),
  },
  {
    path: "/admin/schools/:id",
    element: (
      <ProtectedRoute requiredRole={[UserRole.admin]}>
        <SchoolProfilePage />
      </ProtectedRoute>
    ),
  },
  {
    path: "/admin/schools/:id/edit",
    element: (
      <ProtectedRoute requiredRole={[UserRole.admin]}>
        <EditSchoolPage />
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
    path: "/admin/audit-dashboard",
    element: (
      <ProtectedRoute requiredRole={[UserRole.admin]}>
        <AuditDashboard />
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
    path: "/school-onboarding",
    element: (
      <ProtectedRoute requiredRole={[UserRole.admin]}>
        <SchoolOnboarding />
      </ProtectedRoute>
    ),
  },
];

export default adminRoutes;
