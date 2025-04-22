
import { lazy } from "react";
import StudentManagement from "@/pages/StudentManagement";
import WellLensDashboard from "@/pages/WellLensDashboard";
import PredictiveSupport from "@/pages/PredictiveSupport";
import BehaviorPrediction from "@/pages/BehaviorPrediction";  // Add this import
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

const teacherAdminRoutes = [
  // Admin Dashboard
  {
    path: "/admin",
    element: <DashboardLayout><AdminDashboard /></DashboardLayout>,
    requiredRole: ["admin"],
  },
  {
    path: "/admin-enhanced",
    element: <DashboardLayout><AdminDashboardEnhanced /></DashboardLayout>,
    requiredRole: ["admin"],
  },
  // Teacher Dashboard
  {
    path: "/teacher",
    element: <DashboardLayout><TeacherDashboard /></DashboardLayout>,
    requiredRole: ["teacher"],
  },
  {
    path: "/teacher-enhanced",
    element: <DashboardLayout><TeacherDashboardEnhanced /></DashboardLayout>,
    requiredRole: ["teacher"],
  },
  // Shared Teacher & Admin Routes
  {
    path: "/student-management",
    element: <DashboardLayout><StudentManagement /></DashboardLayout>,
    requiredRole: ["teacher", "admin"],
  },
  {
    path: "/check-in",
    element: <DashboardLayout><CheckIn /></DashboardLayout>,
    requiredRole: ["teacher", "admin"],
  },
  {
    path: "/well-lens",
    element: <DashboardLayout><WellLensDashboard /></DashboardLayout>,
    requiredRole: ["teacher", "admin"],
  },
  {
    path: "/predictive-support",
    element: <DashboardLayout><PredictiveSupport /></DashboardLayout>,
    requiredRole: ["teacher", "admin"],
  },
  {
    path: "/behavior-prediction",  // Add this route
    element: <DashboardLayout><BehaviorPrediction /></DashboardLayout>,
    requiredRole: ["teacher", "admin"],
  },
  {
    path: "/journal",
    element: <DashboardLayout><DigitalJournal /></DashboardLayout>,
    requiredRole: ["teacher", "admin", "student"],
  },
  {
    path: "/reset-room",
    element: <DashboardLayout><ResetRoom /></DashboardLayout>, 
    requiredRole: ["teacher", "admin", "student"],
  },
  {
    path: "/self-regulation-toolbox",
    element: <DashboardLayout><SelfRegulationToolboxPage /></DashboardLayout>,
    requiredRole: ["teacher", "admin", "student"],
  },
  {
    path: "/profile",
    element: <DashboardLayout><UserProfile /></DashboardLayout>,
    requiredRole: ["admin", "teacher", "student", "parent"],
  },
];

export default teacherAdminRoutes;
