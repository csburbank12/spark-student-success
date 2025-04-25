
import { toast } from "sonner";
import { ErrorLoggingService, ProfileType } from "./ErrorLoggingService";
import { SystemDiagnostics } from "@/types/admin";

export interface HealthCheck {
  name: string;
  status: 'passed' | 'warning' | 'failed';
  details?: string;
}

export interface HealthCheckResult {
  success: boolean;
  timestamp: string;
  duration: number;
  checks: HealthCheck[];
  errorCount: number;
  warningCount: number;
}

export interface PreDeployResult {
  success: boolean;
  timestamp: string;
  duration: number;
  checks: HealthCheck[];
  warnings: string[];
}

export class SystemHealthCheckService {
  /**
   * Run a full health check on the system
   */
  public static async runFullHealthCheck(): Promise<HealthCheckResult> {
    const startTime = performance.now();
    
    try {
      const checks: HealthCheck[] = [];
      
      // Check frontend route integrity
      checks.push(await this.checkRouteIntegrity());
      
      // Check database connectivity
      checks.push(await this.checkDatabaseConnectivity());
      
      // Check authentication system
      checks.push(await this.checkAuthSystem());
      
      // Check API endpoints
      checks.push(await this.checkApiEndpoints());
      
      // Check component rendering
      checks.push(await this.checkComponentRendering());
      
      // Calculate results
      const duration = Math.round(performance.now() - startTime);
      const errorCount = checks.filter(check => check.status === 'failed').length;
      const warningCount = checks.filter(check => check.status === 'warning').length;
      const success = errorCount === 0;
      
      const result: HealthCheckResult = {
        success,
        timestamp: new Date().toISOString(),
        duration,
        checks,
        errorCount,
        warningCount
      };
      
      // Store the result for later reference
      localStorage.setItem('lastHealthCheck', JSON.stringify(result));
      
      return result;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error during health check';
      
      ErrorLoggingService.logError({
        action: 'system_health_check_failed',
        error_message: errorMessage,
        profile_type: 'system'
      });
      
      const duration = Math.round(performance.now() - startTime);
      
      const failureResult: HealthCheckResult = {
        success: false,
        timestamp: new Date().toISOString(),
        duration,
        checks: [{
          name: 'health_check_execution',
          status: 'failed',
          details: errorMessage
        }],
        errorCount: 1,
        warningCount: 0
      };
      
      return failureResult;
    }
  }
  
  /**
   * Run pre-deploy checklist
   */
  public static async runPreDeployChecklist(): Promise<PreDeployResult> {
    const startTime = performance.now();
    
    try {
      const checks: HealthCheck[] = [];
      const warnings: string[] = [];
      
      // Check for build errors
      checks.push(await this.checkBuildConfig());
      
      // Check for console errors
      checks.push(await this.checkConsoleErrors());
      
      // Check for unresolved merge conflicts
      const mergeCheck = await this.checkMergeConflicts();
      checks.push(mergeCheck);
      if (mergeCheck.status === 'warning' && mergeCheck.details) {
        warnings.push(mergeCheck.details);
      }
      
      // Check dependency versions
      const dependencyCheck = await this.checkDependencyVersions();
      checks.push(dependencyCheck);
      if (dependencyCheck.status === 'warning' && dependencyCheck.details) {
        warnings.push(dependencyCheck.details);
      }
      
      // Check for unused imports
      const unusedImportsCheck = await this.checkUnusedImports();
      checks.push(unusedImportsCheck);
      if (unusedImportsCheck.status !== 'passed' && unusedImportsCheck.details) {
        warnings.push(unusedImportsCheck.details);
      }
      
      const duration = Math.round(performance.now() - startTime);
      const success = checks.every(check => check.status !== 'failed');
      
      const result: PreDeployResult = {
        success,
        timestamp: new Date().toISOString(),
        duration,
        checks,
        warnings
      };
      
      // Store the result for later reference
      localStorage.setItem('lastPreDeployCheck', JSON.stringify(result));
      
      return result;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error during pre-deploy check';
      
      ErrorLoggingService.logError({
        action: 'pre_deploy_check_failed',
        error_message: errorMessage,
        profile_type: 'system'
      });
      
      const duration = Math.round(performance.now() - startTime);
      
      const failureResult: PreDeployResult = {
        success: false,
        timestamp: new Date().toISOString(),
        duration,
        checks: [{
          name: 'pre_deploy_execution',
          status: 'failed',
          details: errorMessage
        }],
        warnings: [errorMessage]
      };
      
      return failureResult;
    }
  }
  
  /**
   * Display health check results to the user
   */
  public static displayHealthCheckResult(result: HealthCheckResult | PreDeployResult): void {
    if (result.success) {
      toast.success('Health Check Passed', {
        description: `All ${result.checks.length} checks completed successfully in ${result.duration}ms`
      });
    } else {
      const errorCount = result.checks.filter(check => check.status === 'failed').length;
      const warningCount = result.checks.filter(check => check.status === 'warning').length;
      
      if (errorCount > 0) {
        toast.error('Health Check Failed', {
          description: `Found ${errorCount} errors and ${warningCount} warnings`
        });
      } else if (warningCount > 0) {
        toast.warning('Health Check Warning', {
          description: `Found ${warningCount} warnings, no critical errors`
        });
      }
    }
  }
  
  /**
   * Check route integrity
   */
  private static async checkRouteIntegrity(): Promise<HealthCheck> {
    // In a real app, this would check if all routes are valid
    return {
      name: 'route_integrity',
      status: 'passed'
    };
  }
  
  /**
   * Check database connectivity
   */
  private static async checkDatabaseConnectivity(): Promise<HealthCheck> {
    try {
      // In a real app, this would check if the database is accessible
      // For demo purposes, we'll simulate a potential issue
      const randomIssue = Math.random() > 0.8;
      
      if (randomIssue) {
        return {
          name: 'database_connectivity',
          status: 'warning',
          details: 'Database connection is slow (>500ms)'
        };
      }
      
      return {
        name: 'database_connectivity',
        status: 'passed'
      };
    } catch (error) {
      return {
        name: 'database_connectivity',
        status: 'failed',
        details: error instanceof Error ? error.message : 'Database connection failed'
      };
    }
  }
  
  /**
   * Check authentication system
   */
  private static async checkAuthSystem(): Promise<HealthCheck> {
    // In a real app, this would check if authentication is working
    return {
      name: 'authentication_system',
      status: 'passed'
    };
  }
  
  /**
   * Check API endpoints
   */
  private static async checkApiEndpoints(): Promise<HealthCheck> {
    // In a real app, this would check if API endpoints are responsive
    return {
      name: 'api_endpoints',
      status: 'passed'
    };
  }
  
  /**
   * Check component rendering
   */
  private static async checkComponentRendering(): Promise<HealthCheck> {
    // In a real app, this would check if components render correctly
    return {
      name: 'component_rendering',
      status: 'passed'
    };
  }
  
  /**
   * Check build configuration
   */
  private static async checkBuildConfig(): Promise<HealthCheck> {
    // In a real app, this would check for build config issues
    return {
      name: 'build_configuration',
      status: 'passed'
    };
  }
  
  /**
   * Check for console errors
   */
  private static async checkConsoleErrors(): Promise<HealthCheck> {
    // In a real app, this would check for console errors
    // For demo purposes, we'll simulate a random issue
    const randomIssue = Math.random() > 0.7;
    
    if (randomIssue) {
      return {
        name: 'console_errors',
        status: 'warning',
        details: 'Found 3 non-critical console warnings'
      };
    }
    
    return {
      name: 'console_errors',
      status: 'passed'
    };
  }
  
  /**
   * Check for unresolved merge conflicts
   */
  private static async checkMergeConflicts(): Promise<HealthCheck> {
    // In a real app, this would check for merge conflicts
    return {
      name: 'merge_conflicts',
      status: 'passed'
    };
  }
  
  /**
   * Check dependency versions
   */
  private static async checkDependencyVersions(): Promise<HealthCheck> {
    // In a real app, this would check for outdated dependencies
    return {
      name: 'dependency_versions',
      status: 'warning',
      details: 'React Query is 2 versions behind the latest release'
    };
  }
  
  /**
   * Check for unused imports
   */
  private static async checkUnusedImports(): Promise<HealthCheck> {
    // In a real app, this would check for unused imports
    return {
      name: 'unused_imports',
      status: 'warning',
      details: 'Found 5 unused imports across the codebase'
    };
  }
  
  /**
   * Get the latest diagnostic results
   */
  public static async getLatestDiagnosticResults(): Promise<SystemDiagnostics> {
    // In a real app, this would fetch real diagnostic data
    // For demo purposes, we'll return simulated data
    return {
      navigation: {
        status: 'passed',
        lastChecked: new Date().toISOString()
      },
      selModule: {
        status: 'warning',
        message: 'Some SEL assignments may not be correctly linked',
        lastChecked: new Date().toISOString()
      },
      profileLayouts: {
        status: 'passed',
        lastChecked: new Date().toISOString()
      },
      database: {
        status: 'passed',
        lastChecked: new Date().toISOString()
      },
      wellLensAI: {
        status: 'failed',
        message: 'WellLens AI service is not responding',
        lastChecked: new Date().toISOString()
      },
      skywardSync: {
        status: 'warning',
        message: 'Skyward sync is delayed by 2 hours',
        lastChecked: new Date().toISOString()
      }
    };
  }
}
