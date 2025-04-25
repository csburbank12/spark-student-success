
import { CRITICAL_COMPONENTS } from './auditConstants';
import { checkComponentExists } from './auditUtils';
import { ComponentCheckResult } from './types';
import { ErrorLoggingService } from '@/services/ErrorLoggingService';
import type { ProfileType } from '@/services/ErrorLoggingService';

export class ComponentAuditService {
  static async auditComponents(logErrors: boolean, userProfileType: ProfileType): Promise<ComponentCheckResult[]> {
    const results: ComponentCheckResult[] = [];

    for (const component of CRITICAL_COMPONENTS) {
      try {
        const componentExists = await checkComponentExists(component);
        if (componentExists) {
          results.push({
            component,
            location: 'global',
            status: 'success'
          });
        } else {
          results.push({
            component,
            location: 'global',
            status: 'error',
            errorType: 'not_found',
            message: `Component '${component}' not found`
          });
          
          if (logErrors) {
            await ErrorLoggingService.logError({
              action: 'audit_component_check',
              error_message: `Component not found: ${component}`,
              profile_type: userProfileType
            });
          }
        }
      } catch (error) {
        results.push({
          component,
          location: 'global',
          status: 'error',
          errorType: 'check_failed',
          message: error instanceof Error ? error.message : 'Unknown error'
        });
      }
    }

    return results;
  }
}
