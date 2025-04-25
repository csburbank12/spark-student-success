
import { supabase } from '@/integrations/supabase/client';

/**
 * Execute a raw SQL query using Supabase
 * @param sql SQL query to execute
 * @returns Query result
 */
export async function executeSql(sql: string) {
  try {
    const { data, error } = await supabase
      .rpc('execute_sql_transaction', { p_sql: sql });
      
    if (error) {
      throw error;
    }
    
    return { data, error: null };
  } catch (error) {
    console.error('Error executing SQL:', error);
    return { data: null, error };
  }
}
