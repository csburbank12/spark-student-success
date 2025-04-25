
import { lazy, Suspense, ReactNode } from "react";
import Layout from "@/components/Layout";
import adminRoutes from "./adminRoutes";
import teacherAdminRoutes from "./teacherAdminRoutes";
import studentRoutes from "./studentRoutes";
import parentRoutes from "./parentRoutes";
import onboardingRoutes from "./onboardingRoutes";
import { generalRoutes } from "./generalRoutes";
import staffRoutes from "./staffRoutes";
import { Loader } from "@/components/ui/loader";
import DashboardManager from "./DashboardManager";
import { Navigate } from "react-router-dom";
import { ProtectedRoute } from "./ProtectedRoute";
import GlobalErrorBoundary from "@/components/error-handling/GlobalErrorBoundary";
import FallbackErrorPage from "@/components/error-handling/FallbackErrorPage";
import SystemMonitoringDashboard from "@/components/error-handling/SystemMonitoringDashboard";

// Dynamic imports for base pages
const Login = lazy(() => import("@/pages/Login"));
const Index = lazy(() => import("@/pages/Index"));
const NotFound = lazy(() => import("@/pages/NotFound"));
const QADashboard = lazy(() => import("@/pages/QADashboard"));
const WellLensDashboard = lazy(() => import("@/pages/WellLensDashboard"));
const Profiles = lazy(() => import("@/pages/Profiles"));
const UserProfile = lazy(() => import("@/pages/profile/UserProfile"));

// Create a suspense wrapper for lazy loaded components
const SuspenseWrapper = ({ children }: { children: ReactNode }) => (
  <Suspense fallback={
    <div className="flex h-screen w-screen items-center justify-center">
      <Loader size="lg" />
    </div>
  }>
    {children}
  </Suspense>
);

// Create new route for system monitoring dashboard
const systemMonitoringRoute = {
  path: "/admin/system-monitoring",
  element: (
    <SuspenseWrapper>
      <Layout>
        <SystemMonitoringDashboard />
      </Layout>
    </SuspenseWrapper>
  ),
};

// Combine all routes
export const routes = [
  {
    path: "/",
    element: <Navigate to="/login" replace />
  },
  {
    path: "/login",
    element: (
      <GlobalErrorBoundary component="Login" fallback={<FallbackErrorPage />}>
        <SuspenseWrapper>
          <Login />
        </SuspenseWrapper>
      </GlobalErrorBoundary>
    ),
  },
  {
    path: "/home",
    element: (
      <GlobalErrorBoundary component="Index" fallback={<FallbackErrorPage />}>
        <SuspenseWrapper>
          <Index />
        </SuspenseWrapper>
      </GlobalErrorBoundary>
    ),
  },
  {
    path: "/dashboard",
    element: (
      <GlobalErrorBoundary component="Dashboard" fallback={<FallbackErrorPage />}>
        <SuspenseWrapper>
          <Layout>
            <DashboardManager />
          </Layout>
        </SuspenseWrapper>
      </GlobalErrorBoundary>
    ),
  },
  {
    path: "/qa-dashboard",
    element: (
      <GlobalErrorBoundary component="QADashboard" fallback={<FallbackErrorPage />}>
        <SuspenseWrapper>
          <Layout>
            <QADashboard />
          </Layout>
        </SuspenseWrapper>
      </GlobalErrorBoundary>
    ),
  },
  {
    path: "/welllens",
    element: (
      <GlobalErrorBoundary component="WellLensDashboard" fallback={<FallbackErrorPage />}>
        <SuspenseWrapper>
          <Layout>
            <WellLensDashboard />
          </Layout>
        </SuspenseWrapper>
      </GlobalErrorBoundary>
    ),
  },
  {
    path: "/profiles",
    element: (
      <GlobalErrorBoundary component="Profiles" fallback={<FallbackErrorPage />}>
        <SuspenseWrapper>
          <Layout>
            <Profiles />
          </Layout>
        </SuspenseWrapper>
      </GlobalErrorBoundary>
    ),
  },
  {
    path: "/profile",
    element: (
      <GlobalErrorBoundary component="UserProfile" fallback={<FallbackErrorPage />}>
        <SuspenseWrapper>
          <Layout>
            <UserProfile />
          </Layout>
        </SuspenseWrapper>
      </GlobalErrorBoundary>
    ),
  },
  // Add the new system monitoring route
  systemMonitoringRoute,
];

// Add all the remaining routes
const allRoutes = routes.concat(
  generalRoutes,
  adminRoutes,
  teacherAdminRoutes,
  studentRoutes,
  parentRoutes,
  staffRoutes,
  onboardingRoutes,
  [{
    path: "*",
    element: (
      <GlobalErrorBoundary component="NotFound" fallback={<FallbackErrorPage />}>
        <SuspenseWrapper>
          <NotFound />
        </SuspenseWrapper>
      </GlobalErrorBoundary>
    )
  }]
);

export default allRoutes;
