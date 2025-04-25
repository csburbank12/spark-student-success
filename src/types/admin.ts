
// Add to existing file
export interface RepairLogEntry {
  id: string;
  action: string;
  details: string;
  timestamp: Date;
  adminName: string;
  success: boolean;
}

export interface SystemStatus {
  status: 'passed' | 'warning' | 'failed' | 'unknown';
  message?: string;
  lastChecked?: string;
  details?: Record<string, any>;
}

export interface SystemDiagnostics {
  navigation: SystemStatus;
  selModule: SystemStatus;
  profileLayouts: SystemStatus;
  database: SystemStatus;
  wellLensAI: SystemStatus;
  skywardSync: SystemStatus;
  [key: string]: SystemStatus;
}

export interface RepairStatus {
  success: boolean;
  message: string;
  timestamp: Date;
}

export interface MonitoringConfig {
  autoRepairEnabled: boolean;
  notificationMethod: 'email' | 'popup' | 'slack' | 'all';
  minSeverityToNotify: 'info' | 'warning' | 'error' | 'critical';
  heartbeatIntervalMinutes: number;
}
