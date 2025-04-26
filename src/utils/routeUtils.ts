
export const isPathActive = (path: string, currentPath: string) => {
  if (path === currentPath) return true;
  if (path === '/student-dashboard' && currentPath === '/') return true;
  if (path === '/parent-dashboard' && (currentPath === '/parent-dashboard-enhanced' || currentPath === '/')) return true;
  if (path === '/teacher-dashboard' && currentPath === '/teacher-dashboard-enhanced') return true;
  if (path === '/counselor-dashboard' && currentPath === '/') return true;
  if (path === '/admin-dashboard' && currentPath === '/') return true;
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

// Helper to get the appropriate path for a profile based on role
export const getProfilePathForRole = (role: string): string => {
  // For now, all roles use the same profile path
  return '/profile';
};

// Helper to get a contextual "back" URL based on current path and user role
export const getBackUrl = (currentPath: string, role: string): string => {
  // If we're in a profile or sub-page, go back to the dashboard
  if (currentPath.includes('/profile') || currentPath.includes('/settings')) {
    return getDashboardPathForRole(role);
  }
  
  // For other paths, try to determine the parent section
  if (currentPath.includes('/child-')) {
    return '/parent-dashboard';
  }
  
  if (currentPath.includes('/student-')) {
    return '/teacher-dashboard';
  }
  
  // Default fallback to the dashboard
  return getDashboardPathForRole(role);
};
