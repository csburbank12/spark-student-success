
import { ErrorLoggingService } from '@/services/ErrorLoggingService';

// Global error handler for uncaught exceptions
export function setupGlobalErrorTracking() {
  window.addEventListener('error', (event) => {
    // Log the error to our error logging service
    ErrorLoggingService.logError({
      action: 'runtime_error',
      error_message: `${event.message} at ${event.filename}:${event.lineno}:${event.colno}`,
      profile_type: 'unknown', // We don't know the user type in global handler
    });
    
    // Don't prevent the default error handling
    return false;
  });

  window.addEventListener('unhandledrejection', (event) => {
    // Log the unhandled promise rejection
    ErrorLoggingService.logError({
      action: 'unhandled_promise_rejection',
      error_message: event.reason?.message || String(event.reason) || 'Unknown promise rejection',
      profile_type: 'unknown',
    });
    
    // Don't prevent the default error handling
    return false;
  });
}

// Function to safely execute a callback with error handling
export function safeFn<T extends (...args: any[]) => any>(
  fn: T,
  errorHandler?: (error: Error) => void,
): (...args: Parameters<T>) => ReturnType<T> | undefined {
  return (...args: Parameters<T>): ReturnType<T> | undefined => {
    try {
      return fn(...args);
    } catch (error) {
      const err = error instanceof Error ? error : new Error(String(error));
      console.error('Error in safeFn:', err);
      
      // Use provided error handler or log to service
      if (errorHandler) {
        errorHandler(err);
      } else {
        ErrorLoggingService.logError({
          action: 'safe_function_error',
          error_message: err.message,
          profile_type: 'unknown',
        });
      }
      
      return undefined;
    }
  };
}

// Function to validate form inputs
export function validateInput(
  value: any, 
  rules: { required?: boolean; minLength?: number; pattern?: RegExp; email?: boolean }
): { valid: boolean; error?: string } {
  if (rules.required && (!value || value.trim() === '')) {
    return { valid: false, error: 'This field is required' };
  }
  
  if (rules.minLength && value && value.length < rules.minLength) {
    return { valid: false, error: `Must be at least ${rules.minLength} characters` };
  }
  
  if (rules.email && !/\S+@\S+\.\S+/.test(value)) {
    return { valid: false, error: 'Please enter a valid email address' };
  }
  
  if (rules.pattern && !rules.pattern.test(value)) {
    return { valid: false, error: 'Please enter a valid value' };
  }
  
  return { valid: true };
}
