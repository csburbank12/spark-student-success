
import { useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { UserRole } from '@/types/roles';
import { ProfileType } from '@/services/ErrorLoggingService';

// Export type instead of re-exporting to fix TS1205 error
export type { ProfileType };

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
      // Using `as any` to bypass TypeScript strict checking for RPC functions
      const { data, error } = await supabase
        .rpc('get_recurring_errors' as any, { 
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
