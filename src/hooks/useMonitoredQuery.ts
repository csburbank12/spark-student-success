import { useCallback } from 'react';
import { useQuery, QueryKey, UseQueryOptions, QueryFunction } from '@tanstack/react-query';
import { ErrorLoggingService } from '@/services/ErrorLoggingService';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';
import { useSafeQuery } from '@/hooks/useSafeQuery';

/**
 * Extended version of useSafeQuery with additional monitoring and auto-recovery options
 */
export function useMonitoredQuery<
  TQueryFnData = unknown,
  TError = Error,
  TData = TQueryFnData,
  TQueryKey extends QueryKey = QueryKey
>(
  queryKey: TQueryKey,
  queryFn: QueryFunction<TQueryFnData, TQueryKey>,
  options?: UseQueryOptions<TQueryFnData, TError, TData, TQueryKey> & {
    monitoringOptions?: {
      autoRetryCount?: number;
      showRecoveryToast?: boolean;
      criticalData?: boolean;
      fallbackData?: TData;
    }
  }
) {
  const { user } = useAuth();
  
  // Extract monitoring options with defaults
  const {
    autoRetryCount = 2,
    showRecoveryToast = true,
    criticalData = false,
    fallbackData
  } = options?.monitoringOptions || {};
  
  // Create a wrapped query function with enhanced error handling and monitoring
  const monitoredQueryFn = useCallback(async (context: any): Promise<TQueryFnData> => {
    let lastError: any = null;
    let attempts = 0;
    
    // Try multiple times if auto-retry is enabled
    while (attempts <= autoRetryCount) {
      try {
        return await queryFn(context);
      } catch (error) {
        lastError = error;
        attempts++;
        
        // Log attempt
        console.warn(`Query attempt ${attempts}/${autoRetryCount + 1} failed:`, error);
        
        // If we have more attempts to go, wait a bit before retrying
        if (attempts <= autoRetryCount) {
          // Exponential backoff: 500ms, 1000ms, 2000ms, etc.
          const backoffTime = Math.min(500 * Math.pow(2, attempts - 1), 5000);
          await new Promise(resolve => setTimeout(resolve, backoffTime));
        }
      }
    }
    
    // If we get here, all attempts failed
    const errorMessage = lastError instanceof Error ? lastError.message : String(lastError);
    
    // Log the final error
    ErrorLoggingService.logError({
      action: `query_failed_${queryKey.join('_')}`,
      error_message: `Failed after ${attempts} attempts: ${errorMessage}`,
      profile_type: (user?.role as any || 'unknown')
    });
    
    // If it's critical data and we have fallback data, use that instead of throwing
    if (criticalData && fallbackData !== undefined) {
      console.warn('Using fallback data for critical query:', queryKey);
      if (showRecoveryToast) {
        toast.error('Data Connection Issue', {
          description: 'Using cached data. Some information may not be up-to-date.'
        });
      }
      return fallbackData as unknown as TQueryFnData;
    }
    
    // Otherwise, throw the error
    throw lastError;
  }, [queryFn, queryKey, autoRetryCount, criticalData, fallbackData, showRecoveryToast, user?.role]);
  
  // Use the base safe query with our enhanced query function
  return useSafeQuery(queryKey, monitoredQueryFn, options);
}
