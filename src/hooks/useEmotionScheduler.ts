
import { useStudentMoodData } from "./useStudentMoodData";
import { useEmotionTrendAnalysis } from "./useEmotionTrendAnalysis";
import { useMemo } from "react";
import { EmotionAnalysis } from "./emotionSchedulerUtils";

// Default empty analysis for when data is loading or unavailable
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

// Main orchestrating hook to provide emotion scheduling recommendation and patterns
export function useEmotionScheduler(studentId?: string) {
  const moodCheckInsQuery = useStudentMoodData(studentId);
  
  // Only run analysis when we have mood data and not in a loading state
  const analysisQuery = useEmotionTrendAnalysis({
    moodData: moodCheckInsQuery.data || [],
    studentId,
    enabled: !moodCheckInsQuery.isLoading && !moodCheckInsQuery.isError && 
             Array.isArray(moodCheckInsQuery.data) && 
             Boolean(studentId) // Only enable if studentId exists
  });
  
  // Use a memoized default value when data is unavailable to prevent suspense errors
  const emotionAnalysis = useMemo(() => {
    if (analysisQuery.isLoading || analysisQuery.isError || !analysisQuery.data) {
      return DEFAULT_ANALYSIS;
    }
    return analysisQuery.data;
  }, [analysisQuery.data, analysisQuery.isLoading, analysisQuery.isError]);

  return {
    emotionAnalysis,
    isLoading: moodCheckInsQuery.isLoading || analysisQuery.isLoading || 
               moodCheckInsQuery.isFetching || analysisQuery.isFetching,
    isError: moodCheckInsQuery.isError || analysisQuery.isError,
    error: moodCheckInsQuery.error || analysisQuery.error,
  };
}
