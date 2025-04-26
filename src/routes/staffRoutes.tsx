
import React, { lazy } from "react";
import { ProtectedRoute } from "./ProtectedRoute";
import { UserRole } from "@/types/roles";
import Layout from "@/components/layout/Layout";

// Lazy load staff pages
const StaffDashboard = lazy(() => import("@/pages/StaffDashboard"));
const UserProfile = lazy(() => import("@/pages/profile/UserProfile"));

const staffRoutes = [
  {
    path: "/staff-dashboard",
    element: (
      <ProtectedRoute requiredRole={[UserRole.staff]}>
        <Layout>
          <StaffDashboard />
        </Layout>
      </ProtectedRoute>
    ),
  },
  {
    path: "/profile",
    element: (
      <ProtectedRoute requiredRole={[UserRole.staff]}>
        <Layout>
          <UserProfile />
        </Layout>
      </ProtectedRoute>
    ),
  },
];

export default staffRoutes;
