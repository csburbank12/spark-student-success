
import { UserRole } from "./roles";

export type MoodType = "happy" | "good" | "okay" | "sad" | "stressed";

export interface User {
  id: string;
  email: string;
  name?: string;
  role: UserRole;
  avatarUrl?: string;
  schoolId?: string;
}

// Export the UserRole enum from roles.ts
export { UserRole } from "./roles";

// Export SEL types using proper 'export type' syntax for TypeScript modules
export type { SelLesson, SelAssignment, SelProgress } from "@/components/sel-pathways/types";
