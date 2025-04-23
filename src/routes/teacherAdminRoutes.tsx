import { lazy } from "react";
import { RouteObject } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";

const TeacherDashboard = lazy(() => import("@/pages/TeacherDashboard"));
const TeacherDashboardEnhanced = lazy(() => import("@/pages/TeacherDashboardEnhanced"));
const StaffAssistMode = lazy(() => import("@/pages/StaffAssistMode"));
const SELPathwayManagement = lazy(() => import("@/pages/SELPathwayManagement"));
const StudentManagement = lazy(() => import("@/pages/StudentManagement"));
const PredictiveSupport = lazy(() => import("@/pages/PredictiveSupport"));
const BehaviorPrediction = lazy(() => import("@/pages/BehaviorPrediction"));
const CheckIn = lazy(() => import("@/pages/CheckIn"));
const TeacherProfile = lazy(() => import("@/pages/profile/TeacherProfile"));
const EmotionAwareScheduling = lazy(() => import("@/pages/EmotionAwareScheduling"));

const dummyTeacherUser = { id: "dummy", role: "teacher" } as any; // For demo only, adjust as needed.

export const teacherAdminRoutes: RouteObject[] = [
  {
    path: "/teacher-dashboard",
    element: <TeacherDashboard />,
  },
  {
    path: "/teacher-dashboard-enhanced",
    element: <TeacherDashboardEnhanced />,
  },
  {
    path: "/staff-assist",
    element: <StaffAssistMode />,
  },
  {
    path: "/sel-pathways",
    element: <SELPathwayManagement />,
  },
  {
    path: "/students",
    element: <StudentManagement />,
  },
  {
    path: "/predictive-support",
    element: <PredictiveSupport />,
  },
  {
    path: "/behavior-prediction",
    element: <BehaviorPrediction />,
  },
  {
    path: "/check-in",
    element: <CheckIn />,
  },
  {
    path: "/profile/teacher",
    element: <TeacherProfile user={dummyTeacherUser} />,
  },
  {
    path: "/emotion-aware-scheduling",
    element: <EmotionAwareScheduling />,
  },
];
