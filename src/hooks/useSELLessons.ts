
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { type SelLesson } from "@/components/sel-pathways/types";

export const useSELLessons = () => {
  const { data: lessons = [], isLoading, isError } = useQuery({
    queryKey: ["sel-lessons"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('sel_lessons')
        .select('*')
        .order('created_at', { ascending: false });
        
      if (error) throw error;
      return data as SelLesson[];
    }
  });

  return { lessons, isLoading, isError };
};
