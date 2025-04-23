
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

// Use SelLesson from the component types instead of defining it here
export { SelLesson, SelAssignment, SelProgress } from "@/components/sel-pathways/types";

// Export the UserRole enum from roles.ts
export { UserRole } from "./roles";
