
import { useStudentMoodData } from "./useStudentMoodData";
import { useEmotionTrendAnalysis } from "./useEmotionTrendAnalysis";

// Main orchestrating hook to provide emotion scheduling recommendation and patterns
export function useEmotionScheduler(studentId?: string) {
  const moodCheckInsQuery = useStudentMoodData(studentId);

  const analysisQuery = useEmotionTrendAnalysis({
    moodData: moodCheckInsQuery.data || [],
    studentId,
  });

  return {
    emotionAnalysis: analysisQuery.data,
    isLoading: moodCheckInsQuery.isLoading || analysisQuery.isLoading,
    isError: moodCheckInsQuery.isError || analysisQuery.isError,
    error: moodCheckInsQuery.error || analysisQuery.error,
  };
}
