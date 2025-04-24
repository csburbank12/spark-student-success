
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
      const { data: rlsStatus, error: rlsError } = await supabase
        .from('information_schema.tables')
        .select('relrowsecurity')
        .eq('table_name', tableName)
        .eq('table_schema', 'public')
        .maybeSingle();
      
      if (rlsError) throw rlsError;
      
      // Check for policies using direct SQL query
      const { data: policies, error: policiesError } = await supabase
        .from('pg_policies')
        .select('*')
        .eq('tablename', tableName)
        .eq('schemaname', 'public');
      
      if (policiesError) throw policiesError;
      
      return {
        hasRLS: rlsStatus?.relrowsecurity || false,
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
    const existingOps = Array.isArray(policies) ? 
      policies.map(p => p.cmd?.toUpperCase?.() || p.operation?.toUpperCase?.()) : [];
    
    return operations.reduce((missing, op) => {
      missing[op.toLowerCase()] = !existingOps.includes(op);
      return missing;
    }, {} as Record<string, boolean>);
  }
}
