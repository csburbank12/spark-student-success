
import { lazy, Suspense } from "react";
import Layout from "@/components/Layout";
import adminRoutes from "./adminRoutes";
import teacherAdminRoutes from "./teacherAdminRoutes";
import studentRoutes from "./studentRoutes";
import parentRoutes from "./parentRoutes";
import { generalRoutes } from "./generalRoutes";
import staffRoutes from "./staffRoutes";
import { Loader } from "@/components/ui/loader";
import DashboardManager from "./DashboardManager";
import { Navigate } from "react-router-dom";
import { ProtectedRoute } from "./ProtectedRoute";

// Dynamic imports for base pages
const Login = lazy(() => import("@/pages/Login"));
const Index = lazy(() => import("@/pages/Index"));
const NotFound = lazy(() => import("@/pages/NotFound"));
const QADashboard = lazy(() => import("@/pages/QADashboard"));
const WellLensDashboard = lazy(() => import("@/pages/WellLensDashboard"));
const Profiles = lazy(() => import("@/pages/Profiles"));

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
    element: <Navigate to="/login" replace />
  },
  {
    path: "/login",
    element: <SuspenseWrapper><Login /></SuspenseWrapper>,
  },
  {
    path: "/home",
    element: <SuspenseWrapper><Index /></SuspenseWrapper>,
  },
  {
    path: "/dashboard",
    element: (
      <SuspenseWrapper>
        <Layout>
          <DashboardManager />
        </Layout>
      </SuspenseWrapper>
    ),
  },
  {
    path: "/qa-dashboard",
    element: (
      <SuspenseWrapper>
        <Layout>
          <QADashboard />
        </Layout>
      </SuspenseWrapper>
    ),
  },
  {
    path: "/welllens",
    element: (
      <SuspenseWrapper>
        <Layout>
          <ProtectedRoute>
            <WellLensDashboard />
          </ProtectedRoute>
        </Layout>
      </SuspenseWrapper>
    ),
  },
  {
    path: "/profiles",
    element: (
      <SuspenseWrapper>
        <Layout>
          <ProtectedRoute>
            <Profiles />
          </ProtectedRoute>
        </Layout>
      </SuspenseWrapper>
    ),
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
