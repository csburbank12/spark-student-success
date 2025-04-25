
import React from 'react';
import Layout from './components/Layout';

// This is a wrapper component to ensure all pages use the Layout component
const LayoutWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return <Layout>{children}</Layout>;
};

export default LayoutWrapper;
