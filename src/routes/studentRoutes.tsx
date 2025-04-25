
import React, { lazy } from "react";
import { Routes, Route } from "react-router-dom";
import Layout from "@/components/Layout";
import { ProtectedRoute } from "./ProtectedRoute";
import { UserRole } from "@/types/roles";

// Lazy load student pages to improve initial load performance
const StudentDashboard = lazy(() => import("@/pages/StudentDashboard"));
const StudentDashboardEnhanced = lazy(() => import("@/pages/StudentDashboardEnhanced"));
const SELPathways = lazy(() => import("@/pages/PersonalizedSELPathways"));
const CheckIn = lazy(() => import("@/pages/CheckIn"));
const MentalHealthToolkit = lazy(() => import("@/pages/MentalHealthToolkit"));
const DigitalJournal = lazy(() => import("@/pages/DigitalJournal"));
const ResetRoom = lazy(() => import("@/pages/ResetRoom"));
const TrustedAdults = lazy(() => import("@/pages/TrustedAdults"));
const UserProfile = lazy(() => import("@/pages/profile/UserProfile"));

const studentRoutes = (
  <Routes>
    <Route path="/student-dashboard" element={
      <ProtectedRoute requiredRole={["student"] as UserRole[]}>
        <Layout>
          <StudentDashboard />
        </Layout>
      </ProtectedRoute>
    } />
    <Route path="/student-dashboard-enhanced" element={
      <ProtectedRoute requiredRole={["student"] as UserRole[]}>
        <Layout>
          <StudentDashboardEnhanced />
        </Layout>
      </ProtectedRoute>
    } />
    <Route path="/sel-pathways" element={
      <ProtectedRoute requiredRole={["student"] as UserRole[]}>
        <Layout>
          <SELPathways />
        </Layout>
      </ProtectedRoute>
    } />
    <Route path="/check-in" element={
      <ProtectedRoute requiredRole={["student"] as UserRole[]}>
        <Layout>
          <CheckIn />
        </Layout>
      </ProtectedRoute>
    } />
    <Route path="/mental-health-toolkit" element={
      <ProtectedRoute requiredRole={["student"] as UserRole[]}>
        <Layout>
          <MentalHealthToolkit />
        </Layout>
      </ProtectedRoute>
    } />
    <Route path="/digital-journal" element={
      <ProtectedRoute requiredRole={["student"] as UserRole[]}>
        <Layout>
          <DigitalJournal />
        </Layout>
      </ProtectedRoute>
    } />
    <Route path="/reset-room" element={
      <ProtectedRoute requiredRole={["student"] as UserRole[]}>
        <Layout>
          <ResetRoom />
        </Layout>
      </ProtectedRoute>
    } />
    <Route path="/trusted-adults" element={
      <ProtectedRoute requiredRole={["student"] as UserRole[]}>
        <Layout>
          <TrustedAdults />
        </Layout>
      </ProtectedRoute>
    } />
    <Route path="/profile" element={
      <ProtectedRoute requiredRole={["student"] as UserRole[]}>
        <Layout>
          <UserProfile />
        </Layout>
      </ProtectedRoute>
    } />
  </Routes>
);

export default studentRoutes;
