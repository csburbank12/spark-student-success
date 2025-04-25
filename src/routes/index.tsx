
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
import ConsentSettings from "@/pages/ConsentSettings";

// Dynamic imports for base pages
const Login = lazy(() => import("@/pages/Login"));
const Index = lazy(() => import("@/pages/Index"));
const NotFound = lazy(() => import("@/pages/NotFound"));
const QADashboard = lazy(() => import("@/pages/QADashboard"));
const WellLensDashboard = lazy(() => import("@/pages/WellLensDashboard"));
const Profiles = lazy(() => import("@/pages/Profiles"));
const UserProfile = lazy(() => import("@/pages/profile/UserProfile"));
const PrivacyPolicy = lazy(() => import("@/pages/PrivacyPolicy"));

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

// Add public route without Layout wrapper
const createPublicRoute = (Component: React.ComponentType, name: string) => (
  <GlobalErrorBoundary component={name} fallback={<FallbackErrorPage />}>
    <SuspenseWrapper>
      <Component />
    </SuspenseWrapper>
  </GlobalErrorBoundary>
);

// Create new route for system monitoring dashboard
const systemMonitoringRoute = {
  path: "/admin/system-monitoring",
  element: createProtectedRoute(SystemMonitoringDashboard, "SystemMonitoring")
};

// Explicit privacy routes
const privacyRoutes = [
  {
    path: "/privacy-policy",
    element: createProtectedRoute(PrivacyPolicy, "PrivacyPolicy")
  },
  {
    path: "/consent-settings",
    element: createProtectedRoute(ConsentSettings, "ConsentSettings")
  }
];

// Combine all routes
export const routes = [
  {
    path: "/",
    element: createPublicRoute(Index, "Index"),
  },
  {
    path: "/login",
    element: createPublicRoute(Login, "Login"),
  },
  {
    path: "/404",
    element: createPublicRoute(NotFound, "NotFound"),
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
  // Add privacy routes
  ...privacyRoutes
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
