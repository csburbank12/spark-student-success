
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { SelLesson } from "@/components/sel-pathways/types";

export function useRecommendedLessons(studentId?: string, mood?: string) {
  const { user } = useAuth();
  const targetId = studentId || user?.id;
  
  const { data: recommendedLessons = [], isLoading, isError } = useQuery({
    queryKey: ["sel-recommendations", targetId, mood],
    queryFn: async () => {
      // If no target user, return empty array
      if (!targetId) return [];
      
      try {
        // If mood is provided, use it to filter lessons
        if (mood) {
          const { data, error } = await supabase
            .from('sel_lessons')
            .select('*')
            .contains('recommended_moods', [mood.toLowerCase()]);
            
          if (error) throw error;
          
          // Map lessons to include pathway and duration fields
          return (data || []).map(lesson => ({
            ...lesson,
            pathway: lesson.competency_area,
            duration: lesson.estimated_duration,
            difficulty: 'Standard',
            content: lesson.description
          })) as SelLesson[];
        } 
        
        // Otherwise, get user's recent moods to recommend lessons
        const { data: moodData, error: moodError } = await supabase
          .rpc('get_user_mood_trends', { user_uuid: targetId, days_back: 7 });
          
        if (moodError) throw moodError;
        
        // If no mood data, return a general selection
        if (!moodData || moodData.length === 0) {
          const { data: generalLessons, error } = await supabase
            .from('sel_lessons')
            .select('*')
            .limit(3);
            
          if (error) throw error;
          
          return (generalLessons || []).map(lesson => ({
            ...lesson,
            pathway: lesson.competency_area,
            duration: lesson.estimated_duration,
            difficulty: 'Standard',
            content: lesson.description
          })) as SelLesson[];
        }
        
        // Get the most recent mood
        const recentMood = moodData[0]?.mood_type;
        
        // Get appropriate lessons based on mood
        const { data: moodBasedLessons, error: lessonError } = await supabase
          .from('sel_lessons')
          .select('*')
          .contains('recommended_moods', [recentMood?.toLowerCase()])
          .limit(3);
          
        if (lessonError) throw lessonError;
        
        return (moodBasedLessons || []).map(lesson => ({
          ...lesson,
          pathway: lesson.competency_area,
          duration: lesson.estimated_duration,
          difficulty: 'Standard',
          content: lesson.description
        })) as SelLesson[];
      } catch (error) {
        console.error("Error fetching SEL recommendations:", error);
        return [];
      }
    },
    enabled: !!targetId,
    refetchOnWindowFocus: false,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });

  return { recommendedLessons, isLoading, isError };
}
