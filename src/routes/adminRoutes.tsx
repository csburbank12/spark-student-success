
import React, { lazy } from "react";
import { ProtectedRoute } from "./ProtectedRoute";
import { UserRole } from "@/types/roles";
import Layout from "@/components/layout/Layout";

// Lazy load admin pages
const AdminDashboard = lazy(() => import("@/pages/AdminDashboard"));
const UserProfile = lazy(() => import("@/pages/profile/UserProfile"));
const UserManagement = lazy(() => import("@/pages/admin/UserManagement"));
const SchoolManagement = lazy(() => import("@/pages/admin/SchoolManagement"));
const SystemSettings = lazy(() => import("@/pages/admin/SystemSettings"));
const DataAnalytics = lazy(() => import("@/pages/admin/DataAnalytics"));
const FERPACompliance = lazy(() => import("@/pages/admin/FERPACompliance"));
const LoopBotLogs = lazy(() => import("@/pages/admin/LoopBotLogs"));
const AuditDashboard = lazy(() => import("@/pages/admin/AuditDashboard"));
const ErrorLogs = lazy(() => import("@/pages/admin/ErrorLogs"));
const Settings = lazy(() => import("@/pages/Settings"));
const Help = lazy(() => import("@/pages/Help"));
const Notifications = lazy(() => import("@/pages/Notifications"));

const adminRoutes = [
  {
    path: "/admin-dashboard",
    element: (
      <ProtectedRoute requiredRole={[UserRole.admin]}>
        <Layout>
          <AdminDashboard />
        </Layout>
      </ProtectedRoute>
    ),
  },
  {
    path: "/admin/user-management",
    element: (
      <ProtectedRoute requiredRole={[UserRole.admin]}>
        <Layout>
          <UserManagement />
        </Layout>
      </ProtectedRoute>
    ),
  },
  {
    path: "/admin/data-analytics",
    element: (
      <ProtectedRoute requiredRole={[UserRole.admin]}>
        <Layout>
          <DataAnalytics />
        </Layout>
      </ProtectedRoute>
    ),
  },
  {
    path: "/admin/school-management",
    element: (
      <ProtectedRoute requiredRole={[UserRole.admin]}>
        <Layout>
          <SchoolManagement />
        </Layout>
      </ProtectedRoute>
    ),
  },
  {
    path: "/admin/ferpa-compliance",
    element: (
      <ProtectedRoute requiredRole={[UserRole.admin]}>
        <Layout>
          <FERPACompliance />
        </Layout>
      </ProtectedRoute>
    ),
  },
  {
    path: "/admin/system-settings",
    element: (
      <ProtectedRoute requiredRole={[UserRole.admin]}>
        <Layout>
          <SystemSettings />
        </Layout>
      </ProtectedRoute>
    ),
  },
  {
    path: "/admin/loopbot-logs",
    element: (
      <ProtectedRoute requiredRole={[UserRole.admin]}>
        <Layout>
          <LoopBotLogs />
        </Layout>
      </ProtectedRoute>
    ),
  },
  {
    path: "/admin/audit-dashboard",
    element: (
      <ProtectedRoute requiredRole={[UserRole.admin]}>
        <Layout>
          <AuditDashboard />
        </Layout>
      </ProtectedRoute>
    ),
  },
  {
    path: "/admin/error-logs",
    element: (
      <ProtectedRoute requiredRole={[UserRole.admin]}>
        <Layout>
          <ErrorLogs />
        </Layout>
      </ProtectedRoute>
    ),
  },
  {
    path: "/profile",
    element: (
      <ProtectedRoute requiredRole={[UserRole.admin]}>
        <Layout>
          <UserProfile />
        </Layout>
      </ProtectedRoute>
    ),
  },
  {
    path: "/settings",
    element: (
      <ProtectedRoute requiredRole={[UserRole.admin]}>
        <Layout>
          <Settings />
        </Layout>
      </ProtectedRoute>
    ),
  },
  {
    path: "/help",
    element: (
      <ProtectedRoute requiredRole={[UserRole.admin]}>
        <Layout>
          <Help />
        </Layout>
      </ProtectedRoute>
    ),
  },
  {
    path: "/notifications",
    element: (
      <ProtectedRoute requiredRole={[UserRole.admin]}>
        <Layout>
          <Notifications />
        </Layout>
      </ProtectedRoute>
    ),
  },
];

export default adminRoutes;
