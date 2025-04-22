
import React from "react";
import { Navigate } from "react-router-dom";
import Login from "@/pages/Login";
import StudentManagement from "@/pages/StudentManagement";
import CheckIn from "@/pages/CheckIn";
import MentalHealthToolkit from "@/pages/MentalHealthToolkit";
import FutureMe from "@/pages/FutureMe";
import NotFound from "@/pages/NotFound";
import ChildActivity from "@/pages/parent/ChildActivity";
import ChildWellness from "@/pages/parent/ChildWellness";
import ParentMessages from "@/pages/parent/ParentMessages";
import PredictiveSupport from "@/pages/PredictiveSupport";
import { ProtectedRoute, DashboardRouter } from "./ProtectedRoute";
import WellLensDashboard from "@/pages/WellLensDashboard";
import StudentsAtRisk from "@/pages/students/StudentsAtRisk";
import UserProfile from "@/pages/profile/UserProfile";
import SelfRegulationToolboxPage from "@/pages/SelfRegulationToolbox";
import ResetRoomPage from "@/pages/ResetRoom";
import DigitalJournal from "@/pages/DigitalJournal";

// Import any required TS types
import type { User } from "@/types";

interface RouteConfig {
  path: string;
  element: React.ReactNode;
  requiredRole?: string[];
}

// All main app routes, matching original logic from App.tsx
export const routes: RouteConfig[] = [
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/",
    element: <Navigate to="/dashboard" replace />,
  },
  {
    path: "/dashboard",
    element: (
      <ProtectedRoute>
        <DashboardRouter />
      </ProtectedRoute>
    ),
  },
  {
    path: "/check-in",
    element: (
      <ProtectedRoute>
        <CheckIn />
      </ProtectedRoute>
    ),
  },
  {
    path: "/mental-health-toolkit",
    element: (
      <ProtectedRoute>
        <MentalHealthToolkit />
      </ProtectedRoute>
    ),
  },
  {
    path: "/future-me",
    element: (
      <ProtectedRoute>
        <FutureMe />
      </ProtectedRoute>
    ),
  },
  {
    path: "/activities",
    element: (
      <ProtectedRoute>
        <div className="p-6">Activities Page (Coming Soon)</div>
      </ProtectedRoute>
    ),
  },
  {
    path: "/progress",
    element: (
      <ProtectedRoute>
        <div className="p-6">Progress Page (Coming Soon)</div>
      </ProtectedRoute>
    ),
  },
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
  {
    path: "/settings",
    element: (
      <ProtectedRoute>
        <div className="p-6">Settings Page (Coming Soon)</div>
      </ProtectedRoute>
    ),
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
    path: "/profile",
    element: (
      <ProtectedRoute>
        <UserProfile />
      </ProtectedRoute>
    ),
  },
  {
    path: "/self-regulation-toolbox",
    element: (
      <ProtectedRoute>
        <SelfRegulationToolboxPage />
      </ProtectedRoute>
    ),
  },
  {
    path: "/reset-room",
    element: (
      <ProtectedRoute>
        <ResetRoomPage />
      </ProtectedRoute>
    ),
  },
  {
    path: "/digital-journal",
    element: (
      <ProtectedRoute>
        <DigitalJournal />
      </ProtectedRoute>
    ),
  },
  {
    path: "*",
    element: <NotFound />,
  },
];
