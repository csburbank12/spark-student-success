
import { useCallback } from 'react';
import { supabase } from '@/lib/supabase';
import { useAuth } from '@/contexts/AuthContext';

export type ProfileType = 'student' | 'teacher' | 'admin' | 'parent' | 'staff' | 'unauthenticated' | 'unknown';

export const useErrorLogging = () => {
  const { user } = useAuth();

  const logError = useCallback(async ({ 
    action, 
    error_message, 
    profile_type,
    status_code 
  }: { 
    action: string;
    error_message: string;
    profile_type: ProfileType;
    status_code?: string;
  }) => {
    try {
      await supabase.from('error_logs').insert({
        action,
        error_message,
        user_id: user?.id || 'anonymous',
        profile_type,
        status_code
      });
    } catch (error) {
      console.error('Failed to log error:', error);
    }
  }, [user]);

  const log404Error = useCallback((path: string) => {
    const profileType = user?.role as ProfileType || 'unauthenticated';
    logError({
      action: 'page_not_found',
      error_message: `Page not found: ${path}`,
      profile_type: profileType
    });
  }, [logError, user]);

  return { logError, log404Error };
};

export class ErrorLoggingService {
  static async logError({ 
    action, 
    error_message, 
    profile_type,
    status_code 
  }: { 
    action: string;
    error_message: string;
    profile_type: ProfileType;
    status_code?: string;
  }) {
    try {
      await supabase.from('error_logs').insert({
        action,
        error_message,
        profile_type,
        status_code
      });
    } catch (error) {
      console.error('Failed to log error:', error);
    }
  }
  
  static async markErrorResolved(errorId: string) {
    try {
      await supabase.from('error_logs')
        .update({ resolved: true })
        .eq('id', errorId);
    } catch (error) {
      console.error('Failed to update error status:', error);
    }
  }

  static async checkRecurringErrors(timeframe: string = '24h', minOccurrences: number = 3): Promise<any[]> {
    try {
      const { data, error } = await supabase
        .rpc('get_recurring_errors', { 
          p_timeframe: timeframe,
          p_min_occurrences: minOccurrences
        });
        
      if (error) throw error;
      return data || [];
    } catch (error) {
      console.error('Failed to check recurring errors:', error);
      return [];
    }
  }
}
