import { MonitoringConfig } from '@/types/admin';
import { ErrorLoggingService } from './ErrorLoggingService';
import { ProfileType } from '@/services/ErrorLoggingService';

const DEFAULT_CONFIG: MonitoringConfig = {
  autoRepairEnabled: true,
  notificationMethod: 'popup',
  minSeverityToNotify: 'error',
  heartbeatIntervalMinutes: 10
};

export class ErrorMonitoringService {
  private static config: MonitoringConfig = DEFAULT_CONFIG;
  private static isInitialized = false;
  private static heartbeatInterval: number | null = null;
  
  /**
   * Initialize the error monitoring service
   */
  public static async initialize(): Promise<void> {
    if (this.isInitialized) {
      return;
    }
    
    try {
      // Load configuration (in a real app, this would come from the database)
      const storedConfig = localStorage.getItem('monitoringConfig');
      if (storedConfig) {
        this.config = JSON.parse(storedConfig);
      }
      
      // Set up global error handling
      window.addEventListener('error', (event) => {
        this.handleUncaughtError(event.error);
      });
      
      window.addEventListener('unhandledrejection', (event) => {
        this.handleUnhandledRejection(event.reason);
      });
      
      // Start heartbeat
      if (this.config.heartbeatIntervalMinutes > 0) {
        this.startHeartbeat();
      }
      
      this.isInitialized = true;
      console.log('Error monitoring service initialized');
    } catch (error) {
      console.error('Failed to initialize error monitoring service:', error);
    }
  }
  
  /**
   * Handle uncaught errors
   */
  private static handleUncaughtError(error: Error): void {
    ErrorLoggingService.logError({
      action: 'uncaught_error',
      error_message: error.message,
      profile_type: 'system',
      status_code: error.name
    });
    
    if (this.config.autoRepairEnabled) {
      this.attemptAutoRepair(error);
    }
    
    this.sendNotification({
      title: 'Uncaught Error',
      message: error.message,
      severity: 'error'
    });
  }
  
  /**
   * Handle unhandled promise rejections
   */
  private static handleUnhandledRejection(reason: any): void {
    const errorMessage = reason instanceof Error ? reason.message : String(reason);
    
    ErrorLoggingService.logError({
      action: 'unhandled_rejection',
      error_message: errorMessage,
      profile_type: 'system'
    });
    
    if (this.config.autoRepairEnabled) {
      this.attemptAutoRepair(reason);
    }
    
    this.sendNotification({
      title: 'Unhandled Promise Rejection',
      message: errorMessage,
      severity: 'error'
    });
  }
  
  /**
   * Start system heartbeat
   */
  private static startHeartbeat(): void {
    if (this.heartbeatInterval) {
      clearInterval(this.heartbeatInterval);
    }
    
    this.heartbeatInterval = window.setInterval(() => {
      this.performHeartbeat();
    }, this.config.heartbeatIntervalMinutes * 60 * 1000);
  }
  
  /**
   * Perform system heartbeat check
   */
  private static async performHeartbeat(): Promise<void> {
    try {
      // Check critical system components
      const systemStatus = {
        frontend: await this.checkFrontendHealth(),
        api: await this.checkApiHealth(),
        database: await this.checkDatabaseHealth()
      };
      
      const hasIssues = Object.values(systemStatus).some(status => !status);
      
      if (hasIssues) {
        ErrorLoggingService.logError({
          action: 'heartbeat_failure',
          error_message: `System heartbeat detected issues: ${JSON.stringify(systemStatus)}`,
          profile_type: 'system'
        });
        
        if (this.config.autoRepairEnabled) {
          this.attemptHeartbeatRepair(systemStatus);
        }
      }
      
      // Store heartbeat result
      localStorage.setItem('lastHeartbeat', JSON.stringify({
        timestamp: new Date().toISOString(),
        status: hasIssues ? 'issues_detected' : 'healthy',
        details: systemStatus
      }));
    } catch (error) {
      console.error('Heartbeat check failed:', error);
      ErrorLoggingService.logError({
        action: 'heartbeat_error',
        error_message: error instanceof Error ? error.message : 'Unknown heartbeat error',
        profile_type: 'system'
      });
    }
  }
  
  /**
   * Check frontend health
   */
  private static async checkFrontendHealth(): Promise<boolean> {
    // In a real app, this would perform actual checks
    // For demo purposes, we'll just return true
    return true;
  }
  
  /**
   * Check API health
   */
  private static async checkApiHealth(): Promise<boolean> {
    // In a real app, this would make an API request
    // For demo purposes, we'll just return true
    return true;
  }
  
  /**
   * Check database health
   */
  private static async checkDatabaseHealth(): Promise<boolean> {
    // In a real app, this would check database connectivity
    // For demo purposes, we'll just return true
    return true;
  }
  
  /**
   * Attempt to auto-repair an error
   */
  private static attemptAutoRepair(error: any): void {
    // In a real app, this would implement repair strategies
    console.log('Attempting to auto-repair error:', error);
  }
  
  /**
   * Attempt to repair issues detected by heartbeat
   */
  private static attemptHeartbeatRepair(systemStatus: Record<string, boolean>): void {
    // In a real app, this would implement repair strategies
    console.log('Attempting to repair heartbeat issues:', systemStatus);
  }
  
  /**
   * Send notification based on configured method
   */
  private static sendNotification({ title, message, severity }: { title: string; message: string; severity: string }): void {
    // Skip notifications below threshold
    if (!this.shouldNotify(severity)) {
      return;
    }
    
    switch (this.config.notificationMethod) {
      case 'popup':
        this.showPopupNotification(title, message, severity);
        break;
      case 'email':
        this.sendEmailNotification(title, message, severity);
        break;
      case 'slack':
        this.sendSlackNotification(title, message, severity);
        break;
      case 'all':
        this.showPopupNotification(title, message, severity);
        this.sendEmailNotification(title, message, severity);
        this.sendSlackNotification(title, message, severity);
        break;
    }
  }
  
  /**
   * Check if notification should be sent based on severity threshold
   */
  private static shouldNotify(severity: string): boolean {
    const severityLevels = ['info', 'warning', 'error', 'critical'];
    const configIndex = severityLevels.indexOf(this.config.minSeverityToNotify);
    const currentIndex = severityLevels.indexOf(severity);
    
    return currentIndex >= configIndex;
  }
  
  /**
   * Show popup notification
   */
  private static showPopupNotification(title: string, message: string, severity: string): void {
    console.log(`[${severity.toUpperCase()}] ${title}: ${message}`);
    // In a real app, this would show a toast notification
  }
  
  /**
   * Send email notification
   */
  private static sendEmailNotification(title: string, message: string, severity: string): void {
    console.log(`Would send email: [${severity.toUpperCase()}] ${title}: ${message}`);
    // In a real app, this would send an email
  }
  
  /**
   * Send Slack notification
   */
  private static sendSlackNotification(title: string, message: string, severity: string): void {
    console.log(`Would send to Slack: [${severity.toUpperCase()}] ${title}: ${message}`);
    // In a real app, this would send a Slack message
  }
  
  /**
   * Save monitoring configuration
   */
  public static async saveConfig(config: Partial<MonitoringConfig>): Promise<void> {
    try {
      this.config = { ...this.config, ...config };
      localStorage.setItem('monitoringConfig', JSON.stringify(this.config));
      
      // Update heartbeat interval if it changed
      if (config.heartbeatIntervalMinutes !== undefined) {
        if (this.heartbeatInterval) {
          clearInterval(this.heartbeatInterval);
          this.heartbeatInterval = null;
        }
        
        if (config.heartbeatIntervalMinutes > 0) {
          this.startHeartbeat();
        }
      }
      
      console.log('Monitoring configuration saved');
    } catch (error) {
      console.error('Failed to save monitoring configuration:', error);
    }
  }
  
  /**
   * Get monitoring configuration
   */
  public static getConfig(): MonitoringConfig {
    return { ...this.config };
  }
  
  /**
   * Restart the system
   */
  public static async restartSystem(): Promise<void> {
    try {
      console.log('Restarting system...');
      // In a real app, this would implement a more sophisticated restart
      
      // Clear caches
      try {
        localStorage.removeItem('lastHeartbeat');
        sessionStorage.clear();
        
        if ('caches' in window) {
          const cacheNames = await caches.keys();
          await Promise.all(
            cacheNames.map(cacheName => caches.delete(cacheName))
          );
        }
      } catch (e) {
        console.error('Error clearing caches:', e);
      }
      
      // Reload the page
      window.location.reload();
    } catch (error) {
      console.error('Failed to restart system:', error);
    }
  }
  
  /**
   * Get monitoring stats
   */
  public static async getMonitoringStats(): Promise<any> {
    // In a real app, this would fetch real stats from a database
    // For demo purposes, we'll return mock data
    const lastHeartbeatStr = localStorage.getItem('lastHeartbeat');
    const lastHeartbeat = lastHeartbeatStr ? JSON.parse(lastHeartbeatStr) : null;
    
    return {
      totalErrors: Math.floor(Math.random() * 50),
      resolvedErrors: Math.floor(Math.random() * 30),
      lastHeartbeatTime: lastHeartbeat?.timestamp || new Date().toISOString(),
      lastHeartbeatStatus: lastHeartbeat?.status || 'unknown'
    };
  }
}
