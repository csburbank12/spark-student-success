
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
import CheckIn from "./pages/CheckIn";
import NotFound from "./pages/NotFound";
import { AppShell } from "./components/layout/AppShell";

const queryClient = new QueryClient();

// Protected route component
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

// Dashboard router based on user role
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
    default:
      return <Navigate to="/login" replace />;
  }
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <AuthProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/login" element={<Login />} />
            
            {/* Protected routes */}
            <Route 
              path="/" 
              element={<Navigate to="/dashboard" replace />} 
            />
            
            <Route 
              path="/dashboard" 
              element={
                <ProtectedRoute>
                  <DashboardRouter />
                </ProtectedRoute>
              } 
            />
            
            {/* Student routes */}
            <Route 
              path="/check-in" 
              element={
                <ProtectedRoute>
                  <CheckIn />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/activities" 
              element={
                <ProtectedRoute>
                  <div className="p-6">Activities Page (Coming Soon)</div>
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/progress" 
              element={
                <ProtectedRoute>
                  <div className="p-6">Progress Page (Coming Soon)</div>
                </ProtectedRoute>
              } 
            />
            
            {/* Teacher routes */}
            <Route 
              path="/students" 
              element={
                <ProtectedRoute>
                  <div className="p-6">Student Management (Coming Soon)</div>
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/planner" 
              element={
                <ProtectedRoute>
                  <div className="p-6">Lesson Planner (Coming Soon)</div>
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/collaboration" 
              element={
                <ProtectedRoute>
                  <div className="p-6">Collaboration Space (Coming Soon)</div>
                </ProtectedRoute>
              } 
            />
            
            {/* Admin routes */}
            <Route 
              path="/schools" 
              element={
                <ProtectedRoute>
                  <div className="p-6">School Management (Coming Soon)</div>
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/users" 
              element={
                <ProtectedRoute>
                  <div className="p-6">User Management (Coming Soon)</div>
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/analytics" 
              element={
                <ProtectedRoute>
                  <div className="p-6">Analytics Dashboard (Coming Soon)</div>
                </ProtectedRoute>
              } 
            />
            
            {/* Common routes */}
            <Route 
              path="/settings" 
              element={
                <ProtectedRoute>
                  <div className="p-6">Settings Page (Coming Soon)</div>
                </ProtectedRoute>
              } 
            />
            
            {/* Catch-all route */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
