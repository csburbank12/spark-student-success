
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { useLocation } from "react-router-dom";
import { ErrorLoggingService } from "@/services/ErrorLoggingService";
import { toast } from "sonner";

interface LogJSErrorParams {
  message: string;
  stack?: string;
  componentName?: string;
  additionalInfo?: Record<string, any>;
}

export const useErrorLogging = () => {
  const { user } = useAuth();
  const location = useLocation();

  const log404Error = async (attemptedPath: string) => {
    try {
      const referrerPath = document.referrer;
      await ErrorLoggingService.logError({
        action: "page_not_found",
        error_message: `404 error: ${attemptedPath}`,
        profile_type: user?.role || "unauthenticated",
        status_code: "404"
      });

      if (user) {
        await supabase.from('page_not_found_logs').insert({
          user_id: user.id,
          attempted_path: attemptedPath,
          referrer_path: referrerPath,
          user_agent: navigator.userAgent
        });
      }
    } catch (error) {
      console.error('Failed to log 404 error:', error);
    }
  };

  const logJSError = async ({ message, stack, componentName, additionalInfo }: LogJSErrorParams) => {
    try {
      const errorDetails = {
        pathname: location.pathname,
        component: componentName || 'Unknown',
        user_id: user?.id || null,
        timestamp: new Date().toISOString(),
        ...additionalInfo
      };

      await ErrorLoggingService.logError({
        action: "javascript_error",
        error_message: `${message}\n${stack || ''}`,
        profile_type: user?.role || "unauthenticated",
        status_code: "JS_ERROR"
      });

      return true;
    } catch (error) {
      console.error('Failed to log JS error:', error);
      return false;
    }
  };

  const logApiError = async (endpoint: string, errorMessage: string, statusCode?: string) => {
    try {
      await ErrorLoggingService.logError({
        action: `api_error_${endpoint.replace(/[^a-zA-Z0-9]/g, '_')}`,
        error_message: errorMessage,
        profile_type: user?.role || "unauthenticated",
        status_code: statusCode || "API_ERROR"
      });

      return true;
    } catch (error) {
      console.error('Failed to log API error:', error);
      return false;
    }
  };

  const logFormValidationError = async (formName: string, fieldErrors: Record<string, string>) => {
    try {
      const errorMessage = Object.entries(fieldErrors)
        .map(([field, error]) => `${field}: ${error}`)
        .join('\n');

      await ErrorLoggingService.logError({
        action: `form_validation_${formName}`,
        error_message: errorMessage,
        profile_type: user?.role || "unauthenticated",
        status_code: "VALIDATION_ERROR"
      });

      return true;
    } catch (error) {
      console.error('Failed to log validation error:', error);
      return false;
    }
  };

  return { 
    log404Error, 
    logJSError,
    logApiError,
    logFormValidationError
  };
};
