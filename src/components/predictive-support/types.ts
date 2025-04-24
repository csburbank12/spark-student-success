
export type AlertSeverity = 'stable' | 'at_risk' | 'critical';

export interface TrendAlert {
  id: string;
  studentId: string;
  severity: AlertSeverity;
  primaryTrigger: string;
  secondaryTriggers?: Record<string, any>;
  details?: Record<string, any>;
  recommendedAction?: string;
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

export interface TimeSlot {
  day: string;
  timeRange: string;
  confidence: number;
  reason?: string;
}

export interface MoodPattern {
  pattern: string;
  description: string;
  confidence: number;
  trend: 'improving' | 'stable' | 'declining';
}
