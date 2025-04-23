
import React from "react";
import CheckIn from "@/pages/CheckIn";
import MentalHealthToolkit from "@/pages/MentalHealthToolkit";
import FutureMe from "@/pages/FutureMe";
import DigitalJournal from "@/pages/DigitalJournal";
import SelfRegulationToolboxPage from "@/pages/SelfRegulationToolbox";
import ResetRoomPage from "@/pages/ResetRoom";
import TrustedAdultSelection from "@/pages/TrustedAdultSelection";
import LoopBot from "@/pages/LoopBot";
import CulturePulseSurvey from "@/pages/CulturePulseSurvey";
import PersonalizedSELPathways from "@/pages/PersonalizedSELPathways";
import { ProtectedRoute } from "./ProtectedRoute";
import { UserRole } from "@/types/roles";

const studentRoutes = [
  {
    path: "/check-in",
    element: (
      <ProtectedRoute requiredRole={[UserRole.student]}>
        <CheckIn />
      </ProtectedRoute>
    ),
  },
  {
    path: "/mental-health-toolkit",
    element: (
      <ProtectedRoute requiredRole={[UserRole.student]}>
        <MentalHealthToolkit />
      </ProtectedRoute>
    ),
  },
  {
    path: "/future-me",
    element: (
      <ProtectedRoute requiredRole={[UserRole.student]}>
        <FutureMe />
      </ProtectedRoute>
    ),
  },
  {
    path: "/digital-journal",
    element: (
      <ProtectedRoute requiredRole={[UserRole.student]}>
        <DigitalJournal />
      </ProtectedRoute>
    ),
  },
  {
    path: "/self-regulation-toolbox",
    element: (
      <ProtectedRoute requiredRole={[UserRole.student]}>
        <SelfRegulationToolboxPage />
      </ProtectedRoute>
    ),
  },
  {
    path: "/reset-room",
    element: (
      <ProtectedRoute requiredRole={[UserRole.student]}>
        <ResetRoomPage />
      </ProtectedRoute>
    ),
  },
  {
    path: "/trusted-adults",
    element: (
      <ProtectedRoute requiredRole={[UserRole.student]}>
        <TrustedAdultSelection />
      </ProtectedRoute>
    ),
  },
  {
    path: "/loopbot",
    element: (
      <ProtectedRoute requiredRole={[UserRole.student]}>
        <LoopBot />
      </ProtectedRoute>
    ),
  },
  {
    path: "/pulse-tracker",
    element: (
      <ProtectedRoute requiredRole={[UserRole.student]}>
        <CulturePulseSurvey />
      </ProtectedRoute>
    ),
  },
  {
    path: "/sel-pathways",
    element: (
      <ProtectedRoute requiredRole={[UserRole.student]}>
        <PersonalizedSELPathways />
      </ProtectedRoute>
    ),
  },
];

export default studentRoutes;
