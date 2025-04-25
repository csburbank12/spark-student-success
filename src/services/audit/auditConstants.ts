
// File paths and component names for audit
export const CRITICAL_COMPONENTS = [
  'Navbar',
  'Sidebar',
  'DashboardSelector',
  'ErrorBoundary',
  'Layout'
];

// Route configurations
export const UNIVERSAL_ROUTES = [
  '/dashboard',
  '/help',
  '/settings',
  '/qa-dashboard'
];

export const ROUTE_BY_ROLE = {
  student: [
    '/student-dashboard',
    '/student-dashboard-enhanced',
    '/mental-health-toolkit',
    '/digital-journal',
    '/reset-room',
    '/check-in',
    '/trusted-adults',
    '/sel-pathways',
    '/profile'
  ],
  teacher: [
    '/teacher-dashboard',
    '/teacher-dashboard-enhanced',
    '/students',
    '/sel-pathway-management',
    '/staff-assist',
    '/check-in',
    '/predictive-support',
    '/emotion-aware-scheduling',
    '/profile'
  ],
  admin: [
    '/admin/user-management',
    '/admin/data-analytics',
    '/admin/school-management',
    '/admin/ferpa-compliance',
    '/admin/system-settings',
    '/admin/loopbot-logs',
    '/profile'
  ],
  parent: [
    '/parent-dashboard',
    '/parent-dashboard-enhanced',
    '/child-activity',
    '/child-wellness',
    '/messages',
    '/parent-resources',
    '/profile'
  ],
  staff: [
    '/staff-dashboard',
    '/staff-profile',
    '/staff-assist',
    '/support-tools'
  ]
};
