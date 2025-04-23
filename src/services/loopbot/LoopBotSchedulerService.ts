
import { supabase } from "@/integrations/supabase/client";

class LoopBotSchedulerService {
  private scheduledJobId: number | null = null;

  async initializeScheduledRuns() {
    const { data: settings } = await supabase
      .from('loopbot_settings')
      .select('setting_value')
      .eq('setting_key', 'nightly_scans')
      .single();

    const settingsValue = settings?.setting_value as { enabled: boolean } | null;
    
    if (settingsValue?.enabled) {
      console.log("LoopBot: Scheduled daily runs initialized");
      
      // Calculate time until midnight
      const now = new Date();
      const midnight = new Date();
      midnight.setHours(24, 0, 0, 0);
      const timeUntilMidnight = midnight.getTime() - now.getTime();
      
      this.scheduledJobId = window.setTimeout(() => {
        this.runDailyCheck();
      }, timeUntilMidnight);
    }
  }

  private async runDailyCheck() {
    console.log("LoopBot: Running scheduled daily check");
    
    // Re-schedule for next day
    this.scheduledJobId = window.setTimeout(() => {
      this.runDailyCheck();
    }, 24 * 60 * 60 * 1000);
  }

  cleanup() {
    if (this.scheduledJobId) {
      clearTimeout(this.scheduledJobId);
      this.scheduledJobId = null;
    }
  }
}

export const loopBotSchedulerService = new LoopBotSchedulerService();
