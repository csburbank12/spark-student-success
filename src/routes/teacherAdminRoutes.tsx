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

// Updated WithDashboardLayout component with explicit props
interface WithDashboardLayoutProps {
  children: React.ReactElement;
}

const WithDashboardLayout: React.FC<WithDashboardLayoutProps> = ({ children }) => {
  return <DashboardLayout>{children}</DashboardLayout>;
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
    element: <WithDashboardLayout><AdminDashboard /></WithDashboardLayout>,
    requiredRole: ["admin"],
  },
  {
    path: "/admin-enhanced",
    element: <WithDashboardLayout><AdminDashboardEnhanced /></WithDashboardLayout>,
    requiredRole: ["admin"],
  },
  // Teacher Dashboard
  {
    path: "/teacher",
    element: <WithDashboardLayout><TeacherDashboard /></WithDashboardLayout>,
    requiredRole: ["teacher"],
  },
  {
    path: "/teacher-enhanced",
    element: <WithDashboardLayout><TeacherDashboardEnhanced /></WithDashboardLayout>,
    requiredRole: ["teacher"],
  },
  // Shared Teacher & Admin Routes
  {
    path: "/student-management",
    element: <WithDashboardLayout element={<StudentManagement />} />,
    requiredRole: ["teacher", "admin"],
  },
  {
    path: "/check-in",
    element: <WithDashboardLayout element={<CheckIn />} />,
    requiredRole: ["teacher", "admin"],
  },
  {
    path: "/well-lens",
    element: <WithDashboardLayout element={<WellLensDashboard />} />,
    requiredRole: ["teacher", "admin"],
  },
  {
    path: "/predictive-support",
    element: <WithDashboardLayout element={<PredictiveSupport />} />,
    requiredRole: ["teacher", "admin"],
  },
  {
    path: "/behavior-prediction",
    element: <WithDashboardLayout element={<BehaviorPrediction />} />,
    requiredRole: ["teacher", "admin"],
  },
  {
    path: "/journal",
    element: <WithDashboardLayout element={<DigitalJournal />} />,
    requiredRole: ["teacher", "admin", "student"],
  },
  {
    path: "/reset-room",
    element: <WithDashboardLayout element={<ResetRoom />} />,
    requiredRole: ["teacher", "admin", "student"],
  },
  {
    path: "/self-regulation-toolbox",
    element: <WithDashboardLayout element={<SelfRegulationToolboxPage />} />,
    requiredRole: ["teacher", "admin", "student"],
  },
  {
    path: "/trusted-adult-dashboard",
    element: <WithDashboardLayout element={<TrustedAdultDashboard />} />,
    requiredRole: ["admin", "teacher"],
  },
  {
    path: "/profile",
    element: <WithDashboardLayout element={<UserProfile />} />,
    requiredRole: ["admin", "teacher", "student", "parent"],
  },
];

export default teacherAdminRoutes;
