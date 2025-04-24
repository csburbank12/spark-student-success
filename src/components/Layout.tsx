
import React from 'react';
import { Outlet } from 'react-router-dom';
import { AppShell } from './layout/AppShell';

const Layout: React.FC = () => {
  return (
    <AppShell>
      <Outlet />
    </AppShell>
  );
};

export default Layout;
