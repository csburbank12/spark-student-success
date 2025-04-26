
import React from "react";
import { ProtectedRoute } from "./ProtectedRoute";
import { UserRole } from "@/types/roles";
import Layout from "@/components/layout/Layout";
import ParentDashboard from "@/pages/ParentDashboard";
import ChildActivity from "@/pages/parent/ChildActivity";
import ParentResources from "@/pages/parent-resources/ParentResources";
import ParentChildrenManager from "@/pages/parent/ParentChildrenManager";
import ParentMeetings from "@/pages/parent/ParentMeetings";
import UserProfile from "@/pages/profile/UserProfile";
import PrivacySettings from "@/pages/settings/PrivacySettings";
import DataAccess from "@/pages/settings/DataAccess";
import ChildWellness from "@/pages/parent/ChildWellness";
import Messages from "@/pages/Messages";

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
          <Messages />
        </Layout>
      </ProtectedRoute>
    ),
  },
  {
    path: "/meetings",
    element: (
      <ProtectedRoute requiredRole={[UserRole.parent]}>
        <Layout>
          <ParentMeetings />
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
    path: "/privacy-settings",
    element: (
      <ProtectedRoute requiredRole={[UserRole.parent]}>
        <Layout>
          <PrivacySettings />
        </Layout>
      </ProtectedRoute>
    ),
  },
  {
    path: "/data-access",
    element: (
      <ProtectedRoute requiredRole={[UserRole.parent]}>
        <Layout>
          <DataAccess />
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
