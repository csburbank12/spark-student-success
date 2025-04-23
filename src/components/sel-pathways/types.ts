
import { SELLesson } from "@/hooks/useSELRecommendations";

// Type definitions for SEL pathways
export type SelLesson = SELLesson;

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
