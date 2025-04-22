
import React from "react";
import StudentManagement from "@/pages/StudentManagement";
import StudentsAtRisk from "@/pages/students/StudentsAtRisk";
import WellLensDashboard from "@/pages/WellLensDashboard";
import PredictiveSupport from "@/pages/PredictiveSupport";
import { ProtectedRoute } from "./ProtectedRoute";

const teacherAdminRoutes = [
  {
    path: "/students",
    element: (
      <ProtectedRoute>
        <StudentManagement />
      </ProtectedRoute>
    ),
  },
  {
    path: "/students/at-risk",
    element: (
      <ProtectedRoute>
        <StudentsAtRisk />
      </ProtectedRoute>
    ),
    requiredRole: ["teacher", "admin"],
  },
  {
    path: "/wellens",
    element: (
      <ProtectedRoute>
        <WellLensDashboard />
      </ProtectedRoute>
    ),
    requiredRole: ["teacher", "admin"],
  },
  {
    path: "/predictive-support",
    element: (
      <ProtectedRoute>
        <PredictiveSupport />
      </ProtectedRoute>
    ),
    requiredRole: ["teacher", "admin"],
  },
  {
    path: "/planner",
    element: (
      <ProtectedRoute>
        <div className="p-6">Lesson Planner (Coming Soon)</div>
      </ProtectedRoute>
    ),
  },
  {
    path: "/collaboration",
    element: (
      <ProtectedRoute>
        <div className="p-6">Collaboration Space (Coming Soon)</div>
      </ProtectedRoute>
    ),
  },
  {
    path: "/schools",
    element: (
      <ProtectedRoute>
        <div className="p-6">School Management (Coming Soon)</div>
      </ProtectedRoute>
    ),
  },
  {
    path: "/users",
    element: (
      <ProtectedRoute>
        <div className="p-6">User Management (Coming Soon)</div>
      </ProtectedRoute>
    ),
  },
  {
    path: "/analytics",
    element: (
      <ProtectedRoute>
        <div className="p-6">Analytics Dashboard (Coming Soon)</div>
      </ProtectedRoute>
    ),
  },
];

export default teacherAdminRoutes;
