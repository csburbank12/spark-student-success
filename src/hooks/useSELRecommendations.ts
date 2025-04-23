
import { useRecommendedLessons } from "./useRecommendedLessons";
import { useAssignedLessons } from "./useAssignedLessons";
import { useLessonProgress } from "./useLessonProgress";
import { SelLesson, SelAssignment } from "@/components/sel-pathways/types";

// Re-export SEL types for backward compatibility
export type { SelLesson, SelAssignment };

// Combined hook that provides all SEL data
export function useSELRecommendations(studentId?: string, mood?: string) {
  const { recommendedLessons, isLoading: isLoadingRecommendations, isError: isRecommendationsError } = useRecommendedLessons(studentId, mood);
  const { assignedLessons, isLoading: isLoadingAssignments, isError: isAssignmentsError } = useAssignedLessons(studentId);
  const { lessonProgress, isLoading: isLoadingProgress, isError: isProgressError } = useLessonProgress(studentId);

  // Compute aggregate loading and error states
  const isLoading = isLoadingRecommendations || isLoadingAssignments || isLoadingProgress;
  const isError = isRecommendationsError || isAssignmentsError || isProgressError;

  return {
    recommendedLessons,
    assignedLessons,
    lessonProgress,
    isLoading,
    isError
  };
}

// Re-export the other hooks for direct access
export { useAssignSELLesson } from "./useAssignSELLesson";
export { useSELProgress } from "./useSELProgress";
