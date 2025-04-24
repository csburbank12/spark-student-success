
import { supabase } from '@/integrations/supabase/client';
import { executeSql } from '@/utils/supabaseUtils';

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
      // Check if table exists using a direct SQL query
      const { data: tableData, error: tableError } = await executeSql(`
        SELECT EXISTS (
          SELECT 1
          FROM information_schema.tables
          WHERE table_schema = 'public'
          AND table_name = '${config.tableName}'
        ) as exists
      `);
      
      if (tableError) throw tableError;
      
      const tableExists = tableData?.[0]?.exists === true;
      
      if (!tableExists) {
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
      
      // Check columns using direct SQL
      const { data: columnsData, error: columnsError } = await executeSql(`
        SELECT column_name
        FROM information_schema.columns
        WHERE table_schema = 'public'
        AND table_name = '${config.tableName}'
      `);
      
      if (columnsError) throw columnsError;
      
      const columnNames = columnsData ? columnsData.map((c: any) => c.column_name) : [];
      const missingColumns = config.requiredColumns.filter(col => !columnNames.includes(col));
      
      // Check for primary key using direct SQL
      const { data: primaryKeyData, error: pkError } = await executeSql(`
        SELECT EXISTS (
          SELECT 1
          FROM information_schema.table_constraints
          WHERE table_schema = 'public'
          AND table_name = '${config.tableName}'
          AND constraint_type = 'PRIMARY KEY'
        ) as has_pk
      `);
      
      if (pkError) throw pkError;
      
      // Check for timestamps
      const hasCreatedAt = columnNames.includes('created_at');
      const hasUpdatedAt = columnNames.includes('updated_at');
      
      return {
        tableName: config.tableName,
        exists: true,
        structure: {
          valid: missingColumns.length === 0,
          hasPrimaryKey: primaryKeyData?.[0]?.has_pk === true,
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
