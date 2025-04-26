
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";

export interface ScheduleItem {
  id: string;
  title: string;
  time: string;
  location: string;
  details?: string;
}

export function useTeacherSchedule() {
  const { user } = useAuth();

  const { data: schedule, isLoading, error } = useQuery({
    queryKey: ["teacher-schedule", user?.id],
    queryFn: async () => {
      if (!user?.id) return [];

      const { data, error } = await supabase
        .from('meetings')
        .select('*')
        .eq('organizer_id', user.id)
        .gte('start_time', new Date().toISOString())
        .order('start_time', { ascending: true })
        .limit(5);

      if (error) throw error;

      return (data || []).map(meeting => ({
        id: meeting.id,
        title: meeting.title,
        time: new Date(meeting.start_time).toLocaleTimeString([], { 
          hour: '2-digit', 
          minute: '2-digit' 
        }),
        location: meeting.location || 'Not specified',
        details: meeting.description
      }));
    },
    enabled: !!user?.id
  });

  return { schedule, isLoading, error };
}
