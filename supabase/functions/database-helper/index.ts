
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
    if (roleData !== 'admin') {
      throw new Error('Unauthorized: Only admins can access this endpoint');
    }

    // Get the query type from the request
    const { action } = await req.json();

    let result = null;
    
    // Perform the requested database operation
    switch (action) {
      case 'check_rls_status':
        // Fetch tables without RLS enabled
        const { data: tablesWithoutRls, error: rlsError } = await supabaseClient
          .rpc('check_rls_enabled_all_tables');
          
        if (rlsError) throw rlsError;
        result = { tables_without_rls: tablesWithoutRls };
        break;
        
      case 'database_health':
        // Check database health
        const { data: health, error: healthError } = await supabaseClient
          .rpc('get_database_health');
          
        if (healthError) throw healthError;
        result = health;
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
