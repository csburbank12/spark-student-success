
import { ErrorLoggingService } from '../ErrorLoggingService';

export class HeartbeatService {
  private static heartbeatInterval: number | null = null;

  static startHeartbeat(intervalMinutes: number): void {
    if (this.heartbeatInterval) {
      clearInterval(this.heartbeatInterval);
    }
    
    this.heartbeatInterval = window.setInterval(() => {
      this.performHeartbeat();
    }, intervalMinutes * 60 * 1000);
  }
  
  static async performHeartbeat(): Promise<void> {
    try {
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
      }
      
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
  
  private static async checkFrontendHealth(): Promise<boolean> {
    return true; // In a real app, this would perform actual checks
  }
  
  private static async checkApiHealth(): Promise<boolean> {
    return true; // In a real app, this would make an API request
  }
  
  private static async checkDatabaseHealth(): Promise<boolean> {
    return true; // In a real app, this would check database connectivity
  }
  
  static stopHeartbeat(): void {
    if (this.heartbeatInterval) {
      clearInterval(this.heartbeatInterval);
      this.heartbeatInterval = null;
    }
  }
}
