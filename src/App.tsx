import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "./contexts/AuthContext";
import Login from "./pages/Login";
import StudentDashboard from "./pages/StudentDashboard";
import TeacherDashboard from "./pages/TeacherDashboard";
import AdminDashboard from "./pages/AdminDashboard";
import ParentDashboard from "./pages/ParentDashboard";
import StudentManagement from "./pages/StudentManagement";
import CheckIn from "./pages/CheckIn";
import MentalHealthToolkit from "./pages/MentalHealthToolkit";
import FutureMe from "./pages/FutureMe";
import NotFound from "./pages/NotFound";
import { AppShell } from "./components/layout/AppShell";
import ChildActivity from "./pages/parent/ChildActivity";
import ChildWellness from "./pages/parent/ChildWellness";
import ParentMessages from "./pages/parent/ParentMessages";
import PredictiveSupport from "./pages/PredictiveSupport";

const queryClient = new QueryClient();

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return <AppShell>{children}</AppShell>;
};

const DashboardRouter = () => {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  switch (user.role) {
    case "student":
      return <StudentDashboard />;
    case "teacher":
      return <TeacherDashboard />;
    case "admin":
      return <AdminDashboard />;
    case "parent":
      return <ParentDashboard />;
    default:
      return <Navigate to="/login" replace />;
  }
};

const routes = [
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/",
    element: <Navigate to="/dashboard" replace />,
  },
  {
    path: "/dashboard",
    element: (
      <ProtectedRoute>
        <DashboardRouter />
      </ProtectedRoute>
    ),
  },
  {
    path: "/check-in",
    element: (
      <ProtectedRoute>
        <CheckIn />
      </ProtectedRoute>
    ),
  },
  {
    path: "/mental-health-toolkit",
    element: (
      <ProtectedRoute>
        <MentalHealthToolkit />
      </ProtectedRoute>
    ),
  },
  {
    path: "/future-me",
    element: (
      <ProtectedRoute>
        <FutureMe />
      </ProtectedRoute>
    ),
  },
  {
    path: "/activities",
    element: (
      <ProtectedRoute>
        <div className="p-6">Activities Page (Coming Soon)</div>
      </ProtectedRoute>
    ),
  },
  {
    path: "/progress",
    element: (
      <ProtectedRoute>
        <div className="p-6">Progress Page (Coming Soon)</div>
      </ProtectedRoute>
    ),
  },
  {
    path: "/students",
    element: (
      <ProtectedRoute>
        <StudentManagement />
      </ProtectedRoute>
    ),
  },
  {
    path: "/planner",
    element: (
      <ProtectedRoute>
        <div className="p-6">Lesson Planner (Coming Soon)</div>
      </ProtectedRoute>
    ),
  },
  {
    path: "/collaboration",
    element: (
      <ProtectedRoute>
        <div className="p-6">Collaboration Space (Coming Soon)</div>
      </ProtectedRoute>
    ),
  },
  {
    path: "/schools",
    element: (
      <ProtectedRoute>
        <div className="p-6">School Management (Coming Soon)</div>
      </ProtectedRoute>
    ),
  },
  {
    path: "/users",
    element: (
      <ProtectedRoute>
        <div className="p-6">User Management (Coming Soon)</div>
      </ProtectedRoute>
    ),
  },
  {
    path: "/analytics",
    element: (
      <ProtectedRoute>
        <div className="p-6">Analytics Dashboard (Coming Soon)</div>
      </ProtectedRoute>
    ),
  },
  {
    path: "/child-activity",
    element: (
      <ProtectedRoute>
        <ChildActivity />
      </ProtectedRoute>
    ),
  },
  {
    path: "/child-wellness",
    element: (
      <ProtectedRoute>
        <ChildWellness />
      </ProtectedRoute>
    ),
  },
  {
    path: "/messages",
    element: (
      <ProtectedRoute>
        <ParentMessages />
      </ProtectedRoute>
    ),
  },
  {
    path: "/settings",
    element: (
      <ProtectedRoute>
        <div className="p-6">Settings Page (Coming Soon)</div>
      </ProtectedRoute>
    ),
  },
  {
    path: "/predictive-support",
    element: <PredictiveSupport />,
    requiredRole: ["teacher", "admin"],
  },
  {
    path: "*",
    element: <NotFound />,
  },
];

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              {routes.map((route) => (
                <Route
                  key={route.path}
                  path={route.path}
                  element={route.element}
                  requiredRole={route.requiredRole}
                />
              ))}
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
};

export default App;
