
import { ROUTE_BY_ROLE, UNIVERSAL_ROUTES } from './auditConstants';
import { checkRouteExists } from './auditUtils';
import { RouteCheckResult } from './types';
import { ErrorLoggingService } from '@/services/ErrorLoggingService';
import type { ProfileType } from '@/services/ErrorLoggingService';

export class RouteAuditService {
  static async auditRoutes(currentRole: string, logErrors: boolean, currentUserOnly: boolean, userProfileType: ProfileType): Promise<RouteCheckResult[]> {
    const results: RouteCheckResult[] = [];
    
    // Check universal routes first
    for (const route of UNIVERSAL_ROUTES) {
      try {
        const routeCheck = await checkRouteExists(route);
        if (routeCheck.exists) {
          results.push({ route, status: 'success' });
        } else {
          results.push({
            route,
            status: 'error',
            errorType: 'not_found',
            message: `Route '${route}' not found`
          });
          
          if (logErrors) {
            await ErrorLoggingService.logError({
              action: 'audit_route_check',
              error_message: `Route not found: ${route}`,
              profile_type: userProfileType
            });
          }
        }
      } catch (error) {
        results.push({
          route,
          status: 'error',
          errorType: 'check_failed',
          message: error instanceof Error ? error.message : 'Unknown error'
        });
      }
    }

    // Check role-specific routes
    const rolesToCheck = currentUserOnly ? [currentRole] : Object.keys(ROUTE_BY_ROLE);
    
    for (const role of rolesToCheck) {
      const routesForRole = ROUTE_BY_ROLE[role as keyof typeof ROUTE_BY_ROLE] || [];
      for (const route of routesForRole) {
        try {
          const routeCheck = await checkRouteExists(route);
          if (routeCheck.exists) {
            results.push({ route, status: 'success' });
          } else {
            results.push({
              route,
              status: 'error',
              errorType: 'not_found',
              message: `Route '${route}' not found for role '${role}'`
            });
            
            if (logErrors) {
              await ErrorLoggingService.logError({
                action: 'audit_route_check',
                error_message: `Route not found: ${route} for role ${role}`,
                profile_type: userProfileType
              });
            }
          }
        } catch (error) {
          results.push({
            route,
            status: 'error',
            errorType: 'check_failed',
            message: error instanceof Error ? error.message : 'Unknown error'
          });
        }
      }
    }

    return results;
  }
}
