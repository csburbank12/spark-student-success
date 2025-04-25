
import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { ErrorLoggingService } from '@/services/ErrorLoggingService';

const Layout = ({ children }: { children: React.ReactNode }) => {
  const location = useLocation();
  const { user } = useAuth();
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  // Log navigation for analytics
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

  return <>{children}</>;
};

export default Layout;
