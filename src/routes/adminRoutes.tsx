
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
const LoopbotLogs = lazy(() => import("@/pages/admin/LoopbotLogs"));
const AuditDashboard = lazy(() => import("@/pages/admin/AuditDashboard"));
const ErrorLogs = lazy(() => import("@/pages/admin/ErrorLogs"));
const Settings = lazy(() => import("@/pages/Settings"));
const Help = lazy(() => import("@/pages/Help"));
const Notifications = lazy(() => import("@/pages/Notifications"));

// Placeholder components until they're fully implemented
const UserManagementPlaceholder = () => (
  <div className="p-6">
    <h2 className="text-2xl font-bold mb-4">User Management</h2>
    <p>User management interface with mock data would be implemented here.</p>
  </div>
);

const SchoolManagementPlaceholder = () => (
  <div className="p-6">
    <h2 className="text-2xl font-bold mb-4">School Management</h2>
    <p>School management interface with mock data would be implemented here.</p>
  </div>
);

const SystemConfigurationPlaceholder = () => (
  <div className="p-6">
    <h2 className="text-2xl font-bold mb-4">System Configuration</h2>
    <p>System configuration interface with settings would be implemented here.</p>
  </div>
);

const DataAnalyticsPlaceholder = () => (
  <div className="p-6">
    <h2 className="text-2xl font-bold mb-4">Data Analytics</h2>
    <p>Analytics dashboard with visualizations would be implemented here.</p>
  </div>
);

const FERPACompliancePlaceholder = () => (
  <div className="p-6">
    <h2 className="text-2xl font-bold mb-4">FERPA Compliance</h2>
    <p>FERPA compliance monitoring and reporting would be implemented here.</p>
  </div>
);

const LoopbotLogsPlaceholder = () => (
  <div className="p-6">
    <h2 className="text-2xl font-bold mb-4">LoopBot Logs</h2>
    <p>AI assistant interaction logs would be displayed here.</p>
  </div>
);

const AuditDashboardPlaceholder = () => (
  <div className="p-6">
    <h2 className="text-2xl font-bold mb-4">Audit Dashboard</h2>
    <p>System audit and compliance tracking would be implemented here.</p>
  </div>
);

const ErrorLogsPlaceholder = () => (
  <div className="p-6">
    <h2 className="text-2xl font-bold mb-4">Error Logs</h2>
    <p>System error logs and monitoring would be implemented here.</p>
  </div>
);

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
          <UserManagementPlaceholder />
        </Layout>
      </ProtectedRoute>
    ),
  },
  {
    path: "/admin/data-analytics",
    element: (
      <ProtectedRoute requiredRole={[UserRole.admin]}>
        <Layout>
          <DataAnalyticsPlaceholder />
        </Layout>
      </ProtectedRoute>
    ),
  },
  {
    path: "/admin/school-management",
    element: (
      <ProtectedRoute requiredRole={[UserRole.admin]}>
        <Layout>
          <SchoolManagementPlaceholder />
        </Layout>
      </ProtectedRoute>
    ),
  },
  {
    path: "/admin/ferpa-compliance",
    element: (
      <ProtectedRoute requiredRole={[UserRole.admin]}>
        <Layout>
          <FERPACompliancePlaceholder />
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
          <LoopbotLogsPlaceholder />
        </Layout>
      </ProtectedRoute>
    ),
  },
  {
    path: "/admin/audit-dashboard",
    element: (
      <ProtectedRoute requiredRole={[UserRole.admin]}>
        <Layout>
          <AuditDashboardPlaceholder />
        </Layout>
      </ProtectedRoute>
    ),
  },
  {
    path: "/admin/error-logs",
    element: (
      <ProtectedRoute requiredRole={[UserRole.admin]}>
        <Layout>
          <ErrorLogsPlaceholder />
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
