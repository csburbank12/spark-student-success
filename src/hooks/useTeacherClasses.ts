
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";

export interface TeacherClass {
  title: string;
  students: number;
  room: string;
  time: string;
}

export function useTeacherClasses() {
  const { user } = useAuth();

  const { data: classes, isLoading, error } = useQuery({
    queryKey: ["teacher-classes", user?.id],
    queryFn: async () => {
      // For demo purposes, returning static data
      // In a real app, this would fetch from the database
      return [
        {
          title: "Period 1: Social Studies",
          students: 28,
          room: "Room 203",
          time: "8:30-9:20am"
        },
        {
          title: "Period 3: Homeroom",
          students: 24,
          room: "Room 203",
          time: "10:15-11:00am"
        }
      ] as TeacherClass[];
    },
    enabled: !!user?.id
  });

  return { classes, isLoading, error };
}
