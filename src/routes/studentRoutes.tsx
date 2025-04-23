
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

const studentRoutes = [
  {
    path: "/check-in",
    element: (
      <ProtectedRoute requiredRole={['student']}>
        <CheckIn />
      </ProtectedRoute>
    ),
  },
  {
    path: "/mental-health-toolkit",
    element: (
      <ProtectedRoute requiredRole={['student']}>
        <MentalHealthToolkit />
      </ProtectedRoute>
    ),
  },
  {
    path: "/future-me",
    element: (
      <ProtectedRoute requiredRole={['student']}>
        <FutureMe />
      </ProtectedRoute>
    ),
  },
  {
    path: "/digital-journal",
    element: (
      <ProtectedRoute requiredRole={['student']}>
        <DigitalJournal />
      </ProtectedRoute>
    ),
  },
  {
    path: "/self-regulation-toolbox",
    element: (
      <ProtectedRoute requiredRole={['student']}>
        <SelfRegulationToolboxPage />
      </ProtectedRoute>
    ),
  },
  {
    path: "/reset-room",
    element: (
      <ProtectedRoute requiredRole={['student']}>
        <ResetRoomPage />
      </ProtectedRoute>
    ),
  },
  {
    path: "/trusted-adults",
    element: (
      <ProtectedRoute requiredRole={['student']}>
        <TrustedAdultSelection />
      </ProtectedRoute>
    ),
  },
  {
    path: "/loopbot",
    element: (
      <ProtectedRoute requiredRole={['student']}>
        <LoopBot />
      </ProtectedRoute>
    ),
  },
  {
    path: "/pulse-tracker",
    element: (
      <ProtectedRoute requiredRole={['student']}>
        <CulturePulseSurvey />
      </ProtectedRoute>
    ),
  },
  {
    path: "/sel-pathways",
    element: (
      <ProtectedRoute requiredRole={['student']}>
        <PersonalizedSELPathways />
      </ProtectedRoute>
    ),
  },
];

export default studentRoutes;
