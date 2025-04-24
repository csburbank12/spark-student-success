
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
          variant: "destructive"
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
      // Use direct SQL query approach instead of RPC
      // Get tables first
      const { data: allTables, error: tablesError } = await supabase
        .from('information_schema.tables')
        .select('table_name')
        .eq('table_schema', 'public');
      
      if (tablesError) {
        throw tablesError;
      }
      
      // Perform a simple health check and compile the results
      const tableNames = allTables?.map(t => t.table_name) || [];
      const healthData = {
        check_time: new Date().toISOString(),
        tables: tableNames,
        tables_without_timestamps: [],
        tables_without_primary_keys: [],
        rls_status: {}
      };
      
      // Check tables for timestamps
      for (const tableName of tableNames) {
        const { data: columns, error: columnsError } = await supabase
          .from('information_schema.columns')
          .select('column_name')
          .eq('table_schema', 'public')
          .eq('table_name', tableName);
          
        if (!columnsError && columns) {
          const columnNames = columns.map(c => c.column_name);
          const hasCreatedAt = columnNames.includes('created_at');
          const hasUpdatedAt = columnNames.includes('updated_at');
          
          if (!hasCreatedAt || !hasUpdatedAt) {
            healthData.tables_without_timestamps.push(tableName);
          }
          
          // Check for primary keys
          const { data: primaryKeys, error: pkError } = await supabase
            .from('information_schema.table_constraints')
            .select('constraint_name')
            .eq('table_schema', 'public')
            .eq('table_name', tableName)
            .eq('constraint_type', 'PRIMARY KEY')
            .maybeSingle();
            
          if (!pkError && !primaryKeys) {
            healthData.tables_without_primary_keys.push(tableName);
          }
          
          // Check RLS status
          try {
            const rlsCheck = await supabase
              .from('pg_class')
              .select('relrowsecurity')
              .eq('relname', tableName)
              .eq('relnamespace', 'public'::any)
              .maybeSingle();
              
            if (!rlsCheck.error) {
              (healthData.rls_status as any)[tableName] = !!rlsCheck.data?.relrowsecurity;
            }
          } catch (e) {
            console.error(`Error checking RLS for ${tableName}:`, e);
          }
        }
      }
      
      return healthData;
    } catch (error) {
      console.error('Error fetching database health:', error);
      toast({
        title: "Database Health Check Failed",
        description: error instanceof Error ? error.message : String(error),
        variant: "destructive"
      });
      
      // Return fallback data
      return {
        check_time: new Date().toISOString(),
        tables: [],
        tables_without_timestamps: [],
        tables_without_primary_keys: [],
        rls_status: {},
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
