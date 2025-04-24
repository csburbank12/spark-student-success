
import { createRoot } from 'react-dom/client'
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import App from './App.tsx'
import './index.css'
import { AuthProvider } from './contexts/AuthContext';
import { Toaster } from '@/components/ui/toaster';

// Use the non-null assertion operator to tell TypeScript that this element exists
const rootElement = document.getElementById("root")!;

// Use createRoot API correctly
const root = createRoot(rootElement);
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <App />
        <Toaster />
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);
