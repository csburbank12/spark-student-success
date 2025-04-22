
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { MoodType } from "@/types";

// Fetch user's mood check-ins using the Supabase SQL function
export function useMoodCheckIns(userId?: string, daysBack: number = 30) {
  return useQuery({
    queryKey: ["mood-check-ins", userId, daysBack],
    queryFn: async () => {
      if (!userId) return [];
      const { data, error } = await supabase
        .rpc("get_user_mood_check_ins", { user_uuid: userId, days_back: daysBack });
      if (error) throw error;
      return data || [];
    },
    enabled: !!userId,
  });
}

// Fetch user's mood trends for charting
export function useMoodTrends(userId?: string, daysBack: number = 30) {
  return useQuery({
    queryKey: ["mood-trends", userId, daysBack],
    queryFn: async () => {
      if (!userId) return [];
      const { data, error } = await supabase
        .rpc("get_user_mood_trends", { user_uuid: userId, days_back: daysBack });
      if (error) throw error;
      return data || [];
    },
    enabled: !!userId,
  });
}

// Submit new mood check-in
export function useAddMoodCheckIn() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({
      userId,
      mood,
      energyLevel,
      notes,
    }: {
      userId: string,
      mood: MoodType,
      energyLevel: number,
      notes?: string,
    }) => {
      const { error } = await supabase.from("mood_check_ins").insert([
        {
          user_id: userId,
          mood_type: mood,
          energy_level: energyLevel,
          notes,
        },
      ]);
      if (error) throw error;
    },
    onSuccess: (_data, variables) => {
      qc.invalidateQueries({ queryKey: ["mood-check-ins", variables.userId] });
      qc.invalidateQueries({ queryKey: ["mood-trends", variables.userId] });
    },
    meta: {
      onError: (err: any) => {
        // Let error bubble up
      },
    },
  });
}
