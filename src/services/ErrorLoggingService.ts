
import { supabase } from '@/lib/supabase';

export type ProfileType = 'student' | 'teacher' | 'admin' | 'parent' | 'staff' | 'unauthenticated' | 'unknown';

export class ErrorLoggingService {
  static async logError({ 
    action, 
    error_message, 
    profile_type 
  }: { 
    action: string;
    error_message: string;
    profile_type: ProfileType;
  }) {
    try {
      await supabase.from('error_logs').insert({
        action,
        error_message,
        profile_type,
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
}
