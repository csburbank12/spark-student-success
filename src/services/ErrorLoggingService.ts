
export type ProfileType = 'student' | 'teacher' | 'admin' | 'parent' | 'staff' | 'unauthenticated' | 'unknown' | 'system';

export interface ErrorLogPayload {
  action: string;
  error_message: string;
  profile_type: ProfileType;
  status_code?: string;
}

// For now, this service just logs to console in development
// In production, it would send to Supabase or another backend
export class ErrorLoggingService {
  static logError({ 
    action, 
    error_message, 
    profile_type,
    status_code 
  }: ErrorLogPayload): void {
    console.error(`[${profile_type}] ${action}: ${error_message}${status_code ? ` (${status_code})` : ''}`);
    
    // In a real application, this would send to a backend service
    try {
      // Mock implementation - would actually send to database in production
      const logData = {
        action,
        error_message,
        profile_type,
        status_code,
        timestamp: new Date().toISOString()
      };
      
      // Store in local storage for development purposes
      const currentLogs = JSON.parse(localStorage.getItem('errorLogs') || '[]');
      currentLogs.push(logData);
      localStorage.setItem('errorLogs', JSON.stringify(currentLogs));
    } catch (error) {
      console.error('Failed to log error:', error);
    }
  }
  
  static async markErrorResolved(errorId: string): Promise<void> {
    console.log(`Marking error ${errorId} as resolved`);
    // Implementation would update database record in production
  }

  static async checkRecurringErrors(timeframe: string = '24h', minOccurrences: number = 3): Promise<any[]> {
    console.log(`Checking for recurring errors in last ${timeframe} with min ${minOccurrences} occurrences`);
    // Implementation would query database in production
    return [];
  }
}
