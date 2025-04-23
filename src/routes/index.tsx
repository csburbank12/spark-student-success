
import type { User } from "@/types";
import generalRoutes from "./generalRoutes";
import studentRoutes from "./studentRoutes";
import { teacherAdminRoutes } from "./teacherAdminRoutes";
import parentRoutes from "./parentRoutes";
import adminRoutes from "./adminRoutes";
import { RouteObject } from "react-router-dom";

// RouteConfig interface extends RouteObject with additional properties
export type RouteConfig = RouteObject & { 
  path: string; 
  requiredRole?: string[]; 
  element: React.ReactNode; 
};

// Combine and export all routes as a single array for <Routes>
export const routes: RouteObject[] = [
  ...generalRoutes,
  ...studentRoutes,
  ...teacherAdminRoutes,
  ...parentRoutes,
  ...adminRoutes,
];
