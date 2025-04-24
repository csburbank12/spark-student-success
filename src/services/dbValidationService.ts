
import { supabase } from '@/integrations/supabase/client';

export interface DatabaseValidationConfig {
  tableName: string;
  requiredColumns: string[];
  foreignKeys?: Record<string, {table: string, column: string}>;
}

/**
 * Service for validating database structure and requirements
 */
export class DbValidationService {
  /**
   * Validates database structure against configuration
   * @param config - Array of validation configurations
   * @returns Validation results
   */
  static async validateDatabase(config: DatabaseValidationConfig[]) {
    try {
      const results = {
        valid: true,
        tables: [] as Array<{
          tableName: string;
          exists: boolean;
          structure: {
            valid: boolean;
            hasPrimaryKey: boolean;
            hasTimestamps: boolean;
            missingColumns: string[];
          }
        }>
      };

      for (const tableConfig of config) {
        const result = await this.validateTable(tableConfig);
        results.tables.push(result);
        
        // If any table is invalid, the entire validation is invalid
        if (!result.exists || !result.structure.valid) {
          results.valid = false;
        }
      }
      
      return results;
    } catch (error) {
      console.error('Database validation failed:', error);
      return {
        valid: false,
        error: error instanceof Error ? error.message : String(error),
        tables: []
      };
    }
  }
  
  /**
   * Validates a single database table
   * @param config - Table validation configuration
   * @returns Table validation result
   */
  private static async validateTable(config: DatabaseValidationConfig) {
    try {
      // Check if table exists using information_schema
      const { data: tableData, error: tableError } = await supabase
        .from('information_schema.tables')
        .select('table_name')
        .eq('table_schema', 'public')
        .eq('table_name', config.tableName)
        .maybeSingle();
      
      if (tableError) throw tableError;
      
      if (!tableData) {
        return {
          tableName: config.tableName,
          exists: false,
          structure: {
            valid: false,
            hasPrimaryKey: false,
            hasTimestamps: false,
            missingColumns: config.requiredColumns
          }
        };
      }
      
      // Check columns using information_schema
      const { data: columnsData, error: columnsError } = await supabase
        .from('information_schema.columns')
        .select('column_name')
        .eq('table_schema', 'public')
        .eq('table_name', config.tableName);
      
      if (columnsError) throw columnsError;
      
      const columnNames = columnsData ? columnsData.map(c => c.column_name) : [];
      const missingColumns = config.requiredColumns.filter(col => !columnNames.includes(col));
      
      // Check for primary key
      const { data: primaryKeyData, error: pkError } = await supabase
        .from('information_schema.table_constraints')
        .select('constraint_name')
        .eq('table_schema', 'public')
        .eq('table_name', config.tableName)
        .eq('constraint_type', 'PRIMARY KEY')
        .maybeSingle();
      
      if (pkError) throw pkError;
      
      // Check for timestamps
      const hasCreatedAt = columnNames.includes('created_at');
      const hasUpdatedAt = columnNames.includes('updated_at');
      
      return {
        tableName: config.tableName,
        exists: true,
        structure: {
          valid: missingColumns.length === 0,
          hasPrimaryKey: !!primaryKeyData,
          hasTimestamps: hasCreatedAt && hasUpdatedAt,
          missingColumns
        }
      };
    } catch (error) {
      console.error(`Error validating table ${config.tableName}:`, error);
      return {
        tableName: config.tableName,
        exists: false,
        error: error instanceof Error ? error.message : String(error),
        structure: {
          valid: false,
          hasPrimaryKey: false,
          hasTimestamps: false,
          missingColumns: config.requiredColumns
        }
      };
    }
  }
}
