
import React, { useEffect, useState } from 'react';
import { AppShell } from './layout/AppShell';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';
import { ErrorLoggingService } from '@/services/ErrorLoggingService';
import { UserRole } from '@/types/roles';
import { getFallbackDashboardByRole, isPublicPath } from '@/utils/navigationUtils';

const Layout = ({ children }: { children: React.ReactNode }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, isLoading } = useAuth();
  const [authChecked, setAuthChecked] = useState(false);
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  useEffect(() => {
    if (isLoading) return;
    
    setAuthChecked(true);
    
    const isCurrentPathPublic = isPublicPath(location.pathname);

    // If user is not authenticated and on a protected route, redirect to login
    if (!user && !isCurrentPathPublic) {
      navigate('/login', { 
        replace: true, 
        state: { from: location.pathname } 
      });
      return;
    }

    // If authenticated user is on login page, redirect to their dashboard
    if (user && location.pathname === '/login') {
      const dashboardRoute = getFallbackDashboardByRole(user.role as UserRole);
      navigate(dashboardRoute, { replace: true });
      return;
    }
  }, [user, isLoading, location.pathname, navigate]);

  useEffect(() => {
    if (user && location.pathname) {
      const logTimer = setTimeout(() => {
        try {
          ErrorLoggingService.logError({
            action: 'page_navigation',
            error_message: `User navigated to: ${location.pathname}`,
            profile_type: (user.role as any) || 'unauthenticated'
          });
        } catch (error) {
          console.error('Failed to log navigation:', error);
        }
      }, 100);
      
      return () => clearTimeout(logTimer);
    }
  }, [location.pathname, user]);

  if (!authChecked && isLoading) {
    return (
      <div className="flex h-screen items-center justify-center bg-background">
        <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full" />
      </div>
    ); 
  }

  return <AppShell>{children}</AppShell>;
};

export default Layout;
