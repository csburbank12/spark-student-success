
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

export const useDeleteSELLesson = () => {
  const handleDeleteLesson = async (id: string) => {
    try {
      const { count } = await supabase
        .from('sel_assignments')
        .select('*', { count: 'exact', head: true })
        .eq('lesson_id', id);
        
      if (count && count > 0) {
        toast.error("Cannot delete lesson with existing assignments", {
          description: "Please remove all assignments first"
        });
        return;
      }
      
      const { error } = await supabase
        .from('sel_lessons')
        .delete()
        .eq('id', id);
        
      if (error) throw error;
      
      toast.success("Lesson deleted successfully");
    } catch (error) {
      console.error("Error deleting lesson:", error);
      toast.error("Failed to delete lesson");
    }
  };

  return { handleDeleteLesson };
};
