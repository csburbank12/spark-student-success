
import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { SupabaseErrorService } from '@/services/SupabaseErrorService';
import { DatabaseMigrationService } from '@/services/DatabaseMigrationService';
import { executeSql } from '@/utils/supabaseUtils';

/**
 * Hook providing administrative tools for Supabase management
 */
export function useSupabaseAdminTools() {
  const [isLoading, setIsLoading] = useState(false);
  const [tables, setTables] = useState<string[]>([]);
  const [tableDetails, setTableDetails] = useState<Record<string, any>>({});
  const [rlsIssues, setRlsIssues] = useState<Record<string, any>>({});
  const [healthData, setHealthData] = useState<Record<string, any> | null>(null);
  const { toast } = useToast();

  /**
   * Fetches the list of tables in the public schema
   */
  const fetchTablesList = async () => {
    setIsLoading(true);
    try {
      // Use SQL query instead of type-checked builder
      const { data, error } = await executeSql(`
        SELECT table_name 
        FROM information_schema.tables 
        WHERE table_schema = 'public' 
        ORDER BY table_name ASC
      `);
      
      if (error) {
        console.error('Error fetching tables:', error);
        throw error;
      }
      
      // Extract table names from the response
      if (Array.isArray(data)) {
        const tableNames = data.map(item => item.table_name || '');
        setTables(tableNames);
      } else {
        setTables([]);
      }
    } catch (error) {
      console.error('Error fetching tables:', error);
      toast({
        title: "Error",
        description: "Could not fetch database tables. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Fetches details about a specific table
   * @param tableName - Name of the table to fetch details for
   */
  const fetchTableDetails = async (tableName: string) => {
    setIsLoading(true);
    try {
      // Use direct SQL queries
      const { data: columns, error: columnsError } = await executeSql(`
        SELECT column_name, data_type, is_nullable, column_default
        FROM information_schema.columns
        WHERE table_schema = 'public'
        AND table_name = '${tableName}'
      `);
      
      if (columnsError) {
        console.error(`Error fetching columns for table ${tableName}:`, columnsError);
        throw columnsError;
      }
      
      const { data: constraints, error: constraintsError } = await executeSql(`
        SELECT constraint_name, constraint_type
        FROM information_schema.table_constraints
        WHERE table_schema = 'public'
        AND table_name = '${tableName}'
      `);
      
      if (constraintsError) {
        console.error(`Error fetching constraints for table ${tableName}:`, constraintsError);
        throw constraintsError;
      }
      
      const rlsCheck = await SupabaseErrorService.checkRLSPolicyIssues(tableName);
      
      setTableDetails(prev => ({
        ...prev,
        [tableName]: {
          columns: columns || [],
          constraints: constraints || []
        }
      }));
      
      setRlsIssues(prev => ({
        ...prev,
        [tableName]: rlsCheck
      }));
    } catch (error) {
      console.error(`Error fetching details for table ${tableName}:`, error);
      toast({
        title: "Error",
        description: `Could not fetch details for table ${tableName}.`,
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Gets database health information
   */
  const getDatabaseHealth = async () => {
    try {
      // Use SQL query directly
      const { data: tables, error: tablesError } = await executeSql(`
        SELECT table_name
        FROM information_schema.tables
        WHERE table_schema = 'public'
      `);

      if (tablesError) {
        throw tablesError;
      }

      // Get tables without timestamps
      const { data: tablesWithTimestamps, error: timestampError } = await executeSql(`
        SELECT DISTINCT table_name
        FROM information_schema.columns
        WHERE table_schema = 'public'
        AND column_name = 'created_at'
      `);

      if (timestampError) {
        throw timestampError;
      }

      // Get tables without primary keys
      const { data: tablesWithPK, error: pkError } = await executeSql(`
        SELECT DISTINCT table_name
        FROM information_schema.table_constraints
        WHERE table_schema = 'public'
        AND constraint_type = 'PRIMARY KEY'
      `);

      if (pkError) {
        throw pkError;
      }

      // RLS status requires checking each table
      const rlsStatus: Record<string, boolean> = {};
      if (tables) {
        for (const table of tables) {
          const tableName = table.table_name;
          const { data: rlsData, error: rlsError } = await executeSql(`
            SELECT relrowsecurity
            FROM pg_class
            WHERE relname = '${tableName}'
            AND relnamespace = (SELECT oid FROM pg_namespace WHERE nspname = 'public')
            LIMIT 1
          `);
          
          if (!rlsError && rlsData && rlsData.length > 0) {
            rlsStatus[tableName] = !!rlsData[0].relrowsecurity;
          } else {
            rlsStatus[tableName] = false;
          }
        }
      }

      // Build the health data object
      const tableNames = tables?.map((t: any) => t.table_name) || [];
      const tablesWithTimestampNames = tablesWithTimestamps?.map((t: any) => t.table_name) || [];
      const tablesWithPKNames = tablesWithPK?.map((t: any) => t.table_name) || [];
      
      const tablesWithoutTimestamps = tableNames.filter(name => !tablesWithTimestampNames.includes(name));
      const tablesWithoutPK = tableNames.filter(name => !tablesWithPKNames.includes(name));

      const healthData = {
        check_time: new Date().toISOString(),
        tables: tableNames,
        tables_without_timestamps: tablesWithoutTimestamps,
        tables_without_primary_keys: tablesWithoutPK,
        rls_status: rlsStatus
      };

      setHealthData(healthData);
      return healthData;
    } catch (error) {
      console.error('Error fetching database health:', error);
      toast({
        title: "Database Health Check Failed",
        description: error instanceof Error ? error.message : String(error),
        variant: "destructive"
      });
      return null;
    }
  };

  /**
   * Runs a database migration script
   * @param migrationName - Name of the migration
   * @param sqlScript - SQL script to execute
   */
  const runMigration = async (migrationName: string, sqlScript: string) => {
    setIsLoading(true);
    try {
      const result = await DatabaseMigrationService.executeTransaction(migrationName, sqlScript);
      
      if (!result.success) throw new Error(result.message);
      
      toast({
        title: "Success",
        description: result.message,
        variant: "default"
      });
      
      return result;
    } catch (error) {
      console.error('Migration failed:', error);
      toast({
        title: "Migration Failed",
        description: error instanceof Error ? error.message : String(error),
        variant: "destructive"
      });
      return { success: false, error };
    } finally {
      setIsLoading(false);
    }
  };

  return {
    isLoading,
    tables,
    tableDetails,
    rlsIssues,
    healthData,
    fetchTablesList,
    fetchTableDetails,
    getDatabaseHealth,
    runMigration
  };
}
