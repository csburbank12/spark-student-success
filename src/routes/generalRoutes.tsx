
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
    path: "/settings",
    element: (
      <ProtectedRoute>
        <div className="p-6">
          <h2 className="text-2xl font-bold mb-6">Settings</h2>
          <div className="grid gap-6">
            <div className="bg-card p-6 rounded-lg shadow-sm border">
              <h3 className="text-lg font-medium mb-4">Application Settings</h3>
              <p className="text-muted-foreground">Manage your application preferences and settings here.</p>
            </div>
          </div>
        </div>
      </ProtectedRoute>
    ),
  },
  {
    path: "/help",
    element: (
      <ProtectedRoute>
        <div className="p-6">
          <h2 className="text-2xl font-bold mb-6">Help & Support</h2>
          <div className="grid gap-6">
            <div className="bg-card p-6 rounded-lg shadow-sm border">
              <h3 className="text-lg font-medium mb-4">Getting Started</h3>
              <p className="text-muted-foreground mb-4">New to Beacon? Learn how to use the platform effectively.</p>
              <a href="#" className="text-primary hover:underline">View Guide</a>
            </div>
            <div className="bg-card p-6 rounded-lg shadow-sm border">
              <h3 className="text-lg font-medium mb-4">Contact Support</h3>
              <p className="text-muted-foreground mb-4">Need help? Our support team is ready to assist you.</p>
              <a href="#" className="text-primary hover:underline">Contact Us</a>
            </div>
            <div className="bg-card p-6 rounded-lg shadow-sm border">
              <h3 className="text-lg font-medium mb-4">FAQs</h3>
              <p className="text-muted-foreground mb-4">Find answers to commonly asked questions.</p>
              <a href="#" className="text-primary hover:underline">View FAQs</a>
            </div>
          </div>
        </div>
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
