
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
import CulturePulseSurvey from "@/pages/CulturePulseSurvey";
import AdminPulseTrends from "@/pages/AdminPulseTrends";
import SELPathwayManagement from "@/pages/SELPathwayManagement";
import { DashboardLayout } from "@/routes/DashboardManager";
import TrustedAdultDashboard from "@/pages/TrustedAdultDashboard";
import { RouteObject } from "react-router-dom";

interface WithDashboardLayoutProps {
  children: React.ReactNode;
}

const WithDashboardLayout: React.FC<WithDashboardLayoutProps> = ({ children }) => {
  return <DashboardLayout>{children}</DashboardLayout>;
};

type ExtendedRouteObject = RouteObject & {
  path: string;
  element: React.ReactNode;
  requiredRole?: string[];
};

const teacherAdminRoutes: ExtendedRouteObject[] = [
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
  {
    path: "/student-management",
    element: <WithDashboardLayout><StudentManagement /></WithDashboardLayout>,
    requiredRole: ["teacher", "admin"],
  },
  {
    path: "/check-in",
    element: <WithDashboardLayout><CheckIn /></WithDashboardLayout>,
    requiredRole: ["teacher", "admin"],
  },
  {
    path: "/well-lens",
    element: <WithDashboardLayout><WellLensDashboard /></WithDashboardLayout>,
    requiredRole: ["teacher", "admin"],
  },
  {
    path: "/predictive-support",
    element: <WithDashboardLayout><PredictiveSupport /></WithDashboardLayout>,
    requiredRole: ["teacher", "admin"],
  },
  {
    path: "/behavior-prediction",
    element: <WithDashboardLayout><BehaviorPrediction /></WithDashboardLayout>,
    requiredRole: ["teacher", "admin"],
  },
  {
    path: "/journal",
    element: <WithDashboardLayout><DigitalJournal /></WithDashboardLayout>,
    requiredRole: ["teacher", "admin", "student"],
  },
  {
    path: "/reset-room",
    element: <WithDashboardLayout><ResetRoom /></WithDashboardLayout>,
    requiredRole: ["teacher", "admin", "student"],
  },
  {
    path: "/self-regulation-toolbox",
    element: <WithDashboardLayout><SelfRegulationToolboxPage /></WithDashboardLayout>,
    requiredRole: ["teacher", "admin", "student"],
  },
  {
    path: "/trusted-adult-dashboard",
    element: <WithDashboardLayout><TrustedAdultDashboard /></WithDashboardLayout>,
    requiredRole: ["admin", "teacher"],
  },
  {
    path: "/profile",
    element: <WithDashboardLayout><UserProfile /></WithDashboardLayout>,
    requiredRole: ["admin", "teacher", "student", "parent"],
  },
  {
    path: "/pulse-tracker",
    element: (
      <WithDashboardLayout>
        <CulturePulseSurvey />
      </WithDashboardLayout>
    ),
    requiredRole: ["teacher", "student", "staff"],
  },
  {
    path: "/admin-pulse-trends",
    element: (
      <WithDashboardLayout>
        <AdminPulseTrends />
      </WithDashboardLayout>
    ),
    requiredRole: ["admin"],
  },
  {
    path: "/sel-pathway-management",
    element: (
      <WithDashboardLayout>
        <SELPathwayManagement />
      </WithDashboardLayout>
    ),
    requiredRole: ["teacher", "admin"],
  },
];

export default teacherAdminRoutes;
