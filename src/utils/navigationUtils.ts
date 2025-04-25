
import { UserRole } from '@/types/roles';

/**
 * Returns the appropriate dashboard route based on user role
 */
export const getFallbackDashboardByRole = (role: UserRole): string => {
  switch (role) {
    case UserRole.admin:
      return '/admin-dashboard';
    case UserRole.teacher:
      return '/teacher-dashboard-enhanced';
    case UserRole.student:
      return '/student-dashboard-enhanced';
    case UserRole.parent:
      return '/parent-dashboard-enhanced';
    case UserRole.staff:
      return '/staff-dashboard';
    case UserRole.counselor:
      return '/trusted-adult-dashboard';
    default:
      return '/dashboard';
  }
};

/**
 * Check if a path is considered a public path that doesn't require authentication
 */
export const isPublicPath = (pathname: string): boolean => {
  const publicPaths = ['/login', '/signup', '/404', '/privacy-policy', '/terms', '/help'];
  
  return publicPaths.includes(pathname) || 
         pathname.startsWith('/auth/') || 
         pathname.startsWith('/onboarding/');
};
