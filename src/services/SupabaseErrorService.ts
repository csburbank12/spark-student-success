
import { PostgrestError } from '@supabase/supabase-js';
import { ErrorLoggingService, ProfileType } from '@/hooks/useErrorLogging';
import { supabase } from '@/integrations/supabase/client';

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
      // Check if table has RLS enabled
      const { data: rlsStatus, error: rlsError } = await supabase
        .rpc('get_table_rls_status', { p_table_name: tableName });
      
      if (rlsError) throw rlsError;
      
      // Check for missing policies
      const { data: policies, error: policiesError } = await supabase
        .rpc('get_table_policies', { p_table_name: tableName });
        
      if (policiesError) throw policiesError;
      
      return {
        hasRLS: rlsStatus?.rls_enabled || false,
        policies: policies || [],
        missingCrudPolicies: this.detectMissingCrudPolicies(policies || [])
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
    const existingOps = policies.map(p => p.operation);
    
    return operations.reduce((missing, op) => {
      missing[op.toLowerCase()] = !existingOps.includes(op);
      return missing;
    }, {} as Record<string, boolean>);
  }
}
