
import { useState, useCallback } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { ErrorLoggingService, ProfileType } from '@/services/ErrorLoggingService';
import { toast } from 'sonner';

type QueryFunction<T> = (...args: any[]) => Promise<T>;

interface QueryOptions {
  maxRetries?: number;
  logErrors?: boolean;
  showToast?: boolean;
  errorMessage?: string;
  action?: string;
}

export function useSafeQuery<T>() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const { user } = useAuth();

  const executeQuery = useCallback(
    async (
      queryFn: QueryFunction<T>,
      options: QueryOptions = {}
    ): Promise<T | null> => {
      const {
        maxRetries = 2,
        logErrors = true,
        showToast = true,
        errorMessage = 'Something went wrong. Please try again.',
        action = 'database_query',
      } = options;

      setIsLoading(true);
      setError(null);

      let attempts = 0;
      let lastError: Error | null = null;

      while (attempts <= maxRetries) {
        try {
          const result = await queryFn();
          setIsLoading(false);
          return result;
        } catch (err) {
          lastError = err instanceof Error ? err : new Error(String(err));
          attempts++;

          if (attempts <= maxRetries) {
            console.log(`Retry attempt ${attempts} of ${maxRetries}`);
            // Wait for increasing amounts of time between retries (exponential backoff)
            await new Promise(resolve => setTimeout(resolve, 500 * attempts));
          } else {
            // Log error after all retries have failed
            if (logErrors) {
              const profileType: ProfileType = user?.role || 'unauthenticated';
              
              ErrorLoggingService.logError({
                action,
                error_message: lastError.message,
                profile_type: profileType,
              });
            }

            if (showToast) {
              toast.error(errorMessage, {
                description: "We've logged this issue and are working on it."
              });
            }

            setError(lastError);
            setIsLoading(false);
            return null;
          }
        }
      }

      setIsLoading(false);
      return null;
    },
    [user]
  );

  return { executeQuery, isLoading, error };
}
