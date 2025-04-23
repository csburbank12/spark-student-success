
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";

// Helper to check if string is a valid UUID
const isValidUuid = (id: string): boolean => {
  const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
  return uuidRegex.test(id);
};

// Simple hook to fetch mood check-in data for a student/user
export function useStudentMoodData(studentId?: string, daysBack: number = 90) {
  const { user } = useAuth();
  const targetId = studentId || user?.id;
  
  return useQuery({
    queryKey: ["emotion-scheduler-mood-data", targetId, daysBack],
    queryFn: async () => {
      if (!targetId) return [];
      
      // Add validation to prevent invalid UUID errors
      if (!isValidUuid(targetId)) {
        console.warn(`Invalid UUID format for targetId: ${targetId}`);
        return [];
      }
      
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
