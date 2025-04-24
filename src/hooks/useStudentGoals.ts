
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

export function useStudentGoals(studentId?: string) {
  return useQuery({
    queryKey: ["student-goals", studentId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("student_goals")
        .select("*")
        .order("week_start", { ascending: false });
      
      if (error) throw error;
      return data || [];
    },
    enabled: !!studentId
  });
}

export function useUpdateGoal() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async ({ 
      goalId, 
      isCompleted, 
      reflection 
    }: { 
      goalId: string; 
      isCompleted?: boolean;
      reflection?: string;
    }) => {
      const { error } = await supabase
        .from("student_goals")
        .update({ 
          is_completed: isCompleted,
          reflection_on_goal: reflection
        })
        .eq("id", goalId);
      
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["student-goals"] });
      toast.success("Goal updated!");
    }
  });
}
