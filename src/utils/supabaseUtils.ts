
import { supabase } from '@/integrations/supabase/client';

/**
 * Execute a raw SQL query using Supabase
 * @param sql SQL query to execute
 * @returns Query result
 */
export async function executeSql(sql: string) {
  try {
    const response = await supabase.rpc('execute_sql', { sql_query: sql });
    return response;
  } catch (error) {
    console.error('Error executing SQL:', error);
    // Return a standardized error response
    return { data: null, error };
  }
}
