
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
    'loopbot-logs': 'LoopBot Logs',
    'admin': 'Admin',
    'home': 'Home'
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

// Get route name from path
export const getRouteNameFromPath = (path: string): string => {
  const segments = path.split('/').filter(Boolean);
  if (segments.length === 0) return 'Home';
  
  const lastSegment = segments[segments.length - 1];
  return getBreadcrumbLabel(lastSegment);
};

// Determine if the current path is active
export const isActivePath = (currentPath: string, routePath: string): boolean => {
  if (routePath === '/') {
    return currentPath === '/';
  }
  
  return currentPath.startsWith(routePath);
};
