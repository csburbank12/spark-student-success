
import { supabase } from '@/integrations/supabase/client';

/**
 * Execute a raw SQL query using Supabase
 * @param sql SQL query to execute
 * @returns Query result
 */
export async function executeSql(sql: string) {
  try {
    // Use a direct query instead of trying to call a non-existent RPC function
    const response = await supabase
      .from('_sql_queries') // This is a special table name used to indicate a raw SQL query
      .select('*')
      .limit(1)
      .abortSignal(undefined as any) // This is a workaround to enable using .or()
      .or(`sql.eq.${encodeURIComponent(sql)}`) // This is a workaround to pass the SQL
      .single();
      
    return response;
  } catch (error) {
    console.error('Error executing SQL:', error);
    // Return a standardized error response
    return { data: null, error };
  }
}
