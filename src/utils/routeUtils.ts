
export const isPathActive = (path: string, currentPath: string) => {
  if (path === currentPath) return true;
  if (path === '/student-dashboard' && currentPath === '/') return true;
  if (path === '/parent-dashboard' && currentPath === '/parent-dashboard-enhanced') return true;
  if (path === '/teacher-dashboard' && currentPath === '/teacher-dashboard-enhanced') return true;
  // Profile paths should match exactly for each role
  if (path === '/profile' && currentPath === '/profile') return true;
  // Handle nested routes
  return path !== '/' && currentPath.startsWith(`${path}/`);
};

// Add role-specific dashboard mapping
export const getDashboardPathForRole = (role: string): string => {
  switch (role.toLowerCase()) {
    case 'parent':
      return '/parent-dashboard';
    case 'teacher':
      return '/teacher-dashboard';
    case 'student':
      return '/student-dashboard';
    case 'admin':
      return '/admin-dashboard';
    case 'staff':
      return '/staff-dashboard';
    case 'counselor':
      return '/counselor-dashboard';
    default:
      return '/dashboard';
  }
};
