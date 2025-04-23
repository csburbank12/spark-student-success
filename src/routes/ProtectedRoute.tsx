
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { UserRole } from '@/types/roles';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredRole?: UserRole[];
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ 
  children, 
  requiredRole = [] 
}) => {
  const { user } = useAuth();

  // If no user is logged in, redirect to login
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // If no required role is specified, or the array is empty, allow access
  if (!requiredRole.length) {
    return <>{children}</>;
  }

  // Check if user's role is in the required roles
  const userRole = user.role as UserRole;
  const hasRequiredRole = userRole && requiredRole.includes(userRole);

  // If user doesn't have the required role, redirect to login or dashboard
  if (!hasRequiredRole) {
    return <Navigate to="/dashboard" replace />;
  }

  return <>{children}</>;
};

// Create and export the DashboardRouter component
export const DashboardRouter: React.FC = () => {
  const { user } = useAuth();
  
  // Simple dashboard router based on user role
  if (!user) return <Navigate to="/login" replace />;
  
  // Convert string role to UserRole for the switch
  const userRole = user.role as UserRole;
  
  switch (userRole) {
    case UserRole.student:
      return <Navigate to="/check-in" replace />;
    case UserRole.teacher:
      return <Navigate to="/teacher-dashboard" replace />;
    case UserRole.admin:
      return <Navigate to="/admin-dashboard" replace />;
    case UserRole.parent:
      return <Navigate to="/child-activity" replace />;
    default:
      return <Navigate to="/login" replace />;
  }
};
