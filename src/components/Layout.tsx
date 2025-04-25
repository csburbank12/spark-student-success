
import React, { useEffect } from 'react';
import { AppShell } from './layout/AppShell';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';
import { ErrorLoggingService } from '@/services/ErrorLoggingService';

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

  // Redirect to login if not authenticated
  useEffect(() => {
    if (!isLoading && !user && location.pathname !== '/login') {
      toast.error('Please log in to continue', {
        id: 'auth-redirect'
      });
      navigate('/login');
    }

    // Redirect from login if already authenticated
    if (!isLoading && user && location.pathname === '/login') {
      navigate('/dashboard');
    }
  }, [user, isLoading, location.pathname, navigate]);

  // Log 404 errors for valid users
  useEffect(() => {
    const isKnownRoute = location.pathname === '/' || 
                        location.pathname === '/login' || 
                        location.pathname === '/dashboard' ||
                        location.pathname === '/404';
    
    if (!isKnownRoute && user && location.pathname) {
      try {
        ErrorLoggingService.logError({
          action: 'navigation_error',
          error_message: `User attempted to access non-existent route: ${location.pathname}`,
          status_code: '404',
          profile_type: user?.role as any || 'unknown'
        });
      } catch (error) {
        console.error('Error logging navigation error:', error);
      }
    }
  }, [location.pathname, user]);

  return (
    <AppShell>
      {children}
    </AppShell>
  );
};

export default Layout;
