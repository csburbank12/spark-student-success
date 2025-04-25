
import { TrustedAdult } from "@/types/trusted-adults";

export const getMockTrustedAdults = (studentId: string): TrustedAdult[] => [
  {
    id: "ta1",
    staff_id: "staff1",
    student_id: studentId,
    staff_name: "Jane Smith",
    staff_role: "School Counselor",
    avatarUrl: undefined,
    created_at: new Date().toISOString()
  },
  {
    id: "ta2",
    staff_id: "staff2",
    student_id: studentId,
    staff_name: "Michael Rogers",
    staff_role: "Math Teacher",
    avatarUrl: undefined,
    created_at: new Date().toISOString()
  }
];
