
import React, { useMemo } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { Home } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { UserRole } from '@/types/roles';
import { getFallbackDashboardByRole } from '@/utils/navigationUtils';

interface NavBreadcrumbsProps {
  path: string;
}

export const NavBreadcrumbs: React.FC<NavBreadcrumbsProps> = ({ path }) => {
  const { user } = useAuth();
  const location = useLocation();
  
  // Skip rendering breadcrumbs on main pages
  const skipPaths = ['/', '/dashboard', '/login', '/signup', '/404'];
  if (skipPaths.includes(path)) {
    return null;
  }

  // Determine home link based on user role
  const homeLink = useMemo(() => {
    if (!user) return "/login";
    return getFallbackDashboardByRole(user.role as UserRole);
  }, [user]);

  // Create breadcrumb items - memoize to prevent recalculation on every render
  const breadcrumbItems = useMemo(() => {
    // Remove leading and trailing slashes and split the path
    const segments = path.split('/').filter(segment => segment !== '');
    
    // Special case for onboarding paths
    if (segments[0] === 'onboarding') {
      const userType = segments[1] || '';
      return [{
        name: 'Onboarding',
        path: `/onboarding/${userType}`,
        isLast: segments.length <= 2
      }];
    }
    
    return segments.map((segment, index) => {
      // Calculate the path for this breadcrumb
      const url = '/' + segments.slice(0, index + 1).join('/');
      
      // Format the segment for display (capitalize, replace hyphens)
      const displayName = segment
        .replace(/-/g, ' ')
        .split(' ')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
      
      return { 
        name: displayName, 
        path: url,
        isLast: index === segments.length - 1
      };
    });
  }, [path]);

  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink asChild>
            <Link to={homeLink} className="flex items-center">
              <Home className="h-4 w-4 mr-1" />
              <span className="sr-only md:not-sr-only md:inline-block">Home</span>
            </Link>
          </BreadcrumbLink>
        </BreadcrumbItem>
        
        {breadcrumbItems.map((item, index) => (
          <React.Fragment key={item.path}>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink 
                asChild
                className={item.isLast ? 'font-semibold text-foreground' : ''}
              >
                {item.isLast ? (
                  <span>{item.name}</span>
                ) : (
                  <Link to={item.path}>
                    {item.name}
                  </Link>
                )}
              </BreadcrumbLink>
            </BreadcrumbItem>
          </React.Fragment>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  );
};
