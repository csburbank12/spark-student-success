
import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "./contexts/AuthContext";
import Layout from "./components/Layout";

// Pages
import Dashboard from "./pages/Dashboard";
import StudentDashboard from "./pages/StudentDashboard";
import StudentDashboardEnhanced from "./pages/StudentDashboardEnhanced";
import TeacherDashboard from "./pages/TeacherDashboard";
import TeacherDashboardEnhanced from "./pages/TeacherDashboardEnhanced";
import ParentDashboard from "./pages/ParentDashboard";
import AdminDashboard from "./pages/AdminDashboard";
import AdminDashboardEnhanced from "./pages/AdminDashboardEnhanced";
import CheckIn from "./pages/CheckIn";
import Login from "./pages/Login";
import SELPathways from "./pages/SELPathways";
import SELLesson from "./pages/SELLesson";
import Journal from "./pages/Journal";
import StudentProgress from "./pages/StudentProgress";
import DataAnalytics from "./pages/admin/DataAnalytics";
import NotFound from "./pages/NotFound";
import WellLensDashboard from "./pages/WellLensDashboard";
import PredictiveSupport from "./pages/PredictiveSupport";

// Student Wellness Components
import ResetRoom from "./components/student-wellness/reset-room/ResetRoom";

function App() {
  const { user, loading } = useAuth();

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/reset-room" element={<ResetRoom />} />

      <Route path="/" element={<Layout />}>
        <Route index element={<Dashboard />} />
        <Route path="student-dashboard" element={<StudentDashboard />} />
        <Route path="student-dashboard-enhanced" element={<StudentDashboardEnhanced />} />
        <Route path="teacher-dashboard" element={<TeacherDashboard />} />
        <Route path="teacher-dashboard-enhanced" element={<TeacherDashboardEnhanced />} />
        <Route path="parent-dashboard" element={<ParentDashboard />} />
        <Route path="admin-dashboard" element={<AdminDashboard />} />
        <Route path="admin-dashboard-enhanced" element={<AdminDashboardEnhanced />} />
        <Route path="check-in" element={<CheckIn />} />
        <Route path="sel-pathways" element={<SELPathways />} />
        <Route path="sel-pathways/:lessonId" element={<SELLesson />} />
        <Route path="journal" element={<Journal />} />
        <Route path="student-progress" element={<StudentProgress />} />
        <Route path="admin/analytics" element={<DataAnalytics />} />
        
        {/* WellLens Pulse Routes */}
        <Route path="welllens" element={<WellLensDashboard />} />
        <Route path="predictive-support" element={<PredictiveSupport />} />
        
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}

export default App;
