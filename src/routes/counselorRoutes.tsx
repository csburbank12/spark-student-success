
import React, { lazy } from "react";
import { ProtectedRoute } from "./ProtectedRoute";
import { UserRole } from "@/types/roles";
import Layout from "@/components/layout/Layout";

// Lazy load pages for better performance
const CounselorDashboard = lazy(() => import("@/pages/CounselorDashboard"));
const UserProfile = lazy(() => import("@/pages/profile/UserProfile"));
const StudentsAtRisk = lazy(() => import("@/pages/counselor/StudentsAtRisk"));

const counselorRoutes = [
  {
    path: "/counselor-dashboard",
    element: (
      <ProtectedRoute requiredRole={[UserRole.counselor]}>
        <Layout>
          <CounselorDashboard />
        </Layout>
      </ProtectedRoute>
    ),
  },
  {
    path: "/students-at-risk",
    element: (
      <ProtectedRoute requiredRole={[UserRole.counselor]}>
        <Layout>
          <StudentsAtRisk />
        </Layout>
      </ProtectedRoute>
    ),
  },
  {
    path: "/profile",
    element: (
      <ProtectedRoute requiredRole={[UserRole.counselor]}>
        <Layout>
          <UserProfile />
        </Layout>
      </ProtectedRoute>
    ),
  },
];

export default counselorRoutes;
