
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
