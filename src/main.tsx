
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import { AuthProvider } from './contexts/AuthContext'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ErrorMonitoringService } from './services/ErrorMonitoringService.ts'
import { setupGlobalErrorTracking } from './utils/errorTrackingUtils.ts'

// Initialize global error tracking before rendering the app
setupGlobalErrorTracking();

// Initialize error monitoring
ErrorMonitoringService.initialize().catch(console.error);

// Configure query client with default error handling
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      staleTime: 5 * 60 * 1000, // 5 minutes
      retry: (failureCount, error) => {
        // Don't retry on 404s
        if (typeof error === 'object' && error !== null && 'status' in error) {
          if ((error as any).status === 404) return false;
        }
        // Retry other errors up to 2 times
        return failureCount < 2;
      },
      meta: {
        onError: (error: Error) => {
          console.error('Query error:', error);
        }
      }
    },
  },
})

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <AuthProvider>
          <App />
        </AuthProvider>
      </BrowserRouter>
    </QueryClientProvider>
  </React.StrictMode>,
)
