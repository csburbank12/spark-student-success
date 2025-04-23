
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
