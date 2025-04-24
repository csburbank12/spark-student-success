
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
      // Since check_functions_exist might not exist, we'll check each function individually
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
          variant: "destructive" // Changed from 'warning'
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
        variant: "destructive" // Changed from 'warning'
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
          result = await supabase.rpc('get_teacher_mood_check_ins', { 
            p_student_id: '00000000-0000-0000-0000-000000000000', 
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
          // For unknown functions, we'll use a generic approach
          // Just check if the function call results in an error about not existing
          try {
            await supabase.rpc(functionName, {});
            return true;
          } catch (error: any) {
            return !error.message.includes('does not exist');
          }
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
