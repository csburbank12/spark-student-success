
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

export function useStudentReflections(studentId?: string) {
  return useQuery({
    queryKey: ["student-reflections", studentId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("student_reflections")
        .select("*")
        .order("date_submitted", { ascending: false });
      
      if (error) throw error;
      return data || [];
    },
    enabled: !!studentId
  });
}

export function useAddReflection() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async ({ 
      reflectionText, 
      promptUsed 
    }: { 
      reflectionText: string; 
      promptUsed?: string;
    }) => {
      const { error } = await supabase
        .from("student_reflections")
        .insert([{ 
          reflection_text: reflectionText,
          prompt_used: promptUsed
        }]);
      
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["student-reflections"] });
      toast.success("Reflection saved!");
    }
  });
}
