
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import { MicroCoachProvider } from "./contexts/MicroCoachContext";
import { LoopBotProvider } from "./contexts/LoopBotContext";
import { Suspense, lazy } from "react";
// Reuse route configs from refactored routes file
import { routes } from "./routes";
import { Loader } from "./components/ui/loader";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      meta: {
        useErrorBoundary: true,
      },
      retryDelay: 1000,
      staleTime: 5 * 60 * 1000, // 5 minutes
    },
  },
});

// Fallback component for lazy-loaded routes
const LoadingFallback = () => (
  <div className="flex items-center justify-center h-screen">
    <Loader size="lg" />
  </div>
);

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <MicroCoachProvider>
          <LoopBotProvider>
            <TooltipProvider>
              <Toaster />
              <Sonner />
              <BrowserRouter>
                <Suspense fallback={<LoadingFallback />}>
                  <Routes>
                    {routes.map((route) => (
                      <Route 
                        key={route.path} 
                        path={route.path} 
                        element={route.element} 
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
  );
};

export default App;
