
import { callSecureFunction } from '@/utils/supabaseSecurityUtils';

export interface TeacherMoodCheckIn {
  student_id: string;
  teacher_id: string;
  mood_type: string;
  energy_level: number;
  notes?: string;
}

function isArrayGuard<T>(data: any): data is T[] {
  return Array.isArray(data) && (data.length === 0 || typeof data[0] === 'object');
}

/**
 * Records a teacher's perception of a student's mood
 * @param checkIn - The mood check-in data
 * @returns The created mood check-in record
 */
export const recordTeacherMoodCheckIn = async (checkIn: TeacherMoodCheckIn) => {
  try {
    const data = await callSecureFunction('insert_teacher_mood_check_in', {
      p_student_id: checkIn.student_id,
      p_teacher_id: checkIn.teacher_id,
      p_mood_type: checkIn.mood_type,
      p_energy_level: checkIn.energy_level,
      p_notes: checkIn.notes
    });

    return data;
  } catch (error) {
    console.error('Error recording teacher mood check-in:', error);
    throw error;
  }
};

/**
 * Retrieves teacher mood check-ins for a specific teacher
 * @param teacherId - The teacher's ID
 * @param daysBack - Number of days to look back (default: 30)
 * @returns Array of mood check-in records
 */
export const getTeacherMoodCheckIns = async (teacherId: string, daysBack: number = 30) => {
  try {
    const data = await callSecureFunction('get_teacher_mood_check_ins', {
      p_teacher_id: teacherId,
      p_days_back: daysBack
    });

    if (isArrayGuard<any>(data)) {
      return data;
    }
    return [];
  } catch (error) {
    console.error('Error fetching teacher mood check-ins:', error);
    return [];
  }
};

/**
 * Retrieves mood trend data for a specific student from teacher check-ins
 * @param studentId - The student's ID
 * @param daysBack - Number of days to look back (default: 30)
 * @returns Array of mood trend records with date, mood_type and energy_level
 */
export const getTeacherMoodTrends = async (studentId: string, daysBack: number = 30) => {
  try {
    const data = await callSecureFunction('get_teacher_mood_trends', {
      p_student_id: studentId,
      p_days_back: daysBack
    });

    if (isArrayGuard<any>(data)) {
      return data;
    }
    return [];
  } catch (error) {
    console.error('Error fetching teacher mood trends:', error);
    return [];
  }
};
