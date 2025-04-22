
import type { User } from "@/types";
// Import all route groups
import generalRoutes from "./generalRoutes";
import studentRoutes from "./studentRoutes";
import teacherAdminRoutes from "./teacherAdminRoutes";
import parentRoutes from "./parentRoutes";

// RouteConfig ensures compatibility for main App.tsx
export interface RouteConfig {
  path: string;
  element: React.ReactNode;
  requiredRole?: string[];
}

// Combine and export all routes as a single array for <Routes>
export const routes: RouteConfig[] = [
  ...generalRoutes,
  ...studentRoutes,
  ...teacherAdminRoutes,
  ...parentRoutes,
];
