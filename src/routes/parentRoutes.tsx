
import React from "react";
import ChildActivity from "@/pages/parent/ChildActivity";
import ChildWellness from "@/pages/parent/ChildWellness";
import ParentMessages from "@/pages/parent/ParentMessages";
import { ProtectedRoute } from "./ProtectedRoute";

// Parent-specific routes
const parentRoutes = [
  {
    path: "/child-activity",
    element: (
      <ProtectedRoute>
        <ChildActivity />
      </ProtectedRoute>
    ),
  },
  {
    path: "/child-wellness",
    element: (
      <ProtectedRoute>
        <ChildWellness />
      </ProtectedRoute>
    ),
  },
  {
    path: "/messages",
    element: (
      <ProtectedRoute>
        <ParentMessages />
      </ProtectedRoute>
    ),
  },
];

export default parentRoutes;
