
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
      // Check if table has RLS enabled using direct SQL query
      const { data: rlsStatus, error: rlsError } = await supabase.sql(`
        SELECT relrowsecurity
        FROM pg_class
        WHERE relname = '${tableName}'
        AND relnamespace = (SELECT oid FROM pg_namespace WHERE nspname = 'public')
        LIMIT 1
      `);
      
      if (rlsError) throw rlsError;
      
      // Check for policies using direct SQL query
      const { data: policies, error: policiesError } = await supabase.sql(`
        SELECT polname as name, polcmd as operation
        FROM pg_policy
        WHERE relname = '${tableName}'
        AND polnamespace = (SELECT oid FROM pg_namespace WHERE nspname = 'public')
      `);
      
      if (policiesError) throw policiesError;
      
      const hasRLS = rlsStatus && rlsStatus.length > 0 ? !!rlsStatus[0].relrowsecurity : false;
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
