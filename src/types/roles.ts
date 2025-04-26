export enum UserRole {
  student = "student",
  staff = "staff",
  admin = "admin",
  parent = "parent",
  teacher = "teacher",
  counselor = "counselor"
}

export interface SelLesson {
  id: string;
  title: string;
  description?: string;
  competency_area?: string;
  recommended_moods?: string[];
  estimated_duration?: number;
  difficulty?: string;
  thumbnail?: string;
  activity_type?: string;
}

export interface SelAssignment {
  id: string;
  lesson_id: string;
  student_id: string;
  assigned_by: string;
  assigned_at: string;
  due_date?: string;
  status: string;
  sel_lessons: SelLesson;
}

export interface SelProgress {
  id: string;
  student_id: string;
  lesson_id: string;
  progress: number;
  completed: boolean;
  completed_at?: string;
  sel_lessons: SelLesson;
}
