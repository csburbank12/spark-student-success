
import React, { lazy } from "react";
import { ProtectedRoute } from "./ProtectedRoute";
import { UserRole } from "@/types/roles";
import Layout from "@/components/layout/Layout";

// Lazy load admin pages
const AdminDashboard = lazy(() => import("@/pages/AdminDashboard"));
const UserProfile = lazy(() => import("@/pages/profile/UserProfile"));
const UserManagement = lazy(() => import("@/pages/admin/UserManagement"));
const SchoolManagement = lazy(() => import("@/pages/admin/SchoolManagement"));
const SystemConfiguration = lazy(() => import("@/pages/admin/SystemConfiguration"));

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
    path: "/admin/users",
    element: (
      <ProtectedRoute requiredRole={[UserRole.admin]}>
        <Layout>
          <UserManagementPlaceholder />
        </Layout>
      </ProtectedRoute>
    ),
  },
  {
    path: "/admin/schools",
    element: (
      <ProtectedRoute requiredRole={[UserRole.admin]}>
        <Layout>
          <SchoolManagementPlaceholder />
        </Layout>
      </ProtectedRoute>
    ),
  },
  {
    path: "/admin/system",
    element: (
      <ProtectedRoute requiredRole={[UserRole.admin]}>
        <Layout>
          <SystemConfigurationPlaceholder />
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
];

export default adminRoutes;
