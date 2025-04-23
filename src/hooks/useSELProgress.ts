
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";

// Hook to update SEL lesson progress
export function useSELProgress() {
  const { user } = useAuth();
  
  const updateProgress = async (
    lessonId: string,
    progress: number,
    completed: boolean = false
  ): Promise<boolean> => {
    try {
      if (!user?.id) throw new Error("No authenticated user");
      
      // Check if progress exists
      const { data: existingProgress, error: checkError } = await supabase
        .from('sel_progress')
        .select('*')
        .eq('student_id', user.id)
        .eq('lesson_id', lessonId)
        .maybeSingle();
        
      if (checkError && checkError.code !== 'PGRST116') { // PGRST116 means no rows returned
        throw checkError;
      }
      
      if (existingProgress) {
        // Update existing progress
        const { error } = await supabase
          .from('sel_progress')
          .update({
            progress, 
            completed,
            completed_at: completed ? new Date().toISOString() : null
          })
          .eq('id', existingProgress.id);
          
        if (error) throw error;
      } else {
        // Create new progress entry
        const { error } = await supabase
          .from('sel_progress')
          .insert({
            student_id: user.id,
            lesson_id: lessonId,
            progress,
            completed,
            completed_at: completed ? new Date().toISOString() : null
          });
          
        if (error) throw error;
      }
      
      return true;
    } catch (error) {
      console.error("Error updating SEL progress:", error);
      return false;
    }
  };
  
  return { updateProgress };
}
