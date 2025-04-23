import { UserRole } from "./roles";

export type MoodType = "happy" | "good" | "okay" | "sad" | "stressed";

export interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  avatarUrl?: string;
  schoolId?: string;
  gradeLevel?: string;
  lastCheckIn?: string;
  academicStatus?: string;
  selProgress?: number;
  attendanceRate?: number;
  department?: string;
  classCount?: number;
  yearsExperience?: number;
  position?: string;
  adminLevel?: string;
  children?: {
    id: string;
    name: string;
    grade: string;
    status: string;
  }[];
  specialization?: string;
}

// Export the UserRole enum from roles.ts
export { UserRole } from "./roles";

// Export SEL types using proper 'export type' syntax for TypeScript modules
export type { SelLesson, SelAssignment, SelProgress } from "@/components/sel-pathways/types";
