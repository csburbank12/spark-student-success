
import React, { useEffect, Suspense, lazy } from "react";
import { Routes, Route, Navigate, useLocation, useNavigate } from "react-router-dom";
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
const Login = lazy(() => import("./pages/Login"));

function App() {
  const { isLoading, user } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const { log404Error } = useErrorLogging();
  
  // Initialize error monitoring on app load
  useEffect(() => {
    ErrorMonitoringService.initialize().catch(err => 
      console.error("Failed to initialize error monitoring:", err)
    );
  }, []);

  // Redirect to login if not authenticated (except for public routes)
  useEffect(() => {
    if (!isLoading && !user) {
      const publicPaths = ['/login', '/signup', '/404', '/privacy-policy', '/terms', '/help'];
      const isPublicPath = publicPaths.some(path => 
        location.pathname === path || 
        location.pathname.startsWith('/auth/') ||
        location.pathname.startsWith('/onboarding/')
      );
      
      if (!isPublicPath) {
        navigate('/login', { replace: true, state: { from: location.pathname } });
      }
    }
  }, [isLoading, user, location.pathname, navigate]);
  
  // Log 404 errors
  useEffect(() => {
    const timeout = setTimeout(() => {
      if (document.title.includes("404") || location.pathname === "/404") {
        log404Error(location.pathname);
      }
    }, 1000);
    
    return () => clearTimeout(timeout);
  }, [location.pathname, log404Error]);

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
        
        {/* Explicit route for login to ensure it always loads */}
        <Route 
          path="/login" 
          element={
            <Suspense fallback={<AppLoader />}>
              <Login />
            </Suspense>
          } 
        />
        
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
