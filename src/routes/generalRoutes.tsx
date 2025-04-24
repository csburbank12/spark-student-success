
import React from 'react';
import { Route } from "react-router-dom";
import { ProtectedRoute } from "./ProtectedRoute";

import Help from "@/pages/Help";
import Settings from "@/pages/Settings";
import Login from '@/pages/Login';
import UserProfile from '@/pages/profile/UserProfile';
import PrivacyPolicy from '@/pages/PrivacyPolicy'; // Add this import
import ConsentSettings from '@/pages/ConsentSettings'; // Add this import
import DataAccessRequests from '@/pages/DataAccessRequests'; // Add this import

export const GeneralRoutes = () => {
  return (
    <React.Fragment>
      <Route path="help" element={<Help />} />
      <Route path="login" element={<Login />} />
      <Route path="settings" element={<Settings />} />
      <Route 
        path="profile" 
        element={
          <ProtectedRoute>
            <UserProfile />
          </ProtectedRoute>
        } 
      />
      <Route path="privacy-policy" element={<PrivacyPolicy />} />
      <Route 
        path="consent-settings" 
        element={
          <ProtectedRoute>
            <ConsentSettings />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="data-access-requests" 
        element={
          <ProtectedRoute>
            <DataAccessRequests />
          </ProtectedRoute>
        } 
      />
    </React.Fragment>
  );
};
