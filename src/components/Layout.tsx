
import React, { useEffect, useState } from 'react';
import { AppShell } from './layout/AppShell';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';
import { ErrorLoggingService } from '@/services/ErrorLoggingService';
import { UserRole } from '@/types/roles';
import { getFallbackDashboardByRole, isPublicPath, isOnboardingPath } from '@/utils/navigationUtils';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, isLoading } = useAuth();
  const [authChecked, setAuthChecked] = useState(false);
  
  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  // Handle authentication redirects - immediately after auth state is known
  useEffect(() => {
    if (isLoading) return; // Skip if still loading auth state
    
    // Set auth check completed flag
    setAuthChecked(true);
    
    // Check if current path is public (doesn't require auth)
    const isCurrentPathPublic = isPublicPath(location.pathname);
    const currentIsOnboardingPath = isOnboardingPath(location.pathname);

    // Special handling for onboarding paths - require auth but don't auto-redirect away
    if (currentIsOnboardingPath && user) {
      // User is authenticated and on onboarding path - allow them to stay
      return;
    }
    
    // Immediate redirect to login if not authenticated and not on public path
    if (!user && !isCurrentPathPublic && !currentIsOnboardingPath) {
      navigate('/login', { replace: true, state: { from: location.pathname } });
      return;
    }

    // Redirect from login if already authenticated
    if (user && location.pathname === '/login') {
      const dashboardRoute = getFallbackDashboardByRole(user.role as UserRole);
      navigate(dashboardRoute, { replace: true });
      return;
    }
  }, [user, isLoading, location.pathname, navigate]);

  // Log navigation for analytics - debounced to avoid excessive logging
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

  // Show loading state only during initial auth check
  if (!authChecked && isLoading) {
    return (
      <div className="flex h-screen items-center justify-center bg-background">
        <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full" />
      </div>
    ); 
  }

  return (
    <AppShell>
      {children}
    </AppShell>
  );
};

export default Layout;
