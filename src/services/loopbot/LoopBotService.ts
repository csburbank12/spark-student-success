
import { loopBotScanService } from "./LoopBotScanService";
import { loopBotLogService } from "./LoopBotLogService";
import { loopBotRepairService } from "./LoopBotRepairService";
import { loopBotSchedulerService } from "./LoopBotSchedulerService";
import type { LoopBotLog, LoopBotScanResult, SiteHealth } from "./types";

class LoopBotService {
  private lastScanResult: LoopBotScanResult | null = null;

  constructor() {
    loopBotSchedulerService.initializeScheduledRuns();
  }

  getSiteHealth(): SiteHealth {
    if (!this.lastScanResult) return "green";
    return this.lastScanResult.siteHealth;
  }

  getLogs(days = 30): Promise<LoopBotLog[]> {
    return loopBotLogService.getLogs(days);
  }

  async startScan(): Promise<LoopBotScanResult> {
    const issues = await loopBotScanService.startScan();
    
    let siteHealth: SiteHealth = "green";
    if (issues.some(issue => issue.severity === "critical")) {
      siteHealth = "red";
    } else if (issues.some(issue => issue.severity === "high")) {
      siteHealth = "yellow";
    }
    
    this.lastScanResult = {
      timestamp: new Date(),
      siteHealth,
      issues
    };
    
    // Log issues to database
    for (const issue of issues) {
      await loopBotLogService.logIssue(issue);
    }
    
    // Attempt self-repair
    await loopBotRepairService.attemptSelfRepair(issues);
    
    return this.lastScanResult;
  }

  getLastScanResult(): LoopBotScanResult | null {
    return this.lastScanResult;
  }

  acknowledgeAlert(logId: string): Promise<void> {
    return loopBotRepairService.acknowledgeAlert(logId);
  }

  rollbackToPreviousVersion(logId: string): Promise<void> {
    return loopBotRepairService.rollbackToPreviousVersion(logId);
  }
}

export const loopBotService = new LoopBotService();
