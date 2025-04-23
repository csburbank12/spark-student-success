
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

  // If user doesn't have the required role, redirect to appropriate dashboard
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
  
  // Get the user role as a UserRole enum value
  const userRole = user.role as UserRole;
  
  switch (userRole) {
    case UserRole.student:
      return <Navigate to="/student-dashboard-enhanced" replace />;
    case UserRole.teacher:
    case UserRole.staff:
      return <Navigate to="/teacher-dashboard-enhanced" replace />;
    case UserRole.admin:
      return <Navigate to="/admin-dashboard-enhanced" replace />;
    case UserRole.parent:
      return <Navigate to="/parent-dashboard-enhanced" replace />;
    default:
      return <Navigate to="/login" replace />;
  }
};
