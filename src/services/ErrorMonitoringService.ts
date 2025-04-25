
import { MonitoringConfig } from '@/types/admin';
import { ErrorLoggingService } from './ErrorLoggingService';
import { HeartbeatService } from './monitoring/heartbeat-service';
import { NotificationService } from './monitoring/notification-service';
import { AutoRepairService } from './monitoring/auto-repair-service';

const DEFAULT_CONFIG: MonitoringConfig = {
  autoRepairEnabled: true,
  notificationMethod: 'popup',
  minSeverityToNotify: 'error',
  heartbeatIntervalMinutes: 10
};

export class ErrorMonitoringService {
  private static config: MonitoringConfig = DEFAULT_CONFIG;
  private static isInitialized = false;

  public static async initialize(): Promise<void> {
    if (this.isInitialized) {
      return;
    }
    
    try {
      const storedConfig = localStorage.getItem('monitoringConfig');
      if (storedConfig) {
        this.config = JSON.parse(storedConfig);
      }
      
      window.addEventListener('error', (event) => {
        this.handleUncaughtError(event.error);
      });
      
      window.addEventListener('unhandledrejection', (event) => {
        this.handleUnhandledRejection(event.reason);
      });
      
      if (this.config.heartbeatIntervalMinutes > 0) {
        HeartbeatService.startHeartbeat(this.config.heartbeatIntervalMinutes);
      }
      
      this.isInitialized = true;
      console.log('Error monitoring service initialized');
    } catch (error) {
      console.error('Failed to initialize error monitoring service:', error);
    }
  }

  private static handleUncaughtError(error: Error): void {
    ErrorLoggingService.logError({
      action: 'uncaught_error',
      error_message: error.message,
      profile_type: 'system',
      status_code: error.name
    });
    
    if (this.config.autoRepairEnabled) {
      AutoRepairService.attemptAutoRepair(error);
    }
    
    NotificationService.sendNotification({
      title: 'Uncaught Error',
      message: error.message,
      severity: 'error',
      method: this.config.notificationMethod
    });
  }
  
  private static handleUnhandledRejection(reason: any): void {
    const errorMessage = reason instanceof Error ? reason.message : String(reason);
    
    ErrorLoggingService.logError({
      action: 'unhandled_rejection',
      error_message: errorMessage,
      profile_type: 'system'
    });
    
    if (this.config.autoRepairEnabled) {
      AutoRepairService.attemptAutoRepair(reason);
    }
    
    NotificationService.sendNotification({
      title: 'Unhandled Promise Rejection',
      message: errorMessage,
      severity: 'error',
      method: this.config.notificationMethod
    });
  }

  public static async saveConfig(config: Partial<MonitoringConfig>): Promise<void> {
    try {
      this.config = { ...this.config, ...config };
      localStorage.setItem('monitoringConfig', JSON.stringify(this.config));
      
      if (config.heartbeatIntervalMinutes !== undefined) {
        HeartbeatService.stopHeartbeat();
        if (config.heartbeatIntervalMinutes > 0) {
          HeartbeatService.startHeartbeat(config.heartbeatIntervalMinutes);
        }
      }
      
      console.log('Monitoring configuration saved');
    } catch (error) {
      console.error('Failed to save monitoring configuration:', error);
    }
  }
  
  public static getConfig(): MonitoringConfig {
    return { ...this.config };
  }
  
  public static async restartSystem(): Promise<void> {
    try {
      console.log('Restarting system...');
      
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
      
      window.location.reload();
    } catch (error) {
      console.error('Failed to restart system:', error);
    }
  }
  
  public static async getMonitoringStats(): Promise<any> {
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
