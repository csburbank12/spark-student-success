
import { supabase } from '@/integrations/supabase/client';

/**
 * Service to handle database migration operations
 */
export class DatabaseMigrationService {
  /**
   * Executes a migration script safely
   * @param migrationName - Name of the migration for tracking
   * @param sqlScript - SQL script to execute
   * @returns Result of the migration execution
   */
  static async executeTransaction(migrationName: string, sqlScript: string) {
    try {
      // First check if the migration has already been applied by querying directly
      const { data: existingMigrations, error: checkError } = await supabase
        .from('error_logs')  // Using error_logs as a temporary tracking mechanism
        .select('*')
        .eq('action', `migration:${migrationName}`)
        .maybeSingle();
      
      if (checkError && checkError.code !== 'PGRST116') {
        // Error other than "no rows returned"
        throw checkError;
      }
      
      if (existingMigrations) {
        return { 
          success: true, 
          message: `Migration "${migrationName}" already applied`,
          alreadyApplied: true
        };
      }
      
      // Execute the migration using raw SQL
      // Note: We're using raw queries instead of RPC since function might not exist yet
      const { data, error } = await supabase
        .rpc('execute_sql', {
          sql_query: sqlScript
        })
        .single();
      
      if (error) {
        // If function doesn't exist, use direct query instead
        const { error: rawError } = await supabase.sql(sqlScript);
        if (rawError) throw rawError;
      }
      
      // Record the successful migration in error_logs temporarily
      await supabase
        .from('error_logs')
        .insert({
          action: `migration:${migrationName}`,
          error_message: `Applied ${migrationName} migration`,
          profile_type: 'system',
          resolved: true
        });
      
      return { 
        success: true, 
        message: `Migration "${migrationName}" successfully applied`,
        details: data
      };
    } catch (error) {
      console.error(`Migration "${migrationName}" failed:`, error);
      return {
        success: false,
        message: `Migration "${migrationName}" failed: ${error instanceof Error ? error.message : String(error)}`,
        error
      };
    }
  }
  
  /**
   * Gets migration history
   * @returns List of applied migrations
   */
  static async getMigrationHistory() {
    try {
      // Use error_logs as temporary migration history
      const { data, error } = await supabase
        .from('error_logs')
        .select('*')
        .filter('action', 'like', 'migration:%')
        .order('timestamp', { ascending: false });
      
      if (error) throw error;
      
      // Transform the data to match expected migration history format
      return data ? data.map(log => ({
        id: log.id,
        name: log.action.replace('migration:', ''),
        description: log.error_message,
        applied_at: log.timestamp
      })) : [];
    } catch (error) {
      console.error('Error fetching migration history:', error);
      return [];
    }
  }
}
