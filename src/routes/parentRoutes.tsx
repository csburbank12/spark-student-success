
import React, { lazy } from "react";
import { ProtectedRoute } from "./ProtectedRoute";
import { UserRole } from "@/types/roles";
import Layout from "@/components/layout/Layout";

// Lazy load parent pages
const ParentDashboard = lazy(() => import("@/pages/parent/ParentDashboard"));
const MyChildren = lazy(() => import("@/pages/parent/MyChildren"));
const ChildActivity = lazy(() => import("@/pages/parent/ChildActivity"));
const ChildWellness = lazy(() => import("@/pages/parent/ChildWellness"));
const Meetings = lazy(() => import("@/pages/parent/Meetings"));
const ParentResources = lazy(() => import("@/pages/parent/ParentResources"));
const PrivacySettings = lazy(() => import("@/pages/parent/PrivacySettings"));
const UserProfile = lazy(() => import("@/pages/profile/UserProfile"));
const Settings = lazy(() => import("@/pages/Settings"));
const Help = lazy(() => import("@/pages/Help"));
const Notifications = lazy(() => import("@/pages/Notifications"));

// Placeholder components until they're fully implemented
const ParentDashboardPlaceholder = () => (
  <div className="p-6">
    <h2 className="text-2xl font-bold mb-4">Parent Dashboard</h2>
    <p>Parent dashboard with key information would be implemented here.</p>
  </div>
);

const MyChildrenPlaceholder = () => (
  <div className="p-6">
    <h2 className="text-2xl font-bold mb-4">My Children</h2>
    <p>List of children and their information would be implemented here.</p>
  </div>
);

const ChildActivityPlaceholder = () => (
  <div className="p-6">
    <h2 className="text-2xl font-bold mb-4">Child Activity</h2>
    <p>Child activity tracking and monitoring would be implemented here.</p>
  </div>
);

const ChildWellnessPlaceholder = () => (
  <div className="p-6">
    <h2 className="text-2xl font-bold mb-4">Child Wellness</h2>
    <p>Child wellness monitoring and resources would be implemented here.</p>
  </div>
);

const MeetingsPlaceholder = () => (
  <div className="p-6">
    <h2 className="text-2xl font-bold mb-4">Meetings & Events</h2>
    <p>School meetings and events calendar would be implemented here.</p>
  </div>
);

const ParentResourcesPlaceholder = () => (
  <div className="p-6">
    <h2 className="text-2xl font-bold mb-4">Parent Resources</h2>
    <p>Resources for parents would be listed here.</p>
  </div>
);

const PrivacySettingsPlaceholder = () => (
  <div className="p-6">
    <h2 className="text-2xl font-bold mb-4">Privacy Settings</h2>
    <p>Privacy and data sharing settings would be implemented here.</p>
  </div>
);

const parentRoutes = [
  {
    path: "/parent-dashboard",
    element: (
      <ProtectedRoute requiredRole={[UserRole.parent]}>
        <Layout>
          <ParentDashboardPlaceholder />
        </Layout>
      </ProtectedRoute>
    ),
  },
  {
    path: "/my-children",
    element: (
      <ProtectedRoute requiredRole={[UserRole.parent]}>
        <Layout>
          <MyChildrenPlaceholder />
        </Layout>
      </ProtectedRoute>
    ),
  },
  {
    path: "/child-activity",
    element: (
      <ProtectedRoute requiredRole={[UserRole.parent]}>
        <Layout>
          <ChildActivityPlaceholder />
        </Layout>
      </ProtectedRoute>
    ),
  },
  {
    path: "/child-wellness",
    element: (
      <ProtectedRoute requiredRole={[UserRole.parent]}>
        <Layout>
          <ChildWellnessPlaceholder />
        </Layout>
      </ProtectedRoute>
    ),
  },
  {
    path: "/meetings",
    element: (
      <ProtectedRoute requiredRole={[UserRole.parent]}>
        <Layout>
          <MeetingsPlaceholder />
        </Layout>
      </ProtectedRoute>
    ),
  },
  {
    path: "/parent-resources",
    element: (
      <ProtectedRoute requiredRole={[UserRole.parent]}>
        <Layout>
          <ParentResourcesPlaceholder />
        </Layout>
      </ProtectedRoute>
    ),
  },
  {
    path: "/privacy-settings",
    element: (
      <ProtectedRoute requiredRole={[UserRole.parent]}>
        <Layout>
          <PrivacySettingsPlaceholder />
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
  {
    path: "/settings",
    element: (
      <ProtectedRoute requiredRole={[UserRole.parent]}>
        <Layout>
          <Settings />
        </Layout>
      </ProtectedRoute>
    ),
  },
  {
    path: "/help",
    element: (
      <ProtectedRoute requiredRole={[UserRole.parent]}>
        <Layout>
          <Help />
        </Layout>
      </ProtectedRoute>
    ),
  },
  {
    path: "/notifications",
    element: (
      <ProtectedRoute requiredRole={[UserRole.parent]}>
        <Layout>
          <Notifications />
        </Layout>
      </ProtectedRoute>
    ),
  },
];

export default parentRoutes;
