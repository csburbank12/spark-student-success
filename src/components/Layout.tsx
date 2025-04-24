
import React from 'react';
import { AppShell } from './layout/AppShell';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <AppShell>
      {children}
    </AppShell>
  );
};

export default Layout;
