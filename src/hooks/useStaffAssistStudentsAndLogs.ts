
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export interface StudentProfile {
  id: string;
  first_name: string;
  last_name: string;
}

export interface BehaviorLog {
  id: string;
  staff_id: string;
  student_id: string;
  situation_type: string;
  intervention_used: string;
  notes: string;
  effectiveness_rating: number | null;
  created_at: string;
}

/**
 * Fetches students data for staff assistance
 */
export const fetchStudents = async (
  userId: string | undefined,
  isStaffOrAdmin: boolean
): Promise<StudentProfile[]> => {
  if (!userId || !isStaffOrAdmin) return [];
  try {
    const { data, error } = await supabase
      .from("profiles")
      .select("id, first_name, last_name")
      .eq("role", "student");
    if (error) throw error;
    return (data || []).map((item) => ({
      id: item.id,
      first_name: item.first_name || '',
      last_name: item.last_name || '',
    }));
  } catch (error) {
    console.error("Error fetching students:", error);
    return [];
  }
};

/**
 * Fetches behavior logs for staff assistance
 */
export const fetchBehaviorLogs = async (
  userId: string | undefined,
  isStaffOrAdmin: boolean
): Promise<BehaviorLog[]> => {
  if (!userId || !isStaffOrAdmin) return [];
  try {
    const { data, error } = await supabase
      .from("behavior_logs")
      .select("id, staff_id, student_id, situation_type, intervention_used, notes, effectiveness_rating, created_at")
      .eq("staff_id", userId)
      .order("created_at", { ascending: false });
    if (error) throw error;
    return (data || []).map((item) => ({
      id: item.id,
      staff_id: item.staff_id,
      student_id: item.student_id,
      situation_type: item.situation_type,
      intervention_used: item.intervention_used,
      notes: item.notes || '',
      effectiveness_rating: item.effectiveness_rating,
      created_at: item.created_at,
    }));
  } catch (error) {
    console.error("Error fetching behavior logs:", error);
    return [];
  }
};

/**
 * Provides queries for both students and behavior logs.
 */
export function useStaffAssistStudentsAndLogs(user: any, isStaffOrAdmin: boolean) {
  const studentsQuery = useQuery({
    queryKey: ["staff-students"],
    queryFn: () => fetchStudents(user?.id, isStaffOrAdmin),
    enabled: !!user?.id && isStaffOrAdmin,
  });
  
  const behaviorLogsQuery = useQuery({
    queryKey: ["behavior-logs", user?.id],
    queryFn: () => fetchBehaviorLogs(user?.id, isStaffOrAdmin),
    enabled: !!user?.id && isStaffOrAdmin,
  });

  return {
    students: studentsQuery.data ?? [],
    isLoadingStudents: studentsQuery.isLoading,
    behaviorLogs: behaviorLogsQuery.data ?? [],
    refetchLogs: behaviorLogsQuery.refetch,
    isLoadingLogs: behaviorLogsQuery.isLoading,
  };
}
