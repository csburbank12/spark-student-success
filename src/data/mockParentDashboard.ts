
import { ParentDashboardData, RiskLevel } from '@/types/parent-dashboard';

export const mockParentDashboardData: ParentDashboardData = {
  children: [
    {
      id: "child1",
      name: "Alex Johnson",
      grade: "10th Grade",
      school: "Washington High School",
      recentMood: "Good",
      moodTrend: "stable",
      attendance: 92,
      attendanceTrend: "up",
      checkIns: 14,
      academicStanding: "On Track",
      behaviorRisk: 38,
      behaviorRiskLevel: "low",
      behaviorTrend: "down",
      recentNotes: [
        { date: "Apr 21, 2025", note: "Great participation in class discussion today." },
        { date: "Apr 19, 2025", note: "Completed all assignments for the week." },
      ],
      alerts: 0
    },
    {
      id: "child2",
      name: "Jordan Johnson",
      grade: "7th Grade",
      school: "Lincoln Middle School",
      recentMood: "Okay",
      moodTrend: "down",
      attendance: 85,
      attendanceTrend: "down",
      checkIns: 10,
      academicStanding: "Needs Support",
      behaviorRisk: 65,
      behaviorRiskLevel: "medium",
      behaviorTrend: "up",
      recentNotes: [
        { date: "Apr 20, 2025", note: "Struggled to stay focused in math class." },
        { date: "Apr 18, 2025", note: "Missing one homework assignment this week." },
      ],
      alerts: 1
    }
  ]
};

export const getRiskColor = (level: RiskLevel): string => {
  switch (level) {
    case "high":
      return "text-red-500";
    case "medium":
      return "text-amber-500";
    case "low":
      return "text-green-500";
  }
};
