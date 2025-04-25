
import { callSecureFunction } from '@/utils/supabaseSecurityUtils';

export interface TieredSupportRecommendation {
  student_id: string;
  recommended_by: string;
  tier: 1 | 2 | 3;
  intervention_id?: string;
  recommendation_notes?: string;
  status?: string;
}

function isArrayGuard<T>(data: any): data is T[] {
  return Array.isArray(data) && (data.length === 0 || typeof data[0] === 'object');
}

export const createTieredSupportRecommendation = async (recommendation: TieredSupportRecommendation) => {
  try {
    const data = await callSecureFunction('create_tiered_support_recommendation', {
      p_student_id: recommendation.student_id,
      p_recommended_by: recommendation.recommended_by,
      p_tier: recommendation.tier,
      p_intervention_id: recommendation.intervention_id,
      p_recommendation_notes: recommendation.recommendation_notes,
      p_status: recommendation.status || 'pending'
    });

    return data;
  } catch (error) {
    console.error('Error creating tiered support recommendation:', error);
    throw error;
  }
};

export const getTieredSupportRecommendations = async (studentId: string) => {
  try {
    const data = await callSecureFunction('get_tiered_support_recommendations', {
      p_student_id: studentId
    });

    if (isArrayGuard<any>(data)) {
      return data;
    }
    return [];
  } catch (error) {
    console.error('Error fetching tiered support recommendations:', error);
    return [];
  }
};
