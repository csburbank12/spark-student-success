import React from "react";
import { ProtectedRoute } from "./ProtectedRoute";
import { UserRole } from "@/types/roles";
import ParentDashboard from "@/pages/ParentDashboard";
import ParentMessages from "@/pages/parent/ParentMessages";
import ChildActivity from "@/pages/parent/ChildActivity";
import ChildWellness from "@/pages/parent/ChildWellness";
import ParentResources from "@/pages/parent-resources/ParentResources";
import ParentChildrenManager from "@/pages/parent/ParentChildrenManager";

const parentRoutes = [
  {
    path: "/parent-dashboard",
    element: (
      <ProtectedRoute requiredRole={[UserRole.parent]}>
        <ParentDashboard />
      </ProtectedRoute>
    ),
  },
  {
    path: "/parent-dashboard-enhanced",
    element: (
      <ProtectedRoute requiredRole={[UserRole.parent]}>
        <ParentDashboard />
      </ProtectedRoute>
    ),
  },
  {
    path: "/child-activity",
    element: (
      <ProtectedRoute requiredRole={[UserRole.parent]}>
        <ChildActivity />
      </ProtectedRoute>
    ),
  },
  {
    path: "/child-wellness",
    element: (
      <ProtectedRoute requiredRole={[UserRole.parent]}>
        <ChildWellness />
      </ProtectedRoute>
    ),
  },
  {
    path: "/messages",
    element: (
      <ProtectedRoute requiredRole={[UserRole.parent]}>
        <ParentMessages />
      </ProtectedRoute>
    ),
  },
  {
    path: "/parent-resources",
    element: (
      <ProtectedRoute requiredRole={[UserRole.parent]}>
        <ParentResources />
      </ProtectedRoute>
    ),
  },
  {
    path: "/my-children",
    element: (
      <ProtectedRoute requiredRole={[UserRole.parent]}>
        <ParentChildrenManager />
      </ProtectedRoute>
    ),
  },
];

export default parentRoutes;
