
import React from "react";
import { Route } from "react-router-dom";
import TeacherOnboarding from "@/pages/onboarding/TeacherOnboarding";
import StudentOnboarding from "@/pages/onboarding/StudentOnboarding";
import ParentOnboarding from "@/pages/onboarding/ParentOnboarding";
import { UserRole } from "@/types/roles";
import { ProtectedRoute } from "./ProtectedRoute";

const onboardingRoutes = [
  {
    path: "/onboarding/teacher",
    element: (
      <ProtectedRoute requiredRole={[UserRole.teacher]}>
        <TeacherOnboarding />
      </ProtectedRoute>
    ),
  },
  {
    path: "/onboarding/student",
    element: (
      <ProtectedRoute requiredRole={[UserRole.student]}>
        <StudentOnboarding />
      </ProtectedRoute>
    ),
  },
  {
    path: "/onboarding/parent",
    element: (
      <ProtectedRoute requiredRole={[UserRole.parent]}>
        <ParentOnboarding />
      </ProtectedRoute>
    ),
  },
];

export default onboardingRoutes;
