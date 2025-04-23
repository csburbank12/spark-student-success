
import type { User } from "@/types";
import { AppShell } from "@/components/layout/AppShell";
import { generalRoutes } from "./generalRoutes";
import studentRoutes from "./studentRoutes";
import { teacherAdminRoutes } from "./teacherAdminRoutes";
import parentRoutes from "./parentRoutes";
import adminRoutes from "./adminRoutes";
import { RouteObject } from "react-router-dom";
import React from "react";

// RouteConfig interface extends RouteObject with additional properties
export type RouteConfig = RouteObject & { 
  path: string; 
  requiredRole?: string[]; 
  element: React.ReactNode; 
};

// Process routes to add AppShell wrapper
const processRoutes = (routes: RouteObject[]): RouteObject[] => {
  return routes.map(route => {
    // Skip wrapping login/public routes with AppShell
    const skipShell = 
      (route.path === "/" || route.path === "/login" || route.path === "*");
    
    return {
      ...route,
      element: skipShell ? route.element : <AppShell>{route.element}</AppShell>
    };
  });
};

// Make sure all routes in arrays meet the RouteConfig type requirements
const ensureRouteConfig = (routes: RouteObject[]): RouteConfig[] => {
  return routes.map(route => {
    // Ensure path is always defined (use empty string for index routes if needed)
    const path = route.path || "";
    return { ...route, path } as RouteConfig;
  });
};

// Combine and export all routes as a single array for <Routes>
export const routes: RouteObject[] = [
  ...processRoutes(ensureRouteConfig(generalRoutes)),
  ...processRoutes(ensureRouteConfig(studentRoutes)),
  ...processRoutes(ensureRouteConfig(teacherAdminRoutes)),
  ...processRoutes(ensureRouteConfig(parentRoutes)),
  ...processRoutes(ensureRouteConfig(adminRoutes)),
];
