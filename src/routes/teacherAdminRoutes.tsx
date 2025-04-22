
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
import { Outlet } from "react-router-dom";

// Wrapper component that applies the DashboardLayout
const WithDashboardLayout = ({ element }: { element: React.ReactNode }) => (
  <DashboardLayout>{element}</DashboardLayout>
);

const teacherAdminRoutes = [
  // Admin Dashboard
  {
    path: "/admin",
    element: <WithDashboardLayout element={<AdminDashboard />} />,
    requiredRole: ["admin"],
  },
  {
    path: "/admin-enhanced",
    element: <WithDashboardLayout element={<AdminDashboardEnhanced />} />,
    requiredRole: ["admin"],
  },
  // Teacher Dashboard
  {
    path: "/teacher",
    element: <WithDashboardLayout element={<TeacherDashboard />} />,
    requiredRole: ["teacher"],
  },
  {
    path: "/teacher-enhanced",
    element: <WithDashboardLayout element={<TeacherDashboardEnhanced />} />,
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
    path: "/profile",
    element: <WithDashboardLayout element={<UserProfile />} />,
    requiredRole: ["admin", "teacher", "student", "parent"],
  },
];

export default teacherAdminRoutes;
