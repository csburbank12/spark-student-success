
import React, { useEffect } from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import { useAuth } from "./contexts/AuthContext";
import GlobalErrorBoundary from "./components/error-handling/GlobalErrorBoundary";
import { routes } from "./routes/index";
import { Toaster } from "@/components/ui/toaster";

function App() {
  const { isLoading, user } = useAuth();
  const location = useLocation();

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full" />
      </div>
    );
  }

  return (
    <GlobalErrorBoundary component="AppRoot">
      <Routes>
        {/* Explicit home route */}
        <Route 
          path="/" 
          element={
            <GlobalErrorBoundary component="Route-home">
              <Navigate to={user ? "/dashboard" : "/login"} replace />
            </GlobalErrorBoundary>
          } 
        />
        
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
      </Routes>
      <Toaster />
    </GlobalErrorBoundary>
  );
}

export default App;
