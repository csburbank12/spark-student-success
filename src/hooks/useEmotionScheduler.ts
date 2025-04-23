
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";

interface OptimalTimeSlot {
  day: string;
  timeRange: string;
  confidence: number;
  reason: string;
}

interface EmotionAnalysis {
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

export function useEmotionScheduler(studentId?: string) {
  const { user } = useAuth();
  
  // Get mood check-ins
  const moodCheckInsQuery = useQuery({
    queryKey: ["emotion-scheduler-mood-data", studentId || user?.id],
    queryFn: async () => {
      const targetId = studentId || user?.id;
      if (!targetId) return [];
      
      const { data, error } = await supabase.rpc("get_user_mood_check_ins", { 
        user_uuid: targetId, 
        days_back: 90 
      });
      
      if (error) throw error;
      return data || [];
    },
    enabled: !!(studentId || user?.id),
  });

  // Use the mood data to analyze patterns
  const emotionAnalysis = useQuery({
    queryKey: ["emotion-scheduler-analysis", studentId || user?.id],
    queryFn: async () => {
      const moodData = moodCheckInsQuery.data;
      if (!moodData?.length) return null;

      // Group data by day of week and time of day
      const dayOfWeekData: Record<string, any[]> = {};
      const timeOfDayData: Record<string, any[]> = {};
      
      const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
      days.forEach(day => dayOfWeekData[day] = []);
      
      ['morning', 'afternoon', 'evening'].forEach(tod => timeOfDayData[tod] = []);
      
      moodData.forEach((entry: any) => {
        const date = new Date(entry.date);
        const day = days[date.getDay()];
        const hour = date.getHours();
        
        let timeOfDay = 'morning';
        if (hour >= 12 && hour < 17) timeOfDay = 'afternoon';
        else if (hour >= 17) timeOfDay = 'evening';
        
        dayOfWeekData[day].push(entry);
        timeOfDayData[timeOfDay].push(entry);
      });
      
      // Analyze mood patterns to find optimal times and stress periods
      const optimalCheckInTimes: OptimalTimeSlot[] = [];
      const stressPeriods: OptimalTimeSlot[] = [];
      
      // Find best day of week and time
      let bestDay = 'Monday';
      let worstDay = 'Monday';
      let bestMoodScore = -Infinity;
      let worstMoodScore = Infinity;
      
      days.forEach(day => {
        if (!dayOfWeekData[day].length) return;
        
        // Calculate average mood for this day using energy level and mood type
        const avgEnergy = dayOfWeekData[day].reduce((sum, entry) => sum + entry.energy_level, 0) / dayOfWeekData[day].length;
        
        // Check if this is best or worst day
        if (avgEnergy > bestMoodScore) {
          bestMoodScore = avgEnergy;
          bestDay = day;
        }
        
        if (avgEnergy < worstMoodScore) {
          worstMoodScore = avgEnergy;
          worstDay = day;
        }
      });
      
      // Find best time of day
      let bestTimeOfDay = 'morning';
      let worstTimeOfDay = 'morning';
      bestMoodScore = -Infinity;
      worstMoodScore = Infinity;
      
      ['morning', 'afternoon', 'evening'].forEach(tod => {
        if (!timeOfDayData[tod].length) return;
        
        const avgEnergy = timeOfDayData[tod].reduce((sum, entry) => sum + entry.energy_level, 0) / timeOfDayData[tod].length;
        
        if (avgEnergy > bestMoodScore) {
          bestMoodScore = avgEnergy;
          bestTimeOfDay = tod;
        }
        
        if (avgEnergy < worstMoodScore) {
          worstMoodScore = avgEnergy;
          worstTimeOfDay = tod;
        }
      });
      
      // Generate time ranges based on time of day
      const timeRanges = {
        morning: '8:00 AM - 11:00 AM',
        afternoon: '12:00 PM - 3:00 PM',
        evening: '3:00 PM - 6:00 PM'
      };
      
      // Add optimal check-in times
      optimalCheckInTimes.push({
        day: bestDay,
        timeRange: timeRanges[bestTimeOfDay as keyof typeof timeRanges],
        confidence: 85,
        reason: `Historically shows highest energy levels and positive mood indicators`
      });
      
      // Secondary time slot on another good day
      const secondBestDay = days.filter(d => d !== bestDay).sort((a, b) => {
        const aEnergy = dayOfWeekData[a].length ? 
          dayOfWeekData[a].reduce((sum, entry) => sum + entry.energy_level, 0) / dayOfWeekData[a].length : 0;
        const bEnergy = dayOfWeekData[b].length ?
          dayOfWeekData[b].reduce((sum, entry) => sum + entry.energy_level, 0) / dayOfWeekData[b].length : 0;
        return bEnergy - aEnergy;
      })[0];
      
      if (secondBestDay) {
        optimalCheckInTimes.push({
          day: secondBestDay,
          timeRange: timeRanges[bestTimeOfDay as keyof typeof timeRanges],
          confidence: 70,
          reason: `Secondary optimal time with good mood patterns`
        });
      }
      
      // Add stress periods
      stressPeriods.push({
        day: worstDay,
        timeRange: timeRanges[worstTimeOfDay as keyof typeof timeRanges],
        confidence: 80,
        reason: `Consistently shows lower energy and negative mood indicators`
      });
      
      // Determine overall mood patterns
      const moodPatterns = {
        morningTrend: analyzeTrend(timeOfDayData.morning),
        afternoonTrend: analyzeTrend(timeOfDayData.afternoon),
        eveningTrend: analyzeTrend(timeOfDayData.evening),
        weekdayTrend: analyzeTrend([...dayOfWeekData.Monday, ...dayOfWeekData.Tuesday, 
                                  ...dayOfWeekData.Wednesday, ...dayOfWeekData.Thursday, 
                                  ...dayOfWeekData.Friday]),
        weekendTrend: analyzeTrend([...dayOfWeekData.Saturday, ...dayOfWeekData.Sunday])
      };
      
      return {
        optimalCheckInTimes,
        stressPeriods,
        moodPatterns
      } as EmotionAnalysis;
    },
    enabled: !!moodCheckInsQuery.data && moodCheckInsQuery.data.length > 0,
  });
  
  return {
    emotionAnalysis: emotionAnalysis.data,
    isLoading: moodCheckInsQuery.isLoading || emotionAnalysis.isLoading,
    isError: moodCheckInsQuery.isError || emotionAnalysis.isError,
    error: moodCheckInsQuery.error || emotionAnalysis.error,
  };
}

// Helper function to analyze trend in mood data
function analyzeTrend(entries: any[]): string {
  if (!entries.length) return "No data";
  
  const avgEnergy = entries.reduce((sum, entry) => sum + entry.energy_level, 0) / entries.length;
  
  if (avgEnergy >= 7.5) return "Very positive";
  if (avgEnergy >= 6) return "Positive";
  if (avgEnergy >= 4.5) return "Neutral";
  if (avgEnergy >= 3) return "Negative";
  return "Very negative";
}
