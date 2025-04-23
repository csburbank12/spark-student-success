
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { demoUsers } from "@/data/demoUsers";
import { ErrorLoggingService } from "@/services/ErrorLoggingService";

export const useDemoReset = () => {
  const resetDemoEnvironment = async () => {
    try {
      // Call the database function to clear demo data
      await supabase.rpc('reset_demo_environment');
      
      // Recreate demo data
      // Note: In a real app, you'd want to do this server-side
      // For demo purposes, we're using the mock data
      Object.values(demoUsers).forEach(async (user) => {
        // Recreate mood check-ins
        if (user.lastCheckIn) {
          await supabase.from('mood_check_ins').insert({
            user_id: user.id,
            mood_type: 'good',
            energy_level: 7,
            notes: 'Demo mood check-in'
          });
        }
      });

      toast.success('Demo environment has been reset successfully');
    } catch (error) {
      console.error('Error resetting demo environment:', error);
      ErrorLoggingService.logError({
        action: 'demo_environment_reset',
        error_message: `Failed to reset demo environment: ${error instanceof Error ? error.message : String(error)}`,
      });
      toast.error('Failed to reset demo environment');
    }
  };

  return { resetDemoEnvironment };
};
