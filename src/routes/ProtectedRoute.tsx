
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { UserRole } from '@/types/roles';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredRole: UserRole[];
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ 
  children, 
  requiredRole 
}) => {
  const { user } = useAuth();

  // If no user is logged in, redirect to login
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // Check if user's role is in the required roles
  const hasRequiredRole = user.role && requiredRole.includes(user.role as UserRole);

  // If user doesn't have the required role, redirect to login or dashboard
  if (!hasRequiredRole) {
    return <Navigate to="/dashboard" replace />;
  }

  return <>{children}</>;
};
