
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { User } from "@/types";
import { UserRole } from "@/types/roles";

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
      return [
        { id: "s1", name: "Alex Johnson" },
        { id: "s2", name: "Emma Smith" },
        { id: "s3", name: "Noah Miller" },
        { id: "s4", name: "Olivia Davis" },
      ];
    },
    enabled: !!isStaffOrAdmin,
  });

  // Query for behavior logs
  const logsQuery = useQuery({
    queryKey: ["staff-assist-behavior-logs"],
    queryFn: async () => {
      // Using a simple type annotation here to prevent deep instantiation
      const logs: Array<{
        id: string;
        studentId: string;
        studentName: string;
        date: string;
        behavior: string;
        intervention: string;
        staff: string;
        effectiveness: number | null;
      }> = [
        {
          id: "log1",
          studentId: "s1",
          studentName: "Alex Johnson",
          date: "2023-04-15T09:30:00",
          behavior: "Difficulty focusing in class",
          intervention: "Brief check-in, moved seating position",
          staff: user?.name || "Staff Member",
          effectiveness: 4,
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
