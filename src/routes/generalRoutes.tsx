
import React from "react";
import { Navigate } from "react-router-dom";
import Login from "@/pages/Login";
import { ProtectedRoute, DashboardRouter } from "./ProtectedRoute";
import UserProfile from "@/pages/profile/UserProfile";
import NotFound from "@/pages/NotFound";
import LoopBot from "@/pages/LoopBot";

// Any general (universal or shared) routes
const generalRoutes = [
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/",
    element: <Navigate to="/dashboard" replace />,
  },
  {
    path: "/dashboard",
    element: (
      <ProtectedRoute>
        <DashboardRouter />
      </ProtectedRoute>
    ),
  },
  {
    path: "/activities",
    element: (
      <ProtectedRoute>
        <div className="p-6">Activities Page (Coming Soon)</div>
      </ProtectedRoute>
    ),
  },
  {
    path: "/progress",
    element: (
      <ProtectedRoute>
        <div className="p-6">Progress Page (Coming Soon)</div>
      </ProtectedRoute>
    ),
  },
  {
    path: "/settings",
    element: (
      <ProtectedRoute>
        <div className="p-6">Settings Page (Coming Soon)</div>
      </ProtectedRoute>
    ),
  },
  {
    path: "/profile",
    element: (
      <ProtectedRoute>
        <UserProfile />
      </ProtectedRoute>
    ),
  },
  {
    path: "/loopbot",
    element: (
      <ProtectedRoute>
        <LoopBot />
      </ProtectedRoute>
    ),
  },
  {
    path: "*",
    element: <NotFound />,
  },
];

export default generalRoutes;
