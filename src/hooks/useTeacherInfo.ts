
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";

interface TeacherInfo {
  position: string;
  department: string;
  school: string;
  employeeId: string;
}

export function useTeacherInfo() {
  const { user } = useAuth();

  const { data: teacherInfo, isLoading, error } = useQuery({
    queryKey: ["teacher-info", user?.id],
    queryFn: async () => {
      if (!user?.id) return null;

      const { data, error } = await supabase
        .from('staff_members')
        .select('*')
        .eq('user_id', user.id)
        .single();

      if (error) throw error;

      // Transform the data to match our interface
      return {
        position: data.position || "Teacher",
        department: data.department || "Not specified",
        school: "Westfield High", // This would come from school data in a real app
        employeeId: `T-${user.id.slice(0, 4)}`
      } as TeacherInfo;
    },
    enabled: !!user?.id
  });

  return { teacherInfo, isLoading, error };
}
