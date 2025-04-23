
import React from "react";
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
import TrustedAdultDashboard from "@/pages/TrustedAdultDashboard";
import { RouteObject } from "react-router-dom";

// Fix for the WithDashboardLayout component
const WithDashboardLayout = ({ element }: { element: React.ReactNode }) => {
  return <DashboardLayout>{element}</DashboardLayout>;
};

// Extend RouteObject with extra props directly:
type ExtendedRouteObject = RouteObject & {
  path: string;
  element: React.ReactNode;
  requiredRole?: string[];
};

const teacherAdminRoutes: ExtendedRouteObject[] = [
  // Admin Dashboard
  {
    path: "/admin",
    element: React.createElement(WithDashboardLayout, { element: <AdminDashboard /> }),
    requiredRole: ["admin"],
  },
  {
    path: "/admin-enhanced",
    element: React.createElement(WithDashboardLayout, { element: <AdminDashboardEnhanced /> }),
    requiredRole: ["admin"],
  },
  // Teacher Dashboard
  {
    path: "/teacher",
    element: React.createElement(WithDashboardLayout, { element: <TeacherDashboard /> }),
    requiredRole: ["teacher"],
  },
  {
    path: "/teacher-enhanced",
    element: React.createElement(WithDashboardLayout, { element: <TeacherDashboardEnhanced /> }),
    requiredRole: ["teacher"],
  },
  // Shared Teacher & Admin Routes
  {
    path: "/student-management",
    element: React.createElement(WithDashboardLayout, { element: <StudentManagement /> }),
    requiredRole: ["teacher", "admin"],
  },
  {
    path: "/check-in",
    element: React.createElement(WithDashboardLayout, { element: <CheckIn /> }),
    requiredRole: ["teacher", "admin"],
  },
  {
    path: "/well-lens",
    element: React.createElement(WithDashboardLayout, { element: <WellLensDashboard /> }),
    requiredRole: ["teacher", "admin"],
  },
  {
    path: "/predictive-support",
    element: React.createElement(WithDashboardLayout, { element: <PredictiveSupport /> }),
    requiredRole: ["teacher", "admin"],
  },
  {
    path: "/behavior-prediction",
    element: React.createElement(WithDashboardLayout, { element: <BehaviorPrediction /> }),
    requiredRole: ["teacher", "admin"],
  },
  {
    path: "/journal",
    element: React.createElement(WithDashboardLayout, { element: <DigitalJournal /> }),
    requiredRole: ["teacher", "admin", "student"],
  },
  {
    path: "/reset-room",
    element: React.createElement(WithDashboardLayout, { element: <ResetRoom /> }),
    requiredRole: ["teacher", "admin", "student"],
  },
  {
    path: "/self-regulation-toolbox",
    element: React.createElement(WithDashboardLayout, { element: <SelfRegulationToolboxPage /> }),
    requiredRole: ["teacher", "admin", "student"],
  },
  {
    path: "/trusted-adult-dashboard",
    element: React.createElement(WithDashboardLayout, { element: <TrustedAdultDashboard /> }),
    requiredRole: ["admin", "teacher"],
  },
  {
    path: "/profile",
    element: React.createElement(WithDashboardLayout, { element: <UserProfile /> }),
    requiredRole: ["admin", "teacher", "student", "parent"],
  },
];

export default teacherAdminRoutes;
