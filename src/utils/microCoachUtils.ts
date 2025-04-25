
import { callSecureFunction } from '@/utils/supabaseSecurityUtils';

export interface MicroCoachLog {
  student_id: string;
  user_id: string;
  viewed_prompt: string;
  context: string;
}

function isArrayGuard<T>(data: any): data is T[] {
  return Array.isArray(data) && (data.length === 0 || typeof data[0] === 'object');
}

/**
 * Records a micro coach log entry when a user views a coaching prompt
 * @param log - The micro coach log data
 * @returns The created log record
 */
export const recordMicroCoachLog = async (log: MicroCoachLog) => {
  try {
    const data = await callSecureFunction('insert_micro_coach_log', {
      p_student_id: log.student_id,
      p_user_id: log.user_id,
      p_viewed_prompt: log.viewed_prompt,
      p_context: log.context
    });

    return data;
  } catch (error) {
    console.error('Error recording micro coach log:', error);
    throw error;
  }
};

/**
 * Retrieves micro coach logs, optionally filtered by student
 * @param studentId - Optional student ID to filter logs
 * @returns Array of micro coach log records
 */
export const getMicroCoachLogs = async (studentId?: string) => {
  try {
    const data = await callSecureFunction('get_micro_coach_logs', {
      p_student_id: studentId || null
    });

    if (isArrayGuard<any>(data)) {
      return data;
    }
    return [];
  } catch (error) {
    console.error('Error fetching micro coach logs:', error);
    return [];
  }
};
