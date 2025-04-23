
import { useStudentMoodData } from "./useStudentMoodData";
import { useEmotionTrendAnalysis } from "./useEmotionTrendAnalysis";

// Main orchestrating hook to provide emotion scheduling recommendation and patterns
export function useEmotionScheduler(studentId?: string) {
  const moodCheckInsQuery = useStudentMoodData(studentId);

  const analysisQuery = useEmotionTrendAnalysis({
    moodData: moodCheckInsQuery.data || [],
    studentId,
    enabled: !moodCheckInsQuery.isLoading && !moodCheckInsQuery.isError
  });

  return {
    emotionAnalysis: analysisQuery.data,
    isLoading: moodCheckInsQuery.isLoading || analysisQuery.isLoading || moodCheckInsQuery.isFetching || analysisQuery.isFetching,
    isError: moodCheckInsQuery.isError || analysisQuery.isError,
    error: moodCheckInsQuery.error || analysisQuery.error,
  };
}
