
export const isPathActive = (path: string, currentPath: string) => {
  if (path === currentPath) return true;
  if (path === '/student-dashboard' && currentPath === '/') return true;
  if (path === '/parent-dashboard' && (currentPath === '/parent-dashboard-enhanced' || currentPath === '/')) return true;
  if (path === '/teacher-dashboard' && currentPath === '/teacher-dashboard-enhanced') return true;
  if (path === '/counselor-dashboard' && currentPath === '/') return true;
  if (path === '/admin-dashboard' && currentPath === '/') return true;
  // Profile paths should match exactly for each role
  if (path === '/profile' && currentPath === '/profile') return true;
  if (path === '/settings' && currentPath === '/settings') return true;
  if (path === '/help' && currentPath === '/help') return true;
  if (path === '/notifications' && currentPath === '/notifications') return true;
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
  if (currentPath.includes('/profile') || currentPath.includes('/settings') || 
      currentPath.includes('/help') || currentPath.includes('/notifications')) {
    return getDashboardPathForRole(role);
  }
  
  // For other paths, try to determine the parent section
  if (currentPath.includes('/child-')) {
    return '/parent-dashboard';
  }
  
  if (currentPath.includes('/student-')) {
    return '/teacher-dashboard';
  }
  
  if (currentPath.includes('/admin/')) {
    return '/admin-dashboard';
  }
  
  // Default fallback to the dashboard
  return getDashboardPathForRole(role);
};

export const getFallbackDashboardByRole = (role: string): string => {
  return getDashboardPathForRole(role);
};

// Helper to determine if a page belongs to a specific user role
export const isPageForRole = (path: string, role: string): boolean => {
  const rolePaths = {
    admin: ['/admin', '/admin-dashboard'],
    teacher: ['/teacher', '/teacher-dashboard'],
    student: ['/student', '/student-dashboard'],
    parent: ['/parent', '/parent-dashboard'],
    staff: ['/staff', '/staff-dashboard'],
    counselor: ['/counselor', '/counselor-dashboard']
  };
  
  const rolePrefix = rolePaths[role as keyof typeof rolePaths];
  if (!rolePrefix) return false;
  
  return rolePrefix.some(prefix => path.startsWith(prefix));
};

// Helper to check if a path is a universal route available to all roles
export const isUniversalRoute = (path: string): boolean => {
  const universalRoutes = [
    '/profile',
    '/settings',
    '/help',
    '/notifications'
  ];
  
  return universalRoutes.includes(path) || universalRoutes.some(route => path.startsWith(route + '/'));
};
