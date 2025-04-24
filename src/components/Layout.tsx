
import React, { useEffect } from 'react';
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
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  // If user is not logged in, redirect to login page
  useEffect(() => {
    if (!isLoading && !user && !location.pathname.includes('/login')) {
      toast.error('Please log in to continue');
      navigate('/login', { state: { from: location.pathname } });
    }
  }, [user, isLoading, location.pathname, navigate]);

  return (
    <AppShell>
      {children}
    </AppShell>
  );
};

export default Layout;
