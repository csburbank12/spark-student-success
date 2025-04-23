import React from "react";
import { ProtectedRoute } from "./ProtectedRoute";
import { UserRole } from "@/types/roles";
import ParentDashboard from "@/pages/ParentDashboard";
import ParentDashboardEnhanced from "@/pages/ParentDashboardEnhanced";
import ParentMessages from "@/pages/parent/ParentMessages";
import ChildActivity from "@/pages/parent/ChildActivity";
import ChildWellness from "@/pages/parent/ChildWellness";

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
        <ParentDashboardEnhanced />
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
];

export default parentRoutes;
