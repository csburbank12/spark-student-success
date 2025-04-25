
import { supabase } from '@/lib/supabase';
import { ErrorLoggingService } from './ErrorLoggingService';
import { AuditOptions, AuditResult } from './audit/types';
import { RouteAuditService } from './audit/RouteAuditService';
import { ComponentAuditService } from './audit/ComponentAuditService';
import { logAuditCompletion } from './audit/auditUtils';
import type { ProfileType } from '@/services/ErrorLoggingService';

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

      const currentRole = userData?.role as string;
      const currentRoleAsProfileType = currentRole.toLowerCase() as ProfileType;

      // Perform route audits if requested
      if (checkRoutes) {
        const routeResults = await RouteAuditService.auditRoutes(
          currentRole,
          logErrors,
          currentUserOnly,
          currentRoleAsProfileType
        );
        auditResult.details.routeChecks = routeResults;
        auditResult.totalChecked += routeResults.length;
        auditResult.errorCount += routeResults.filter(r => r.status === 'error').length;
      }

      // Perform component audits if requested
      if (checkComponents) {
        const componentResults = await ComponentAuditService.auditComponents(
          logErrors,
          currentRoleAsProfileType
        );
        auditResult.details.componentChecks = componentResults;
        auditResult.totalChecked += componentResults.length;
        auditResult.errorCount += componentResults.filter(c => c.status === 'error').length;
      }

      // Log audit completion
      await logAuditCompletion(
        user.id,
        auditResult.success,
        auditResult.errorCount,
        auditResult.details
      );

      return auditResult;

    } catch (error) {
      console.error('Audit failed:', error);
      auditResult.success = false;
      auditResult.errorCount++;
      
      await ErrorLoggingService.logError({
        action: 'platform_audit',
        error_message: error instanceof Error 
          ? error.message 
          : 'Unknown error during platform audit',
        profile_type: 'system'
      });
      
      return auditResult;

    } finally {
      this.isAuditInProgress = false;
    }
  }
}
