
import { supabase } from '@/integrations/supabase/client';

export interface TieredSupportRecommendation {
  student_id: string;
  recommended_by: string;
  tier: 1 | 2 | 3;
  intervention_id?: string;
  recommendation_notes?: string;
  status?: string;
}

export const createTieredSupportRecommendation = async (recommendation: TieredSupportRecommendation) => {
  try {
    const { data, error } = await supabase
      .from('tiered_support_recommendations')
      .insert(recommendation as any)
      .select();

    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Error creating tiered support recommendation:', error);
    throw error;
  }
};

export const getTieredSupportRecommendations = async (studentId: string) => {
  try {
    const { data, error } = await supabase
      .from('tiered_support_recommendations')
      .select('*')
      .eq('student_id', studentId)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data || [];
  } catch (error) {
    console.error('Error fetching tiered support recommendations:', error);
    return [];
  }
};
