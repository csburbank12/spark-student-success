
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";

// Hook to assign SEL lessons to students
export function useAssignSELLesson() {
  const { user } = useAuth();
  
  const assignLesson = async (
    studentId: string, 
    lessonId: string, 
    dueDate?: Date
  ): Promise<boolean> => {
    try {
      if (!user?.id) throw new Error("No authenticated user");
      
      const { error } = await supabase
        .from('sel_assignments')
        .insert({
          student_id: studentId,
          lesson_id: lessonId,
          assigned_by: user.id,
          due_date: dueDate?.toISOString(),
          status: 'assigned'
        });
        
      if (error) throw error;
      return true;
    } catch (error) {
      console.error("Error assigning SEL lesson:", error);
      return false;
    }
  };
  
  const updateAssignmentStatus = async (
    assignmentId: string, 
    status: 'assigned' | 'in-progress' | 'completed'
  ): Promise<boolean> => {
    try {
      const { error } = await supabase
        .from('sel_assignments')
        .update({ status })
        .eq('id', assignmentId);
        
      if (error) throw error;
      return true;
    } catch (error) {
      console.error("Error updating SEL assignment status:", error);
      return false;
    }
  };
  
  return { assignLesson, updateAssignmentStatus };
}
