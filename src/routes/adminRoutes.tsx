
import React from 'react';
import { Route } from "react-router-dom";
import { ProtectedRoute } from "./ProtectedRoute";
import { UserRole } from "@/types/roles";

import AdminDashboard from "@/pages/AdminDashboard";
import AdminDashboardEnhanced from "@/pages/AdminDashboardEnhanced";
import AdminPulseTrends from "@/pages/AdminPulseTrends";
import UserManagement from "@/pages/admin/UserManagement";
import ErrorLogsDashboard from "@/pages/admin/ErrorLogsDashboard";
import DataAnalytics from "@/pages/admin/DataAnalytics";
import SchoolOnboarding from "@/pages/admin/SchoolOnboarding";
import SchoolManagement from "@/pages/admin/SchoolManagement";
import LoopBotLogs from "@/pages/admin/LoopBotLogs";
import IntegrationsManager from "@/pages/admin/IntegrationsManager";
import SystemSettings from "@/pages/admin/SystemSettings";
import FERPACompliance from "@/pages/admin/FERPACompliance"; // Add this import

export const AdminRoutes = () => {
  return (
    <React.Fragment>
      <Route 
        path="admin-dashboard" 
        element={
          <ProtectedRoute requiredRole={[UserRole.admin]}>
            <AdminDashboard />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="admin-dashboard-enhanced" 
        element={
          <ProtectedRoute requiredRole={[UserRole.admin]}>
            <AdminDashboardEnhanced />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="admin/pulse-trends" 
        element={
          <ProtectedRoute requiredRole={[UserRole.admin]}>
            <AdminPulseTrends />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="admin/user-management" 
        element={
          <ProtectedRoute requiredRole={[UserRole.admin]}>
            <UserManagement />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="admin/error-logs" 
        element={
          <ProtectedRoute requiredRole={[UserRole.admin]}>
            <ErrorLogsDashboard />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="admin/data-analytics" 
        element={
          <ProtectedRoute requiredRole={[UserRole.admin]}>
            <DataAnalytics />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="admin/school-onboarding" 
        element={
          <ProtectedRoute requiredRole={[UserRole.admin]}>
            <SchoolOnboarding />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="admin/school-management" 
        element={
          <ProtectedRoute requiredRole={[UserRole.admin]}>
            <SchoolManagement />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="admin/loopbot-logs" 
        element={
          <ProtectedRoute requiredRole={[UserRole.admin]}>
            <LoopBotLogs />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="admin/integrations" 
        element={
          <ProtectedRoute requiredRole={[UserRole.admin]}>
            <IntegrationsManager />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="admin/system-settings" 
        element={
          <ProtectedRoute requiredRole={[UserRole.admin]}>
            <SystemSettings />
          </ProtectedRoute>
        } 
      />
      {/* Add FERPA Compliance route */}
      <Route 
        path="admin/ferpa-compliance" 
        element={
          <ProtectedRoute requiredRole={[UserRole.admin]}>
            <FERPACompliance />
          </ProtectedRoute>
        } 
      />
    </React.Fragment>
  );
};
