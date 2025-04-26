
import React, { lazy } from "react";
import { ProtectedRoute } from "./ProtectedRoute";
import { UserRole } from "@/types/roles";
import Layout from "@/components/layout/Layout";

// Lazy load teacher pages
const TeacherDashboard = lazy(() => import("@/pages/teacher/TeacherDashboard"));
const Students = lazy(() => import("@/pages/teacher/Students"));
const SELPathwayManagement = lazy(() => import("@/pages/teacher/SELPathwayManagement"));
const TeacherCheckIn = lazy(() => import("@/pages/teacher/TeacherCheckIn"));
const PredictiveSupport = lazy(() => import("@/pages/teacher/PredictiveSupport"));
const EmotionAwareScheduling = lazy(() => import("@/pages/teacher/EmotionAwareScheduling"));
const WellLens = lazy(() => import("@/pages/teacher/WellLens"));
const UserProfile = lazy(() => import("@/pages/profile/UserProfile"));
const Settings = lazy(() => import("@/pages/Settings"));
const Help = lazy(() => import("@/pages/Help"));
const Notifications = lazy(() => import("@/pages/Notifications"));

// Placeholder components until they're fully implemented
const TeacherDashboardPlaceholder = () => (
  <div className="p-6">
    <h2 className="text-2xl font-bold mb-4">Teacher Dashboard</h2>
    <p>Teacher dashboard with key information would be implemented here.</p>
  </div>
);

const StudentsPlaceholder = () => (
  <div className="p-6">
    <h2 className="text-2xl font-bold mb-4">Students</h2>
    <p>Student management interface would be implemented here.</p>
  </div>
);

const SELPathwayManagementPlaceholder = () => (
  <div className="p-6">
    <h2 className="text-2xl font-bold mb-4">SEL Activities</h2>
    <p>Social emotional learning pathway management tools would be implemented here.</p>
  </div>
);

const TeacherCheckInPlaceholder = () => (
  <div className="p-6">
    <h2 className="text-2xl font-bold mb-4">Check-In</h2>
    <p>Student check-in monitoring tools would be implemented here.</p>
  </div>
);

const PredictiveSupportPlaceholder = () => (
  <div className="p-6">
    <h2 className="text-2xl font-bold mb-4">Predictive Support</h2>
    <p>AI-powered predictive support tools would be implemented here.</p>
  </div>
);

const EmotionAwareSchedulingPlaceholder = () => (
  <div className="p-6">
    <h2 className="text-2xl font-bold mb-4">Emotion-Aware Scheduling</h2>
    <p>Emotion-aware class scheduling tools would be implemented here.</p>
  </div>
);

const WellLensPlaceholder = () => (
  <div className="p-6">
    <h2 className="text-2xl font-bold mb-4">Well-Being Dashboard</h2>
    <p>Class-wide well-being monitoring dashboard would be implemented here.</p>
  </div>
);

const teacherAdminRoutes = [
  {
    path: "/teacher-dashboard",
    element: (
      <ProtectedRoute requiredRole={[UserRole.teacher, UserRole.staff]}>
        <Layout>
          <TeacherDashboardPlaceholder />
        </Layout>
      </ProtectedRoute>
    ),
  },
  {
    path: "/students",
    element: (
      <ProtectedRoute requiredRole={[UserRole.teacher, UserRole.staff]}>
        <Layout>
          <StudentsPlaceholder />
        </Layout>
      </ProtectedRoute>
    ),
  },
  {
    path: "/sel-pathway-management",
    element: (
      <ProtectedRoute requiredRole={[UserRole.teacher, UserRole.staff]}>
        <Layout>
          <SELPathwayManagementPlaceholder />
        </Layout>
      </ProtectedRoute>
    ),
  },
  {
    path: "/check-in",
    element: (
      <ProtectedRoute requiredRole={[UserRole.teacher, UserRole.staff]}>
        <Layout>
          <TeacherCheckInPlaceholder />
        </Layout>
      </ProtectedRoute>
    ),
  },
  {
    path: "/predictive-support",
    element: (
      <ProtectedRoute requiredRole={[UserRole.teacher, UserRole.staff]}>
        <Layout>
          <PredictiveSupportPlaceholder />
        </Layout>
      </ProtectedRoute>
    ),
  },
  {
    path: "/emotion-aware-scheduling",
    element: (
      <ProtectedRoute requiredRole={[UserRole.teacher, UserRole.staff]}>
        <Layout>
          <EmotionAwareSchedulingPlaceholder />
        </Layout>
      </ProtectedRoute>
    ),
  },
  {
    path: "/well-lens",
    element: (
      <ProtectedRoute requiredRole={[UserRole.teacher, UserRole.staff]}>
        <Layout>
          <WellLensPlaceholder />
        </Layout>
      </ProtectedRoute>
    ),
  },
  {
    path: "/profile",
    element: (
      <ProtectedRoute requiredRole={[UserRole.teacher, UserRole.staff]}>
        <Layout>
          <UserProfile />
        </Layout>
      </ProtectedRoute>
    ),
  },
  {
    path: "/settings",
    element: (
      <ProtectedRoute requiredRole={[UserRole.teacher, UserRole.staff]}>
        <Layout>
          <Settings />
        </Layout>
      </ProtectedRoute>
    ),
  },
  {
    path: "/help",
    element: (
      <ProtectedRoute requiredRole={[UserRole.teacher, UserRole.staff]}>
        <Layout>
          <Help />
        </Layout>
      </ProtectedRoute>
    ),
  },
  {
    path: "/notifications",
    element: (
      <ProtectedRoute requiredRole={[UserRole.teacher, UserRole.staff]}>
        <Layout>
          <Notifications />
        </Layout>
      </ProtectedRoute>
    ),
  },
];

export default teacherAdminRoutes;
