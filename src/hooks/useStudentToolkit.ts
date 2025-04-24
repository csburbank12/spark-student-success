
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

export function useStudentToolkit(studentId?: string) {
  return useQuery({
    queryKey: ["student-toolkit", studentId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("student_toolkit")
        .select("*")
        .order("added_on", { ascending: false });
      
      if (error) throw error;
      return data || [];
    },
    enabled: !!studentId
  });
}

export function useAddToolkitItem() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async ({ 
      type, 
      label, 
      url, 
      content 
    }: { 
      type: string; 
      label: string;
      url?: string;
      content?: string;
    }) => {
      const { error } = await supabase
        .from("student_toolkit")
        .insert([{ 
          item_type: type,
          item_label: label,
          item_url: url,
          item_content: content
        }]);
      
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["student-toolkit"] });
      toast.success("Added to your toolkit!");
    }
  });
}
