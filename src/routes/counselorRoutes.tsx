
import React, { lazy } from "react";
import { ProtectedRoute } from "./ProtectedRoute";
import { UserRole } from "@/types/roles";
import Layout from "@/components/layout/Layout";

// Lazy load counselor pages
const CounselorDashboard = lazy(() => import("@/pages/counselor/CounselorDashboard"));
const StudentsAtRisk = lazy(() => import("@/pages/counselor/StudentsAtRisk"));
const WellnessMonitoring = lazy(() => import("@/pages/counselor/WellnessMonitoring"));
const CounselorCheckIns = lazy(() => import("@/pages/counselor/CounselorCheckIns"));
const AppointmentCalendar = lazy(() => import("@/pages/counselor/AppointmentCalendar"));
const CounselorResources = lazy(() => import("@/pages/counselor/CounselorResources"));
const UserProfile = lazy(() => import("@/pages/profile/UserProfile"));
const Settings = lazy(() => import("@/pages/Settings"));
const Help = lazy(() => import("@/pages/Help"));
const Notifications = lazy(() => import("@/pages/Notifications"));

// Placeholder components until they're fully implemented
const CounselorDashboardPlaceholder = () => (
  <div className="p-6">
    <h2 className="text-2xl font-bold mb-4">Counselor Dashboard</h2>
    <p>Counselor dashboard with key information would be implemented here.</p>
  </div>
);

const StudentsAtRiskPlaceholder = () => (
  <div className="p-6">
    <h2 className="text-2xl font-bold mb-4">Students at Risk</h2>
    <p>Student risk assessment and monitoring tools would be implemented here.</p>
  </div>
);

const WellnessMonitoringPlaceholder = () => (
  <div className="p-6">
    <h2 className="text-2xl font-bold mb-4">Wellness Monitoring</h2>
    <p>Student wellness monitoring tools would be implemented here.</p>
  </div>
);

const CounselorCheckInsPlaceholder = () => (
  <div className="p-6">
    <h2 className="text-2xl font-bold mb-4">Student Check-ins</h2>
    <p>Student check-in management tools would be implemented here.</p>
  </div>
);

const AppointmentCalendarPlaceholder = () => (
  <div className="p-6">
    <h2 className="text-2xl font-bold mb-4">Appointment Calendar</h2>
    <p>Counselor appointment scheduling tools would be implemented here.</p>
  </div>
);

const CounselorResourcesPlaceholder = () => (
  <div className="p-6">
    <h2 className="text-2xl font-bold mb-4">Counselor Resources</h2>
    <p>Resources for counselors would be listed here.</p>
  </div>
);

const counselorRoutes = [
  {
    path: "/counselor-dashboard",
    element: (
      <ProtectedRoute requiredRole={[UserRole.counselor]}>
        <Layout>
          <CounselorDashboardPlaceholder />
        </Layout>
      </ProtectedRoute>
    ),
  },
  {
    path: "/students-at-risk",
    element: (
      <ProtectedRoute requiredRole={[UserRole.counselor]}>
        <Layout>
          <StudentsAtRiskPlaceholder />
        </Layout>
      </ProtectedRoute>
    ),
  },
  {
    path: "/wellness-monitoring",
    element: (
      <ProtectedRoute requiredRole={[UserRole.counselor]}>
        <Layout>
          <WellnessMonitoringPlaceholder />
        </Layout>
      </ProtectedRoute>
    ),
  },
  {
    path: "/counselor-check-ins",
    element: (
      <ProtectedRoute requiredRole={[UserRole.counselor]}>
        <Layout>
          <CounselorCheckInsPlaceholder />
        </Layout>
      </ProtectedRoute>
    ),
  },
  {
    path: "/appointment-calendar",
    element: (
      <ProtectedRoute requiredRole={[UserRole.counselor]}>
        <Layout>
          <AppointmentCalendarPlaceholder />
        </Layout>
      </ProtectedRoute>
    ),
  },
  {
    path: "/counselor-resources",
    element: (
      <ProtectedRoute requiredRole={[UserRole.counselor]}>
        <Layout>
          <CounselorResourcesPlaceholder />
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
  {
    path: "/settings",
    element: (
      <ProtectedRoute requiredRole={[UserRole.counselor]}>
        <Layout>
          <Settings />
        </Layout>
      </ProtectedRoute>
    ),
  },
  {
    path: "/help",
    element: (
      <ProtectedRoute requiredRole={[UserRole.counselor]}>
        <Layout>
          <Help />
        </Layout>
      </ProtectedRoute>
    ),
  },
  {
    path: "/notifications",
    element: (
      <ProtectedRoute requiredRole={[UserRole.counselor]}>
        <Layout>
          <Notifications />
        </Layout>
      </ProtectedRoute>
    ),
  },
];

export default counselorRoutes;
