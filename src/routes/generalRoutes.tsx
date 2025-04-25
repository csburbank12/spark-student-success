
import { lazy } from "react";
import { Suspense } from "react";
import { Loader } from "@/components/ui/loader";
import Layout from "@/components/Layout";
import GlobalErrorBoundary from "@/components/error-handling/GlobalErrorBoundary";
import FallbackErrorPage from "@/components/error-handling/FallbackErrorPage";

const Help = lazy(() => import("@/pages/Help"));
const Settings = lazy(() => import("@/pages/Settings"));
const WellLensDashboard = lazy(() => import("@/pages/WellLensDashboard"));
const PredictiveSupport = lazy(() => import("@/pages/PredictiveSupport"));
const EmotionAwareScheduling = lazy(() => import("@/pages/EmotionAwareScheduling"));
const Profiles = lazy(() => import("@/pages/Profiles"));
const SharedResources = lazy(() => import("@/pages/SharedResources"));

// Create a local wrapper that doesn't depend on index.tsx
const wrapWithProtectedRoute = (Component: React.ComponentType, name: string) => (
  <GlobalErrorBoundary component={name} fallback={<FallbackErrorPage />}>
    <Suspense fallback={
      <div className="flex h-screen w-screen items-center justify-center bg-background">
        <Loader size="lg" />
      </div>
    }>
      <Layout>
        <Component />
      </Layout>
    </Suspense>
  </GlobalErrorBoundary>
);

export const generalRoutes = [
  {
    path: "/help",
    element: wrapWithProtectedRoute(Help, "Help")
  },
  {
    path: "/settings",
    element: wrapWithProtectedRoute(Settings, "Settings")
  },
  {
    path: "/welllens",
    element: wrapWithProtectedRoute(WellLensDashboard, "WellLens")
  },
  {
    path: "/predictive-support",
    element: wrapWithProtectedRoute(PredictiveSupport, "PredictiveSupport")
  },
  {
    path: "/emotion-scheduling",
    element: wrapWithProtectedRoute(EmotionAwareScheduling, "EmotionScheduling")
  },
  {
    path: "/profiles",
    element: wrapWithProtectedRoute(Profiles, "Profiles")
  },
  {
    path: "/shared-resources",
    element: wrapWithProtectedRoute(SharedResources, "SharedResources")
  }
];
