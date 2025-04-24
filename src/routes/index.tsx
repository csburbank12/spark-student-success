
import { lazy } from "react";
import { Navigate } from "react-router-dom";
import Layout from "@/components/Layout";
import { adminRoutes } from "./adminRoutes";
import { teacherRoutes } from "./teacherRoutes";
import { studentRoutes } from "./studentRoutes";
import { parentRoutes } from "./parentRoutes";
import { generalRoutes } from "./generalRoutes";
import { staffRoutes } from "./staffRoutes";

// Dynamic imports for base pages
const Login = lazy(() => import("@/pages/Login"));
const Index = lazy(() => import("@/pages/Index"));
const StudentDashboardEnhanced = lazy(() => import("@/pages/StudentDashboardEnhanced"));
const TeacherDashboardEnhanced = lazy(() => import("@/pages/TeacherDashboardEnhanced"));
const AdminDashboardEnhanced = lazy(() => import("@/pages/AdminDashboardEnhanced"));
const ParentDashboardEnhanced = lazy(() => import("@/pages/ParentDashboardEnhanced"));

// Combine all routes
export const routes = [
  {
    path: "/",
    element: <Index />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  ...generalRoutes,
  ...adminRoutes,
  ...teacherRoutes,
  ...studentRoutes,
  ...parentRoutes,
  ...staffRoutes
];
