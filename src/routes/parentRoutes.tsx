
import React from "react";
import { ProtectedRoute } from "./ProtectedRoute";
import { UserRole } from "@/types/roles";
import ParentDashboard from "@/pages/ParentDashboard";
import ParentMessages from "@/pages/parent/ParentMessages";
import ChildActivity from "@/pages/parent/ChildActivity";
import ChildWellness from "@/pages/parent/ChildWellness";
import ParentResources from "@/pages/parent-resources/ParentResources";
import ParentChildrenManager from "@/pages/parent/ParentChildrenManager";
import UserProfile from "@/pages/profile/UserProfile";
import Layout from "@/components/layout/Layout";

const parentRoutes = [
  {
    path: "/parent-dashboard",
    element: (
      <ProtectedRoute requiredRole={[UserRole.parent]}>
        <Layout>
          <ParentDashboard />
        </Layout>
      </ProtectedRoute>
    ),
  },
  {
    path: "/parent-dashboard-enhanced",
    element: (
      <ProtectedRoute requiredRole={[UserRole.parent]}>
        <Layout>
          <ParentDashboard />
        </Layout>
      </ProtectedRoute>
    ),
  },
  {
    path: "/child-activity",
    element: (
      <ProtectedRoute requiredRole={[UserRole.parent]}>
        <Layout>
          <ChildActivity />
        </Layout>
      </ProtectedRoute>
    ),
  },
  {
    path: "/child-wellness",
    element: (
      <ProtectedRoute requiredRole={[UserRole.parent]}>
        <Layout>
          <ChildWellness />
        </Layout>
      </ProtectedRoute>
    ),
  },
  {
    path: "/messages",
    element: (
      <ProtectedRoute requiredRole={[UserRole.parent]}>
        <Layout>
          <ParentMessages />
        </Layout>
      </ProtectedRoute>
    ),
  },
  {
    path: "/parent-resources",
    element: (
      <ProtectedRoute requiredRole={[UserRole.parent]}>
        <Layout>
          <ParentResources />
        </Layout>
      </ProtectedRoute>
    ),
  },
  {
    path: "/my-children",
    element: (
      <ProtectedRoute requiredRole={[UserRole.parent]}>
        <Layout>
          <ParentChildrenManager />
        </Layout>
      </ProtectedRoute>
    ),
  },
  {
    path: "/profile",
    element: (
      <ProtectedRoute requiredRole={[UserRole.parent]}>
        <Layout>
          <UserProfile />
        </Layout>
      </ProtectedRoute>
    ),
  },
];

export default parentRoutes;
