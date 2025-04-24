
/**
 * This file contains SQL migrations that can be run to improve the database structure
 * These can be executed using the DatabaseMigrationService
 */

/**
 * Migration to add a basic migration history table
 */
export const createMigrationHistoryTable = `
CREATE TABLE IF NOT EXISTS migration_history (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL UNIQUE,
  description TEXT,
  applied_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS on migration_history table
ALTER TABLE migration_history ENABLE ROW LEVEL SECURITY;

-- Create policy to allow admins to see migration history
CREATE POLICY "Admins can view migration history"
  ON migration_history
  FOR SELECT
  USING (
    (SELECT role FROM user_roles WHERE user_id = auth.uid()) = 'admin'
  );
`;

/**
 * Migration to add check_rls_enabled function
 */
export const addRlsCheckFunction = `
CREATE OR REPLACE FUNCTION check_rls_enabled(p_table_name TEXT)
RETURNS BOOLEAN
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  v_result BOOLEAN;
BEGIN
  SELECT relrowsecurity INTO v_result
  FROM pg_class
  WHERE relname = p_table_name
  AND relnamespace = 'public'::regnamespace;
  
  RETURN COALESCE(v_result, FALSE);
END;
$$;
`;

/**
 * Migration to add get_table_columns function
 */
export const addGetTableColumnsFunction = `
CREATE OR REPLACE FUNCTION get_table_columns(p_table_name TEXT)
RETURNS TABLE (
  column_name TEXT,
  data_type TEXT,
  is_nullable BOOLEAN,
  column_default TEXT,
  is_primary_key BOOLEAN
)
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  RETURN QUERY
  SELECT
    c.column_name::TEXT,
    c.data_type::TEXT,
    c.is_nullable = 'YES' AS is_nullable,
    c.column_default::TEXT,
    EXISTS (
      SELECT 1
      FROM information_schema.table_constraints tc
      JOIN information_schema.constraint_column_usage ccu 
        ON tc.constraint_name = ccu.constraint_name
      WHERE tc.constraint_type = 'PRIMARY KEY'
        AND tc.table_name = c.table_name
        AND ccu.column_name = c.column_name
    ) AS is_primary_key
  FROM information_schema.columns c
  WHERE c.table_name = p_table_name
  AND c.table_schema = 'public'
  ORDER BY c.ordinal_position;
END;
$$;
`;

/**
 * Migration to add get_table_constraints function
 */
export const addGetTableConstraintsFunction = `
CREATE OR REPLACE FUNCTION get_table_constraints(p_table_name TEXT)
RETURNS TABLE (
  constraint_name TEXT,
  constraint_type TEXT,
  column_name TEXT,
  foreign_table TEXT,
  foreign_column TEXT
)
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  RETURN QUERY
  SELECT
    tc.constraint_name::TEXT,
    tc.constraint_type::TEXT,
    ccu.column_name::TEXT,
    CASE 
      WHEN tc.constraint_type = 'FOREIGN KEY' THEN 
        (SELECT kcu.table_name::TEXT FROM information_schema.constraint_column_usage kcu
         WHERE kcu.constraint_name = tc.constraint_name
         AND kcu.constraint_schema = 'public'
         AND kcu.table_schema = 'public'
         AND kcu.table_name != p_table_name
         LIMIT 1)
      ELSE NULL
    END AS foreign_table,
    CASE 
      WHEN tc.constraint_type = 'FOREIGN KEY' THEN 
        (SELECT kcu.column_name::TEXT FROM information_schema.constraint_column_usage kcu
         WHERE kcu.constraint_name = tc.constraint_name
         AND kcu.constraint_schema = 'public'
         AND kcu.table_schema = 'public'
         AND kcu.table_name != p_table_name
         LIMIT 1)
      ELSE NULL
    END AS foreign_column
  FROM information_schema.table_constraints tc
  JOIN information_schema.constraint_column_usage ccu 
    ON tc.constraint_name = ccu.constraint_name
  WHERE tc.table_name = p_table_name
  AND tc.constraint_schema = 'public'
  AND tc.table_schema = 'public'
  ORDER BY tc.constraint_name;
END;
$$;
`;

/**
 * Migration to add list_tables function
 */
export const addListTablesFunction = `
CREATE OR REPLACE FUNCTION list_tables()
RETURNS TABLE (table_name TEXT)
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  RETURN QUERY
  SELECT t.tablename::TEXT
  FROM pg_catalog.pg_tables t
  WHERE t.schemaname = 'public'
  ORDER BY t.tablename;
END;
$$;
`;

/**
 * Migration to add execute_sql_transaction function
 */
export const addExecuteSqlTransactionFunction = `
CREATE OR REPLACE FUNCTION execute_sql_transaction(p_sql TEXT)
RETURNS JSONB
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  v_start_time TIMESTAMP;
  v_end_time TIMESTAMP;
  v_result JSONB;
BEGIN
  -- Only allow admins to execute SQL
  IF NOT EXISTS (
    SELECT 1 FROM user_roles 
    WHERE user_id = auth.uid() 
    AND role = 'admin'
  ) THEN
    RAISE EXCEPTION 'Only administrators can execute SQL transactions';
  END IF;

  v_start_time := clock_timestamp();
  
  -- Execute the SQL in a transaction
  BEGIN
    EXECUTE p_sql;
    v_end_time := clock_timestamp();
    
    v_result := jsonb_build_object(
      'success', true,
      'execution_time_ms', EXTRACT(EPOCH FROM (v_end_time - v_start_time)) * 1000
    );
  EXCEPTION WHEN OTHERS THEN
    v_end_time := clock_timestamp();
    
    v_result := jsonb_build_object(
      'success', false,
      'error', SQLERRM,
      'error_detail', SQLSTATE,
      'execution_time_ms', EXTRACT(EPOCH FROM (v_end_time - v_start_time)) * 1000
    );
  END;
  
  RETURN v_result;
END;
$$;
`;

/**
 * Migration to add run_db_health_check function
 */
export const addDatabaseHealthCheckFunction = `
CREATE OR REPLACE FUNCTION run_db_health_check()
RETURNS JSONB
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  v_result JSONB;
  v_tables JSONB;
  v_missing_timestamps JSONB;
  v_missing_primary_keys JSONB;
  v_rls_status JSONB;
BEGIN
  -- Get tables without timestamps
  WITH tables_without_timestamps AS (
    SELECT t.tablename
    FROM pg_catalog.pg_tables t
    WHERE t.schemaname = 'public'
    AND NOT EXISTS (
      SELECT 1
      FROM information_schema.columns c
      WHERE c.table_schema = 'public'
      AND c.table_name = t.tablename
      AND c.column_name IN ('created_at', 'updated_at')
      HAVING COUNT(*) = 2
    )
  )
  SELECT json_agg(tablename)
  INTO v_missing_timestamps
  FROM tables_without_timestamps;
  
  -- Get tables without primary keys
  WITH tables_without_pk AS (
    SELECT t.tablename
    FROM pg_catalog.pg_tables t
    WHERE t.schemaname = 'public'
    AND NOT EXISTS (
      SELECT 1
      FROM information_schema.table_constraints tc
      WHERE tc.constraint_type = 'PRIMARY KEY'
      AND tc.table_schema = 'public'
      AND tc.table_name = t.tablename
    )
  )
  SELECT json_agg(tablename)
  INTO v_missing_primary_keys
  FROM tables_without_pk;
  
  -- Get tables without RLS
  WITH tables_rls_status AS (
    SELECT 
      c.relname AS table_name,
      c.relrowsecurity AS has_rls
    FROM pg_class c
    JOIN pg_namespace n ON n.oid = c.relnamespace
    WHERE n.nspname = 'public'
    AND c.relkind = 'r'
  )
  SELECT jsonb_object_agg(table_name, has_rls)
  INTO v_rls_status
  FROM tables_rls_status;
  
  -- Get list of all tables
  SELECT jsonb_agg(tablename)
  INTO v_tables
  FROM pg_catalog.pg_tables
  WHERE schemaname = 'public';
  
  -- Build result
  v_result := jsonb_build_object(
    'tables', v_tables,
    'tables_without_timestamps', v_missing_timestamps,
    'tables_without_primary_keys', v_missing_primary_keys,
    'rls_status', v_rls_status,
    'check_time', now()
  );
  
  RETURN v_result;
END;
$$;
`;

/**
 * Adds common missing indexes to improve performance
 */
export const addCommonIndexes = `
-- Add index on user_id columns where missing
DO $$
DECLARE
    t record;
BEGIN
    FOR t IN
        SELECT
            tc.table_name,
            kcu.column_name
        FROM 
            information_schema.tables AS tc
            JOIN information_schema.columns AS kcu
                ON tc.table_name = kcu.table_name AND tc.table_schema = kcu.table_schema
        WHERE 
            tc.table_schema = 'public'
            AND tc.table_type = 'BASE TABLE'
            AND kcu.column_name = 'user_id'
            AND NOT EXISTS (
                SELECT 1
                FROM pg_indexes
                WHERE tablename = tc.table_name
                AND indexdef LIKE '%user_id%'
            )
    LOOP
        EXECUTE format('CREATE INDEX IF NOT EXISTS idx_%I_user_id ON public.%I (user_id)', 
                       t.table_name, t.table_name);
    END LOOP;
END
$$;

-- Add index on student_id columns where missing
DO $$
DECLARE
    t record;
BEGIN
    FOR t IN
        SELECT
            tc.table_name,
            kcu.column_name
        FROM 
            information_schema.tables AS tc
            JOIN information_schema.columns AS kcu
                ON tc.table_name = kcu.table_name AND tc.table_schema = kcu.table_schema
        WHERE 
            tc.table_schema = 'public'
            AND tc.table_type = 'BASE TABLE'
            AND kcu.column_name = 'student_id'
            AND NOT EXISTS (
                SELECT 1
                FROM pg_indexes
                WHERE tablename = tc.table_name
                AND indexdef LIKE '%student_id%'
            )
    LOOP
        EXECUTE format('CREATE INDEX IF NOT EXISTS idx_%I_student_id ON public.%I (student_id)', 
                       t.table_name, t.table_name);
    END LOOP;
END
$$;

-- Add index on created_at columns where missing (for time-based queries)
DO $$
DECLARE
    t record;
BEGIN
    FOR t IN
        SELECT
            tc.table_name,
            kcu.column_name
        FROM 
            information_schema.tables AS tc
            JOIN information_schema.columns AS kcu
                ON tc.table_name = kcu.table_name AND tc.table_schema = kcu.table_schema
        WHERE 
            tc.table_schema = 'public'
            AND tc.table_type = 'BASE TABLE'
            AND kcu.column_name = 'created_at'
            AND NOT EXISTS (
                SELECT 1
                FROM pg_indexes
                WHERE tablename = tc.table_name
                AND indexdef LIKE '%created_at%'
            )
    LOOP
        EXECUTE format('CREATE INDEX IF NOT EXISTS idx_%I_created_at ON public.%I (created_at)', 
                       t.table_name, t.table_name);
    END LOOP;
END
$$;
`;

/**
 * Adds missing updated_at trigger to tables with created_at but missing updated_at
 */
export const addMissingUpdatedAtTriggers = `
-- First ensure the trigger function exists
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE 'plpgsql';

-- Add updated_at column to tables that have created_at but not updated_at
DO $$
DECLARE
    t record;
BEGIN
    FOR t IN
        SELECT table_name
        FROM information_schema.columns
        WHERE table_schema = 'public'
        AND column_name = 'created_at'
        AND table_name NOT IN (
            SELECT table_name
            FROM information_schema.columns
            WHERE table_schema = 'public'
            AND column_name = 'updated_at'
        )
    LOOP
        EXECUTE format('ALTER TABLE %I ADD COLUMN IF NOT EXISTS updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()', 
                       t.table_name);
                       
        -- Create the trigger
        EXECUTE format('DROP TRIGGER IF EXISTS set_updated_at ON %I', t.table_name);
        EXECUTE format('CREATE TRIGGER set_updated_at BEFORE UPDATE ON %I FOR EACH ROW EXECUTE FUNCTION update_updated_at_column()', 
                       t.table_name);
    END LOOP;
END
$$;
`;

/**
 * Ensures proper RLS policies exist for student data tables
 */
export const ensureStudentDataRlsPolicies = `
-- Function to check and add RLS policies if missing
DO $$
DECLARE
    t record;
BEGIN
    -- Loop through tables with student_id column
    FOR t IN
        SELECT DISTINCT table_name
        FROM information_schema.columns
        WHERE table_schema = 'public'
        AND column_name = 'student_id'
    LOOP
        -- Enable RLS if not enabled
        EXECUTE format('ALTER TABLE %I ENABLE ROW LEVEL SECURITY', t.table_name);
        
        -- Check if SELECT policy exists, if not create it
        IF NOT EXISTS (
            SELECT 1
            FROM pg_policies
            WHERE tablename = t.table_name
            AND policyname LIKE '%select%'
        ) THEN
            EXECUTE format('
                CREATE POLICY "Students can view their own data" ON %I
                FOR SELECT
                USING (auth.uid() = student_id)
            ', t.table_name);
            
            EXECUTE format('
                CREATE POLICY "Teachers can view their students data" ON %I
                FOR SELECT
                USING (
                    EXISTS (
                        SELECT 1
                        FROM user_roles
                        WHERE user_id = auth.uid()
                        AND role IN (''teacher'', ''admin'')
                    )
                )
            ', t.table_name);
        END IF;
        
        -- Check if INSERT policy exists, if not create it
        IF NOT EXISTS (
            SELECT 1
            FROM pg_policies
            WHERE tablename = t.table_name
            AND policyname LIKE '%insert%'
        ) THEN
            EXECUTE format('
                CREATE POLICY "Students can insert their own data" ON %I
                FOR INSERT
                WITH CHECK (auth.uid() = student_id)
            ', t.table_name);
            
            EXECUTE format('
                CREATE POLICY "Teachers can insert student data" ON %I
                FOR INSERT
                WITH CHECK (
                    EXISTS (
                        SELECT 1
                        FROM user_roles
                        WHERE user_id = auth.uid()
                        AND role IN (''teacher'', ''admin'')
                    )
                )
            ', t.table_name);
        END IF;
        
        -- Check if UPDATE policy exists, if not create it
        IF NOT EXISTS (
            SELECT 1
            FROM pg_policies
            WHERE tablename = t.table_name
            AND policyname LIKE '%update%'
        ) THEN
            EXECUTE format('
                CREATE POLICY "Students can update their own data" ON %I
                FOR UPDATE
                USING (auth.uid() = student_id)
            ', t.table_name);
            
            EXECUTE format('
                CREATE POLICY "Teachers can update student data" ON %I
                FOR UPDATE
                USING (
                    EXISTS (
                        SELECT 1
                        FROM user_roles
                        WHERE user_id = auth.uid()
                        AND role IN (''teacher'', ''admin'')
                    )
                )
            ', t.table_name);
        END IF;
    END LOOP;
END
$$;
`;
