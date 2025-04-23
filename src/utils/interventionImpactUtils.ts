
import { supabase } from '@/integrations/supabase/client';

export interface InterventionImpact {
  student_id: string;
  staff_id: string;
  intervention_id: string;
  tier: 1 | 2 | 3;
  strategy_notes?: string;
  impact_score?: number;
  outcome_notes?: string;
}

export const recordInterventionImpact = async (impact: InterventionImpact) => {
  try {
    // Check if the table exists first since it may be a new table
    const { data, error } = await supabase
      .from('intervention_impacts')
      .insert(impact as any)
      .select();

    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Error recording intervention impact:', error);
    throw error;
  }
};

export const getStudentInterventionImpacts = async (studentId: string) => {
  try {
    const { data, error } = await supabase
      .from('intervention_impacts')
      .select('*')
      .eq('student_id', studentId)
      .order('applied_at', { ascending: false });

    if (error) throw error;
    return data || [];
  } catch (error) {
    console.error('Error fetching intervention impacts:', error);
    return [];
  }
};
