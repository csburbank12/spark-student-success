
import type { User } from "@/types";
import generalRoutes from "./generalRoutes";
import studentRoutes from "./studentRoutes";
import teacherAdminRoutes from "./teacherAdminRoutes";
import parentRoutes from "./parentRoutes";
import { RouteObject } from "react-router-dom";

// RouteConfig interface simply extends RouteObject and adds element and requiredRole
export type RouteConfig = RouteObject & { 
  path: string; 
  requiredRole?: string[]; 
  element: React.ReactNode; 
};

// Combine and export all routes as a single array for <Routes>
export const routes: RouteConfig[] = [
  ...generalRoutes,
  ...studentRoutes,
  ...(teacherAdminRoutes as RouteConfig[]),
  ...parentRoutes,
];
