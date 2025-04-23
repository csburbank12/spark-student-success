
import React, { useEffect } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { UserRole } from '@/types/roles';
import { toast } from 'sonner';
import { ErrorLoggingService } from '@/services/ErrorLoggingService';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredRole?: UserRole[];
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ 
  children, 
  requiredRole = [] 
}) => {
  const { user, refreshSession } = useAuth();
  const location = useLocation();

  // Verify session on route change
  useEffect(() => {
    if (user) {
      refreshSession();
    }
  }, [location.pathname]);

  // If no user is logged in, redirect to login
  if (!user) {
    ErrorLoggingService.logError({
      action: 'route_access_denied',
      error_message: `Unauthenticated user attempted to access ${location.pathname}`,
      profile_type: 'unauthenticated'
    });
    
    toast.error('Please log in to access this page', {
      id: 'auth-redirect'
    });
    
    return <Navigate to="/login" state={{ from: location.pathname }} replace />;
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
    ErrorLoggingService.logError({
      action: 'role_access_denied',
      error_message: `User with role ${userRole} attempted to access ${location.pathname} which requires roles: ${requiredRole.join(', ')}`,
      profile_type: userRole
    });
    
    toast.error('You do not have permission to access this page', {
      id: 'role-redirect'
    });
    
    return <Navigate to="/dashboard" replace />;
  }

  return <>{children}</>;
};

// Create and export the DashboardRouter component
export const DashboardRouter: React.FC = () => {
  const { user } = useAuth();
  const location = useLocation();
  
  // Simple dashboard router based on user role
  if (!user) {
    ErrorLoggingService.logError({
      action: 'dashboard_router_error',
      error_message: `Unauthenticated user attempted to access dashboard router`,
      profile_type: 'unauthenticated'
    });
    
    return <Navigate to="/login" state={{ from: location.pathname }} replace />;
  }
  
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
      ErrorLoggingService.logError({
        action: 'unknown_role_redirect',
        error_message: `User with unknown role: ${userRole} attempted to access dashboard`,
        profile_type: 'unknown'
      });
      
      return <Navigate to="/login" replace />;
  }
};
