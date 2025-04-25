
import { UserRole } from "@/types/roles";

/**
 * Get the appropriate fallback route based on user role
 * @param role User's role
 * @returns The fallback dashboard route
 */
export const getFallbackDashboardByRole = (role: string): string => {
  switch (role) {
    case UserRole.admin:
      return '/admin-dashboard';
    case UserRole.teacher:
      return '/teacher-dashboard';
    case UserRole.staff:
      return '/staff-dashboard';
    case UserRole.student:
      return '/student-dashboard';
    case UserRole.parent:
      return '/parent-dashboard';
    default:
      return '/dashboard';
  }
};

/**
 * Check if the current path matches any of the provided routes
 * @param currentPath The current path
 * @param routesList List of routes to check against
 * @returns Boolean indicating if the path matches any route
 */
export const isValidRoute = (currentPath: string, routesList: Array<{path: string}>): boolean => {
  // Check exact matches
  if (routesList.some(route => route.path === currentPath)) {
    return true;
  }
  
  // Check for routes with parameters
  return routesList.some(route => {
    const routePath = route.path;
    if (routePath.includes(':')) {
      // Convert route pattern to regex
      const pattern = routePath.replace(/:[^/]+/g, '[^/]+');
      const regex = new RegExp(`^${pattern}$`);
      return regex.test(currentPath);
    }
    return false;
  });
};

/**
 * Check if a user has permission to access a route
 * @param userRole The user's role
 * @param requiredRoles Array of roles that can access the route
 * @returns Boolean indicating if the user can access the route
 */
export const hasRouteAccess = (userRole: string, requiredRoles: string[]): boolean => {
  if (!requiredRoles || requiredRoles.length === 0) {
    return true; // No roles required, everyone can access
  }
  
  return requiredRoles.includes(userRole);
};
