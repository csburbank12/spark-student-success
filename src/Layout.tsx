
import React from 'react';
import { AppShell } from './components/layout/AppShell';

// This is a wrapper component to ensure all pages use the AppShell component
const LayoutWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return <AppShell>{children}</AppShell>;
};

export default LayoutWrapper;
