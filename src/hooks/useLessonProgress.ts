
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { SelProgress } from "@/components/sel-pathways/types";

export function useLessonProgress(studentId?: string) {
  const { user } = useAuth();
  const targetId = studentId || user?.id;
  
  const { data: lessonProgress = [], isLoading, isError } = useQuery({
    queryKey: ["sel-progress", targetId],
    queryFn: async () => {
      // If no target user, return empty array
      if (!targetId) return [];
      
      try {
        const { data, error } = await supabase
          .from('sel_progress')
          .select(`
            *,
            sel_lessons:lesson_id(*)
          `)
          .eq('student_id', targetId);
          
        if (error) throw error;
        
        // Map progress to include needed fields
        return (data || []).map(progress => {
          if (progress.sel_lessons) {
            const lesson = progress.sel_lessons as any;
            return {
              ...progress,
              sel_lessons: {
                ...lesson,
                pathway: lesson.competency_area,
                duration: lesson.estimated_duration,
                difficulty: 'Standard',
                content: lesson.description
              }
            };
          }
          return progress;
        }) as SelProgress[];
      } catch (error) {
        console.error("Error fetching SEL progress:", error);
        return [];
      }
    },
    enabled: !!targetId,
    refetchOnWindowFocus: false,
  });

  return { lessonProgress, isLoading, isError };
}
