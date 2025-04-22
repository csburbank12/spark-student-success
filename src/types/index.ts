
export type UserRole = 'student' | 'teacher' | 'admin';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatarUrl?: string;
  schoolId?: string;
}

export type MoodType = 'happy' | 'good' | 'okay' | 'sad' | 'stressed';

export interface CheckIn {
  id: string;
  userId: string;
  date: string;
  mood: MoodType;
  energyLevel: number;
  notes?: string;
  flags?: string[];
}

export interface Notification {
  id: string;
  userId: string;
  title: string;
  message: string;
  read: boolean;
  createdAt: string;
  type: 'alert' | 'info' | 'success';
}
