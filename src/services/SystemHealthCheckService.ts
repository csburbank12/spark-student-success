
import { supabase } from '@/integrations/supabase/client';
import { ErrorLoggingService, ProfileType } from './ErrorLoggingService';

interface HealthCheckResult {
  component: string;
  status: 'healthy' | 'degraded' | 'failing';
  responseTime?: number;
  details?: any;
  timestamp: string;
}

export class SystemHealthCheckService {
  static async checkSystemHealth(): Promise<{
    overallStatus: 'healthy' | 'degraded' | 'failing';
    results: HealthCheckResult[];
  }> {
    try {
      const checkPromises = [
        this.checkDatabase(),
        this.checkFrontend(),
        this.checkAPI(),
        this.checkStorage()
      ];
      
      const results = await Promise.all(checkPromises);
      
      // Determine overall status
      let overallStatus: 'healthy' | 'degraded' | 'failing' = 'healthy';
      if (results.some(r => r.status === 'failing')) {
        overallStatus = 'failing';
      } else if (results.some(r => r.status === 'degraded')) {
        overallStatus = 'degraded';
      }
      
      return {
        overallStatus,
        results
      };
    } catch (error) {
      console.error('Health check failed:', error);
      return {
        overallStatus: 'failing',
        results: [{
          component: 'health_check_system',
          status: 'failing',
          details: {
            error: error instanceof Error ? error.message : String(error)
          },
          timestamp: new Date().toISOString()
        }]
      };
    }
  }
  
  static async checkDatabase(): Promise<HealthCheckResult> {
    const start = Date.now();
    try {
      // Simple query to check database connectivity
      const { data, error } = await supabase
        .from('system_settings')
        .select('setting_key')
        .limit(1);
        
      const responseTime = Date.now() - start;
      
      if (error) {
        ErrorLoggingService.logError({
          action: 'health_check_database',
          error_message: error.message,
          profile_type: 'system' as ProfileType
        });
        
        return {
          component: 'database',
          status: 'failing',
          responseTime,
          details: { error: error.message },
          timestamp: new Date().toISOString()
        };
      }
      
      // If response time is too high, mark as degraded
      const status = responseTime > 1000 ? 'degraded' : 'healthy';
      
      return {
        component: 'database',
        status,
        responseTime,
        details: { querySuccess: true },
        timestamp: new Date().toISOString()
      };
    } catch (error) {
      ErrorLoggingService.logError({
        action: 'health_check_database',
        error_message: error instanceof Error ? error.message : String(error),
        profile_type: 'system' as ProfileType
      });
      
      return {
        component: 'database',
        status: 'failing',
        responseTime: Date.now() - start,
        details: { error: error instanceof Error ? error.message : String(error) },
        timestamp: new Date().toISOString()
      };
    }
  }
  
  static async checkFrontend(): Promise<HealthCheckResult> {
    // Check browser APIs and frontend performance
    try {
      // Simple memory check
      const memory = (performance as any).memory?.usedJSHeapSize;
      const memoryLimit = (performance as any).memory?.jsHeapSizeLimit;
      
      let status: 'healthy' | 'degraded' | 'failing' = 'healthy';
      let memoryUsagePercentage = 0;
      
      if (memory && memoryLimit) {
        memoryUsagePercentage = (memory / memoryLimit) * 100;
        if (memoryUsagePercentage > 90) {
          status = 'failing';
        } else if (memoryUsagePercentage > 70) {
          status = 'degraded';
        }
      }
      
      return {
        component: 'frontend',
        status,
        details: {
          memory: memory ? `${Math.round(memory / (1024 * 1024))} MB` : 'Not available',
          memoryUsagePercentage: memoryUsagePercentage ? `${Math.round(memoryUsagePercentage)}%` : 'Not available'
        },
        timestamp: new Date().toISOString()
      };
    } catch (error) {
      return {
        component: 'frontend',
        status: 'degraded',
        details: { error: error instanceof Error ? error.message : String(error) },
        timestamp: new Date().toISOString()
      };
    }
  }
  
  static async checkAPI(): Promise<HealthCheckResult> {
    // For demo purposes, we'll simulate an API check
    return {
      component: 'api',
      status: 'healthy',
      responseTime: 120,
      details: { apiVersion: '1.0.0' },
      timestamp: new Date().toISOString()
    };
  }
  
  static async checkStorage(): Promise<HealthCheckResult> {
    try {
      // Check browser storage availability
      const localStorageAvailable = this.isLocalStorageAvailable();
      const sessionStorageAvailable = this.isSessionStorageAvailable();
      const indexedDBAvailable = this.isIndexedDBAvailable();
      
      const status: 'healthy' | 'degraded' | 'failing' = 
        (!localStorageAvailable || !sessionStorageAvailable) ? 'degraded' : 'healthy';
      
      return {
        component: 'storage',
        status,
        details: {
          localStorage: localStorageAvailable ? 'available' : 'unavailable',
          sessionStorage: sessionStorageAvailable ? 'available' : 'unavailable',
          indexedDB: indexedDBAvailable ? 'available' : 'unavailable'
        },
        timestamp: new Date().toISOString()
      };
    } catch (error) {
      return {
        component: 'storage',
        status: 'failing',
        details: { error: error instanceof Error ? error.message : String(error) },
        timestamp: new Date().toISOString()
      };
    }
  }
  
  private static isLocalStorageAvailable(): boolean {
    try {
      localStorage.setItem('test', 'test');
      localStorage.removeItem('test');
      return true;
    } catch (e) {
      return false;
    }
  }
  
  private static isSessionStorageAvailable(): boolean {
    try {
      sessionStorage.setItem('test', 'test');
      sessionStorage.removeItem('test');
      return true;
    } catch (e) {
      return false;
    }
  }
  
  private static isIndexedDBAvailable(): boolean {
    try {
      return !!window.indexedDB;
    } catch (e) {
      return false;
    }
  }
}
