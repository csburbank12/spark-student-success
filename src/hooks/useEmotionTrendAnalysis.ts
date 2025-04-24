
import { useQuery } from "@tanstack/react-query";
import { analyzeTrend, OptimalTimeSlot, EmotionAnalysis } from "./emotionSchedulerUtils";

interface UseEmotionTrendAnalysisParams {
  moodData: any[];
  studentId?: string;
  enabled?: boolean;
}

// Default empty analysis to avoid null/undefined issues
const DEFAULT_ANALYSIS: EmotionAnalysis = {
  optimalCheckInTimes: [],
  stressPeriods: [],
  moodPatterns: {
    morningTrend: "No data",
    afternoonTrend: "No data",
    eveningTrend: "No data",
    weekdayTrend: "No data",
    weekendTrend: "No data"
  }
};

export function useEmotionTrendAnalysis({ moodData, studentId, enabled = true }: UseEmotionTrendAnalysisParams) {
  return useQuery({
    queryKey: ["emotion-scheduler-analysis", studentId],
    queryFn: async () => {
      // Early return to avoid processing if no data
      if (!moodData?.length) return DEFAULT_ANALYSIS;
      if (!studentId) return DEFAULT_ANALYSIS;

      const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
      const dayOfWeekData: Record<string, any[]> = {};
      const timeOfDayData: Record<string, any[]> = {};
      daysOfWeek.forEach(day => (dayOfWeekData[day] = []));
      ['morning', 'afternoon', 'evening'].forEach(tod => (timeOfDayData[tod] = []));

      // Handle potentially invalid data
      try {
        moodData.forEach((entry: any) => {
          if (!entry) return;
          
          try {
            const date = new Date(entry.date);
            if (isNaN(date.getTime())) return; // Skip invalid dates
            
            const day = daysOfWeek[date.getDay()];
            const hour = date.getHours();
            let timeOfDay = 'morning';
            if (hour >= 12 && hour < 17) timeOfDay = 'afternoon';
            else if (hour >= 17) timeOfDay = 'evening';
            dayOfWeekData[day].push(entry);
            timeOfDayData[timeOfDay].push(entry);
          } catch (err) {
            console.error("Error processing mood entry:", err);
          }
        });

        // Analyze mood patterns to find optimal times and stress periods
        const optimalCheckInTimes: OptimalTimeSlot[] = [];
        const stressPeriods: OptimalTimeSlot[] = [];

        // Find best/worst day of week by avg energy
        let bestDay = 'Monday', worstDay = 'Monday';
        let bestMoodScore = -Infinity, worstMoodScore = Infinity;
        daysOfWeek.forEach(day => {
          if (!dayOfWeekData[day].length) return;
          const avgEnergy = dayOfWeekData[day].reduce((sum, entry) => sum + (entry.energy_level || 0), 0) / dayOfWeekData[day].length;
          if (avgEnergy > bestMoodScore) { bestMoodScore = avgEnergy; bestDay = day; }
          if (avgEnergy < worstMoodScore) { worstMoodScore = avgEnergy; worstDay = day; }
        });

        // Find best/worst time of day by avg energy
        let bestTimeOfDay = 'morning', worstTimeOfDay = 'morning';
        bestMoodScore = -Infinity; worstMoodScore = Infinity;
        ['morning', 'afternoon', 'evening'].forEach(tod => {
          if (!timeOfDayData[tod].length) return;
          const avgEnergy = timeOfDayData[tod].reduce((sum, entry) => sum + (entry.energy_level || 0), 0) / timeOfDayData[tod].length;
          if (avgEnergy > bestMoodScore) { bestMoodScore = avgEnergy; bestTimeOfDay = tod; }
          if (avgEnergy < worstMoodScore) { worstMoodScore = avgEnergy; worstTimeOfDay = tod; }
        });

        const timeRanges = {
          morning: '8:00 AM - 11:00 AM',
          afternoon: '12:00 PM - 3:00 PM',
          evening: '3:00 PM - 6:00 PM',
        };

        // Main optimal time
        if (bestDay && bestTimeOfDay) {
          optimalCheckInTimes.push({
            day: bestDay,
            timeRange: timeRanges[bestTimeOfDay as keyof typeof timeRanges],
            confidence: 85,
            reason: `Historically shows highest energy levels and positive mood indicators`,
          });
        }

        // Secondary: second best day, same tod
        const secondBestDay = daysOfWeek.filter(d => d !== bestDay).sort((a, b) => {
          const aEnergy = dayOfWeekData[a].length ?
            dayOfWeekData[a].reduce((sum, entry) => sum + (entry.energy_level || 0), 0) / dayOfWeekData[a].length : 0;
          const bEnergy = dayOfWeekData[b].length ?
            dayOfWeekData[b].reduce((sum, entry) => sum + (entry.energy_level || 0), 0) / dayOfWeekData[b].length : 0;
          return bEnergy - aEnergy;
        })[0];

        if (secondBestDay && bestTimeOfDay) {
          optimalCheckInTimes.push({
            day: secondBestDay,
            timeRange: timeRanges[bestTimeOfDay as keyof typeof timeRanges],
            confidence: 70,
            reason: `Secondary optimal time with good mood patterns`,
          });
        }

        // Stress period: lowest energy
        if (worstDay && worstTimeOfDay) {
          stressPeriods.push({
            day: worstDay,
            timeRange: timeRanges[worstTimeOfDay as keyof typeof timeRanges],
            confidence: 80,
            reason: `Consistently shows lower energy and negative mood indicators`,
          });
        }

        // Overall pattern analysis
        const moodPatterns = {
          morningTrend: analyzeTrend(timeOfDayData.morning),
          afternoonTrend: analyzeTrend(timeOfDayData.afternoon),
          eveningTrend: analyzeTrend(timeOfDayData.evening),
          weekdayTrend: analyzeTrend([
            ...dayOfWeekData.Monday, ...dayOfWeekData.Tuesday,
            ...dayOfWeekData.Wednesday, ...dayOfWeekData.Thursday,
            ...dayOfWeekData.Friday,
          ]),
          weekendTrend: analyzeTrend([...dayOfWeekData.Saturday, ...dayOfWeekData.Sunday]),
        };

        return {
          optimalCheckInTimes,
          stressPeriods,
          moodPatterns,
        } as EmotionAnalysis;
      } catch (error) {
        console.error("Error in emotion trend analysis:", error);
        return DEFAULT_ANALYSIS;
      }
    },
    enabled: enabled && !!studentId && Array.isArray(moodData),
    staleTime: 5 * 60 * 1000, // 5 minutes
    refetchOnWindowFocus: false,
    retry: 1,
    suspense: false // Explicitly disable suspense mode for this query
  });
}
