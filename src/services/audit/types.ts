
export type ProfileType = 'student' | 'teacher' | 'admin' | 'parent' | 'staff' | 'unauthenticated' | 'unknown' | 'system';

export interface AuditResult {
  success: boolean;
  totalChecked: number;
  errorCount: number;
  details: AuditResultDetails;
}

export interface AuditResultDetails {
  roleChecks: RoleCheckResult[];
  routeChecks: RouteCheckResult[];
  componentChecks: ComponentCheckResult[];
}

export interface RoleCheckResult {
  role: string;
  status: 'success' | 'error';
  message?: string;
}

export interface RouteCheckResult {
  route: string;
  status: 'success' | 'error';
  errorType?: string;
  message?: string;
}

export interface ComponentCheckResult {
  component: string;
  location: string;
  status: 'success' | 'error';
  errorType?: string;
  message?: string;
}

export interface AuditOptions {
  checkAllRoles?: boolean;
  checkRoutes?: boolean;
  checkComponents?: boolean;
  logErrors?: boolean;
  currentUserOnly?: boolean;
}
