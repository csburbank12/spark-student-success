
import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "./contexts/AuthContext";
import Layout from "./components/Layout";
import { routes } from "./routes";
import GlobalErrorBoundary from "./components/error-handling/GlobalErrorBoundary";

function App() {
  const { user, isLoading } = useAuth();

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
    </GlobalErrorBoundary>
  );
}

export default App;
