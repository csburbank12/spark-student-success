
import { lazy } from "react";
import { Navigate } from "react-router-dom";
import Layout from "@/components/Layout";
import { ProtectedRoute } from "./ProtectedRoute";
import { UserRole } from "@/types/roles";

// Dynamically import pages
const Login = lazy(() => import("@/pages/Login"));
const Index = lazy(() => import("@/pages/Index"));
const Dashboard = lazy(() => import("./DashboardManager"));
const Profile = lazy(() => import("@/pages/profile/UserProfile"));
const Settings = lazy(() => import("@/pages/Settings"));
const Help = lazy(() => import("@/pages/Help"));
const StudentDashboardEnhanced = lazy(() => import("@/pages/StudentDashboardEnhanced"));
const TeacherDashboardEnhanced = lazy(() => import("@/pages/TeacherDashboardEnhanced"));
const AdminDashboardEnhanced = lazy(() => import("@/pages/AdminDashboardEnhanced"));
const ParentDashboardEnhanced = lazy(() => import("@/pages/ParentDashboardEnhanced"));

// Admin Routes
const UserManagement = lazy(() => import("@/pages/admin/UserManagement"));
const DataAnalytics = lazy(() => import("@/pages/admin/DataAnalytics"));
const SchoolManagement = lazy(() => import("@/pages/admin/SchoolManagement"));
const FERPACompliance = lazy(() => import("@/pages/admin/FERPACompliance"));
const SystemSettings = lazy(() => import("@/pages/admin/SystemSettings"));
const LoopBotLogs = lazy(() => import("@/pages/admin/LoopBotLogs"));
const ErrorLogs = lazy(() => import("@/pages/BehaviorPrediction"));
const PulseTrends = lazy(() => import("@/pages/students/StudentsAtRisk"));
const SchoolOnboarding = lazy(() => import("@/pages/admin/SchoolOnboarding"));
const Integrations = lazy(() => import("@/pages/ConsentSettings"));

// Teacher Routes
const StudentManagement = lazy(() => import("@/pages/StudentManagement"));
const SELPathway = lazy(() => import("@/pages/SelfRegulationToolbox"));
const StaffAssist = lazy(() => import("@/pages/ResetRoom"));
const PredictiveSupport = lazy(() => import("@/pages/PredictiveSupport"));
const EmotionAwareScheduling = lazy(() => import("@/pages/EmotionAwareScheduling"));

// Student Routes
const MentalHealthToolkit = lazy(() => import("@/pages/SelfRegulationToolbox"));
const DigitalJournal = lazy(() => import("@/pages/DigitalJournal"));
const ResetRoom = lazy(() => import("@/pages/ResetRoom"));
const CheckIn = lazy(() => import("@/pages/students/MoodTrendsOverview"));
const SELPathways = lazy(() => import("@/pages/students/StudentRiskDashboard"));
const TrustedAdults = lazy(() => import("@/components/dashboard/NotLoggedInView"));

// Parent Routes
const ChildActivity = lazy(() => import("@/pages/students/StudentsAtRisk"));
const ChildWellness = lazy(() => import("@/pages/students/MoodTrendsOverview"));
const Messages = lazy(() => import("@/pages/DataAccessRequests"));
const ParentResources = lazy(() => import("@/pages/ConsentSettings"));

// Create a wrapper for components that need empty props
const StudentListWrapper = () => {
  const emptyStudents = [];
  return <StudentManagement />;
};

const StudentRiskDashboardWrapper = () => {
  const emptyStudents = [];
  return <SELPathways students={emptyStudents} />;
};

const RiskOverviewCardWrapper = () => {
  return <TrustedAdults />;
};

export const routes = [
  {
    path: "/",
    element: <Index />,
  },
  {
    path: "/login",
    element: <Login />, // Remove Layout wrapper for login page
  },
  {
    path: "/dashboard",
    element: (
      <ProtectedRoute>
        <Dashboard />
      </ProtectedRoute>
    ),
  },
  {
    path: "/profile",
    element: (
      <ProtectedRoute>
        <Profile />
      </ProtectedRoute>
    ),
  },
  {
    path: "/settings",
    element: (
      <ProtectedRoute>
        <Settings />
      </ProtectedRoute>
    ),
  },
  {
    path: "/help",
    element: (
      <ProtectedRoute>
        <Help />
      </ProtectedRoute>
    ),
  },
  // Admin Routes
  {
    path: "/admin/user-management",
    element: (
      <ProtectedRoute requiredRole={[UserRole.admin]}>
        <UserManagement />
      </ProtectedRoute>
    ),
  },
  {
    path: "/admin/data-analytics",
    element: (
      <ProtectedRoute requiredRole={[UserRole.admin]}>
        <DataAnalytics />
      </ProtectedRoute>
    ),
  },
  {
    path: "/admin/school-management",
    element: (
      <ProtectedRoute requiredRole={[UserRole.admin]}>
        <SchoolManagement />
      </ProtectedRoute>
    ),
  },
  {
    path: "/admin/ferpa-compliance",
    element: (
      <ProtectedRoute requiredRole={[UserRole.admin]}>
        <FERPACompliance />
      </ProtectedRoute>
    ),
  },
  {
    path: "/admin/system-settings",
    element: (
      <ProtectedRoute requiredRole={[UserRole.admin]}>
        <SystemSettings />
      </ProtectedRoute>
    ),
  },
  {
    path: "/admin/loopbot-logs",
    element: (
      <ProtectedRoute requiredRole={[UserRole.admin]}>
        <LoopBotLogs />
      </ProtectedRoute>
    ),
  },
  {
    path: "/admin/error-logs",
    element: (
      <ProtectedRoute requiredRole={[UserRole.admin]}>
        <ErrorLogs />
      </ProtectedRoute>
    ),
  },
  {
    path: "/admin/pulse-trends",
    element: (
      <ProtectedRoute requiredRole={[UserRole.admin]}>
        <PulseTrends />
      </ProtectedRoute>
    ),
  },
  {
    path: "/admin/onboarding",
    element: (
      <ProtectedRoute requiredRole={[UserRole.admin]}>
        <SchoolOnboarding />
      </ProtectedRoute>
    ),
  },
  {
    path: "/admin/integrations",
    element: (
      <ProtectedRoute requiredRole={[UserRole.admin]}>
        <Integrations />
      </ProtectedRoute>
    ),
  },
  // Teacher Routes
  {
    path: "/teacher/students",
    element: (
      <ProtectedRoute requiredRole={[UserRole.teacher, UserRole.staff]}>
        <StudentListWrapper />
      </ProtectedRoute>
    ),
  },
  {
    path: "/teacher/sel-pathway",
    element: (
      <ProtectedRoute requiredRole={[UserRole.teacher, UserRole.staff]}>
        <SELPathway />
      </ProtectedRoute>
    ),
  },
  {
    path: "/teacher/staff-assist",
    element: (
      <ProtectedRoute requiredRole={[UserRole.teacher, UserRole.staff]}>
        <StaffAssist />
      </ProtectedRoute>
    ),
  },
  {
    path: "/teacher/predictive-support",
    element: (
      <ProtectedRoute requiredRole={[UserRole.teacher, UserRole.staff]}>
        <PredictiveSupport />
      </ProtectedRoute>
    ),
  },
  {
    path: "/teacher/emotion-aware",
    element: (
      <ProtectedRoute requiredRole={[UserRole.teacher, UserRole.staff]}>
        <EmotionAwareScheduling />
      </ProtectedRoute>
    ),
  },
  // Student Routes
  {
    path: "/student/mental-health",
    element: (
      <ProtectedRoute requiredRole={[UserRole.student]}>
        <MentalHealthToolkit />
      </ProtectedRoute>
    ),
  },
  {
    path: "/student/digital-journal",
    element: (
      <ProtectedRoute requiredRole={[UserRole.student]}>
        <DigitalJournal />
      </ProtectedRoute>
    ),
  },
  {
    path: "/student/reset-room",
    element: (
      <ProtectedRoute requiredRole={[UserRole.student]}>
        <ResetRoom />
      </ProtectedRoute>
    ),
  },
  {
    path: "/student/check-in",
    element: (
      <ProtectedRoute requiredRole={[UserRole.student]}>
        <CheckIn />
      </ProtectedRoute>
    ),
  },
  {
    path: "/student/sel-pathways",
    element: (
      <ProtectedRoute requiredRole={[UserRole.student]}>
        <StudentRiskDashboardWrapper />
      </ProtectedRoute>
    ),
  },
  {
    path: "/student/trusted-adults",
    element: (
      <ProtectedRoute requiredRole={[UserRole.student]}>
        <RiskOverviewCardWrapper />
      </ProtectedRoute>
    ),
  },
  // Parent Routes
  {
    path: "/parent/child-activity",
    element: (
      <ProtectedRoute requiredRole={[UserRole.parent]}>
        <ChildActivity />
      </ProtectedRoute>
    ),
  },
  {
    path: "/parent/child-wellness",
    element: (
      <ProtectedRoute requiredRole={[UserRole.parent]}>
        <ChildWellness />
      </ProtectedRoute>
    ),
  },
  {
    path: "/parent/messages",
    element: (
      <ProtectedRoute requiredRole={[UserRole.parent]}>
        <Messages />
      </ProtectedRoute>
    ),
  },
  {
    path: "/parent/parent-resources",
    element: (
      <ProtectedRoute requiredRole={[UserRole.parent]}>
        <ParentResources />
      </ProtectedRoute>
    ),
  },
];
