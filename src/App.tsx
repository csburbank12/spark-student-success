
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import { MicroCoachProvider } from "./contexts/MicroCoachContext";
import { LoopBotProvider } from "./contexts/LoopBotContext";
import { Suspense, lazy, useState } from "react";
import { ErrorBoundary } from "react-error-boundary";
// Reuse route configs from refactored routes file
import { routes } from "./routes";
import { Loader } from "./components/ui/loader";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      meta: {
        useErrorBoundary: true,
      },
      retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
      staleTime: 5 * 60 * 1000, // 5 minutes
      retry: 3,
      refetchOnWindowFocus: true,
    },
    mutations: {
      retry: 2,
      onError: (error) => {
        console.error('Mutation error:', error);
      }
    }
  },
});

// Fallback component for lazy-loaded routes
const LoadingFallback = () => (
  <div className="flex items-center justify-center h-screen">
    <Loader size="lg" />
  </div>
);

// Error fallback for error boundaries
const ErrorFallback = ({ error, resetErrorBoundary }: { error: Error, resetErrorBoundary: () => void }) => (
  <div className="flex flex-col items-center justify-center h-screen p-4 space-y-4">
    <h2 className="text-xl font-semibold text-red-600">Something went wrong</h2>
    <p className="text-center text-gray-600 max-w-md">
      {error.message || "An unexpected error occurred"}
    </p>
    <button 
      onClick={resetErrorBoundary}
      className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary-dark transition-colors"
    >
      Try again
    </button>
  </div>
);

const App = () => {
  const [errorKey, setErrorKey] = useState<number>(0);

  return (
    <ErrorBoundary 
      FallbackComponent={ErrorFallback} 
      key={errorKey}
      onReset={() => setErrorKey(prev => prev + 1)}
    >
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <MicroCoachProvider>
            <LoopBotProvider>
              <TooltipProvider>
                <Toaster />
                <Sonner position="top-right" closeButton />
                <BrowserRouter>
                  <Suspense fallback={<LoadingFallback />}>
                    <Routes>
                      {routes.map((route) => (
                        <Route 
                          key={route.path || 'index'} 
                          path={route.path} 
                          element={
                            <ErrorBoundary 
                              FallbackComponent={ErrorFallback} 
                              onReset={() => window.location.reload()}
                            >
                              {route.element}
                            </ErrorBoundary>
                          } 
                        />
                      ))}
                    </Routes>
                  </Suspense>
                </BrowserRouter>
              </TooltipProvider>
            </LoopBotProvider>
          </MicroCoachProvider>
        </AuthProvider>
      </QueryClientProvider>
    </ErrorBoundary>
  );
};

export default App;
