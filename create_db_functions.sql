
-- These are the database functions we need to create to support our code changes.
-- Please run these SQL commands in your Supabase project:

-- Function for MicroCoachContext
CREATE OR REPLACE FUNCTION insert_micro_coach_log(
  p_student_id UUID,
  p_user_id UUID,
  p_viewed_prompt TEXT,
  p_context TEXT
) RETURNS SETOF JSONB
LANGUAGE plpgsql SECURITY DEFINER 
AS $$
BEGIN
  INSERT INTO micro_coach_logs (student_id, user_id, viewed_prompt, context)
  VALUES (p_student_id, p_user_id, p_viewed_prompt, p_context);
  
  RETURN QUERY SELECT jsonb_build_object('success', true);
END;
$$;

CREATE OR REPLACE FUNCTION get_micro_coach_logs(
  p_student_id UUID DEFAULT NULL
) RETURNS SETOF JSONB
LANGUAGE plpgsql SECURITY DEFINER 
AS $$
BEGIN
  IF p_student_id IS NOT NULL THEN
    RETURN QUERY 
      SELECT to_jsonb(m) FROM micro_coach_logs m 
      WHERE student_id = p_student_id
      ORDER BY viewed_at DESC;
  ELSE
    RETURN QUERY 
      SELECT to_jsonb(m) FROM micro_coach_logs m 
      ORDER BY viewed_at DESC;
  END IF;
END;
$$;

-- Function for interventionImpactUtils
CREATE OR REPLACE FUNCTION insert_intervention_impact(
  p_student_id UUID,
  p_staff_id UUID,
  p_intervention_id UUID,
  p_tier INT,
  p_strategy_notes TEXT DEFAULT NULL,
  p_impact_score INT DEFAULT NULL,
  p_outcome_notes TEXT DEFAULT NULL
) RETURNS SETOF JSONB
LANGUAGE plpgsql SECURITY DEFINER 
AS $$
DECLARE
  v_result JSONB;
BEGIN
  INSERT INTO intervention_impacts (
    student_id, staff_id, intervention_id, tier, 
    strategy_notes, impact_score, outcome_notes
  )
  VALUES (
    p_student_id, p_staff_id, p_intervention_id, p_tier,
    p_strategy_notes, p_impact_score, p_outcome_notes
  )
  RETURNING to_jsonb(intervention_impacts) INTO v_result;
  
  RETURN QUERY SELECT v_result;
END;
$$;

CREATE OR REPLACE FUNCTION get_student_intervention_impacts(
  p_student_id UUID
) RETURNS SETOF JSONB
LANGUAGE plpgsql SECURITY DEFINER 
AS $$
BEGIN
  RETURN QUERY
    SELECT to_jsonb(i) FROM intervention_impacts i
    WHERE student_id = p_student_id
    ORDER BY applied_at DESC;
END;
$$;

-- Function for tieredSupportUtils
CREATE OR REPLACE FUNCTION create_tiered_support_recommendation(
  p_student_id UUID,
  p_recommended_by UUID,
  p_tier INT,
  p_intervention_id UUID DEFAULT NULL,
  p_recommendation_notes TEXT DEFAULT NULL,
  p_status TEXT DEFAULT 'pending'
) RETURNS SETOF JSONB
LANGUAGE plpgsql SECURITY DEFINER 
AS $$
DECLARE
  v_result JSONB;
BEGIN
  INSERT INTO tiered_support_recommendations (
    student_id, recommended_by, tier, 
    intervention_id, recommendation_notes, status
  )
  VALUES (
    p_student_id, p_recommended_by, p_tier,
    p_intervention_id, p_recommendation_notes, p_status
  )
  RETURNING to_jsonb(tiered_support_recommendations) INTO v_result;
  
  RETURN QUERY SELECT v_result;
END;
$$;

CREATE OR REPLACE FUNCTION get_tiered_support_recommendations(
  p_student_id UUID
) RETURNS SETOF JSONB
LANGUAGE plpgsql SECURITY DEFINER 
AS $$
BEGIN
  RETURN QUERY
    SELECT to_jsonb(t) FROM tiered_support_recommendations t
    WHERE student_id = p_student_id
    ORDER BY created_at DESC;
END;
$$;
