
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
      // First check if the migration has already been applied
      const { data: existingMigration, error: checkError } = await supabase
        .from('migration_history')
        .select('*')
        .eq('name', migrationName)
        .single();
      
      if (checkError && checkError.code !== 'PGRST116') {
        // Error other than "no rows returned"
        throw checkError;
      }
      
      if (existingMigration) {
        return { 
          success: true, 
          message: `Migration "${migrationName}" already applied on ${existingMigration.applied_at}`,
          alreadyApplied: true
        };
      }
      
      // Execute the migration
      const { data, error } = await supabase.rpc('execute_sql_transaction', {
        p_sql: sqlScript
      });
      
      if (error) throw error;
      
      // Record the successful migration
      await supabase
        .from('migration_history')
        .insert({
          name: migrationName,
          description: `Applied ${migrationName} migration`
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
      const { data, error } = await supabase
        .from('migration_history')
        .select('*')
        .order('applied_at', { ascending: false });
      
      if (error) throw error;
      return data || [];
    } catch (error) {
      console.error('Error fetching migration history:', error);
      return [];
    }
  }
}
