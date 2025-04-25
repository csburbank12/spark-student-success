
import React, { useEffect, useState } from 'react';
import { AppShell } from './layout/AppShell';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';
import { ErrorLoggingService, ProfileType } from '@/services/ErrorLoggingService';

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

  // Handle authentication redirects - only run once per location change
  useEffect(() => {
    if (isLoading) return; // Skip if still loading auth state
    
    // Set auth check completed flag
    setAuthChecked(true);
    
    const publicPaths = ['/login', '/signup', '/404'];
    const isPublicPath = publicPaths.includes(location.pathname) || location.pathname.includes('/auth/');
    
    // Redirect to login if not authenticated and not on public path
    if (!user && !isPublicPath) {
      // Only show toast for non-initial loads to prevent flicker
      if (document.referrer) {
        toast.error('Please log in to continue', {
          id: 'auth-redirect' // Using ID prevents duplicate toasts
        });
      }
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
    const knownRoutes = ['/login', '/dashboard', '/404', '/', '/privacy-policy', '/terms', '/help'];
    const isKnownRoute = knownRoutes.includes(location.pathname) || 
                       location.pathname.startsWith('/admin') ||
                       location.pathname.startsWith('/student') ||
                       location.pathname.startsWith('/teacher') ||
                       location.pathname.startsWith('/parent') ||
                       location.pathname.startsWith('/auth') ||
                       location.pathname.startsWith('/profile');
    
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

  // Show loading state only during initial auth check
  if (!authChecked && isLoading) {
    return (
      <div className="flex h-screen items-center justify-center bg-background">
        <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full" />
      </div>
    ); 
  }

  // After auth check, handle special cases
  if (!user && location.pathname !== '/login' && location.pathname !== '/signup' && location.pathname !== '/404' && !location.pathname.includes('/auth/')) {
    return null; // Return null during redirects
  }

  return (
    <AppShell>
      {children}
    </AppShell>
  );
};

export default Layout;
