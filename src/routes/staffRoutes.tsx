
import React from "react";
import { ProtectedRoute } from "./ProtectedRoute";
import { UserRole } from "@/types/roles";
import StaffDashboard from "@/pages/staff/StaffDashboard";
import StaffProfile from "@/pages/profile/StaffProfile";
import StaffAssistMode from "@/pages/StaffAssistMode";
import StaffSupportTools from "@/pages/staff/StaffSupportTools";

const staffRoutes = [
  {
    path: "/staff-dashboard",
    element: (
      <ProtectedRoute requiredRole={[UserRole.staff]}>
        <StaffDashboard />
      </ProtectedRoute>
    ),
  },
  {
    path: "/staff-profile",
    element: (
      <ProtectedRoute requiredRole={[UserRole.staff]}>
        <StaffProfile user={{}} />
      </ProtectedRoute>
    ),
  },
  {
    path: "/staff-assist",
    element: (
      <ProtectedRoute requiredRole={[UserRole.staff, UserRole.teacher, UserRole.admin]}>
        <StaffAssistMode />
      </ProtectedRoute>
    ),
  },
  {
    path: "/support-tools",
    element: (
      <ProtectedRoute requiredRole={[UserRole.staff]}>
        <StaffSupportTools />
      </ProtectedRoute>
    ),
  },
];

export default staffRoutes;
