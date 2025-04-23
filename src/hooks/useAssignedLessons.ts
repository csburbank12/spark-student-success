
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { UserRole } from "@/types/roles";
import { SELAssignment } from "@/components/sel-pathways/types";

export function useAssignedLessons(studentId?: string) {
  const { user } = useAuth();
  const targetId = studentId || user?.id;
  const userRole = user?.role as UserRole;
  
  const { data: assignedLessons = [], isLoading, isError } = useQuery({
    queryKey: ["sel-assignments", targetId],
    queryFn: async () => {
      // If no target user or not a student, return empty array
      if (!targetId || (userRole !== UserRole.student && !studentId)) return [];
      
      try {
        const { data, error } = await supabase
          .from('sel_assignments')
          .select(`
            id, lesson_id, student_id, assigned_by, assigned_at, due_date, status,
            sel_lessons:lesson_id(*)
          `)
          .eq('student_id', targetId)
          .order('assigned_at', { ascending: false });
          
        if (error) throw error;
        
        // Map assignments to include needed fields
        return (data || []).map(assignment => {
          if (assignment.sel_lessons) {
            const lesson = assignment.sel_lessons as any;
            return {
              ...assignment,
              sel_lessons: {
                ...lesson,
                pathway: lesson.competency_area,
                duration: lesson.estimated_duration,
                difficulty: 'Standard',
                content: lesson.description
              }
            };
          }
          return assignment;
        }) as SELAssignment[];
      } catch (error) {
        console.error("Error fetching SEL assignments:", error);
        return [];
      }
    },
    enabled: !!targetId && (userRole === UserRole.student || !!studentId),
    refetchOnWindowFocus: false,
  });

  return { assignedLessons, isLoading, isError };
}
