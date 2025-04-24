
import React from "react";
import { Navigate } from "react-router-dom";
import NotFound from "@/pages/NotFound";
import Login from "@/pages/Login";
import parentRoutes from "./parentRoutes";
import { teacherAdminRoutes } from "./teacherAdminRoutes";
import staffRoutes from "./staffRoutes";
import studentRoutes from "./studentRoutes";
import adminRoutes from "./adminRoutes";
import { generalRoutes } from "./generalRoutes";
import { AppShell } from "@/components/layout/AppShell";

// Process routes to add AppShell wrapper
const processRoutes = (routes: any[]) => {
  return routes.map(route => {
    // Skip wrapping login/public routes with AppShell
    const skipShell = 
      (route.path === "/" || route.path === "/login" || route.path === "/404" || route.path === "*");
    
    return {
      ...route,
      element: skipShell ? route.element : <AppShell>{route.element}</AppShell>
    };
  });
};

// All the routes in the application
export const routes = [
  ...processRoutes(generalRoutes),
  ...processRoutes(studentRoutes),
  ...processRoutes(teacherAdminRoutes),
  ...processRoutes(parentRoutes),
  ...processRoutes(staffRoutes),
  ...processRoutes(adminRoutes),
];
