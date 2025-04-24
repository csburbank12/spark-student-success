
import { lazy, Suspense } from "react";
import { Navigate } from "react-router-dom";
import Layout from "@/components/Layout";
import adminRoutes from "./adminRoutes";
import teacherAdminRoutes from "./teacherAdminRoutes";
import studentRoutes from "./studentRoutes";
import parentRoutes from "./parentRoutes";
import { generalRoutes } from "./generalRoutes";
import staffRoutes from "./staffRoutes";
import { Loader } from "@/components/ui/loader";
import DashboardManager from "./DashboardManager";

// Dynamic imports for base pages
const Login = lazy(() => import("@/pages/Login"));
const Index = lazy(() => import("@/pages/Index"));
const NotFound = lazy(() => import("@/pages/NotFound"));

// Create a suspense wrapper for lazy loaded components
const SuspenseWrapper = ({ children }: { children: React.ReactNode }) => (
  <Suspense fallback={
    <div className="flex h-screen w-screen items-center justify-center">
      <Loader size="lg" />
    </div>
  }>
    {children}
  </Suspense>
);

// Combine all routes
export const routes = [
  {
    path: "/",
    element: <SuspenseWrapper><Index /></SuspenseWrapper>,
  },
  {
    path: "/login",
    element: <SuspenseWrapper><Login /></SuspenseWrapper>,
  },
  {
    path: "/dashboard",
    element: <SuspenseWrapper><DashboardManager /></SuspenseWrapper>,
  },
  ...generalRoutes,
  ...adminRoutes,
  ...teacherAdminRoutes,
  ...studentRoutes,
  ...parentRoutes,
  ...staffRoutes,
  {
    path: "*",
    element: <SuspenseWrapper><NotFound /></SuspenseWrapper>
  }
];
