
import { callSecureFunction } from '@/utils/supabaseSecurityUtils';

export interface InterventionImpact {
  student_id: string;
  staff_id: string;
  intervention_id: string;
  tier: 1 | 2 | 3;
  strategy_notes?: string;
  impact_score?: number;
  outcome_notes?: string;
}

function isArrayGuard<T>(data: any): data is T[] {
  return Array.isArray(data) && (data.length === 0 || typeof data[0] === 'object');
}

export const recordInterventionImpact = async (impact: InterventionImpact) => {
  try {
    // Use the secure function caller
    const data = await callSecureFunction('insert_intervention_impact', {
      p_student_id: impact.student_id,
      p_staff_id: impact.staff_id,
      p_intervention_id: impact.intervention_id,
      p_tier: impact.tier,
      p_strategy_notes: impact.strategy_notes,
      p_impact_score: impact.impact_score,
      p_outcome_notes: impact.outcome_notes
    });

    return data;
  } catch (error) {
    console.error('Error recording intervention impact:', error);
    throw error;
  }
};

export const getStudentInterventionImpacts = async (studentId: string) => {
  try {
    const data = await callSecureFunction('get_student_intervention_impacts', {
      p_student_id: studentId
    });
    
    if (isArrayGuard<any>(data)) {
      return data;
    }
    return [];
  } catch (error) {
    console.error('Error fetching intervention impacts:', error);
    return [];
  }
};
