
import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { UserRole } from '@/types/roles';
import { ChevronRight, Home } from 'lucide-react';
import { cn } from '@/lib/utils';

interface NavBreadcrumbsProps {
  path: string;
  className?: string;
}

export const NavBreadcrumbs: React.FC<NavBreadcrumbsProps> = ({ path, className }) => {
  const { user } = useAuth();
  const role = user?.role as UserRole;

  const getHomeRoute = () => {
    switch (role) {
      case UserRole.admin:
        return { label: 'Admin Dashboard', path: '/admin-dashboard' };
      case UserRole.teacher:
        return { label: 'Teacher Dashboard', path: '/teacher-dashboard' };
      case UserRole.student:
        return { label: 'Student Dashboard', path: '/student-dashboard' };
      case UserRole.parent:
        return { label: 'Parent Dashboard', path: '/parent-dashboard' };
      case UserRole.staff:
        return { label: 'Staff Dashboard', path: '/staff-dashboard' };
      case UserRole.counselor:
        return { label: 'Counselor Dashboard', path: '/counselor-dashboard' };
      default:
        return { label: 'Dashboard', path: '/dashboard' };
    }
  };

  const getBreadcrumbs = () => {
    const segments = path.split('/').filter(Boolean);
    if (segments.length === 0) return [getHomeRoute()];

    let breadcrumbs = [getHomeRoute()];
    
    // Convert URL segments to readable text
    const urlToText = (segment: string) => {
      // Handle special cases
      if (segment === 'admin-dashboard') return 'Admin Dashboard';
      if (segment === 'ferpa-compliance') return 'FERPA Compliance';
      
      // Standard formatting
      return segment
        .split('-')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
    };

    // Build the breadcrumbs array
    for (let i = 0; i < segments.length; i++) {
      const segment = segments[i];
      const path = '/' + segments.slice(0, i + 1).join('/');
      breadcrumbs.push({ label: urlToText(segment), path });
    }
    
    return breadcrumbs;
  };

  const breadcrumbs = getBreadcrumbs();

  return (
    <nav aria-label="Breadcrumbs" className={cn("flex items-center gap-1 text-sm text-muted-foreground", className)}>
      <ol className="flex items-center gap-1">
        {breadcrumbs.map((crumb, index) => (
          <React.Fragment key={crumb.path}>
            {index > 0 && (
              <ChevronRight className="h-4 w-4 text-muted-foreground/50" />
            )}
            <li>
              {index === breadcrumbs.length - 1 ? (
                <span className="font-medium text-foreground">{crumb.label}</span>
              ) : (
                <Link 
                  to={crumb.path}
                  className="hover:text-foreground transition-colors"
                >
                  {index === 0 ? (
                    <span className="flex items-center gap-1">
                      <Home className="h-3.5 w-3.5" />
                      <span className="sr-only">{crumb.label}</span>
                    </span>
                  ) : (
                    crumb.label
                  )}
                </Link>
              )}
            </li>
          </React.Fragment>
        ))}
      </ol>
    </nav>
  );
};
