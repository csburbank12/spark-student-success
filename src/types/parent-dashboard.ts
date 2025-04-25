export interface Child {
  id: string;
  name: string;
  grade: string;
  school: string;
  recentMood: string;
  moodTrend: 'up' | 'down' | 'stable';
  attendance: number;
  attendanceTrend: 'up' | 'down' | 'stable';
  checkIns: number;
  academicStanding: string;
  behaviorRisk: number;
  behaviorRiskLevel: 'low' | 'medium' | 'high';
  behaviorTrend: 'up' | 'down' | 'stable';
  recentNotes: Array<{
    date: string;
    note: string;
  }>;
  alerts: number;
}

export interface ParentDashboardData {
  children: Child[];
}

export type RiskLevel = 'low' | 'medium' | 'high';

export interface WellnessSummary {
  title: string;  
  description: string;
  statusColor: string;
}

export type RiskLevel = 'low' | 'medium' | 'high';
