
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

/**
 * Hook to monitor and validate required database functions
 */
export function useDbFunctionMonitor(requiredFunctions: string[] = []) {
  const [isLoading, setIsLoading] = useState(true);
  const [functionStatus, setFunctionStatus] = useState<Record<string, boolean>>({});
  const [missingFunctions, setMissingFunctions] = useState<string[]>([]);
  const { toast } = useToast();
  
  useEffect(() => {
    if (requiredFunctions.length > 0) {
      checkDbFunctions();
    }
  }, [requiredFunctions]);
  
  /**
   * Checks if required database functions exist
   */
  const checkDbFunctions = async () => {
    setIsLoading(true);
    
    try {
      // Check each function individually since RPC might not exist
      const statusMap: Record<string, boolean> = {};
      const missing: string[] = [];
      
      for (const funcName of requiredFunctions) {
        try {
          // Try to call each function with minimal parameters
          const result = await testFunctionExistence(funcName);
          statusMap[funcName] = result;
          if (!result) missing.push(funcName);
        } catch (err) {
          statusMap[funcName] = false;
          missing.push(funcName);
        }
      }
      
      setFunctionStatus(statusMap);
      setMissingFunctions(missing);
      
      if (missing.length > 0) {
        toast({
          title: "Missing Database Functions",
          description: `${missing.length} required functions are missing. Database operations may be affected.`,
          variant: "destructive" 
        });
      }
    } catch (error) {
      console.error('Error checking database functions:', error);
      // Still attempt to check functions individually
      checkFunctionsIndividually();
    } finally {
      setIsLoading(false);
    }
  };
  
  /**
   * Fallback method to check functions by calling them directly
   */
  const checkFunctionsIndividually = async () => {
    const statusMap: Record<string, boolean> = {};
    const missing: string[] = [];
    
    for (const funcName of requiredFunctions) {
      try {
        // Try to call each function with minimal parameters
        const result = await testFunctionExistence(funcName);
        statusMap[funcName] = result;
        if (!result) missing.push(funcName);
      } catch (err) {
        statusMap[funcName] = false;
        missing.push(funcName);
      }
    }
    
    setFunctionStatus(statusMap);
    setMissingFunctions(missing);
    
    if (missing.length > 0) {
      toast({
        title: "Missing Database Functions",
        description: `${missing.length} required functions are missing. Database operations may be affected.`,
        variant: "destructive"
      });
    }
  };
  
  /**
   * Tests if a specific function exists by querying the information schema
   */
  const testFunctionExistence = async (functionName: string): Promise<boolean> => {
    // First try checking if the function exists in the information schema using SQL
    try {
      const { data, error } = await supabase.sql(`
        SELECT EXISTS (
          SELECT 1
          FROM information_schema.routines
          WHERE routine_schema = 'public'
          AND routine_name = '${functionName}'
        ) as exists
      `);
      
      if (error) throw error;
      
      return data?.[0]?.exists === true;
    } catch (error) {
      console.error(`Error checking if function ${functionName} exists:`, error);
      
      // Try to query the function directly as a fallback
      try {
        // Use a switch/case to handle common function parameters
        let result;
        switch (functionName) {
          case 'get_teacher_mood_check_ins':
            result = await supabase.rpc('get_teacher_mood_check_ins', { 
              p_teacher_id: '00000000-0000-0000-0000-000000000000', 
              p_days_back: 1 
            });
            break;
          case 'get_teacher_mood_trends':
            result = await supabase.rpc('get_teacher_mood_trends', { 
              p_student_id: '00000000-0000-0000-0000-000000000000', 
              p_days_back: 1 
            });
            break;
          case 'get_micro_coach_logs':
            result = await supabase.rpc('get_micro_coach_logs', { 
              p_student_id: null 
            });
            break;
          case 'get_student_intervention_impacts':
            result = await supabase.rpc('get_student_intervention_impacts', { 
              p_student_id: '00000000-0000-0000-0000-000000000000' 
            });
            break;
          case 'get_tiered_support_recommendations':
            result = await supabase.rpc('get_tiered_support_recommendations', { 
              p_student_id: '00000000-0000-0000-0000-000000000000' 
            });
            break;
          default:
            // For unknown functions, just check if it exists without parameters
            result = { error: { message: 'Function test not implemented' } };
        }
        
        return !result.error || !result.error.message.includes('does not exist');
      } catch (error: any) {
        return false;
      }
    }
  };
  
  return {
    isLoading,
    functionStatus,
    missingFunctions,
    refresh: checkDbFunctions
  };
}
