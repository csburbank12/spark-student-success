import { UserRole } from '@/types/roles';

/**
 * Returns the appropriate dashboard route based on user role
 */
export const getFallbackDashboardByRole = (role: UserRole): string => {
  switch (role) {
    case UserRole.admin:
      return '/admin-dashboard';
    case UserRole.teacher:
      return '/teacher-dashboard';
    case UserRole.student:
      return '/student-dashboard';
    case UserRole.parent:
      return '/parent-dashboard';
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
         pathname.startsWith('/auth/');
};

/**
 * Check if a path is an onboarding path
 */
export const isOnboardingPath = (pathname: string): boolean => {
  return pathname.startsWith('/onboarding/');
};

/**
 * Determine if an onboarding path should be accessible without authentication
 * We'll make onboarding paths require authentication by default
 */
export const isPublicOnboardingPath = (pathname: string): boolean => {
  // For now, no onboarding paths are considered public
  // If specific onboarding paths should be public, list them here
  return false;
}
