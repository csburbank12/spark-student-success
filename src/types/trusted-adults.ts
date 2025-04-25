
export interface TrustedAdult {
  id: string;
  staff_id: string;
  student_id: string;
  staff_name: string;
  staff_role: string;
  avatarUrl?: string;
  created_at?: string;
}

export interface School {
  id: string;
  name: string;
  district?: string;
  address?: {
    street?: string;
    city?: string;
    state?: string;
    zip?: string;
  };
  contactEmail?: string;
  contactPhone?: string;
  principalName?: string;
  timeZone?: string;
  logoUrl?: string;
  code: string;
  enableWellLens: boolean;
  enableSEL: boolean;
  enableSkyward: boolean;
  studentCount?: number;
  staffCount?: number;
  created_at?: string;
  updated_at?: string;
}

export interface SkywardIntegration {
  id: string;
  school_id: string;
  apiKey?: string;
  schoolSyncUrl?: string;
  lastSyncDate?: string;
  syncStatus?: 'success' | 'failed' | 'pending';
  fieldMappings?: Record<string, string>;
  enabled: boolean;
}

export interface SchoolStats {
  totalStudents: number;
  flaggedStudents: number;
  selEngagementRate: number;
  averageMood: number;
  completedCheckIns: number;
  totalCheckIns: number;
}
