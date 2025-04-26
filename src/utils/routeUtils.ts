
export const isPathActive = (path: string, currentPath: string) => {
  if (path === currentPath) return true;
  if (path === '/student-dashboard' && currentPath === '/') return true;
  if (path === '/parent-dashboard' && currentPath === '/parent-dashboard-enhanced') return true;
  if (path === '/teacher-dashboard' && currentPath === '/teacher-dashboard-enhanced') return true;
  // Handle nested routes
  return path !== '/' && currentPath.startsWith(`${path}/`);
};
