
// Database Helper Edge Function
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

// Setup CORS headers
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Get the authorization header
    const authHeader = req.headers.get('Authorization');
    if (!authHeader) {
      throw new Error('Missing authorization header');
    }

    const supabaseClient = createClient(
      // Supabase API URL - env var exported by default when deployed.
      Deno.env.get('SUPABASE_URL') ?? '',
      // Supabase API ANON KEY - env var exported by default when deployed.
      Deno.env.get('SUPABASE_ANON_KEY') ?? '',
      // Create client with Auth header from the request
      { global: { headers: { Authorization: authHeader } } }
    );

    const { action, params } = await req.json();

    let result;
    switch (action) {
      case 'check_rls_enabled':
        // Check if a table has RLS enabled
        const { tableName } = params;
        const { data: rlsData, error: rlsError } = await supabaseClient
          .rpc('check_rls_enabled', { p_table_name: tableName });
        if (rlsError) throw rlsError;
        result = { isEnabled: rlsData };
        break;

      case 'table_structure_validation':
        // Validate table structure
        const { table, requiredColumns } = params;
        const { data: columnsData, error: columnsError } = await supabaseClient
          .rpc('get_table_columns', { p_table_name: table });
        if (columnsError) throw columnsError;

        const columnNames = columnsData.map(col => col.column_name);
        const missingColumns = requiredColumns.filter(col => !columnNames.includes(col));
        const hasPrimaryKey = columnsData.some(col => col.is_primary_key);
        const hasTimestamps = columnNames.includes('created_at') && columnNames.includes('updated_at');

        result = {
          valid: missingColumns.length === 0 && hasPrimaryKey,
          missingColumns,
          hasPrimaryKey,
          hasTimestamps
        };
        break;

      case 'run_db_health_check':
        // Run database health checks
        const { data: healthData, error: healthError } = await supabaseClient
          .rpc('run_db_health_check');
        if (healthError) throw healthError;
        result = healthData;
        break;

      default:
        throw new Error(`Unknown action: ${action}`);
    }

    return new Response(
      JSON.stringify({ success: true, data: result }),
      { headers: { 'Content-Type': 'application/json', ...corsHeaders } }
    );
  } catch (error) {
    console.error('Error in database-helper function:', error);
    return new Response(
      JSON.stringify({ 
        success: false, 
        error: error instanceof Error ? error.message : String(error)
      }),
      { 
        status: 400, 
        headers: { 'Content-Type': 'application/json', ...corsHeaders } 
      }
    );
  }
});
