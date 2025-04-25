
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
    <div className="flex h-screen w-screen items-center justify-center bg-background">
      <Loader size="lg" />
    </div>
  }>
    {children}
  </Suspense>
);

// Create wrapped component with error boundary
const createProtectedRoute = (Component: React.ComponentType, name: string) => (
  <GlobalErrorBoundary component={name} fallback={<FallbackErrorPage />}>
    <SuspenseWrapper>
      <Layout>
        <Component />
      </Layout>
    </SuspenseWrapper>
  </GlobalErrorBoundary>
);

// Create new route for system monitoring dashboard
const systemMonitoringRoute = {
  path: "/admin/system-monitoring",
  element: createProtectedRoute(SystemMonitoringDashboard, "SystemMonitoring")
};

// Combine all routes
export const routes = [
  {
    path: "/",
    element: (
      <GlobalErrorBoundary component="Index" fallback={<FallbackErrorPage />}>
        <SuspenseWrapper>
          <Index />
        </SuspenseWrapper>
      </GlobalErrorBoundary>
    ),
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
    path: "/404",
    element: (
      <GlobalErrorBoundary component="NotFound" fallback={<FallbackErrorPage />}>
        <SuspenseWrapper>
          <NotFound />
        </SuspenseWrapper>
      </GlobalErrorBoundary>
    ),
  },
  {
    path: "/dashboard",
    element: createProtectedRoute(DashboardManager, "Dashboard")
  },
  {
    path: "/qa-dashboard",
    element: createProtectedRoute(QADashboard, "QADashboard")
  },
  {
    path: "/welllens",
    element: createProtectedRoute(WellLensDashboard, "WellLensDashboard")
  },
  {
    path: "/profiles",
    element: createProtectedRoute(Profiles, "Profiles")
  },
  {
    path: "/profile",
    element: createProtectedRoute(UserProfile, "UserProfile")
  },
  // Add the new system monitoring route
  systemMonitoringRoute,
];

// Add all the remaining routes
export const allRoutes = routes.concat(
  generalRoutes,
  adminRoutes,
  teacherAdminRoutes,
  studentRoutes,
  parentRoutes,
  staffRoutes,
  onboardingRoutes
);

export default allRoutes;
