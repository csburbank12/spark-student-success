
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
      // Use direct SQL query instead of typed query builder
      const { data: tablesResult, error: tablesError } = await supabase
        .from('error_logs') // Using error_logs as a base table just to run SQL
        .select('*')
        .limit(1)
        .then(() => 
          // This runs after the first query to ensure a connection is active
          supabase.rpc('stored_procedure_dummy_call', {}, { 
            head: false,
            count: 'exact',
          }).catch(() => {
            // If RPC fails (which it will since it doesn't exist), run SQL directly
            return supabase.sql(`
              SELECT table_name 
              FROM information_schema.tables 
              WHERE table_schema = 'public'
            `)
          })
        );
      
      if (tablesError) {
        throw tablesError;
      }
      
      // Extract table names
      const tableNames = tablesResult?.map(row => row.table_name) || [];
      
      // Initialize health data structure
      const healthData: {
        check_time: string;
        tables: string[];
        tables_without_timestamps: string[];
        tables_without_primary_keys: string[];
        rls_status: Record<string, boolean>;
        [key: string]: any;
      } = {
        check_time: new Date().toISOString(),
        tables: tableNames,
        tables_without_timestamps: [],
        tables_without_primary_keys: [],
        rls_status: {}
      };

      // Check tables for timestamps and primary keys
      for (const tableName of tableNames) {
        // Use a direct SQL query for columns
        const { data: columnsData, error: columnsError } = await supabase.sql(`
          SELECT column_name 
          FROM information_schema.columns 
          WHERE table_schema = 'public' AND table_name = '${tableName}'
        `);
          
        if (columnsError) {
          console.error(`Error fetching columns for table ${tableName}:`, columnsError);
          continue;
        }
          
        if (columnsData) {
          const columnNames = columnsData.map((c: any) => c.column_name);
          const hasCreatedAt = columnNames.includes('created_at');
          const hasUpdatedAt = columnNames.includes('updated_at');
          
          if (!hasCreatedAt || !hasUpdatedAt) {
            (healthData.tables_without_timestamps as string[]).push(tableName);
          }
          
          // Check for primary keys using direct SQL
          const { data: pkData, error: pkError } = await supabase.sql(`
            SELECT constraint_name 
            FROM information_schema.table_constraints 
            WHERE table_schema = 'public' 
            AND table_name = '${tableName}' 
            AND constraint_type = 'PRIMARY KEY'
            LIMIT 1
          `);
            
          if (pkError) {
            console.error(`Error checking primary key for table ${tableName}:`, pkError);
            continue;
          }
          
          if (!pkData || pkData.length === 0) {
            (healthData.tables_without_primary_keys as string[]).push(tableName);
          }
          
          // Check RLS status using direct SQL
          try {
            const { data: rlsData, error: rlsError } = await supabase.sql(`
              SELECT relrowsecurity 
              FROM pg_class 
              WHERE relname = '${tableName}' 
              AND relnamespace = (SELECT oid FROM pg_namespace WHERE nspname = 'public')
              LIMIT 1
            `);
              
            if (!rlsError && rlsData && rlsData.length > 0) {
              healthData.rls_status[tableName] = !!rlsData[0].relrowsecurity;
            } else {
              healthData.rls_status[tableName] = false;
            }
          } catch (e) {
            console.error(`Error checking RLS for ${tableName}:`, e);
            healthData.rls_status[tableName] = false;
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
