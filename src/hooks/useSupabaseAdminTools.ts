
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
      // Use direct SQL query for now since the list_tables function may not exist yet
      const { data, error } = await supabase.rpc('list_tables');
      
      if (error) {
        console.error('Error fetching tables:', error);
        throw error;
      }
      
      // Handle potential format differences
      if (Array.isArray(data)) {
        setTables(data.map(item => typeof item === 'string' ? item : item.table_name || ''));
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
        .rpc('get_table_columns', { p_table_name: tableName });
      
      if (columnsError) {
        console.error(`Error fetching columns for table ${tableName}:`, columnsError);
        throw columnsError;
      }
      
      const { data: constraints, error: constraintsError } = await supabase
        .rpc('get_table_constraints', { p_table_name: tableName });
      
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
      const { data, error } = await supabase.rpc('run_db_health_check');
      if (error) {
        console.error('Error fetching database health:', error);
        throw error;
      }
      setHealthData(data);
      return data;
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
