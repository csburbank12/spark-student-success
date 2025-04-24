
import { User } from '@/types';
import { UserRole } from '@/types/roles';

export const demoUsers: Record<string, User> = {
  [UserRole.student]: {
    id: 'std1',
    name: 'Jada Thompson',
    email: 'jada@school.edu',
    role: UserRole.student,
    avatarUrl: '/student-avatar.png',
    schoolId: 'school1',
    gradeLevel: '10th',
    lastCheckIn: new Date().toISOString(),
    academicStatus: 'On Track',
    selProgress: 75,
    attendanceRate: 95
  },
  [UserRole.teacher]: {
    id: 'tch1',
    name: 'Mr. Ethan Nguyen',
    email: 'nguyen@school.edu',
    role: UserRole.teacher,
    avatarUrl: '/teacher-avatar.png',
    schoolId: 'school1',
    department: 'Special Education',
    classCount: 5,
    yearsExperience: 8
  },
  [UserRole.admin]: {
    id: 'adm1',
    name: 'Dr. Maria Rodriguez',
    email: 'rodriguez@district.edu',
    role: UserRole.admin,
    avatarUrl: '/admin-avatar.png',
    schoolId: 'school1',
    position: 'Principal',
    adminLevel: 'District',
    yearsExperience: 15,
    department: 'Administration',
    specialization: 'Educational Leadership'
  },
  [UserRole.parent]: {
    id: 'par1',
    name: 'Sarah Thompson',
    email: 'sarah@family.com',
    role: UserRole.parent,
    avatarUrl: '/parent-avatar.png',
    schoolId: 'school1',
    children: [
      {
        id: 'std1',
        name: 'Jada Thompson',
        grade: '10th',
        status: 'Active'
      }
    ]
  }
};

