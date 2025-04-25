
import React, { lazy } from "react";
import { Routes, Route } from "react-router-dom";
import Layout from "@/components/Layout";
import { ProtectedRoute } from "./ProtectedRoute";

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
      <ProtectedRoute allowedRoles={["student"]}>
        <Layout>
          <StudentDashboard />
        </Layout>
      </ProtectedRoute>
    } />
    <Route path="/student-dashboard-enhanced" element={
      <ProtectedRoute allowedRoles={["student"]}>
        <Layout>
          <StudentDashboardEnhanced />
        </Layout>
      </ProtectedRoute>
    } />
    <Route path="/sel-pathways" element={
      <ProtectedRoute allowedRoles={["student"]}>
        <Layout>
          <SELPathways />
        </Layout>
      </ProtectedRoute>
    } />
    <Route path="/check-in" element={
      <ProtectedRoute allowedRoles={["student"]}>
        <Layout>
          <CheckIn />
        </Layout>
      </ProtectedRoute>
    } />
    <Route path="/mental-health-toolkit" element={
      <ProtectedRoute allowedRoles={["student"]}>
        <Layout>
          <MentalHealthToolkit />
        </Layout>
      </ProtectedRoute>
    } />
    <Route path="/digital-journal" element={
      <ProtectedRoute allowedRoles={["student"]}>
        <Layout>
          <DigitalJournal />
        </Layout>
      </ProtectedRoute>
    } />
    <Route path="/reset-room" element={
      <ProtectedRoute allowedRoles={["student"]}>
        <Layout>
          <ResetRoom />
        </Layout>
      </ProtectedRoute>
    } />
    <Route path="/trusted-adults" element={
      <ProtectedRoute allowedRoles={["student"]}>
        <Layout>
          <TrustedAdults />
        </Layout>
      </ProtectedRoute>
    } />
    <Route path="/profile" element={
      <ProtectedRoute allowedRoles={["student"]}>
        <Layout>
          <UserProfile />
        </Layout>
      </ProtectedRoute>
    } />
  </Routes>
);

export default studentRoutes;
