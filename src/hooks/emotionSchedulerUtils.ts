
export interface OptimalTimeSlot {
  day: string;
  timeRange: string;
  confidence: number;
  reason: string;
}

export interface EmotionAnalysis {
  optimalCheckInTimes: OptimalTimeSlot[];
  stressPeriods: OptimalTimeSlot[];
  moodPatterns: {
    morningTrend: string;
    afternoonTrend: string;
    eveningTrend: string;
    weekdayTrend: string;
    weekendTrend: string;
  }
}

// Helper function to analyze trend in mood data
export function analyzeTrend(entries: any[]): string {
  if (!entries.length) return "No data";
  const avgEnergy = entries.reduce((sum, entry) => sum + entry.energy_level, 0) / entries.length;
  if (avgEnergy >= 7.5) return "Very positive";
  if (avgEnergy >= 6) return "Positive";
  if (avgEnergy >= 4.5) return "Neutral";
  if (avgEnergy >= 3) return "Negative";
  return "Very negative";
}
