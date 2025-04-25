
import React, { useEffect } from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import { useAuth } from "./contexts/AuthContext";
import GlobalErrorBoundary from "./components/error-handling/GlobalErrorBoundary";
import { routes } from "./routes/index";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as SonnerToaster } from "sonner";
import { ErrorMonitoringService } from "./services/ErrorMonitoringService";
import { useErrorLogging } from "@/hooks/useErrorLogging";

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
  
  // Log 404 errors
  useEffect(() => {
    const isKnownRoute = routes.some(route => 
      route.path === location.pathname || 
      (route.path.includes(':') && location.pathname.startsWith(route.path.split(':')[0]))
    );
    
    if (!isKnownRoute && location.pathname !== "/" && location.pathname !== "/login") {
      log404Error(location.pathname);
    }
  }, [location.pathname, log404Error]);

  // Show minimal loading state during initial auth check
  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center bg-background">
        <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full" />
      </div>
    );
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
                {route.element}
              </GlobalErrorBoundary>
            }
          />
        ))}
        
        {/* Catch-all route for invalid paths - redirect to 404 page */}
        <Route path="*" element={<Navigate to="/404" replace />} />
      </Routes>
      <Toaster />
      <SonnerToaster position="top-right" closeButton richColors />
    </GlobalErrorBoundary>
  );
}

export default App;
