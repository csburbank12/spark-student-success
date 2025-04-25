
import { lazy } from "react";
import { createProtectedRoute } from "./index";

const Help = lazy(() => import("@/pages/Help"));
const Settings = lazy(() => import("@/pages/Settings"));
const WellLensDashboard = lazy(() => import("@/pages/WellLensDashboard"));
const PredictiveSupport = lazy(() => import("@/pages/PredictiveSupport"));
const EmotionAwareScheduling = lazy(() => import("@/pages/EmotionAwareScheduling"));
const Profiles = lazy(() => import("@/pages/Profiles"));
const SharedResources = lazy(() => import("@/pages/SharedResources"));

export const generalRoutes = [
  {
    path: "/help",
    element: createProtectedRoute(Help, "Help")
  },
  {
    path: "/settings",
    element: createProtectedRoute(Settings, "Settings")
  },
  {
    path: "/welllens",
    element: createProtectedRoute(WellLensDashboard, "WellLens")
  },
  {
    path: "/predictive-support",
    element: createProtectedRoute(PredictiveSupport, "PredictiveSupport")
  },
  {
    path: "/emotion-scheduling",
    element: createProtectedRoute(EmotionAwareScheduling, "EmotionScheduling")
  },
  {
    path: "/profiles",
    element: createProtectedRoute(Profiles, "Profiles")
  },
  {
    path: "/shared-resources",
    element: createProtectedRoute(SharedResources, "SharedResources")
  }
];
