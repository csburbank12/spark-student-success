
import React, { useEffect } from 'react';
import { AppShell } from './layout/AppShell';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';
import { ErrorLoggingService } from '@/services/ErrorLoggingService';
import { ProfileType } from '@/services/ErrorLoggingService';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, isLoading } = useAuth();
  
  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  // Handle authentication redirects - only run once per location change
  useEffect(() => {
    if (isLoading) return; // Skip if still loading auth state
    
    // Redirect to login if not authenticated
    if (!user && location.pathname !== '/login' && location.pathname !== '/signup' && 
        !location.pathname.includes('/auth/') && location.pathname !== '/404') {
      toast.error('Please log in to continue', {
        id: 'auth-redirect' // Using ID prevents duplicate toasts
      });
      navigate('/login', { replace: true });
      return;
    }

    // Redirect from login if already authenticated
    if (user && location.pathname === '/login') {
      navigate('/dashboard', { replace: true });
      return;
    }
  }, [user, isLoading, location.pathname, navigate]);

  // Log 404 errors for valid users - only if on an unknown route
  useEffect(() => {
    const isKnownRoute = ['/login', '/dashboard', '/404', '/'].includes(location.pathname);
    
    if (!isKnownRoute && user && !isLoading) {
      try {
        ErrorLoggingService.logError({
          action: 'navigation_error',
          error_message: `User attempted to access non-existent route: ${location.pathname}`,
          status_code: '404',
          profile_type: (user.role as ProfileType) || 'unknown'
        });
      } catch (error) {
        console.error('Error logging navigation error:', error);
      }
    }
  }, [location.pathname, user, isLoading]);

  // Show transparent loading state while checking auth
  if (isLoading) {
    return null; // Return null to prevent flickering during auth check
  }

  return (
    <AppShell>
      {children}
    </AppShell>
  );
};

export default Layout;
