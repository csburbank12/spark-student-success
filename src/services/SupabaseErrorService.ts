
import { PostgrestError } from '@supabase/supabase-js';
import { ErrorLoggingService, ProfileType } from '@/hooks/useErrorLogging';
import { callSecureFunction } from '@/utils/supabaseSecurityUtils';

/**
 * Service to handle Supabase error reporting and analysis
 */
export class SupabaseErrorService {
  /**
   * Logs a Supabase error with contextual information
   * @param error - The PostgrestError from Supabase
   * @param action - Description of the action being performed
   * @param profileType - Type of user profile experiencing the error
   */
  static async logSupabaseError(
    error: PostgrestError,
    action: string,
    profileType: ProfileType
  ) {
    await ErrorLoggingService.logError({
      action,
      error_message: `${error.message} (Code: ${error.code})`,
      profile_type: profileType,
      status_code: `${error.code}`
    });
  }

  /**
   * Checks for potential RLS policy issues
   * @param tableName - Name of the table to check
   * @returns Object containing any detected RLS policy issues
   */
  static async checkRLSPolicyIssues(tableName: string) {
    try {
      // Use secure function calling
      const rlsStatus = await callSecureFunction('check_rls_enabled', {
        p_table_name: tableName
      });
      
      // Check for policies using secure function
      const policies = await callSecureFunction('get_table_policies', {
        p_table_name: tableName
      });
      
      const hasRLS = rlsStatus ? true : false;
      const policiesArray = Array.isArray(policies) ? policies : [];
      
      return {
        hasRLS,
        policies: policiesArray,
        missingCrudPolicies: this.detectMissingCrudPolicies(policiesArray)
      };
    } catch (error) {
      console.error('Error checking RLS policy issues:', error);
      return { error };
    }
  }
  
  /**
   * Analyzes which CRUD policies might be missing from a table
   * @private
   * @param policies - Array of existing policies
   * @returns Object indicating which CRUD operations might be missing policies
   */
  private static detectMissingCrudPolicies(policies: any[]) {
    const operations = ['SELECT', 'INSERT', 'UPDATE', 'DELETE'];
    const existingOps = Array.isArray(policies) ? 
      policies.map(p => (p.operation || p.cmd || '').toString().toUpperCase()) : [];
    
    return operations.reduce<Record<string, boolean>>((missing, op) => {
      missing[op.toLowerCase()] = !existingOps.includes(op);
      return missing;
    }, {} as Record<string, boolean>);
  }
}
