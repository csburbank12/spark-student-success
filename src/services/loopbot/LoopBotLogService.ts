
import { supabase } from "@/integrations/supabase/client";
import { LoopBotLog } from "./types";

class LoopBotLogService {
  async getLogs(days = 30): Promise<LoopBotLog[]> {
    const { data, error } = await supabase
      .from('loopbot_logs')
      .select('*')
      .order('timestamp', { ascending: false })
      .limit(30);

    if (error) {
      console.error("Error fetching LoopBot logs:", error);
      return [];
    }

    return data.map(log => ({
      id: log.id,
      timestamp: new Date(log.timestamp),
      issueType: log.component,
      description: log.issue,
      resolution: log.action_taken,
      status: this.mapStatus(log.status),
      severity: this.mapSeverity(log.severity)
    }));
  }

  async logIssue(issue: LoopBotLog) {
    const { error } = await supabase
      .from('loopbot_logs')
      .insert({
        component: issue.issueType,
        issue: issue.description,
        severity: this.mapSeverityToEnum(issue.severity),
        status: this.mapStatusToEnum(issue.status),
        action_taken: issue.resolution
      });

    if (error) {
      console.error("Error logging issue:", error);
    }
  }

  private mapSeverity(dbSeverity: string): "low" | "medium" | "high" | "critical" {
    switch (dbSeverity) {
      case "info": return "low";
      case "warning": return "medium";
      case "critical": return "critical";
      default: return "medium";
    }
  }

  private mapSeverityToEnum(severity: string): "info" | "warning" | "critical" {
    switch (severity) {
      case "low": return "info";
      case "medium": return "warning";
      case "high":
      case "critical": 
        return "critical";
      default: return "warning";
    }
  }

  private mapStatus(dbStatus: string): "resolved" | "pending" | "failed" {
    switch (dbStatus) {
      case "fixed": return "resolved";
      case "needs_review": return "pending";
      case "ignored": return "failed";
      default: return "pending";
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
}

export const loopBotLogService = new LoopBotLogService();
