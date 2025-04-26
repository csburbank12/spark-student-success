
import React, { useEffect, Suspense, lazy } from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import { useAuth } from "./contexts/AuthContext";
import GlobalErrorBoundary from "./components/error-handling/GlobalErrorBoundary";
import { allRoutes } from "./routes/index";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as SonnerToaster } from "sonner";
import { ErrorMonitoringService } from "./services/ErrorMonitoringService";
import { useErrorLogging } from "@/hooks/useErrorLogging";
import { isPublicPath } from "./utils/navigationUtils";
import { getFallbackDashboardByRole } from "@/utils/navigationUtils";
import { UserRole } from "@/types/roles";

const AppLoader = () => (
  <div className="flex h-screen items-center justify-center bg-background">
    <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full" />
  </div>
);

const NotFound = lazy(() => import("./pages/NotFound"));
const Login = lazy(() => import("./pages/Login"));
const RoleSelector = lazy(() => import("./pages/RoleSelector"));

function App() {
  const { isLoading, user } = useAuth();
  const location = useLocation();
  const { log404Error } = useErrorLogging();
  
  useEffect(() => {
    ErrorMonitoringService.initialize().catch(err => 
      console.error("Failed to initialize error monitoring:", err)
    );
  }, []);

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (document.title.includes("404") || location.pathname === "/404") {
        log404Error(location.pathname);
      }
    }, 1000);
    
    return () => clearTimeout(timeout);
  }, [location.pathname, log404Error]);

  if (isLoading) {
    return <AppLoader />;
  }

  return (
    <GlobalErrorBoundary component="AppRoot">
      <Routes>
        <Route 
          path="/select-role" 
          element={
            <Suspense fallback={<AppLoader />}>
              <RoleSelector />
            </Suspense>
          } 
        />
        
        {allRoutes.map((route) => (
          <Route
            key={route.path}
            path={route.path}
            element={route.element}
          />
        ))}
        
        <Route 
          path="/login" 
          element={
            <Suspense fallback={<AppLoader />}>
              <Login />
            </Suspense>
          } 
        />
        
        <Route
          path="/"
          element={
            !isLoading && user ? (
              <Navigate to={getFallbackDashboardByRole(user.role as UserRole)} replace />
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />
        
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
