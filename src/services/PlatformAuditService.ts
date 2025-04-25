
import { supabase } from '@/integrations/supabase/client';
import { checkRouteExists, checkComponentExists, logAuditCompletion } from './audit/auditUtils';

interface AuditOptions {
  checkAllRoles: boolean;
  checkRoutes: boolean;
  checkComponents: boolean;
  logErrors: boolean;
  currentUserOnly: boolean;
}

interface AuditResult {
  success: boolean;
  errorCount: number;
  routeResults?: any[];
  componentResults?: any[];
  databaseResults?: any;
  date: string;
}

export class PlatformAuditService {
  static async initialize() {
    console.log('Platform Audit Service initialized');
    // Any initialization code would go here
  }

  static async performAudit(options: AuditOptions): Promise<AuditResult> {
    const startTime = Date.now();
    const results: AuditResult = {
      success: true,
      errorCount: 0,
      date: new Date().toISOString(),
    };

    try {
      // Audit routes if requested
      if (options.checkRoutes) {
        const routes = await this.getRoutes();
        const routeResults = [];
        
        for (const route of routes) {
          try {
            const checkResult = await checkRouteExists(route);
            if (!checkResult.exists) {
              results.errorCount++;
              results.success = false;
            }
            routeResults.push({
              route,
              ...checkResult
            });
          } catch (error) {
            results.errorCount++;
            results.success = false;
            routeResults.push({
              route,
              exists: false,
              error: error instanceof Error ? error.message : String(error)
            });
          }
        }
        
        results.routeResults = routeResults;
      }
      
      // Audit components if requested
      if (options.checkComponents) {
        const components = await this.getComponents();
        const componentResults = [];
        
        for (const component of components) {
          try {
            const exists = await checkComponentExists(component);
            if (!exists) {
              results.errorCount++;
              results.success = false;
            }
            componentResults.push({
              componentName: component,
              exists
            });
          } catch (error) {
            results.errorCount++;
            results.success = false;
            componentResults.push({
              componentName: component,
              exists: false,
              error: error instanceof Error ? error.message : String(error)
            });
          }
        }
        
        results.componentResults = componentResults;
      }
      
      // Log audit completion if requested
      if (options.logErrors) {
        const { data: user } = await supabase.auth.getUser();
        if (user?.user?.id) {
          await logAuditCompletion(
            user.user.id,
            results.success,
            results.errorCount,
            {
              routeResults: results.routeResults,
              componentResults: results.componentResults,
              databaseResults: results.databaseResults,
              duration: Date.now() - startTime
            }
          );
        }
      }
      
      return results;
    } catch (error) {
      console.error('Audit failed:', error);
      results.success = false;
      results.errorCount++;
      return results;
    }
  }

  private static async getRoutes(): Promise<string[]> {
    // In a real implementation, this would dynamically get routes from the app
    return [
      '/',
      '/login',
      '/dashboard',
      '/admin-dashboard',
      '/teacher-dashboard-enhanced',
      '/student-dashboard-enhanced',
      '/parent-dashboard-enhanced',
      '/onboarding/teacher',
      '/onboarding/student',
      '/onboarding/parent',
    ];
  }

  private static async getComponents(): Promise<string[]> {
    // In a real implementation, this would dynamically get components from the app
    return [
      'Layout',
      'AppShell',
      'Navbar',
      'Sidebar',
      'DashboardSelector',
      'LoginForm',
      'OnboardingFlow',
    ];
  }
}
