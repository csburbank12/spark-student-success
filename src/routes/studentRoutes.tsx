
import React from "react";
import CheckIn from "@/pages/CheckIn";
import MentalHealthToolkit from "@/pages/MentalHealthToolkit";
import FutureMe from "@/pages/FutureMe";
import DigitalJournal from "@/pages/DigitalJournal";
import SelfRegulationToolboxPage from "@/pages/SelfRegulationToolbox";
import ResetRoomPage from "@/pages/ResetRoom";
import { ProtectedRoute } from "./ProtectedRoute";

// Student-specific routes
const studentRoutes = [
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
    path: "/digital-journal",
    element: (
      <ProtectedRoute>
        <DigitalJournal />
      </ProtectedRoute>
    ),
  },
  {
    path: "/self-regulation-toolbox",
    element: (
      <ProtectedRoute>
        <SelfRegulationToolboxPage />
      </ProtectedRoute>
    ),
  },
  {
    path: "/reset-room",
    element: (
      <ProtectedRoute>
        <ResetRoomPage />
      </ProtectedRoute>
    ),
  },
];

export default studentRoutes;
