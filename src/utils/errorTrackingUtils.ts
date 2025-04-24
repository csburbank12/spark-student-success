
import { ErrorLoggingService } from '@/services/ErrorLoggingService';

/**
 * Sets up global error tracking for uncaught JS errors
 */
export const setupGlobalErrorTracking = () => {
  const originalConsoleError = console.error;
  
  // Override console.error to track errors
  console.error = (...args) => {
    // Call original console.error
    originalConsoleError.apply(console, args);
    
    // Extract error information
    const errorInfo = args
      .map(arg => {
        if (arg instanceof Error) {
          return `${arg.name}: ${arg.message}\n${arg.stack || ''}`;
        }
        if (typeof arg === 'object') {
          try {
            return JSON.stringify(arg);
          } catch (e) {
            return String(arg);
          }
        }
        return String(arg);
      })
      .join('\n');
      
    // Log the error to our service
    ErrorLoggingService.logError({
      action: 'console_error',
      error_message: errorInfo.slice(0, 10000), // Limit length
      profile_type: 'system',
    });
  };
  
  // Add global error handler
  window.addEventListener('error', (event) => {
    ErrorLoggingService.logError({
      action: 'unhandled_error',
      error_message: `${event.message}\nFile: ${event.filename}:${event.lineno}:${event.colno}\n${event.error?.stack || ''}`,
      profile_type: 'system',
      status_code: 'UNHANDLED_ERROR'
    });
  });
  
  // Add unhandled promise rejection handler
  window.addEventListener('unhandledrejection', (event) => {
    let errorMessage = 'Unhandled Promise Rejection';
    if (event.reason instanceof Error) {
      errorMessage = `${event.reason.name}: ${event.reason.message}\n${event.reason.stack || ''}`;
    } else if (typeof event.reason === 'string') {
      errorMessage = event.reason;
    } else if (typeof event.reason === 'object') {
      try {
        errorMessage = JSON.stringify(event.reason);
      } catch (e) {
        errorMessage = String(event.reason);
      }
    }
    
    ErrorLoggingService.logError({
      action: 'unhandled_promise_rejection',
      error_message: errorMessage,
      profile_type: 'system',
      status_code: 'PROMISE_ERROR'
    });
  });
  
  // Return a cleanup function
  return () => {
    console.error = originalConsoleError;
    window.removeEventListener('error', () => {});
    window.removeEventListener('unhandledrejection', () => {});
  };
};

/**
 * Safety wrapper for callback functions to prevent uncaught exceptions
 */
export function safeFn<T extends (...args: any[]) => any>(fn: T, fallback?: ReturnType<T>): (...args: Parameters<T>) => ReturnType<T> | undefined {
  return (...args: Parameters<T>): ReturnType<T> | undefined => {
    try {
      return fn(...args);
    } catch (error) {
      console.error('Error in safeFn:', error);
      ErrorLoggingService.logError({
        action: 'safe_function_error',
        error_message: error instanceof Error ? error.message : String(error),
        profile_type: 'system',
      });
      return fallback as ReturnType<T>;
    }
  };
}

/**
 * Safety wrapper for async functions to prevent uncaught promise rejections
 */
export function safeAsyncFn<T extends (...args: any[]) => Promise<any>>(
  fn: T,
  fallback?: Awaited<ReturnType<T>>
): (...args: Parameters<T>) => Promise<Awaited<ReturnType<T>> | undefined> {
  return async (...args: Parameters<T>): Promise<Awaited<ReturnType<T>> | undefined> => {
    try {
      return await fn(...args);
    } catch (error) {
      console.error('Error in safeAsyncFn:', error);
      ErrorLoggingService.logError({
        action: 'safe_async_function_error',
        error_message: error instanceof Error ? error.message : String(error),
        profile_type: 'system',
      });
      return fallback as Awaited<ReturnType<T>>;
    }
  };
}

/**
 * Safely parses JSON with error handling
 */
export function safeJsonParse<T>(json: string, fallback: T): T {
  try {
    return JSON.parse(json);
  } catch (error) {
    console.error('Error parsing JSON:', error);
    ErrorLoggingService.logError({
      action: 'json_parse_error',
      error_message: `Failed to parse JSON: ${error instanceof Error ? error.message : String(error)}`,
      profile_type: 'system',
    });
    return fallback;
  }
}
