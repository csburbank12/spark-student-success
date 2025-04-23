
import { UserRole } from "./roles";

export type MoodType = "happy" | "good" | "okay" | "sad" | "stressed";

export interface User {
  id: string;
  email: string;
  name?: string;
  role: string;
  avatarUrl?: string;
  schoolId?: string;
}

export interface SELLesson {
  id: string;
  title: string;
  description: string;
  content: string;
  pathway: string;
  duration: number;
  difficulty: string;
  media_url?: string;
  created_at: string;
}

export interface SELAssignment {
  id: string;
  student_id: string;
  lesson_id: string;
  assigned_by: string;
  assigned_at: string;
  due_date?: string;
  status: "assigned" | "in-progress" | "completed";
  sel_lessons: SELLesson;
}

export interface SELProgress {
  id: string;
  student_id: string;
  lesson_id: string;
  progress: number;
  completed: boolean;
  completed_at?: string;
  sel_lessons: SELLesson;
}

// Export the UserRole enum from roles.ts
export { UserRole } from "./roles";
