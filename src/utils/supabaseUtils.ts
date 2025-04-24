
import { supabase } from '@/integrations/supabase/client';

/**
 * Utility function for executing SQL queries that's compatible with TypeScript
 * @param query SQL query string
 * @returns Result of the query
 */
export async function executeSql(query: string) {
  // Use any to bypass TypeScript's type checking as the .sql() method exists but isn't in type definitions
  return (supabase as any).sql(query);
}
