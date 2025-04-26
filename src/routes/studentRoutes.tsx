
import React, { lazy } from "react";
import { ProtectedRoute } from "./ProtectedRoute";
import { UserRole } from "@/types/roles";
import Layout from "@/components/layout/Layout";

// Lazy load student pages
const StudentDashboard = lazy(() => import("@/pages/student/StudentDashboard"));
const SELPathways = lazy(() => import("@/pages/student/SELPathways"));
const DailyCheckIn = lazy(() => import("@/pages/student/DailyCheckIn"));
const WellnessTools = lazy(() => import("@/pages/student/WellnessTools"));
const DigitalJournal = lazy(() => import("@/pages/student/DigitalJournal"));
const ResetRoom = lazy(() => import("@/pages/student/ResetRoom"));
const TrustedAdults = lazy(() => import("@/pages/student/TrustedAdults"));
const UserProfile = lazy(() => import("@/pages/profile/UserProfile"));
const Settings = lazy(() => import("@/pages/Settings"));
const Help = lazy(() => import("@/pages/Help"));
const Notifications = lazy(() => import("@/pages/Notifications"));

// Placeholder components until they're fully implemented
const StudentDashboardPlaceholder = () => (
  <div className="p-6">
    <h2 className="text-2xl font-bold mb-4">Student Dashboard</h2>
    <p>Student dashboard with key information would be implemented here.</p>
  </div>
);

const SELPathwaysPlaceholder = () => (
  <div className="p-6">
    <h2 className="text-2xl font-bold mb-4">SEL Pathways</h2>
    <p>Social emotional learning pathways would be implemented here.</p>
  </div>
);

const DailyCheckInPlaceholder = () => (
  <div className="p-6">
    <h2 className="text-2xl font-bold mb-4">Daily Check-In</h2>
    <p>Student daily check-in tool would be implemented here.</p>
  </div>
);

const WellnessToolsPlaceholder = () => (
  <div className="p-6">
    <h2 className="text-2xl font-bold mb-4">Wellness Tools</h2>
    <p>Mental health toolkit for students would be implemented here.</p>
  </div>
);

const DigitalJournalPlaceholder = () => (
  <div className="p-6">
    <h2 className="text-2xl font-bold mb-4">Digital Journal</h2>
    <p>Student digital journal for reflections would be implemented here.</p>
  </div>
);

const ResetRoomPlaceholder = () => (
  <div className="p-6">
    <h2 className="text-2xl font-bold mb-4">Reset Room</h2>
    <p>Virtual reset room for emotional regulation would be implemented here.</p>
  </div>
);

const TrustedAdultsPlaceholder = () => (
  <div className="p-6">
    <h2 className="text-2xl font-bold mb-4">Trusted Adults</h2>
    <p>Trusted adults contact management would be implemented here.</p>
  </div>
);

const studentRoutes = [
  {
    path: "/student-dashboard",
    element: (
      <ProtectedRoute requiredRole={[UserRole.student]}>
        <Layout>
          <StudentDashboardPlaceholder />
        </Layout>
      </ProtectedRoute>
    ),
  },
  {
    path: "/sel-pathways",
    element: (
      <ProtectedRoute requiredRole={[UserRole.student]}>
        <Layout>
          <SELPathwaysPlaceholder />
        </Layout>
      </ProtectedRoute>
    ),
  },
  {
    path: "/check-in",
    element: (
      <ProtectedRoute requiredRole={[UserRole.student]}>
        <Layout>
          <DailyCheckInPlaceholder />
        </Layout>
      </ProtectedRoute>
    ),
  },
  {
    path: "/mental-health-toolkit",
    element: (
      <ProtectedRoute requiredRole={[UserRole.student]}>
        <Layout>
          <WellnessToolsPlaceholder />
        </Layout>
      </ProtectedRoute>
    ),
  },
  {
    path: "/digital-journal",
    element: (
      <ProtectedRoute requiredRole={[UserRole.student]}>
        <Layout>
          <DigitalJournalPlaceholder />
        </Layout>
      </ProtectedRoute>
    ),
  },
  {
    path: "/reset-room",
    element: (
      <ProtectedRoute requiredRole={[UserRole.student]}>
        <Layout>
          <ResetRoomPlaceholder />
        </Layout>
      </ProtectedRoute>
    ),
  },
  {
    path: "/trusted-adults",
    element: (
      <ProtectedRoute requiredRole={[UserRole.student]}>
        <Layout>
          <TrustedAdultsPlaceholder />
        </Layout>
      </ProtectedRoute>
    ),
  },
  {
    path: "/profile",
    element: (
      <ProtectedRoute requiredRole={[UserRole.student]}>
        <Layout>
          <UserProfile />
        </Layout>
      </ProtectedRoute>
    ),
  },
  {
    path: "/settings",
    element: (
      <ProtectedRoute requiredRole={[UserRole.student]}>
        <Layout>
          <Settings />
        </Layout>
      </ProtectedRoute>
    ),
  },
  {
    path: "/help",
    element: (
      <ProtectedRoute requiredRole={[UserRole.student]}>
        <Layout>
          <Help />
        </Layout>
      </ProtectedRoute>
    ),
  },
  {
    path: "/notifications",
    element: (
      <ProtectedRoute requiredRole={[UserRole.student]}>
        <Layout>
          <Notifications />
        </Layout>
      </ProtectedRoute>
    ),
  },
];

export default studentRoutes;
