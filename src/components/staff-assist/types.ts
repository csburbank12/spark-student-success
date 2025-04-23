
// Make sure this file matches the existing types being used elsewhere
export interface Student {
  id: string;
  name: string;
}

export interface BehaviorLog {
  id: string;
  studentId: string;
  studentName: string;
  date: string;
  behavior: string;
  intervention: string;
  staff: string;
  effectiveness: number | null;
  // These weren't being used in the actual data but are required by the type
  staff_id?: string;
  student_id?: string;
  situation_type?: string;
  intervention_used?: string;
  effectiveness_rating?: number;
  notes?: string;
  timestamp?: string;
}

export type InterventionEffectiveness = 1 | 2 | 3 | 4 | 5;

export interface InterventionFormData {
  studentId: string;
  behavior: string;
  intervention: string;
}
