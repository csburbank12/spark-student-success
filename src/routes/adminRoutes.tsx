
import React from "react";
import { Route } from "react-router-dom";
import AdminDashboard from "@/pages/AdminDashboard";
import SchoolManagement from "@/pages/admin/SchoolManagement";
import SchoolImportPage from "@/pages/admin/SchoolImportPage";
import UserManagement from "@/pages/admin/UserManagement";
import DataAnalytics from "@/pages/admin/DataAnalytics";
import SystemSettings from "@/pages/admin/SystemSettings";
import ErrorLogs from "@/pages/admin/ErrorLogs";
import SchoolOnboarding from "@/pages/admin/SchoolOnboarding";
import DataImportWizard from "@/pages/admin/DataImportWizard";
import AddSchoolPage from "@/pages/admin/AddSchoolPage";
import EditSchoolPage from "@/pages/admin/EditSchoolPage";
import SchoolProfilePage from "@/pages/admin/SchoolProfilePage";
import GlobalErrorBoundary from "@/components/error-handling/GlobalErrorBoundary";
import FallbackErrorPage from "@/components/error-handling/FallbackErrorPage";
import Layout from "@/components/Layout";

const adminRoutes = [
  {
    path: "/admin/dashboard",
    element: (
      <GlobalErrorBoundary 
        component="AdminDashboard"
        fallback={<FallbackErrorPage />}
      >
        <Layout>
          <AdminDashboard />
        </Layout>
      </GlobalErrorBoundary>
    ),
  },
  {
    path: "/admin/schools",
    element: (
      <GlobalErrorBoundary 
        component="SchoolManagement"
        fallback={<FallbackErrorPage />}
      >
        <Layout>
          <SchoolManagement />
        </Layout>
      </GlobalErrorBoundary>
    ),
  },
  {
    path: "/admin/schools/import",
    element: (
      <GlobalErrorBoundary 
        component="SchoolImportPage"
        fallback={<FallbackErrorPage />}
      >
        <Layout>
          <SchoolImportPage />
        </Layout>
      </GlobalErrorBoundary>
    ),
  },
  {
    path: "/admin/schools/add",
    element: (
      <GlobalErrorBoundary 
        component="AddSchoolPage"
        fallback={<FallbackErrorPage />}
      >
        <Layout>
          <AddSchoolPage />
        </Layout>
      </GlobalErrorBoundary>
    ),
  },
  {
    path: "/admin/schools/edit/:id",
    element: (
      <GlobalErrorBoundary 
        component="EditSchoolPage"
        fallback={<FallbackErrorPage />}
      >
        <Layout>
          <EditSchoolPage />
        </Layout>
      </GlobalErrorBoundary>
    ),
  },
  {
    path: "/admin/schools/:id",
    element: (
      <GlobalErrorBoundary 
        component="SchoolProfilePage"
        fallback={<FallbackErrorPage />}
      >
        <Layout>
          <SchoolProfilePage />
        </Layout>
      </GlobalErrorBoundary>
    ),
  },
  {
    path: "/admin/users",
    element: (
      <GlobalErrorBoundary 
        component="UserManagement"
        fallback={<FallbackErrorPage />}
      >
        <Layout>
          <UserManagement />
        </Layout>
      </GlobalErrorBoundary>
    ),
  },
  {
    path: "/admin/analytics",
    element: (
      <GlobalErrorBoundary 
        component="DataAnalytics"
        fallback={<FallbackErrorPage />}
      >
        <Layout>
          <DataAnalytics />
        </Layout>
      </GlobalErrorBoundary>
    ),
  },
  {
    path: "/admin/settings",
    element: (
      <GlobalErrorBoundary 
        component="SystemSettings"
        fallback={<FallbackErrorPage />}
      >
        <Layout>
          <SystemSettings />
        </Layout>
      </GlobalErrorBoundary>
    ),
  },
  {
    path: "/admin/logs",
    element: (
      <GlobalErrorBoundary 
        component="ErrorLogs"
        fallback={<FallbackErrorPage />}
      >
        <Layout>
          <ErrorLogs />
        </Layout>
      </GlobalErrorBoundary>
    ),
  },
  {
    path: "/admin/school-onboarding",
    element: (
      <GlobalErrorBoundary 
        component="SchoolOnboarding"
        fallback={<FallbackErrorPage />}
      >
        <Layout>
          <SchoolOnboarding />
        </Layout>
      </GlobalErrorBoundary>
    ),
  },
  {
    path: "/admin/data-import",
    element: (
      <GlobalErrorBoundary 
        component="DataImportWizard"
        fallback={<FallbackErrorPage />}
      >
        <Layout>
          <DataImportWizard />
        </Layout>
      </GlobalErrorBoundary>
    ),
  },
];

const adminRoutesComponent = adminRoutes.map((route) => (
  <Route key={route.path} path={route.path} element={route.element} />
));

export default adminRoutesComponent;
