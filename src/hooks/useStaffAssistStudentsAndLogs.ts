
import { useQuery } from "@tanstack/react-query";
import { User } from "@/types";
import { BehaviorLog, Student } from "@/components/staff-assist/types";

// Simple hook to fetch staff assist data
export function useStaffAssistStudentsAndLogs(
  user: User | null,
  isStaffOrAdmin: boolean
) {
  // Query for students
  const studentsQuery = useQuery({
    queryKey: ["staff-assist-students"],
    queryFn: async () => {
      // In a real app, these would be fetched from Supabase
      const students: Student[] = [
        { id: "s1", name: "Alex Johnson" },
        { id: "s2", name: "Emma Smith" },
        { id: "s3", name: "Noah Miller" },
        { id: "s4", name: "Olivia Davis" },
      ];
      return students;
    },
    enabled: !!isStaffOrAdmin,
  });

  // Query for behavior logs
  const logsQuery = useQuery({
    queryKey: ["staff-assist-behavior-logs"],
    queryFn: async () => {
      const logs: BehaviorLog[] = [
        {
          id: "log1",
          studentId: "s1",
          studentName: "Alex Johnson",
          date: "2023-04-15T09:30:00",
          behavior: "Difficulty focusing in class",
          intervention: "Brief check-in, moved seating position",
          staff: user?.name || "Staff Member",
          effectiveness: 4,
          staff_id: user?.id,
          student_id: "s1",
          situation_type: "classroom",
          intervention_used: "seating-change",
          effectiveness_rating: 4,
          notes: "Student responded well to the intervention",
          timestamp: "2023-04-15T09:30:00",
        },
        {
          id: "log2",
          studentId: "s2",
          studentName: "Emma Smith",
          date: "2023-04-14T13:15:00",
          behavior: "Conflict with peer during lunch",
          intervention: "Mediated discussion, reflective questions",
          staff: user?.name || "Staff Member",
          effectiveness: 3,
          staff_id: user?.id,
          student_id: "s2",
          situation_type: "social",
          intervention_used: "mediation",
          effectiveness_rating: 3,
          notes: "Partial resolution achieved",
          timestamp: "2023-04-14T13:15:00",
        },
        {
          id: "log3",
          studentId: "s3",
          studentName: "Noah Miller",
          date: "2023-04-13T10:45:00",
          behavior: "Showed signs of anxiety before test",
          intervention: "Breathing exercise, extra preparation time",
          staff: user?.name || "Staff Member",
          effectiveness: 5,
          staff_id: user?.id,
          student_id: "s3",
          situation_type: "academic",
          intervention_used: "anxiety-reduction",
          effectiveness_rating: 5,
          notes: "Student was able to complete the test successfully",
          timestamp: "2023-04-13T10:45:00",
        },
      ];
      
      return logs;
    },
    enabled: !!isStaffOrAdmin,
  });

  return {
    students: studentsQuery.data || [],
    isLoadingStudents: studentsQuery.isLoading,
    behaviorLogs: logsQuery.data || [],
    isLoadingLogs: logsQuery.isLoading,
    refetchLogs: logsQuery.refetch,
    isError: studentsQuery.isError || logsQuery.isError,
    error: studentsQuery.error || logsQuery.error,
  };
}
