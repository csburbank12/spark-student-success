
import React from 'react';
import Login from '@/pages/Login';
import Help from "@/pages/Help";
import Settings from "@/pages/Settings";
import UserProfile from '@/pages/profile/UserProfile';
import PrivacyPolicy from '@/pages/PrivacyPolicy';
import ConsentSettings from '@/pages/ConsentSettings';
import DataAccessRequests from '@/pages/DataAccessRequests';
import { ProtectedRoute } from "./ProtectedRoute";
import { DashboardRouter } from "./ProtectedRoute";
import NotFound from '@/pages/NotFound';

export const generalRoutes = [
  {
    path: "/dashboard",
    element: <DashboardRouter />
  },
  {
    path: "help",
    element: <Help />
  },
  {
    path: "settings",
    element: (
      <ProtectedRoute>
        <Settings />
      </ProtectedRoute>
    )
  },
  {
    path: "profile",
    element: (
      <ProtectedRoute>
        <UserProfile />
      </ProtectedRoute>
    )
  },
  {
    path: "privacy-policy",
    element: <PrivacyPolicy />
  },
  {
    path: "consent-settings",
    element: (
      <ProtectedRoute>
        <ConsentSettings />
      </ProtectedRoute>
    )
  },
  {
    path: "data-access-requests",
    element: (
      <ProtectedRoute>
        <DataAccessRequests />
      </ProtectedRoute>
    )
  },
  {
    path: "404",
    element: <NotFound />
  },
  {
    path: "*",
    element: <NotFound />
  }
];
