
import { Navigate } from "react-router-dom";
import NotFound from "@/pages/NotFound";
import Login from "@/pages/Login";
import parentRoutes from "./parentRoutes";
import teacherAdminRoutes from "./teacherAdminRoutes";
import staffRoutes from "./staffRoutes";

// All the routes in the application
export const routes = [
  {
    path: "/",
    element: <Navigate to="/login" replace />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/404",
    element: <NotFound />,
  },
  ...parentRoutes,
  ...teacherAdminRoutes,
  ...staffRoutes,
];
