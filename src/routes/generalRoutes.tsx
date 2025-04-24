
import { lazy } from "react";
import Layout from "@/components/Layout";
import { Navigate } from "react-router-dom";

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
    element: (
      <Layout>
        <Help />
      </Layout>
    ),
  },
  {
    path: "/settings",
    element: (
      <Layout>
        <Settings />
      </Layout>
    ),
  },
  {
    path: "/welllens",
    element: (
      <Layout>
        <WellLensDashboard />
      </Layout>
    ),
  },
  {
    path: "/predictive-support",
    element: (
      <Layout>
        <PredictiveSupport />
      </Layout>
    ),
  },
  {
    path: "/emotion-scheduling",
    element: (
      <Layout>
        <EmotionAwareScheduling />
      </Layout>
    ),
  },
  {
    path: "/profiles",
    element: (
      <Layout>
        <Profiles />
      </Layout>
    ),
  },
  {
    path: "/shared-resources",
    element: (
      <Layout>
        <SharedResources />
      </Layout>
    ),
  },
];
