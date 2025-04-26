
import React, { useEffect } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { UserRole } from '@/types/roles';
import { toast } from 'sonner';
import { ErrorLoggingService, ProfileType } from '@/services/ErrorLoggingService';
import { getDashboardPathForRole } from '@/utils/routeUtils';

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

  useEffect(() => {
    if (user) {
      refreshSession();
    }
  }, [location.pathname, refreshSession, user]);

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

  if (requiredRole.length > 0) {
    const userRole = user.role as UserRole;
    const hasRequiredRole = userRole && requiredRole.includes(userRole);

    if (!hasRequiredRole) {
      const userDashboard = getDashboardPathForRole(userRole);
      
      // For demo purposes, just show a warning toast but redirect to appropriate dashboard
      toast.warning(`You're accessing a page intended for ${requiredRole.join(', ')}. Some features may be limited.`, { 
        duration: 5000,
        id: 'role-warning'
      });
      
      return <Navigate to={userDashboard} state={{ from: location.pathname }} replace />;
    }
  }

  return <>{children}</>;
};
