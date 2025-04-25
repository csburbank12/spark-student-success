
import React, { useEffect, Suspense, lazy } from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import { useAuth } from "./contexts/AuthContext";
import GlobalErrorBoundary from "./components/error-handling/GlobalErrorBoundary";
import { allRoutes } from "./routes/index";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as SonnerToaster } from "sonner";
import { ErrorMonitoringService } from "./services/ErrorMonitoringService";
import { useErrorLogging } from "@/hooks/useErrorLogging";

// Optimized loader component
const AppLoader = () => (
  <div className="flex h-screen items-center justify-center bg-background">
    <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full" />
  </div>
);

// Lazy load NotFound component
const NotFound = lazy(() => import("./pages/NotFound"));

function App() {
  const { isLoading } = useAuth();
  const location = useLocation();
  
  // Initialize error monitoring on app load
  useEffect(() => {
    ErrorMonitoringService.initialize().catch(err => 
      console.error("Failed to initialize error monitoring:", err)
    );
  }, []);

  // Simplified loading state during initial auth check
  if (isLoading) {
    return <AppLoader />;
  }

  return (
    <GlobalErrorBoundary component="AppRoot">
      <Routes>
        {allRoutes.map((route) => (
          <Route
            key={route.path}
            path={route.path}
            element={route.element}
          />
        ))}
        
        {/* Catch-all route for invalid paths - redirect to 404 page */}
        <Route 
          path="*" 
          element={
            <Suspense fallback={<AppLoader />}>
              <NotFound />
            </Suspense>
          }
        />
      </Routes>
      <Toaster />
      <SonnerToaster position="top-right" closeButton richColors />
    </GlobalErrorBoundary>
  );
}

export default App;
