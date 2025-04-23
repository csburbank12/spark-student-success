
export interface StudentProfile {
  id: string;
  first_name?: string;
  last_name?: string;
  grade_level?: string;
  [key: string]: any;
}

export interface BehaviorLog {
  id: string;
  staff_id: string;
  student_id: string | null;
  situation_type: string;
  intervention_used: string;
  notes: string;
  effectiveness_rating: number | null;
  created_at: string;
}
