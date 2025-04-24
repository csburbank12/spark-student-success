
import { createRoot } from 'react-dom/client'
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import App from './App.tsx'
import './index.css'
import { AuthProvider } from './contexts/AuthContext';
import { Toaster } from '@/components/ui/toaster';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { setupGlobalErrorTracking } from './utils/errorTrackingUtils';

// Create a client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
      retry: 1,
    },
  },
})

// Set up global error tracking
setupGlobalErrorTracking();

// Use the non-null assertion operator to tell TypeScript that this element exists
const rootElement = document.getElementById("root")!;

// Use createRoot API correctly
const root = createRoot(rootElement);
root.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <AuthProvider>
          <App />
          <Toaster />
        </AuthProvider>
      </BrowserRouter>
    </QueryClientProvider>
  </React.StrictMode>
);
