
export interface TrendAlert {
  id: string;
  studentId: string;
  severity: 'critical' | 'high' | 'medium' | 'low';
  primaryTrigger: string;
  secondaryTriggers?: string[];
  details: string;
  recommendedAction: string;
  createdAt: string;
  updatedAt: string;
  resolved: boolean;
  resolvedAt?: string;
  resolvedBy?: string;
  resolutionNotes?: string;
}

export interface SchoolWellnessScore {
  id: string;
  schoolId: string;
  date: string;
  participationScore: number;
  moodScore: number;
  selCompletionScore: number;
  alertResolutionScore: number;
  totalScore: number;
  status: 'thriving' | 'stable' | 'at_risk';
  createdAt: string;
}

export interface MoodTrend {
  date: string;
  score: number;
  primaryMood: string;
  notes?: string;
}
