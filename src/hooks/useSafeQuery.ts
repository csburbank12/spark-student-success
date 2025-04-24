
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

  return useQuery({
    queryKey,
    queryFn,
    ...queryOptions,
    onError: (error) => {
      // Log the error
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
      
      // Call the original onError if provided
      if (options?.onError) {
        options.onError(error);
      }
    },
  });
}
