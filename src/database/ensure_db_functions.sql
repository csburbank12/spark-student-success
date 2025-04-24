
-- Function to insert a teacher mood check-in
CREATE OR REPLACE FUNCTION insert_teacher_mood_check_in(
  p_student_id UUID,
  p_teacher_id UUID,
  p_mood_type TEXT,
  p_energy_level INTEGER,
  p_notes TEXT DEFAULT NULL
) RETURNS SETOF JSONB
LANGUAGE plpgsql SECURITY DEFINER 
AS $$
DECLARE
  v_result JSONB;
BEGIN
  INSERT INTO teacher_mood_check_ins (
    student_id, teacher_id, mood_type, energy_level, notes
  )
  VALUES (
    p_student_id, p_teacher_id, p_mood_type, p_energy_level, p_notes
  )
  RETURNING to_jsonb(teacher_mood_check_ins) INTO v_result;
  
  RETURN QUERY SELECT v_result;
END;
$$;

-- Function to get teacher mood check-ins for a student
CREATE OR REPLACE FUNCTION get_teacher_mood_check_ins(
  p_student_id UUID,
  p_days_back INTEGER DEFAULT 30
) RETURNS SETOF JSONB
LANGUAGE plpgsql SECURITY DEFINER 
AS $$
BEGIN
  RETURN QUERY
    SELECT to_jsonb(t) FROM teacher_mood_check_ins t
    WHERE student_id = p_student_id
    AND created_at >= (CURRENT_DATE - p_days_back * INTERVAL '1 day')
    ORDER BY created_at DESC;
END;
$$;

-- Function to get teacher mood trends
CREATE OR REPLACE FUNCTION get_teacher_mood_trends(
  p_student_id UUID,
  p_days_back INTEGER DEFAULT 30
) RETURNS TABLE(date DATE, mood_type TEXT, energy_level INTEGER)
LANGUAGE plpgsql SECURITY DEFINER 
AS $$
BEGIN
  RETURN QUERY
    SELECT 
      DATE(created_at) as date,
      mood_type,
      energy_level
    FROM teacher_mood_check_ins
    WHERE 
      student_id = p_student_id
      AND created_at >= (CURRENT_DATE - p_days_back * INTERVAL '1 day')
    ORDER BY date DESC;
END;
$$;

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

-- Function to get micro coach logs
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

-- Function to get student intervention impacts
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

-- Function to get tiered support recommendations
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

-- Function to get the current user's role
CREATE OR REPLACE FUNCTION get_current_user_role()
RETURNS TEXT
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  v_role TEXT;
BEGIN
  SELECT role INTO v_role
  FROM user_roles
  WHERE user_id = auth.uid()
  LIMIT 1;
  
  RETURN v_role;
END;
$$;

-- Function to check for recurring errors
CREATE OR REPLACE FUNCTION get_recurring_errors(
  p_timeframe TEXT DEFAULT '24h',
  p_min_occurrences INTEGER DEFAULT 3
) RETURNS TABLE (
  error_message TEXT,
  count BIGINT,
  first_occurrence TIMESTAMP WITH TIME ZONE,
  latest_occurrence TIMESTAMP WITH TIME ZONE,
  action TEXT
) LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  RETURN QUERY
  SELECT 
    e.error_message,
    COUNT(*)::BIGINT as count,
    MIN(e.timestamp) as first_occurrence,
    MAX(e.timestamp) as latest_occurrence,
    e.action
  FROM error_logs e
  WHERE 
    e.timestamp > (
      CASE 
        WHEN p_timeframe = '24h' THEN NOW() - INTERVAL '24 hours'
        WHEN p_timeframe = '7d' THEN NOW() - INTERVAL '7 days'
        WHEN p_timeframe = '30d' THEN NOW() - INTERVAL '30 days'
        ELSE NOW() - INTERVAL '24 hours'
      END
    )
  GROUP BY e.error_message, e.action
  HAVING COUNT(*) >= p_min_occurrences
  ORDER BY COUNT(*) DESC, MAX(e.timestamp) DESC;
END;
$$;

-- Function to check table column structure
CREATE OR REPLACE FUNCTION check_table_structure(
  p_table_name TEXT,
  p_required_columns TEXT[]
) RETURNS JSONB
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  v_result JSONB;
  v_missing_columns TEXT[];
  v_column_record RECORD;
  v_has_timestamps BOOLEAN;
  v_has_primary_key BOOLEAN;
BEGIN
  -- Check if table exists
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.tables 
    WHERE table_schema = 'public' AND table_name = p_table_name
  ) THEN
    RETURN jsonb_build_object(
      'exists', FALSE,
      'table_name', p_table_name
    );
  END IF;
  
  -- Initialize
  v_missing_columns := '{}';
  v_has_timestamps := FALSE;
  v_has_primary_key := FALSE;
  
  -- Check each required column
  FOREACH v_column_record IN ARRAY p_required_columns LOOP
    IF NOT EXISTS (
      SELECT 1 FROM information_schema.columns
      WHERE table_schema = 'public' 
        AND table_name = p_table_name
        AND column_name = v_column_record
    ) THEN
      v_missing_columns := array_append(v_missing_columns, v_column_record);
    END IF;
  END LOOP;
  
  -- Check for timestamps
  v_has_timestamps := EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_schema = 'public' 
      AND table_name = p_table_name
      AND column_name = 'created_at'
  ) AND EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_schema = 'public' 
      AND table_name = p_table_name
      AND column_name = 'updated_at'
  );
  
  -- Check for primary key
  v_has_primary_key := EXISTS (
    SELECT 1 FROM information_schema.table_constraints
    WHERE table_schema = 'public'
      AND table_name = p_table_name
      AND constraint_type = 'PRIMARY KEY'
  );
  
  -- Build result
  v_result := jsonb_build_object(
    'exists', TRUE,
    'table_name', p_table_name,
    'valid', array_length(v_missing_columns, 1) IS NULL,
    'missing_columns', v_missing_columns,
    'has_timestamps', v_has_timestamps,
    'has_primary_key', v_has_primary_key
  );
  
  RETURN v_result;
END;
$$;
