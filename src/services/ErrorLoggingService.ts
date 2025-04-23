
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
      const { error } = await supabase
        .from('error_logs')
        .insert({
          action,
          error_message,
          profile_type,
          status_code,
        });
      
      if (error) throw error;
    } catch (err) {
      console.error('Failed to log error:', err);
    }
  }

  static async resolveError(logId: string, resolved: boolean = true) {
    try {
      const { error } = await supabase
        .from('error_logs')
        .update({ resolved })
        .eq('id', logId);
      
      if (error) throw error;
    } catch (err) {
      console.error('Failed to update error resolution status:', err);
    }
  }

  static async checkRecurringErrors(action: string, hours: number = 1) {
    try {
      const { data, error } = await supabase
        .from('error_logs')
        .select('id')
        .eq('action', action)
        .gte('timestamp', new Date(Date.now() - hours * 60 * 60 * 1000).toISOString());
      
      if (error) throw error;
      return data ? data.length : 0;
    } catch (err) {
      console.error('Failed to check recurring errors:', err);
      return 0;
    }
  }
}
