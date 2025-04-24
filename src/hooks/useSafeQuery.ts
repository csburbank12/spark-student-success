
import { useQuery, QueryKey, UseQueryOptions, QueryFunction } from '@tanstack/react-query';
import { ErrorLoggingService, ProfileType } from '@/services/ErrorLoggingService';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';

/**
 * A safe version of useQuery that handles error logging and user feedback
 */
export function useSafeQuery<
  TQueryFnData = unknown,
  TError = Error,
  TData = TQueryFnData,
  TQueryKey extends QueryKey = QueryKey
>(
  queryKey: TQueryKey,
  queryFn: QueryFunction<TQueryFnData, TQueryKey>,
  options?: UseQueryOptions<TQueryFnData, TError, TData, TQueryKey> & {
    showErrorToast?: boolean;
    errorMessage?: string;
    logErrors?: boolean;
  }
) {
  const { user } = useAuth();
  const {
    showErrorToast = true,
    errorMessage = 'Failed to load data',
    logErrors = true,
    ...queryOptions
  } = options || {};

  // Create a wrapper query function that will handle errors
  const wrappedQueryFn = async (context: any): Promise<TQueryFnData> => {
    try {
      return await queryFn(context);
    } catch (error) {
      // Handle error logging here
      if (logErrors) {
        const errorMessage = error instanceof Error ? error.message : String(error);
        
        ErrorLoggingService.logError({
          action: `query_error_${queryKey.join('_')}`,
          error_message: errorMessage,
          profile_type: (user?.role as ProfileType || 'unknown')
        });
      }
      
      // Show toast if enabled
      if (showErrorToast) {
        toast.error(errorMessage);
      }
      
      // Re-throw the error for React Query to handle
      throw error;
    }
  };

  return useQuery({
    queryKey,
    queryFn: wrappedQueryFn,
    ...queryOptions
  });
}
