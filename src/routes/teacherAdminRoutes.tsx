
import React from "react";
import { ProtectedRoute } from "./ProtectedRoute";
import { UserRole } from "@/types/roles";
import StudentManagement from "@/pages/StudentManagement";

// Staff and admin shared routes
export const teacherAdminRoutes = [
  {
    path: "/students",
    element: (
      <ProtectedRoute requiredRole={[UserRole.teacher, UserRole.staff, UserRole.admin]}>
        <StudentManagement />
      </ProtectedRoute>
    ),
  },
];
