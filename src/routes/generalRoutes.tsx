
import React from 'react';
import Login from '@/pages/Login';
import Help from "@/pages/Help";
import Settings from "@/pages/Settings";
import UserProfile from '@/pages/profile/UserProfile';
import PrivacyPolicy from '@/pages/PrivacyPolicy';
import ConsentSettings from '@/pages/ConsentSettings';
import DataAccessRequests from '@/pages/DataAccessRequests';
import { ProtectedRoute } from "./ProtectedRoute";

export const GeneralRoutes = () => {
  return [
    {
      path: "help",
      element: <Help />
    },
    {
      path: "login",
      element: <Login />
    },
    {
      path: "settings",
      element: <Settings />
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
    }
  ];
};
