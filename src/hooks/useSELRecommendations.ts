import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { UserRole } from "@/types/roles";

export interface SELLesson {
  id: string;
  title: string;
  description: string;
  activity_type: string;
  content_url?: string;
  competency_area: 'Self-Awareness' | 'Self-Management' | 'Social Awareness' | 'Relationship Skills' | 'Responsible Decision-Making';
  recommended_moods?: string[];
  estimated_duration?: number;
  age_range?: string;
}

export interface SELAssignment {
  id: string;
  lesson_id: string;
  student_id: string;
  assigned_by: string;
  assigned_at: string;
  due_date?: string;
  status: 'assigned' | 'in-progress' | 'completed';
  lesson?: SELLesson;
}

export function useSELRecommendations(studentId?: string, mood?: string) {
  const { user } = useAuth();
  const targetId = studentId || user?.id;
  const userRole = user?.role as UserRole;
  
  // Get recommended lessons based on user's mood or recent check-ins
  const { data: recommendedLessons = [], isLoading: isLoadingRecommendations } = useQuery({
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
          return data as SELLesson[];
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
          return generalLessons as SELLesson[];
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
        return (moodBasedLessons?.length ? moodBasedLessons : []) as SELLesson[];
      } catch (error) {
        console.error("Error fetching SEL recommendations:", error);
        return [];
      }
    },
    enabled: !!targetId,
    refetchOnWindowFocus: false,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });

  // Get lessons assigned to the student
  const { data: assignedLessons = [], isLoading: isLoadingAssignments } = useQuery({
    queryKey: ["sel-assignments", targetId],
    queryFn: async () => {
      // If no target user or not a student, return empty array
      if (!targetId || (userRole !== UserRole.student && !studentId)) return [];
      
      try {
        const { data, error } = await supabase
          .from('sel_assignments')
          .select(`
            id, lesson_id, student_id, assigned_by, assigned_at, due_date, status,
            lesson:sel_lessons(*)
          `)
          .eq('student_id', targetId)
          .order('assigned_at', { ascending: false });
          
        if (error) throw error;
        return data as SELAssignment[];
      } catch (error) {
        console.error("Error fetching SEL assignments:", error);
        return [];
      }
    },
    enabled: !!targetId && (userRole === UserRole.student || !!studentId),
    refetchOnWindowFocus: false,
  });

  // Get progress on SEL lessons
  const { data: lessonProgress = [], isLoading: isLoadingProgress } = useQuery({
    queryKey: ["sel-progress", targetId],
    queryFn: async () => {
      // If no target user, return empty array
      if (!targetId) return [];
      
      try {
        const { data, error } = await supabase
          .from('sel_progress')
          .select('*')
          .eq('student_id', targetId);
          
        if (error) throw error;
        return data;
      } catch (error) {
        console.error("Error fetching SEL progress:", error);
        return [];
      }
    },
    enabled: !!targetId,
    refetchOnWindowFocus: false,
  });

  return {
    recommendedLessons,
    assignedLessons,
    lessonProgress,
    isLoading: isLoadingRecommendations || isLoadingAssignments || isLoadingProgress
  };
}

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

// Hook to update SEL lesson progress
export function useSELProgress() {
  const { user } = useAuth();
  
  const updateProgress = async (
    lessonId: string,
    progress: number,
    completed: boolean = false
  ): Promise<boolean> => {
    try {
      if (!user?.id) throw new Error("No authenticated user");
      
      // Check if progress exists
      const { data: existingProgress, error: checkError } = await supabase
        .from('sel_progress')
        .select('*')
        .eq('student_id', user.id)
        .eq('lesson_id', lessonId)
        .single();
        
      if (checkError && checkError.code !== 'PGRST116') { // PGRST116 means no rows returned
        throw checkError;
      }
      
      if (existingProgress) {
        // Update existing progress
        const { error } = await supabase
          .from('sel_progress')
          .update({
            progress, 
            completed,
            completed_at: completed ? new Date().toISOString() : null
          })
          .eq('id', existingProgress.id);
          
        if (error) throw error;
      } else {
        // Create new progress entry
        const { error } = await supabase
          .from('sel_progress')
          .insert({
            student_id: user.id,
            lesson_id: lessonId,
            progress,
            completed,
            completed_at: completed ? new Date().toISOString() : null
          });
          
        if (error) throw error;
      }
      
      return true;
    } catch (error) {
      console.error("Error updating SEL progress:", error);
      return false;
    }
  };
  
  return { updateProgress };
}
