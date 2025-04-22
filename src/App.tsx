
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

// Create query client outside of component
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
    case "parent":
      return <ParentDashboard />;
    default:
      return <Navigate to="/login" replace />;
  }
};

// Make sure App is explicitly a React functional component
const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <TooltipProvider>
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
                path="/mental-health-toolkit" 
                element={
                  <ProtectedRoute>
                    <MentalHealthToolkit />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/future-me" 
                element={
                  <ProtectedRoute>
                    <FutureMe />
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
                    <StudentManagement />
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
              
              {/* Parent routes */}
              <Route 
                path="/child-activity" 
                element={
                  <ProtectedRoute>
                    <ChildActivity />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/child-wellness" 
                element={
                  <ProtectedRoute>
                    <ChildWellness />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/messages" 
                element={
                  <ProtectedRoute>
                    <ParentMessages />
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
        </TooltipProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
};

export default App;
