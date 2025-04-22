
import React from "react";
import BehaviorDashboardHeader from "./BehaviorDashboardHeader";
import DashboardTabs from "./DashboardTabs";

// Types
export interface StudentBehaviorSummary {
  studentId: string;
  studentName: string;
  mood: {
    average: number;
    trend: "improving" | "declining" | "stable";
    confidence: number;
  };
  attendance: {
    rate: number;
    absences: number;
    trend: "improving" | "declining" | "stable";
  };
  behavior: {
    incidents: number;
    trend: "improving" | "declining" | "stable";
  };
  academic: {
    average: number;
    trend: "improving" | "declining" | "stable";
  };
}

const BehaviorPredictionDashboard: React.FC = () => {
  // Mock student data
  const studentData = {
    studentId: "s-12345",
    studentName: "Alex Johnson",
    moodScores: [0.4, 0.5, 0.7, 0.6, 0.3, 0.2, 0.4],
    attendanceRate: 92,
    taskCompletionRate: 85,
    engagementScore: 7.5,
    conductIncidents: 2,
    lastUpdated: new Date().toISOString()
  };

  // Mock intervention impact data
  const interventionImpactData = [
    {
      name: "Academic Support",
      success: 65,
      partial: 20,
      none: 15
    },
    {
      name: "Behavioral",
      success: 55,
      partial: 30,
      none: 15
    },
    {
      name: "Social-Emotional",
      success: 72,
      partial: 18,
      none: 10
    }
  ];

  return (
    <div className="space-y-6">
      <BehaviorDashboardHeader />
      <DashboardTabs
        studentData={studentData}
        interventionImpactData={interventionImpactData}
      />
    </div>
  );
};

export default BehaviorPredictionDashboard;
