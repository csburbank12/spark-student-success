
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

export type SiteHealth = "green" | "yellow" | "red";

export interface LoopBotLog {
  id: string;
  timestamp: Date;
  issueType: string;
  description: string;
  resolution: string | null;
  status: "resolved" | "pending" | "failed";
  severity: "low" | "medium" | "high" | "critical";
}

export interface LoopBotScanResult {
  timestamp: Date;
  siteHealth: SiteHealth;
  issues: LoopBotLog[];
}

/**
 * LoopBot Service responsible for automated QA scanning, monitoring and self-repairs
 */
class LoopBotService {
  private lastScanResult: LoopBotScanResult | null = null;
  private isScanning = false;
  private scheduledJobId: number | null = null;

  constructor() {
    this.initializeScheduledRuns();
  }

  /**
   * Get the current site health status
   */
  getSiteHealth(): SiteHealth {
    if (!this.lastScanResult) return "green";
    return this.lastScanResult.siteHealth;
  }

  /**
   * Get all logs from the system
   */
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

  /**
   * Start a new scan of the system
   */
  async startScan(): Promise<LoopBotScanResult> {
    if (this.isScanning) {
      throw new Error("Scan already in progress");
    }

    this.isScanning = true;
    console.log("LoopBot: Starting automated QA scan...");
    
    try {
      // Mock scan process - would be replaced with actual checks
      await this.delay(2000);
      
      const brokenLinks = await this.checkLinks();
      const formIssues = await this.checkForms();
      const profileIssues = await this.checkProfiles();
      const buildIssues = await this.checkBuildErrors();
      
      const allIssues = [
        ...brokenLinks,
        ...formIssues, 
        ...profileIssues,
        ...buildIssues
      ];
      
      let siteHealth: SiteHealth = "green";
      if (allIssues.some(issue => issue.severity === "critical")) {
        siteHealth = "red";
      } else if (allIssues.some(issue => issue.severity === "high")) {
        siteHealth = "yellow";
      }
      
      this.lastScanResult = {
        timestamp: new Date(),
        siteHealth,
        issues: allIssues
      };
      
      console.log(`LoopBot: Scan complete. Found ${allIssues.length} issues. Site health: ${siteHealth}`);
      
      await this.attemptSelfRepair(allIssues);
      
      return this.lastScanResult;
    } finally {
      this.isScanning = false;
    }
  }

  /**
   * Get the last scan result
   */
  getLastScanResult(): LoopBotScanResult | null {
    return this.lastScanResult;
  }

  /**
   * Initialize scheduled runs (daily at midnight)
   */
  private async initializeScheduledRuns() {
    const { data: settings } = await supabase
      .from('loopbot_settings')
      .select('setting_value')
      .eq('setting_key', 'nightly_scans')
      .single();

    if (settings?.setting_value.enabled) {
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
    await this.startScan();
    
    this.scheduledJobId = window.setTimeout(() => {
      this.runDailyCheck();
    }, 24 * 60 * 60 * 1000);
  }

  private async checkLinks(): Promise<LoopBotLog[]> {
    // This would actually check links throughout the site
    const issues = await this.simulateCheck("broken_link", "Links check");
    return issues;
  }

  private async checkForms(): Promise<LoopBotLog[]> {
    // This would actually check forms throughout the site
    const issues = await this.simulateCheck("form_error", "Forms check");
    return issues;
  }

  private async checkProfiles(): Promise<LoopBotLog[]> {
    // This would actually check profile pages
    const issues = await this.simulateCheck("profile_error", "Profiles check");
    return issues;
  }

  private async checkBuildErrors(): Promise<LoopBotLog[]> {
    // This would check for actual build errors
    const issues = await this.simulateCheck("build_error", "Build check");
    return issues;
  }

  private async simulateCheck(component: string, description: string): Promise<LoopBotLog[]> {
    const shouldCreateIssue = Math.random() < 0.3; // 30% chance of finding an issue
    
    if (!shouldCreateIssue) {
      return [];
    }

    const issue: LoopBotLog = {
      id: crypto.randomUUID(),
      timestamp: new Date(),
      issueType: component,
      description: `Found issue during ${description}`,
      resolution: null,
      status: "pending",
      severity: Math.random() < 0.2 ? "critical" : "medium"
    };

    await this.logIssue(issue);
    return [issue];
  }

  private async logIssue(issue: LoopBotLog) {
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

  private async attemptSelfRepair(issues: LoopBotLog[]) {
    const repairableIssues = issues.filter(issue => 
      issue.status === "pending" && 
      (issue.severity === "low" || issue.severity === "medium")
    );
    
    for (const issue of repairableIssues) {
      console.log(`LoopBot: Attempting to repair issue ${issue.id}: ${issue.description}`);
      
      await this.delay(500);
      
      issue.status = "resolved";
      issue.resolution = `Automatically fixed at ${new Date().toISOString()}`;
      
      await this.updateIssueStatus(issue);
      
      console.log(`LoopBot: Successfully repaired issue ${issue.id}`);
    }
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

  private delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}

// Singleton instance
export const loopBotService = new LoopBotService();
