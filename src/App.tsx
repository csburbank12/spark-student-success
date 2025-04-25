
import React, { useEffect, Suspense, lazy } from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import { useAuth } from "./contexts/AuthContext";
import GlobalErrorBoundary from "./components/error-handling/GlobalErrorBoundary";
import { routes } from "./routes/index";
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

function App() {
  const { isLoading } = useAuth();
  const location = useLocation();
  const { log404Error } = useErrorLogging();
  
  // Initialize error monitoring on app load
  useEffect(() => {
    ErrorMonitoringService.initialize().catch(err => 
      console.error("Failed to initialize error monitoring:", err)
    );
  }, []);
  
  // Optimized 404 error logging
  useEffect(() => {
    if (isLoading) return; // Skip when auth is still loading
    
    const specialPaths = ['/', '/login', '/404', '/privacy-policy', '/terms', '/help'];
    const isSpecialPath = specialPaths.includes(location.pathname);
    
    const isKnownRoute = isSpecialPath || routes.some(route => {
      // Handle exact paths
      if (route.path === location.pathname) return true;
      
      // Handle parameterized routes
      if (route.path.includes(':')) {
        const routeBase = route.path.split(':')[0];
        return location.pathname.startsWith(routeBase);
      }
      
      return false;
    });
    
    // Only log unknown routes that aren't special paths
    if (!isKnownRoute) {
      log404Error(location.pathname);
    }
  }, [location.pathname, log404Error, isLoading]);

  // Simplified loading state during initial auth check
  if (isLoading) {
    return <AppLoader />;
  }

  return (
    <GlobalErrorBoundary component="AppRoot">
      <Routes>
        {routes.map((route) => (
          <Route
            key={route.path}
            path={route.path}
            element={
              <GlobalErrorBoundary component={`Route-${route.path}`}>
                <Suspense fallback={<AppLoader />}>
                  {route.element}
                </Suspense>
              </GlobalErrorBoundary>
            }
          />
        ))}
        
        {/* Catch-all route for invalid paths - redirect to 404 page */}
        <Route path="*" element={<Navigate to="/404" replace state={{ from: location.pathname }} />} />
      </Routes>
      <Toaster />
      <SonnerToaster position="top-right" closeButton richColors />
    </GlobalErrorBoundary>
  );
}

export default App;
