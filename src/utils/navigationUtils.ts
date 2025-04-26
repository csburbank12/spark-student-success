
// Determine if a path is public (doesn't require authentication)
export const isPublicPath = (path: string): boolean => {
  const publicPaths = [
    '/login',
    '/register',
    '/forgot-password',
    '/reset-password',
    '/privacy-policy',
    '/terms',
    '/select-role',
    '/404',
    '/help'  // Making help publicly accessible
  ];
  
  return publicPaths.includes(path) || path.startsWith('/auth/');
};

// Get the fallback dashboard path based on user role
export const getFallbackDashboardByRole = (role: string): string => {
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

// Determine if a route is a dashboard
export const isDashboardRoute = (path: string): boolean => {
  return path.endsWith('-dashboard') || path === '/dashboard';
};

// Get breadcrumb label from path segment
export const getBreadcrumbLabel = (segment: string): string => {
  // Special case mappings
  const specialCases: Record<string, string> = {
    'sel': 'SEL',
    'ferpa': 'FERPA',
    'admin-dashboard': 'Admin Dashboard',
    'teacher-dashboard': 'Teacher Dashboard',
    'student-dashboard': 'Student Dashboard',
    'parent-dashboard': 'Parent Dashboard',
    'staff-dashboard': 'Staff Dashboard',
    'counselor-dashboard': 'Counselor Dashboard',
    'error-logs': 'Error Logs',
    'data-analytics': 'Data Analytics',
    'loopbot-logs': 'LoopBot Logs'
  };
  
  if (specialCases[segment]) {
    return specialCases[segment];
  }
  
  // Handle regular formatting
  return segment
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
};

// Check if the current user has access to a specific route based on their role
export const hasAccessToRoute = (userRole: string, requiredRoles: string[]): boolean => {
  if (!requiredRoles || requiredRoles.length === 0) {
    return true; // No role restrictions
  }
  
  return requiredRoles.includes(userRole);
};

// Check if route is in universalRoutes (available to all authenticated users)
export const isUniversalRoute = (path: string): boolean => {
  const universalPaths = ['/profile', '/settings', '/help', '/notifications'];
  return universalPaths.includes(path) || universalPaths.some(p => path.startsWith(`${p}/`));
};

// Get proper redirect path for unauthorized access
export const getUnauthorizedRedirectPath = (userRole: string): string => {
  return getFallbackDashboardByRole(userRole);
};
