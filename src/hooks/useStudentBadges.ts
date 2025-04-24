
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

export function useStudentBadges(studentId?: string) {
  return useQuery({
    queryKey: ["student-badges", studentId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("student_badges")
        .select("*")
        .order("date_earned", { ascending: false });
      
      if (error) throw error;
      return data || [];
    },
    enabled: !!studentId
  });
}

export function useAddStudentBadge() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async ({ 
      studentId, 
      badgeName, 
      badgeType, 
      description 
    }: { 
      studentId: string;
      badgeName: string;
      badgeType: string;
      description?: string;
      iconName?: string;
    }) => {
      const { error } = await supabase
        .from("student_badges")
        .insert([{ 
          student_id: studentId,
          badge_name: badgeName,
          badge_type: badgeType,
          description,
        }]);
      
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["student-badges"] });
      toast.success("New badge earned!");
    }
  });
}
