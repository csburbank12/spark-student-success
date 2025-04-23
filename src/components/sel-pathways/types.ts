
import { Tables } from "@/integrations/supabase/types";

// Type definitions for SEL pathways
export type SelLesson = Tables<"sel_lessons">;
export type SelAssignment = Tables<"sel_assignments"> & { sel_lessons: SelLesson };
export type SelProgress = Tables<"sel_progress"> & { sel_lessons: SelLesson };

export interface StudentSelData {
  assignments: (SelAssignment & { sel_lessons: SelLesson })[];
  progress: (SelProgress & { sel_lessons: SelLesson })[];
}
