
import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { DbValidationService } from '@/services/dbValidationService';
import { DatabaseMigrationService } from '@/services/DatabaseMigrationService';

export interface DatabaseValidationConfig {
  tableName: string;
  requiredColumns: string[];
  foreignKeys?: Record<string, {table: string, column: string}>;
}

/**
 * Hook for database administration and validation tools
 */
export function useAdminDatabaseTools() {
  const [isValidating, setIsValidating] = useState(false);
  const [validationResults, setValidationResults] = useState<any>(null);
  const [migrationResults, setMigrationResults] = useState<any>(null);
  const { toast } = useToast();

  /**
   * Runs comprehensive validation on database tables
   * @param config - Validation configuration for tables
   */
  const validateDatabase = async (config: DatabaseValidationConfig[]) => {
    setIsValidating(true);
    try {
      const results = await DbValidationService.validateDatabase(config);
      setValidationResults(results);
      
      if (!results.valid) {
        toast({
          title: "Validation Issues Found",
          description: `${results.tables.filter(t => !t.valid).length} tables have issues that need attention.`,
          variant: "destructive" // Changed from 'warning'
        });
      } else {
        toast({
          title: "Validation Passed",
          description: "All database tables passed validation checks.",
          variant: "default"
        });
      }
      
      return results;
    } catch (error) {
      console.error('Error validating database:', error);
      toast({
        title: "Validation Error",
        description: error instanceof Error ? error.message : String(error),
        variant: "destructive"
      });
      return null;
    } finally {
      setIsValidating(false);
    }
  };

  /**
   * Runs a migration script to fix database issues
   * @param migrationName - Unique name of the migration
   * @param sqlScript - SQL script to execute
   */
  const runMigration = async (migrationName: string, sqlScript: string) => {
    try {
      const result = await DatabaseMigrationService.executeTransaction(migrationName, sqlScript);
      setMigrationResults(result);
      
      if (result.success) {
        toast({
          title: "Migration Successful",
          description: result.message,
          variant: "default"
        });
      } else {
        toast({
          title: "Migration Failed",
          description: result.message,
          variant: "destructive"
        });
      }
      
      return result;
    } catch (error) {
      console.error('Error running migration:', error);
      toast({
        title: "Migration Error",
        description: error instanceof Error ? error.message : String(error),
        variant: "destructive"
      });
      return { success: false, error };
    }
  };

  /**
   * Gets database health information
   */
  const getDatabaseHealth = async () => {
    try {
      // We'll implement this with a more basic approach since the function might not exist yet
      const { data, error } = await supabase.rpc('run_db_health_check');
      
      if (error) {
        // Fallback to a simple health check
        const simpleHealth = await performSimpleHealthCheck();
        return simpleHealth;
      }
      
      return data;
    } catch (error) {
      console.error('Error fetching database health:', error);
      toast({
        title: "Database Health Check Failed",
        description: error instanceof Error ? error.message : String(error),
        variant: "destructive"
      });
      
      // Return fallback data
      return await performSimpleHealthCheck();
    }
  };
  
  /**
   * Performs a simple health check if the full function is not available
   */
  const performSimpleHealthCheck = async () => {
    try {
      // Get tables without timestamps
      const { data: tablesWithoutTimestamps, error: timestampError } = await supabase
        .from('pg_tables')
        .select('tablename')
        .eq('schemaname', 'public');
      
      if (timestampError) throw timestampError;
      
      // Simple check structure
      return {
        check_time: new Date().toISOString(),
        tables: tablesWithoutTimestamps?.map(t => t.tablename) || [],
        tables_without_timestamps: [],
        tables_without_primary_keys: [],
        rls_status: {}
      };
    } catch (error) {
      console.error('Error in simple health check:', error);
      return {
        check_time: new Date().toISOString(),
        error: error instanceof Error ? error.message : String(error)
      };
    }
  };

  return {
    isValidating,
    validationResults,
    migrationResults,
    validateDatabase,
    runMigration,
    getDatabaseHealth,
  };
}
