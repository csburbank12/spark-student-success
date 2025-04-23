
import { useMutation } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/components/ui/sonner";

/**
 * Returns mutations for logging interventions and updating effectiveness ratings.
 */
export function useStaffAssistMutations({
  user,
  refetchLogs,
}: {
  user: any;
  refetchLogs: () => void;
}) {
  // Log a new intervention
  const logIntervention = useMutation({
    mutationFn: async (data: {
      studentId: string | null;
      situationType: string;
      interventionUsed: string;
      notes: string;
    }) => {
      if (!user?.id) throw new Error("User not authenticated");
      const { error } = await supabase
        .from("behavior_logs")
        .insert({
          staff_id: user.id,
          student_id: data.studentId,
          situation_type: data.situationType,
          intervention_used: data.interventionUsed,
          notes: data.notes,
          created_at: new Date().toISOString(),
        });
      if (error) throw error;
    },
    onSuccess: () => {
      refetchLogs();
      toast("Intervention logged");
    },
  });

  // Update the effectiveness rating
  const updateEffectiveness = useMutation({
    mutationFn: async ({
      logId,
      rating,
    }: {
      logId: string;
      rating: number;
    }) => {
      const { error } = await supabase
        .from("behavior_logs")
        .update({ effectiveness_rating: rating })
        .eq("id", logId);
      if (error) throw error;
    },
    onSuccess: () => {
      toast("Effectiveness rating saved");
      refetchLogs();
    },
    onError: (error: any) => {
      toast("Failed to save rating", {
        description: error.message,
      });
    },
  });

  return { logIntervention, updateEffectiveness };
}
