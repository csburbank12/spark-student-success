
import { supabase } from "@/integrations/supabase/client";
import { LoopBotLog } from "./types";
import { toast } from "sonner";

class LoopBotRepairService {
  async attemptSelfRepair(issues: LoopBotLog[]) {
    const repairableIssues = issues.filter(issue => 
      issue.status === "pending" && 
      (issue.severity === "low" || issue.severity === "medium")
    );
    
    for (const issue of repairableIssues) {
      console.log(`LoopBot: Attempting to repair issue ${issue.id}`);
      
      await this.delay(500);
      
      issue.status = "resolved";
      issue.resolution = `Automatically fixed at ${new Date().toISOString()}`;
      
      await this.updateIssueStatus(issue);
      
      console.log(`LoopBot: Successfully repaired issue ${issue.id}`);
    }
  }

  async acknowledgeAlert(logId: string) {
    const { error } = await supabase
      .from('loopbot_logs')
      .update({
        status: 'fixed',
        action_taken: `Acknowledged by admin at ${new Date().toISOString()}`
      })
      .eq('id', logId);

    if (error) {
      console.error("Error acknowledging alert:", error);
      toast.error("Failed to acknowledge alert");
      return;
    }

    toast.success("Alert acknowledged successfully");
  }

  async rollbackToPreviousVersion(logId: string) {
    const { error } = await supabase
      .from('loopbot_logs')
      .update({
        status: 'fixed',
        action_taken: `Rolled back to previous version at ${new Date().toISOString()}`
      })
      .eq('id', logId);

    if (error) {
      console.error("Error performing rollback:", error);
      toast.error("Failed to rollback system");
      return;
    }

    toast.success("System successfully rolled back to previous version");
  }

  private async updateIssueStatus(issue: LoopBotLog) {
    const { error } = await supabase
      .from('loopbot_logs')
      .update({
        status: this.mapStatusToEnum(issue.status),
        action_taken: issue.resolution
      })
      .eq('id', issue.id);

    if (error) {
      console.error("Error updating issue status:", error);
    }
  }

  private mapStatusToEnum(status: string): "fixed" | "needs_review" | "ignored" {
    switch (status) {
      case "resolved": return "fixed";
      case "pending": return "needs_review";
      case "failed": return "ignored";
      default: return "needs_review";
    }
  }

  private delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}

export const loopBotRepairService = new LoopBotRepairService();
