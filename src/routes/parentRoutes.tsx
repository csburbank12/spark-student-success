
import React from "react";
import ChildActivity from "@/pages/parent/ChildActivity";
import ChildWellness from "@/pages/parent/ChildWellness";
import ParentMessages from "@/pages/parent/ParentMessages";
import { ProtectedRoute } from "./ProtectedRoute";
import { UserRole } from "@/types/roles";

// Parent-specific routes
const parentRoutes = [
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
