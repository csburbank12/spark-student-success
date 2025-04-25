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
import Terms from "@/pages/Terms";
import Help from "@/pages/Help";

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

// Create wrapped component with error boundary AND consistent layout for all routes
export const createProtectedRoute = (Component: React.ComponentType, name: string) => (
  <GlobalErrorBoundary component={name} fallback={<FallbackErrorPage />}>
    <SuspenseWrapper>
      <Layout>
        <Component />
      </Layout>
    </SuspenseWrapper>
  </GlobalErrorBoundary>
);

// Create public route without Layout wrapper
export const createPublicRoute = (Component: React.ComponentType, name: string) => (
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

// Explicit privacy and support routes
const privacyRoutes = [
  {
    path: "/privacy-policy",
    element: createPublicRoute(PrivacyPolicy, "PrivacyPolicy")
  },
  {
    path: "/consent-settings",
    element: createProtectedRoute(ConsentSettings, "ConsentSettings")
  },
  {
    path: "/terms",
    element: createPublicRoute(Terms, "Terms")
  },
  {
    path: "/help",
    element: createPublicRoute(Help, "Help")
  }
];

// Update the routes constant to use regular dashboard components
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
  systemMonitoringRoute,
  ...privacyRoutes
];

// Make sure ALL routes use the protected route wrapper with layout
export const allRoutes = [
  ...routes,
  ...generalRoutes,
  ...adminRoutes,
  ...teacherAdminRoutes,
  ...studentRoutes,
  ...parentRoutes,
  ...staffRoutes,
  ...onboardingRoutes
];

export default allRoutes;
