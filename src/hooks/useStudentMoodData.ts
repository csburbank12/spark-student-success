
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";

// Simple hook to fetch mood check-in data for a student/user
export function useStudentMoodData(studentId?: string, daysBack: number = 90) {
  const { user } = useAuth();
  const targetId = studentId || user?.id;

  return useQuery({
    queryKey: ["emotion-scheduler-mood-data", targetId, daysBack],
    queryFn: async () => {
      if (!targetId) return [];
      
      try {
        const { data, error } = await supabase.rpc("get_user_mood_check_ins", {
          user_uuid: targetId,
          days_back: daysBack,
        });
        
        if (error) throw error;
        return data || [];
      } catch (error) {
        console.error("Error fetching mood data:", error);
        return [];
      }
    },
    enabled: !!targetId,
    staleTime: 5 * 60 * 1000, // 5 minutes
    refetchOnWindowFocus: false,
  });
}
