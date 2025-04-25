
import { supabase } from '@/integrations/supabase/client';

/**
 * Utility function to securely execute database functions
 * This helps ensure we're using proper security practices and Row Level Security
 * @param functionName The database function to call
 * @param params Parameters to pass to the function
 * @returns Result of the database function call
 */
export async function callSecureFunction<T = any>(
  functionName: string, 
  params: Record<string, any>
): Promise<T | null> {
  try {
    const { data, error } = await supabase.rpc(functionName, params);
    
    if (error) {
      console.error(`Error calling ${functionName}:`, error);
      throw error;
    }
    
    return data as T;
  } catch (error) {
    console.error(`Failed to call ${functionName}:`, error);
    throw error;
  }
}

/**
 * Securely verify if the current user has the specified role
 * @param role Role to check for
 * @returns Boolean indicating if user has the role
 */
export async function verifyUserRole(role: string): Promise<boolean> {
  try {
    const { data: userData } = await supabase.auth.getUser();
    
    if (!userData.user) {
      return false;
    }
    
    const { data: roleData, error } = await supabase.rpc(
      'has_role', 
      { 
        user_id: userData.user.id, 
        required_role: role 
      }
    );
    
    if (error) {
      console.error('Error verifying user role:', error);
      return false;
    }
    
    return roleData || false;
  } catch (error) {
    console.error('Failed to verify user role:', error);
    return false;
  }
}

/**
 * Check database security configuration
 * @returns Object containing security status information
 */
export async function checkDatabaseSecurity() {
  try {
    // Check for tables missing RLS
    const { data, error } = await supabase.rpc('check_rls_enabled_all_tables');
    
    if (error) {
      console.error('Error checking RLS status:', error);
      throw error;
    }
    
    return {
      rlsStatus: data,
      timestamp: new Date().toISOString()
    };
  } catch (error) {
    console.error('Failed to check database security:', error);
    throw error;
  }
}
