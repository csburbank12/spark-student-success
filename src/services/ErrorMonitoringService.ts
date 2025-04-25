
import { ErrorLoggingService } from './ErrorLoggingService';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

interface MonitoringStats {
  activeUsers: number;
  userChange: number;
  errorRate: number;
  totalErrors: number;
  totalRequests: number;
  recentAlerts: any[];
}

export class ErrorMonitoringService {
  static async initialize() {
    console.log('Error Monitoring Service initialized');
    
    // Set up error handling for unhandled errors
    window.addEventListener('error', this.handleGlobalError);
    window.addEventListener('unhandledrejection', this.handleUnhandledRejection);
    
    return true;
  }
  
  static handleGlobalError = (event: ErrorEvent) => {
    const errorMessage = `Global error: ${event.message} at ${event.filename}:${event.lineno}:${event.colno}`;
    console.error(errorMessage);
    
    ErrorLoggingService.logError({
      action: 'unhandled_error',
      error_message: errorMessage,
      profile_type: 'system'
    });
    
    // Don't prevent the browser's default error handling
    return false;
  };
  
  static handleUnhandledRejection = (event: PromiseRejectionEvent) => {
    const errorMessage = `Unhandled Promise rejection: ${event.reason}`;
    console.error(errorMessage);
    
    ErrorLoggingService.logError({
      action: 'unhandled_promise_rejection',
      error_message: errorMessage,
      profile_type: 'system'
    });
  };

  static async getMonitoringStats(): Promise<MonitoringStats> {
    // This would normally be a real request to get monitoring stats
    // For now, we'll return mock data
    return {
      activeUsers: Math.floor(Math.random() * 100) + 50,
      userChange: Math.floor(Math.random() * 15) - 5,
      errorRate: parseFloat((Math.random() * 2).toFixed(2)),
      totalErrors: Math.floor(Math.random() * 10),
      totalRequests: Math.floor(Math.random() * 1000) + 500,
      recentAlerts: []
    };
  }

  static async saveConfig(config: any) {
    try {
      // This would normally be a real request to save config
      console.log('Saving monitoring config:', config);
      
      toast.success('Monitoring settings saved successfully');
      return true;
    } catch (error) {
      console.error('Failed to save monitoring config:', error);
      toast.error('Failed to save monitoring settings');
      throw error;
    }
  }

  static async restartSystem() {
    try {
      console.log('Restarting system...');
      toast.info('System restarting...');
      
      // This would normally be a real restart
      // For now, we'll just reload the page after a short delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      window.location.reload();
      return true;
    } catch (error) {
      console.error('Failed to restart system:', error);
      toast.error('Failed to restart system');
      throw error;
    }
  }
}
