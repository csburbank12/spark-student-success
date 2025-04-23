
import type { User } from "@/types";
// Import all route groups
import generalRoutes from "./generalRoutes";
import studentRoutes from "./studentRoutes";
import teacherAdminRoutes from "./teacherAdminRoutes";
import parentRoutes from "./parentRoutes";
import { RouteObject } from "react-router-dom";

// RouteConfig extends RouteObject with additional properties
export interface RouteConfig extends Omit<RouteObject, "element"> {
  path: string;
  requiredRole?: string[];
  element: React.ReactNode;
}

// Combine and export all routes as a single array for <Routes>
export const routes: RouteConfig[] = [
  ...generalRoutes,
  ...studentRoutes,
  ...(teacherAdminRoutes as RouteConfig[]),
  ...parentRoutes,
];
