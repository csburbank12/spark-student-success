
import { lazy } from "react";
import StudentManagement from "@/pages/StudentManagement";
import WellLensDashboard from "@/pages/WellLensDashboard";
import PredictiveSupport from "@/pages/PredictiveSupport";
import BehaviorPrediction from "@/pages/BehaviorPrediction";
import ResetRoom from "@/pages/ResetRoom";
import DigitalJournal from "@/pages/DigitalJournal";
import SelfRegulationToolboxPage from "@/pages/SelfRegulationToolbox";
import AdminDashboard from "@/pages/AdminDashboard";
import AdminDashboardEnhanced from "@/pages/AdminDashboardEnhanced";
import TeacherDashboard from "@/pages/TeacherDashboard";
import TeacherDashboardEnhanced from "@/pages/TeacherDashboardEnhanced";
import CheckIn from "@/pages/CheckIn";
import UserProfile from "@/pages/profile/UserProfile";
import DashboardLayout from "@/routes/DashboardManager";
import { Outlet, RouteObject } from "react-router-dom";
import React from "react";

// Wrapper component that applies the DashboardLayout
const WithDashboardLayout = ({ element }: { element: React.ReactNode }) => {
  return <DashboardLayout>{element}</DashboardLayout>;
};

const teacherAdminRoutes: RouteObject[] = [
  // Admin Dashboard
  {
    path: "/admin",
    element: <WithDashboardLayout element={<AdminDashboard />} />,
  },
  {
    path: "/admin-enhanced",
    element: <WithDashboardLayout element={<AdminDashboardEnhanced />} />,
  },
  // Teacher Dashboard
  {
    path: "/teacher",
    element: <WithDashboardLayout element={<TeacherDashboard />} />,
  },
  {
    path: "/teacher-enhanced",
    element: <WithDashboardLayout element={<TeacherDashboardEnhanced />} />,
  },
  // Shared Teacher & Admin Routes
  {
    path: "/student-management",
    element: <WithDashboardLayout element={<StudentManagement />} />,
  },
  {
    path: "/check-in",
    element: <WithDashboardLayout element={<CheckIn />} />,
  },
  {
    path: "/well-lens",
    element: <WithDashboardLayout element={<WellLensDashboard />} />,
  },
  {
    path: "/predictive-support",
    element: <WithDashboardLayout element={<PredictiveSupport />} />,
  },
  {
    path: "/behavior-prediction",
    element: <WithDashboardLayout element={<BehaviorPrediction />} />,
  },
  {
    path: "/journal",
    element: <WithDashboardLayout element={<DigitalJournal />} />,
  },
  {
    path: "/reset-room",
    element: <WithDashboardLayout element={<ResetRoom />} />,
  },
  {
    path: "/self-regulation-toolbox",
    element: <WithDashboardLayout element={<SelfRegulationToolboxPage />} />,
  },
  {
    path: "/profile",
    element: <WithDashboardLayout element={<UserProfile />} />,
  },
];

export default teacherAdminRoutes;
