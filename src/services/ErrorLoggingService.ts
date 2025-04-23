
import { supabase } from '@/integrations/supabase/client';

export type ErrorLogLevel = 'error' | 'warning' | 'info';
export type ProfileType = 'student' | 'staff' | 'parent' | 'admin';

interface ErrorLogData {
  action: string;
  error_message: string;
  profile_type?: ProfileType;
  status_code?: string;
}

export class ErrorLoggingService {
  static async logError({
    action,
    error_message,
    profile_type,
    status_code,
  }: ErrorLogData) {
    try {
      const { error } = await supabase.rpc('log_error', {
        p_action: action,
        p_error_message: error_message,
        p_status_code: status_code,
        p_profile_type: profile_type
      });
      
      if (error) throw error;
    } catch (err) {
      console.error('Failed to log error:', err);
    }
  }

  static async resolveError(logId: string, resolved: boolean = true) {
    try {
      const { error } = await supabase.rpc('resolve_error_log', {
        p_log_id: logId,
        p_resolved: resolved
      });
      
      if (error) throw error;
    } catch (err) {
      console.error('Failed to update error resolution status:', err);
    }
  }

  static async checkRecurringErrors(action: string, hours: number = 1) {
    try {
      const { data, error } = await supabase.rpc('count_recurring_errors', {
        p_action: action,
        p_hours: hours
      });
      
      if (error) throw error;
      return data || 0;
    } catch (err) {
      console.error('Failed to check recurring errors:', err);
      return 0;
    }
  }
}
