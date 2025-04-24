
// Database Validation Edge Function
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

    // Check for admin permissions
    const {
      data: { user },
      error: userError,
    } = await supabaseClient.auth.getUser();

    if (userError) throw userError;
    
    // Make sure the user is authenticated
    if (!user) {
      throw new Error('User is not authenticated');
    }

    // Check if user has admin role
    const { data: roleData, error: roleError } = await supabaseClient
      .rpc('get_user_role', { user_uuid: user.id });

    if (roleError) throw roleError;
    if (roleData !== 'admin' && roleData !== 'teacher') {
      throw new Error('Unauthorized: Only admins and teachers can access this endpoint');
    }

    // Get validation parameters
    const { validations } = await req.json();

    // Run database validations
    const validationResults = [];
    for (const validation of validations) {
      try {
        const { tableName, requiredColumns, foreignKeys } = validation;
        
        // Check table structure
        const { data: columns, error: columnsError } = await supabaseClient
          .rpc('get_table_columns', { p_table_name: tableName });
          
        if (columnsError) throw columnsError;
        
        const columnNames = columns.map((col: any) => col.column_name);
        const missingColumns = requiredColumns.filter(
          (col: string) => !columnNames.includes(col)
        );
        
        // Check RLS
        const { data: rlsEnabled, error: rlsError } = await supabaseClient
          .rpc('check_rls_enabled', { p_table_name: tableName });
          
        if (rlsError) throw rlsError;
        
        validationResults.push({
          tableName,
          exists: true,
          structureValid: missingColumns.length === 0,
          missingColumns,
          rlsEnabled,
          foreignKeysChecked: !!foreignKeys
        });
      } catch (validationError) {
        validationResults.push({
          tableName: validation.tableName,
          exists: false,
          error: validationError instanceof Error 
            ? validationError.message 
            : String(validationError)
        });
      }
    }

    return new Response(
      JSON.stringify({ 
        success: true, 
        data: {
          validationResults,
          timestamp: new Date().toISOString(),
          valid: validationResults.every(
            (result: any) => result.exists && result.structureValid && result.rlsEnabled
          )
        } 
      }),
      { headers: { 'Content-Type': 'application/json', ...corsHeaders } }
    );
  } catch (error) {
    console.error('Error in database-validation function:', error);
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
