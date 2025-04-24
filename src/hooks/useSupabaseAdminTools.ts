
import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { SupabaseErrorService } from '@/services/SupabaseErrorService';
import { DatabaseMigrationService } from '@/services/DatabaseMigrationService';

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
      // Use SQL query instead of RPC
      const { data, error } = await supabase
        .from('information_schema.tables')
        .select('table_name')
        .eq('table_schema', 'public')
        .order('table_name', { ascending: true });
      
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
      // Direct query approach since functions might not exist yet
      const { data: columns, error: columnsError } = await supabase
        .from('information_schema.columns')
        .select('column_name, data_type, is_nullable, column_default')
        .eq('table_schema', 'public')
        .eq('table_name', tableName);
      
      if (columnsError) {
        console.error(`Error fetching columns for table ${tableName}:`, columnsError);
        throw columnsError;
      }
      
      const { data: constraints, error: constraintsError } = await supabase
        .from('information_schema.table_constraints')
        .select('constraint_name, constraint_type')
        .eq('table_schema', 'public')
        .eq('table_name', tableName);
      
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
      // Use SQL query directly instead of RPC
      const { data: tables, error: tablesError } = await supabase
        .from('information_schema.tables')
        .select('table_name')
        .eq('table_schema', 'public');

      if (tablesError) {
        throw tablesError;
      }

      // Get tables without timestamps
      const { data: tablesWithoutTimestamps, error: timestampError } = await supabase
        .from('information_schema.columns')
        .select('table_name')
        .eq('table_schema', 'public')
        .eq('column_name', 'created_at');

      if (timestampError) {
        throw timestampError;
      }

      // Get RLS status for tables
      const rlsStatus: Record<string, boolean> = {};
      if (tables) {
        for (const table of tables) {
          const tableName = table.table_name;
          const rlsCheck = await SupabaseErrorService.checkRLSPolicyIssues(tableName);
          rlsStatus[tableName] = rlsCheck.hasRLS;
        }
      }

      const healthData = {
        check_time: new Date().toISOString(),
        tables: tables?.map(t => t.table_name) || [],
        tables_without_timestamps: tables?.filter(t => 
          !tablesWithoutTimestamps?.some(wt => wt.table_name === t.table_name)
        ).map(t => t.table_name) || [],
        tables_without_primary_keys: [],
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
