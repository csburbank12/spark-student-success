
// Define SEL pathway types directly without importing from hooks
export interface SelLesson {
  id: string;
  title: string;
  description?: string;
  content?: string;
  competency_area?: string;
  pathway?: string;
  estimated_duration?: number;
  duration?: number;
  activity_type?: string;
  difficulty?: string;
  content_url?: string;
  recommended_moods?: string[];
}

export interface SelAssignment {
  id: string;
  lesson_id: string;
  student_id: string;
  assigned_by: string;
  assigned_at: string;
  due_date?: string;
  status: 'assigned' | 'in-progress' | 'completed';
  sel_lessons?: SelLesson;
}

export interface SelProgress {
  id: string;
  student_id: string;
  lesson_id: string;
  progress: number;
  completed: boolean;
  completed_at?: string;
  sel_lessons?: SelLesson;
}

export interface StudentSelData {
  assignments: SelAssignment[];
  progress: SelProgress[];
}
