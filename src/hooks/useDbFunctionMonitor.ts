
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
      // Query to check if functions exist
      const { data, error } = await supabase.rpc('check_functions_exist', {
        p_function_names: requiredFunctions
      });
      
      if (error) throw error;
      
      // Process results
      const statusMap: Record<string, boolean> = {};
      const missing: string[] = [];
      
      requiredFunctions.forEach(funcName => {
        const exists = data[funcName] || false;
        statusMap[funcName] = exists;
        if (!exists) missing.push(funcName);
      });
      
      setFunctionStatus(statusMap);
      setMissingFunctions(missing);
      
      // Notify if there are missing functions
      if (missing.length > 0) {
        toast({
          title: "Missing Database Functions",
          description: `${missing.length} required functions are missing. Database operations may be affected.`,
          variant: "warning"
        });
      }
    } catch (error) {
      console.error('Error checking database functions:', error);
      // Fallback to function calls to test individually
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
        variant: "warning"
      });
    }
  };
  
  /**
   * Tests if a specific function exists by calling it
   */
  const testFunctionExistence = async (functionName: string): Promise<boolean> => {
    // This is a simplistic approach to test function existence
    try {
      let result;
      switch (functionName) {
        case 'get_teacher_mood_check_ins':
          result = await supabase.rpc(functionName, { p_student_id: '00000000-0000-0000-0000-000000000000', p_days_back: 1 });
          break;
        case 'get_teacher_mood_trends':
          result = await supabase.rpc(functionName, { p_student_id: '00000000-0000-0000-0000-000000000000', p_days_back: 1 });
          break;
        case 'get_micro_coach_logs':
          result = await supabase.rpc(functionName, { p_student_id: null });
          break;
        case 'get_student_intervention_impacts':
          result = await supabase.rpc(functionName, { p_student_id: '00000000-0000-0000-0000-000000000000' });
          break;
        case 'get_tiered_support_recommendations':
          result = await supabase.rpc(functionName, { p_student_id: '00000000-0000-0000-0000-000000000000' });
          break;
        default:
          // For other functions, we'll just check if we get an error about the function not existing
          result = await supabase.rpc(functionName, {});
      }
      
      // If we get an error about invalid input parameters, the function likely exists
      // If we get an error about the function not existing, it doesn't exist
      return !result.error || !result.error.message.includes('does not exist');
    } catch (error) {
      return false;
    }
  };
  
  return {
    isLoading,
    functionStatus,
    missingFunctions,
    refresh: checkDbFunctions
  };
}
