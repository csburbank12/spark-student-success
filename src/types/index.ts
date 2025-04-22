export type UserRole = "student" | "teacher" | "admin" | "parent";
export type MoodType = "happy" | "good" | "okay" | "sad" | "stressed";

export interface User {
  id: string;
  email: string;
  name?: string;
  role: UserRole;
}
