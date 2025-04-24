
import { supabase } from '@/integrations/supabase/client';

/**
 * Service for validating database structure and integrity
 */
export class DbValidationService {
  /**
   * Validates if a table has the expected structure
   * @param tableName - Name of the table to validate
   * @param requiredColumns - List of columns that should exist
   * @returns Validation results with any issues found
   */
  static async validateTableStructure(tableName: string, requiredColumns: string[]) {
    try {
      const { data: columns, error } = await supabase
        .rpc('get_table_columns', { p_table_name: tableName });
      
      if (error) throw error;
      
      const columnNames = columns?.map(col => col.column_name) || [];
      const missingColumns = requiredColumns.filter(col => !columnNames.includes(col));
      
      return {
        valid: missingColumns.length === 0,
        tableName,
        missingColumns,
        hasTimestamps: columnNames.includes('created_at') && columnNames.includes('updated_at'),
        hasPrimaryKey: columns?.some(col => col.is_primary_key) || false
      };
    } catch (error) {
      console.error(`Error validating table ${tableName}:`, error);
      return {
        valid: false,
        tableName,
        error: error instanceof Error ? error.message : String(error)
      };
    }
  }
  
  /**
   * Validates foreign key constraints between tables
   * @param tableName - Name of the table to validate
   * @param foreignKeyChecks - Object mapping column names to referenced tables
   * @returns Validation results with any missing foreign keys
   */
  static async validateForeignKeys(
    tableName: string, 
    foreignKeyChecks: Record<string, {table: string, column: string}>
  ) {
    try {
      const { data: constraints, error } = await supabase
        .rpc('get_table_constraints', { p_table_name: tableName });
      
      if (error) throw error;
      
      const foreignKeys = constraints?.filter(c => c.constraint_type === 'FOREIGN KEY') || [];
      const missingForeignKeys: Record<string, string> = {};
      
      for (const [column, reference] of Object.entries(foreignKeyChecks)) {
        const hasConstraint = foreignKeys.some(fk => 
          fk.column_name === column && 
          fk.foreign_table === reference.table &&
          fk.foreign_column === reference.column
        );
        
        if (!hasConstraint) {
          missingForeignKeys[column] = `${reference.table}.${reference.column}`;
        }
      }
      
      return {
        valid: Object.keys(missingForeignKeys).length === 0,
        tableName,
        missingForeignKeys
      };
    } catch (error) {
      console.error(`Error validating foreign keys for ${tableName}:`, error);
      return {
        valid: false,
        tableName,
        error: error instanceof Error ? error.message : String(error)
      };
    }
  }
  
  /**
   * Performs full database validation on multiple tables
   * @param validations - Array of validation configs for each table
   * @returns Comprehensive validation results
   */
  static async validateDatabase(validations: Array<{
    tableName: string;
    requiredColumns: string[];
    foreignKeys?: Record<string, {table: string, column: string}>;
  }>) {
    const results = [];
    
    for (const validation of validations) {
      const structureResult = await this.validateTableStructure(
        validation.tableName, 
        validation.requiredColumns
      );
      
      let foreignKeyResult = { valid: true };
      if (validation.foreignKeys) {
        foreignKeyResult = await this.validateForeignKeys(
          validation.tableName,
          validation.foreignKeys
        );
      }
      
      results.push({
        tableName: validation.tableName,
        structure: structureResult,
        foreignKeys: foreignKeyResult,
        valid: structureResult.valid && foreignKeyResult.valid
      });
    }
    
    return {
      valid: results.every(r => r.valid),
      tables: results,
      timestamp: new Date().toISOString()
    };
  }
}
