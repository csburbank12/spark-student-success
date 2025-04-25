
import { supabase } from '@/integrations/supabase/client';

/**
 * Execute a raw SQL query using Supabase
 * @param sql SQL query to execute
 * @returns Query result
 */
export async function executeSql(sql: string) {
  try {
    // Use a direct query with the SQL string since execute_sql function doesn't exist
    const response = await supabase
      .rpc('execute_sql', { sql_query: sql })
      .throwOnError();
      
    return response;
  } catch (error) {
    console.error('Error executing SQL:', error);
    // Return a standardized error response
    return { data: null, error };
  }
}
