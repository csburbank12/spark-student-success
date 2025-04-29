export enum UserRole {
  student = "student",
  teacher = "teacher",
  admin = "admin",
  parent = "parent",
  staff = "staff",
  counselor = "counselor"
}

export interface SelLesson {
  id: string | number;
  title: string;
  description: string;
  pathway?: string;
  duration: number;
  difficulty: string;
}

// Update SELLesson to match SelLesson for type compatibility
export type SELLesson = {
  id: string;
  title: string;
  description?: string;
  competencyArea?: string;
  recommendedMoods?: string[];
  contentUrl?: string;
  activityType?: string;
  estimatedDuration?: number;
  duration: number;
  evidenceBase?: string;
  gradeRange?: string[];
  culturalFocus?: string;
  createdBy?: string;
  ageRange?: string;
  caselCompetency?: string;
};

export interface OnboardingStep {
  title: string;
  description: string;
  complete: boolean;
}

export type EducationSystem = 'skyward' | 'powerschool' | 'infinite_campus' | 'aeries' | 'csv';

export interface ConnectionConfig {
  type: 'api' | 'oauth' | 'csv' | 'sftp';
  details: Record<string, any>;
}

export interface MappedField {
  sourceField: string;
  targetField: string;
  required: boolean;
  valid: boolean;
  errorMessage?: string;
}

export interface ImportSummary {
  totalRecords: number;
  successfulImports: number;
  failedImports: number;
  errors: Array<{
    row: number;
    error: string;
    data?: Record<string, any>;
  }>;
}
