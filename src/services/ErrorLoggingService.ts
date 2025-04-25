
import { supabase } from '@/integrations/supabase/client';

export type ProfileType = 
  | 'student' 
  | 'teacher' 
  | 'admin' 
  | 'parent' 
  | 'staff' 
  | 'counselor' 
  | 'unknown' 
  | 'unauthenticated'
  | 'system';

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
