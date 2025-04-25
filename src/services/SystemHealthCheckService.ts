
import { supabase } from '@/integrations/supabase/client';
import { ErrorLoggingService } from './ErrorLoggingService';
import { toast } from 'sonner';
import { executeSql } from '@/utils/supabaseUtils';

interface HealthCheckResult {
  success: boolean;
  errorCount: number;
  checks: HealthCheck[];
  timestamp: string;
}

interface HealthCheck {
  name: string;
  status: 'passed' | 'warning' | 'failed';
  message?: string;
  details?: any;
}

export class SystemHealthCheckService {
  static async initialize() {
    console.log('System Health Check Service initialized');
    // Run a quick health check on initialization
    this.runQuickHealthCheck();
  }

  static async runQuickHealthCheck(): Promise<HealthCheckResult> {
    console.log('Running quick health check...');
    
    const checks: HealthCheck[] = [];
    
    // Check Supabase connection
    try {
      const { data, error } = await supabase.from('system_settings').select('setting_key').limit(1);
      if (error) {
        checks.push({
          name: 'database_connection',
          status: 'failed',
          message: 'Failed to connect to database',
          details: error
        });
      } else {
        checks.push({
          name: 'database_connection',
          status: 'passed',
          message: 'Database connection successful'
        });
      }
    } catch (error) {
      checks.push({
        name: 'database_connection',
        status: 'failed',
        message: 'Failed to connect to database',
        details: error
      });
    }
    
    // Check authentication status
    try {
      const { data } = await supabase.auth.getSession();
      checks.push({
        name: 'auth_service',
        status: data.session ? 'passed' : 'warning',
        message: data.session ? 'Authentication service is working' : 'No active session found'
      });
    } catch (error) {
      checks.push({
        name: 'auth_service',
        status: 'failed',
        message: 'Authentication service error',
        details: error
      });
    }
    
    // Check for dead links
    try {
      const links = document.querySelectorAll('a');
      let brokenLinks = 0;
      links.forEach(link => {
        const href = link.getAttribute('href');
        if (href && href !== '#' && !href.startsWith('http') && !document.querySelector(`[id="${href.replace('#', '')}"]`)) {
          brokenLinks++;
        }
      });
      
      checks.push({
        name: 'dead_links',
        status: brokenLinks > 0 ? 'warning' : 'passed',
        message: brokenLinks > 0 ? `${brokenLinks} potentially broken internal links found` : 'No broken internal links found'
      });
    } catch (error) {
      checks.push({
        name: 'dead_links',
        status: 'warning',
        message: 'Unable to check for dead links',
        details: error
      });
    }
    
    const errorCount = checks.filter(check => check.status === 'failed').length;
    const warningCount = checks.filter(check => check.status === 'warning').length;
    
    const result: HealthCheckResult = {
      success: errorCount === 0,
      errorCount: errorCount + warningCount,
      checks,
      timestamp: new Date().toISOString()
    };
    
    console.log('Quick health check results:', result);
    
    return result;
  }

  static async runFullHealthCheck(): Promise<HealthCheckResult> {
    console.log('Running full health check...');
    
    // Start with the quick check
    const quickCheck = await this.runQuickHealthCheck();
    const checks = [...quickCheck.checks];
    
    // Check RLS policies - Using direct SQL query instead of RPC
    try {
      const { data: rlsData, error: rlsError } = await executeSql(`
        SELECT table_name, rls_enabled 
        FROM (
          SELECT 
            tables.table_name,
            CASE WHEN pg_class.relrowsecurity = true THEN true ELSE false END as rls_enabled
          FROM 
            information_schema.tables
          JOIN 
            pg_class ON tables.table_name = pg_class.relname
          JOIN 
            pg_namespace ON pg_class.relnamespace = pg_namespace.oid
          WHERE 
            tables.table_schema = 'public'
            AND pg_namespace.nspname = 'public'
        ) AS table_rls
      `);
      
      if (rlsError) {
        checks.push({
          name: 'row_level_security',
          status: 'failed',
          message: 'Failed to check row level security',
          details: rlsError
        });
      } else {
        const tablesWithoutRLS = Array.isArray(rlsData) 
          ? rlsData.filter(table => !table.rls_enabled) 
          : [];
        
        checks.push({
          name: 'row_level_security',
          status: tablesWithoutRLS.length > 0 ? 'warning' : 'passed',
          message: tablesWithoutRLS.length > 0 
            ? `${tablesWithoutRLS.length} tables found without RLS enabled` 
            : 'All tables have RLS enabled',
          details: tablesWithoutRLS
        });
      }
    } catch (error) {
      checks.push({
        name: 'row_level_security',
        status: 'warning',
        message: 'Failed to check row level security',
        details: error
      });
    }
    
    // Check for recurring errors
    try {
      const recurringErrors = await ErrorLoggingService.checkRecurringErrors('24h', 3);
      
      checks.push({
        name: 'recurring_errors',
        status: recurringErrors.length > 0 ? 'warning' : 'passed',
        message: recurringErrors.length > 0 
          ? `${recurringErrors.length} types of recurring errors found` 
          : 'No recurring errors found',
        details: recurringErrors
      });
    } catch (error) {
      checks.push({
        name: 'recurring_errors',
        status: 'warning',
        message: 'Failed to check for recurring errors',
        details: error
      });
    }
    
    // Check client performance
    try {
      const performanceMetrics = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
      const loadTime = performanceMetrics.loadEventEnd - performanceMetrics.startTime;
      
      checks.push({
        name: 'page_load_time',
        status: loadTime > 3000 ? 'warning' : 'passed',
        message: `Page load time: ${Math.round(loadTime)}ms`,
        details: {
          loadTime,
          domContentLoaded: performanceMetrics.domContentLoadedEventEnd - performanceMetrics.startTime,
          firstPaint: performance.getEntriesByName('first-paint')[0]?.startTime || 'N/A'
        }
      });
    } catch (error) {
      checks.push({
        name: 'page_load_time',
        status: 'warning',
        message: 'Failed to check page load time',
        details: error
      });
    }
    
    // Calculate final results
    const errorCount = checks.filter(check => check.status === 'failed').length;
    const warningCount = checks.filter(check => check.status === 'warning').length;
    
    const result: HealthCheckResult = {
      success: errorCount === 0,
      errorCount: errorCount + warningCount,
      checks,
      timestamp: new Date().toISOString()
    };
    
    console.log('Full health check results:', result);
    
    // Save the results to error logs
    try {
      await ErrorLoggingService.logError({
        action: 'system_health_check',
        error_message: `Health check completed with ${errorCount} errors and ${warningCount} warnings`,
        profile_type: 'system'
      });
    } catch (error) {
      console.error('Failed to log health check results:', error);
    }
    
    return result;
  }

  static async checkSecurity(): Promise<HealthCheckResult> {
    console.log('Running security check...');
    
    const checks: HealthCheck[] = [];
    
    // Check for tables without RLS - Using direct SQL query
    try {
      const { data: rlsData, error: rlsError } = await executeSql(`
        SELECT table_name, rls_enabled 
        FROM (
          SELECT 
            tables.table_name,
            CASE WHEN pg_class.relrowsecurity = true THEN true ELSE false END as rls_enabled
          FROM 
            information_schema.tables
          JOIN 
            pg_class ON tables.table_name = pg_class.relname
          JOIN 
            pg_namespace ON pg_class.relnamespace = pg_namespace.oid
          WHERE 
            tables.table_schema = 'public'
            AND pg_namespace.nspname = 'public'
        ) AS table_rls
      `);
      
      if (rlsError) {
        checks.push({
          name: 'rls_security',
          status: 'failed',
          message: 'Failed to check RLS security',
          details: rlsError
        });
      } else {
        const tablesWithoutRLS = Array.isArray(rlsData) 
          ? rlsData.filter(table => !table.rls_enabled) 
          : [];
        
        checks.push({
          name: 'rls_security',
          status: tablesWithoutRLS.length > 0 ? 'failed' : 'passed',
          message: tablesWithoutRLS.length > 0 
            ? `${tablesWithoutRLS.length} tables found without RLS enabled` 
            : 'All tables have RLS enabled',
          details: tablesWithoutRLS
        });
      }
    } catch (error) {
      checks.push({
        name: 'rls_security',
        status: 'failed',
        message: 'Failed to check RLS security',
        details: error
      });
    }
    
    // Check for public data exposure
    try {
      const { data: publicData, error: publicError } = await supabase
        .from('user_roles')
        .select('*')
        .limit(1)
        .single();
      
      checks.push({
        name: 'public_data_exposure',
        status: publicError ? 'passed' : 'failed',
        message: publicError 
          ? 'Protected data is properly secured' 
          : 'Protected data might be publicly accessible',
        details: publicError || publicData
      });
    } catch (error) {
      checks.push({
        name: 'public_data_exposure',
        status: 'warning',
        message: 'Failed to check for public data exposure',
        details: error
      });
    }
    
    // Check for auth configuration
    try {
      const { data: authSettings, error: authError } = await supabase
        .from('system_settings')
        .select('*')
        .eq('setting_key', 'auth_settings')
        .single();
      
      checks.push({
        name: 'auth_configuration',
        status: authError ? 'warning' : 'passed',
        message: authError 
          ? 'Cannot verify auth configuration settings' 
          : 'Auth configuration settings found',
        details: authError || authSettings
      });
    } catch (error) {
      checks.push({
        name: 'auth_configuration',
        status: 'warning',
        message: 'Failed to check auth configuration',
        details: error
      });
    }
    
    // Calculate final results
    const errorCount = checks.filter(check => check.status === 'failed').length;
    const warningCount = checks.filter(check => check.status === 'warning').length;
    
    const result: HealthCheckResult = {
      success: errorCount === 0,
      errorCount: errorCount + warningCount,
      checks,
      timestamp: new Date().toISOString()
    };
    
    console.log('Security check results:', result);
    
    return result;
  }

  static async checkFerpaCompliance(): Promise<HealthCheckResult> {
    console.log('Running FERPA compliance check...');
    
    const checks: HealthCheck[] = [];
    
    // Check for audit logging settings
    try {
      const { data: auditSettings, error: auditError } = await supabase
        .from('system_settings')
        .select('*')
        .eq('setting_key', 'audit_logs_enabled')
        .single();
      
      checks.push({
        name: 'ferpa_audit_logging',
        status: (auditError || !auditSettings || !auditSettings.setting_value) ? 'warning' : 'passed',
        message: (auditError || !auditSettings || !auditSettings.setting_value)
          ? 'FERPA audit logging may not be properly configured' 
          : 'FERPA audit logging is enabled',
        details: auditError || auditSettings
      });
    } catch (error) {
      checks.push({
        name: 'ferpa_audit_logging',
        status: 'warning',
        message: 'Failed to check FERPA audit logging configuration',
        details: error
      });
    }
    
    // Check for data encryption
    try {
      const { data: encryptionSettings, error: encryptionError } = await supabase
        .from('system_settings')
        .select('*')
        .eq('setting_key', 'encryption_enabled')
        .single();
      
      checks.push({
        name: 'data_encryption',
        status: (encryptionError || !encryptionSettings || !encryptionSettings.setting_value) ? 'warning' : 'passed',
        message: (encryptionError || !encryptionSettings || !encryptionSettings.setting_value)
          ? 'Data encryption may not be properly configured' 
          : 'Data encryption is enabled',
        details: encryptionError || encryptionSettings
      });
    } catch (error) {
      checks.push({
        name: 'data_encryption',
        status: 'warning',
        message: 'Failed to check data encryption configuration',
        details: error
      });
    }
    
    // Check access control policies - Using direct SQL query instead of accessing a non-existent table
    try {
      const { data: policiesData, error: policiesError } = await executeSql(`
        SELECT 
          schemaname, tablename, policyname
        FROM 
          pg_policies 
        WHERE 
          schemaname = 'public' 
        LIMIT 10
      `);
      
      checks.push({
        name: 'access_control_policies',
        status: (policiesError || !policiesData || policiesData.length === 0) ? 'warning' : 'passed',
        message: (policiesError || !policiesData || policiesData.length === 0)
          ? 'Access control policies may not be properly configured' 
          : 'Access control policies are configured',
        details: policiesError || { policyCount: policiesData?.length }
      });
    } catch (error) {
      checks.push({
        name: 'access_control_policies',
        status: 'warning',
        message: 'Could not verify access control policies',
        details: error
      });
    }
    
    // Calculate final results
    const errorCount = checks.filter(check => check.status === 'failed').length;
    const warningCount = checks.filter(check => check.status === 'warning').length;
    
    const result: HealthCheckResult = {
      success: errorCount === 0,
      errorCount: errorCount + warningCount,
      checks,
      timestamp: new Date().toISOString()
    };
    
    console.log('FERPA compliance check results:', result);
    
    return result;
  }

  static async checkPermissions(): Promise<HealthCheckResult> {
    console.log('Running permissions check...');
    
    const checks: HealthCheck[] = [];
    
    // Check for role assignments - Using simpler query without group
    try {
      const { data: roles, error: rolesError } = await supabase
        .from('user_roles')
        .select('role');
      
      if (rolesError) {
        checks.push({
          name: 'role_assignments',
          status: 'failed',
          message: 'Failed to check role assignments',
          details: rolesError
        });
      } else {
        // Count roles manually
        const roleCounts = roles?.reduce((acc, { role }) => {
          acc[role] = (acc[role] || 0) + 1;
          return acc;
        }, {} as Record<string, number>);
        
        const roleTypes = Object.keys(roleCounts || {});
        
        checks.push({
          name: 'role_assignments',
          status: 'passed',
          message: `Found ${roleTypes.length || 0} role types in the system`,
          details: roleCounts
        });
      }
    } catch (error) {
      checks.push({
        name: 'role_assignments',
        status: 'warning',
        message: 'Failed to check role assignments',
        details: error
      });
    }
    
    // Check admin access - Using SQL query to count admins
    try {
      const { data, error: adminsError } = await executeSql(`
        SELECT COUNT(*) as admin_count
        FROM user_roles 
        WHERE role = 'admin'
      `);
      
      if (adminsError) {
        checks.push({
          name: 'admin_access',
          status: 'warning',
          message: 'Failed to check admin access',
          details: adminsError
        });
      } else {
        const adminCount = data && data[0] ? parseInt(data[0].admin_count) : 0;
        checks.push({
          name: 'admin_access',
          status: adminCount > 0 ? 'passed' : 'warning',
          message: adminCount > 0 
            ? `${adminCount} admin users found` 
            : 'No admin users found',
          details: { adminCount }
        });
      }
    } catch (error) {
      checks.push({
        name: 'admin_access',
        status: 'warning',
        message: 'Failed to check admin access',
        details: error
      });
    }
    
    // Calculate final results
    const errorCount = checks.filter(check => check.status === 'failed').length;
    const warningCount = checks.filter(check => check.status === 'warning').length;
    
    const result: HealthCheckResult = {
      success: errorCount === 0,
      errorCount: errorCount + warningCount,
      checks,
      timestamp: new Date().toISOString()
    };
    
    console.log('Permissions check results:', result);
    
    return result;
  }

  static async runPreDeployChecklist(): Promise<HealthCheckResult> {
    console.log('Running pre-deploy checklist...');
    
    // Run all checks
    const [securityCheck, ferpaCheck, permissionsCheck, fullHealthCheck] = await Promise.all([
      this.checkSecurity(),
      this.checkFerpaCompliance(),
      this.checkPermissions(),
      this.runFullHealthCheck()
    ]);
    
    // Combine all checks
    const allChecks = [
      ...securityCheck.checks,
      ...ferpaCheck.checks,
      ...permissionsCheck.checks,
      ...fullHealthCheck.checks
    ];
    
    // Remove duplicate checks
    const uniqueChecks = allChecks.filter((check, index, self) => 
      index === self.findIndex(c => c.name === check.name)
    );
    
    // Calculate final results
    const errorCount = uniqueChecks.filter(check => check.status === 'failed').length;
    const warningCount = uniqueChecks.filter(check => check.status === 'warning').length;
    
    const result: HealthCheckResult = {
      success: errorCount === 0,
      errorCount: errorCount + warningCount,
      checks: uniqueChecks,
      timestamp: new Date().toISOString()
    };
    
    console.log('Pre-deploy checklist results:', result);
    
    // Log results for auditing
    await ErrorLoggingService.logError({
      action: 'pre_deploy_checklist',
      error_message: `Pre-deploy checklist completed with ${errorCount} errors and ${warningCount} warnings`,
      profile_type: 'system'
    });
    
    return result;
  }

  static displayHealthCheckResult(result: HealthCheckResult) {
    if (result.success) {
      toast.success("✅ All systems operational", {
        description: "No critical issues detected in health check"
      });
    } else {
      const errorCount = result.checks.filter(check => check.status === 'failed').length;
      const warningCount = result.checks.filter(check => check.status === 'warning').length;
      
      if (errorCount > 0) {
        toast.error("❌ Critical issues detected", {
          description: `${errorCount} critical issues and ${warningCount} warnings found`
        });
      } else if (warningCount > 0) {
        toast.warning("⚠️ Potential issues detected", {
          description: `${warningCount} warnings found in health check`
        });
      }
    }
  }
  
  // Added for compatibility with useRepairTools.ts
  static async getLatestDiagnosticResults(): Promise<any> {
    return this.runFullHealthCheck();
  }
}
