
-- These are the database functions we need to create to support teacher mood check-ins.
-- Please run these SQL commands in your Supabase project:

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

-- Function to get teacher mood trends (similar to get_user_mood_trends but for teacher perceptions)
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
