
import React, { useEffect } from 'react';
import { AppShell } from './layout/AppShell';
import { useLocation } from 'react-router-dom';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const location = useLocation();
  
  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <AppShell>
      {children}
    </AppShell>
  );
};

export default Layout;
