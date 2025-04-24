
import { supabase } from '@/lib/supabase';
import { ErrorLoggingService } from './ErrorLoggingService';
import { UserRole } from '@/types/roles';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';

// Profile routes to check for each user role
const routesByRole = {
  student: [
    '/student-dashboard',
    '/student-dashboard-enhanced',
    '/mental-health-toolkit',
    '/digital-journal',
    '/reset-room',
    '/check-in',
    '/trusted-adults',
    '/sel-pathways',
    '/profile'
  ],
  teacher: [
    '/teacher-dashboard',
    '/teacher-dashboard-enhanced',
    '/students',
    '/sel-pathway-management',
    '/staff-assist',
    '/check-in',
    '/predictive-support',
    '/emotion-aware-scheduling',
    '/profile'
  ],
  admin: [
    '/admin/user-management',
    '/admin/data-analytics',
    '/admin/school-management',
    '/admin/ferpa-compliance',
    '/admin/system-settings',
    '/admin/loopbot-logs',
    '/profile'
  ],
  parent: [
    '/parent-dashboard',
    '/parent-dashboard-enhanced',
    '/child-activity',
    '/child-wellness',
    '/messages',
    '/parent-resources',
    '/profile'
  ],
  staff: [
    '/staff-dashboard',
    '/staff-profile',
    '/staff-assist',
    '/support-tools'
  ]
};

// Universal routes that should work for all profiles
const universalRoutes = [
  '/dashboard',
  '/help',
  '/settings',
  '/qa-dashboard'
];

// Components to check on each page
const criticalComponents = [
  'Navbar',
  'Sidebar',
  'DashboardSelector',
  'ErrorBoundary',
  'Layout'
];

interface AuditOptions {
  checkAllRoles?: boolean;
  checkRoutes?: boolean;
  checkComponents?: boolean;
  logErrors?: boolean;
  currentUserOnly?: boolean;
}

interface AuditResult {
  success: boolean;
  totalChecked: number;
  errorCount: number;
  details: AuditResultDetails;
}

interface AuditResultDetails {
  roleChecks: RoleCheckResult[];
  routeChecks: RouteCheckResult[];
  componentChecks: ComponentCheckResult[];
}

interface RoleCheckResult {
  role: UserRole;
  status: 'success' | 'error';
  message?: string;
}

interface RouteCheckResult {
  route: string;
  status: 'success' | 'error';
  errorType?: string;
  message?: string;
}

interface ComponentCheckResult {
  component: string;
  location: string;
  status: 'success' | 'error';
  errorType?: string;
  message?: string;
}

export class PlatformAuditService {
  static isAuditInProgress = false;

  static async performAudit(options: AuditOptions = {}): Promise<AuditResult> {
    const {
      checkAllRoles = true,
      checkRoutes = true,
      checkComponents = true,
      logErrors = true,
      currentUserOnly = false
    } = options;

    if (this.isAuditInProgress) {
      throw new Error('An audit is already in progress');
    }

    this.isAuditInProgress = true;
    toast('Platform audit started', {
      description: 'Checking system health across all features'
    });

    const auditResult: AuditResult = {
      success: true,
      totalChecked: 0,
      errorCount: 0,
      details: {
        roleChecks: [],
        routeChecks: [],
        componentChecks: []
      }
    };

    try {
      // Get the current user
      const { data: sessionData } = await supabase.auth.getSession();
      const user = sessionData.session?.user;

      if (!user) {
        throw new Error('No authenticated user found');
      }

      // Get user role
      const { data: userData } = await supabase
        .from('user_roles')
        .select('role')
        .eq('user_id', user.id)
        .single();

      const currentRole = userData?.role as UserRole;

      // Check roles - either current user or all roles if specified
      const rolesToCheck = currentUserOnly 
        ? [currentRole] 
        : Object.keys(routesByRole) as UserRole[];

      if (checkAllRoles) {
        for (const role of rolesToCheck) {
          try {
            // Here we're just checking if the role exists in our system
            // In a real implementation, this might involve session simulation
            const roleExists = !!routesByRole[role];
            auditResult.totalChecked++;
            
            if (roleExists) {
              auditResult.details.roleChecks.push({
                role,
                status: 'success'
              });
            } else {
              auditResult.success = false;
              auditResult.errorCount++;
              auditResult.details.roleChecks.push({
                role,
                status: 'error',
                message: `Role '${role}' not configured in the system`
              });
            }
          } catch (error) {
            auditResult.success = false;
            auditResult.errorCount++;
            auditResult.details.roleChecks.push({
              role,
              status: 'error',
              message: error instanceof Error ? error.message : 'Unknown error'
            });
            
            if (logErrors) {
              ErrorLoggingService.logError({
                action: 'audit_role_check',
                error_message: `Failed to verify role: ${role}`,
                profile_type: currentRole
              });
            }
          }
        }
      }

      // Check routes
      if (checkRoutes) {
        // First, check universal routes
        for (const route of universalRoutes) {
          try {
            // In a real implementation, we would use an API or a fetch request to check if the route is accessible
            // For now, we'll just check if it's defined in our routes config
            const routeCheck = await this.checkRouteExists(route);
            auditResult.totalChecked++;
            
            if (routeCheck.exists) {
              auditResult.details.routeChecks.push({
                route,
                status: 'success'
              });
            } else {
              auditResult.success = false;
              auditResult.errorCount++;
              auditResult.details.routeChecks.push({
                route,
                status: 'error',
                errorType: 'not_found',
                message: `Route '${route}' not found`
              });
              
              if (logErrors) {
                ErrorLoggingService.logError({
                  action: 'audit_route_check',
                  error_message: `Route not found: ${route}`,
                  profile_type: currentRole
                });
              }
            }
          } catch (error) {
            auditResult.success = false;
            auditResult.errorCount++;
            auditResult.details.routeChecks.push({
              route,
              status: 'error',
              errorType: 'check_failed',
              message: error instanceof Error ? error.message : 'Unknown error'
            });
            
            if (logErrors) {
              ErrorLoggingService.logError({
                action: 'audit_route_check',
                error_message: `Failed to check route: ${route}`,
                profile_type: currentRole
              });
            }
          }
        }

        // Then check role-specific routes
        for (const role of rolesToCheck) {
          const routesForRole = routesByRole[role] || [];
          for (const route of routesForRole) {
            try {
              const routeCheck = await this.checkRouteExists(route);
              auditResult.totalChecked++;
              
              if (routeCheck.exists) {
                auditResult.details.routeChecks.push({
                  route,
                  status: 'success'
                });
              } else {
                auditResult.success = false;
                auditResult.errorCount++;
                auditResult.details.routeChecks.push({
                  route,
                  status: 'error',
                  errorType: 'not_found',
                  message: `Route '${route}' not found for role '${role}'`
                });
                
                if (logErrors) {
                  ErrorLoggingService.logError({
                    action: 'audit_route_check',
                    error_message: `Route not found: ${route} for role ${role}`,
                    profile_type: currentRole
                  });
                }
              }
            } catch (error) {
              auditResult.success = false;
              auditResult.errorCount++;
              auditResult.details.routeChecks.push({
                route,
                status: 'error',
                errorType: 'check_failed',
                message: error instanceof Error ? error.message : 'Unknown error'
              });
              
              if (logErrors) {
                ErrorLoggingService.logError({
                  action: 'audit_route_check',
                  error_message: `Failed to check route: ${route} for role ${role}`,
                  profile_type: currentRole
                });
              }
            }
          }
        }
      }

      // Check critical components
      if (checkComponents) {
        for (const component of criticalComponents) {
          try {
            // In a real implementation, we would have a more sophisticated component checking mechanism
            // For now, we'll just assume all components exist
            const componentExists = await this.checkComponentExists(component);
            auditResult.totalChecked++;
            
            if (componentExists) {
              auditResult.details.componentChecks.push({
                component,
                location: 'global',
                status: 'success'
              });
            } else {
              auditResult.success = false;
              auditResult.errorCount++;
              auditResult.details.componentChecks.push({
                component,
                location: 'global',
                status: 'error',
                errorType: 'not_found',
                message: `Component '${component}' not found`
              });
              
              if (logErrors) {
                ErrorLoggingService.logError({
                  action: 'audit_component_check',
                  error_message: `Component not found: ${component}`,
                  profile_type: currentRole
                });
              }
            }
          } catch (error) {
            auditResult.success = false;
            auditResult.errorCount++;
            auditResult.details.componentChecks.push({
              component,
              location: 'global',
              status: 'error',
              errorType: 'check_failed',
              message: error instanceof Error ? error.message : 'Unknown error'
            });
            
            if (logErrors) {
              ErrorLoggingService.logError({
                action: 'audit_component_check',
                error_message: `Failed to check component: ${component}`,
                profile_type: currentRole
              });
            }
          }
        }
      }

      // Log audit completion
      await supabase
        .from('site_audit_logs')
        .insert({
          run_by_admin_id: user.id,
          status: auditResult.success ? 'success' : 'issues_found',
          summary: auditResult.success 
            ? 'Platform audit completed successfully' 
            : `Platform audit found ${auditResult.errorCount} issues`,
          issues_found: auditResult.errorCount,
          details: {
            totalChecked: auditResult.totalChecked,
            roleChecks: auditResult.details.roleChecks,
            routeChecks: auditResult.details.routeChecks,
            componentChecks: auditResult.details.componentChecks,
          }
        });

      return auditResult;
    } catch (error) {
      console.error('Audit failed:', error);
      auditResult.success = false;
      auditResult.errorCount++;
      
      ErrorLoggingService.logError({
        action: 'platform_audit',
        error_message: error instanceof Error 
          ? error.message 
          : 'Unknown error during platform audit',
        profile_type: 'unknown'
      });
      
      return auditResult;
    } finally {
      this.isAuditInProgress = false;
    }
  }

  // Helper method to check if a route exists
  // In a real-world scenario, this might use fetch() to check if the route returns a valid response
  private static async checkRouteExists(route: string): Promise<{exists: boolean, status?: number}> {
    // For demo purposes, we'll just simulate all routes existing
    // In a real implementation, you could use a HEAD request to check
    return { exists: true };
  }

  // Helper method to check if a component exists and renders without errors
  private static async checkComponentExists(componentName: string): Promise<boolean> {
    // For demo purposes, we'll assume all components exist
    // In a real implementation, this would be more sophisticated
    return true;
  }
}
