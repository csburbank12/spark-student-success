
import React from 'react';
import { AppShell } from './layout/AppShell';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, isLoading } = useAuth();
  
  // Scroll to top on route change
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  // Redirect to login if not authenticated
  React.useEffect(() => {
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

  return (
    <AppShell>
      {children}
    </AppShell>
  );
};

export default Layout;
