
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { Home } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { UserRole } from '@/types/roles';

interface NavBreadcrumbsProps {
  path: string;
}

export const NavBreadcrumbs: React.FC<NavBreadcrumbsProps> = ({ path }) => {
  const { user } = useAuth();
  const location = useLocation();
  
  // Skip rendering breadcrumbs on main dashboard or invalid routes
  if (path === '/' || path === '/dashboard' || path === '/404') {
    return null;
  }

  // Determine home link based on user role
  const getHomeLink = () => {
    if (!user) return "/login";
    
    switch (user.role as UserRole) {
      case UserRole.admin:
        return "/admin-dashboard";
      case UserRole.teacher:
        return "/teacher-dashboard";
      case UserRole.student:
        return "/student-dashboard";
      case UserRole.parent:
        return "/parent-dashboard";
      case UserRole.staff:
        return "/staff-dashboard";
      default:
        return "/dashboard";
    }
  };

  // Remove leading and trailing slashes and split the path
  const segments = path.split('/')
    .filter(segment => segment !== '');

  // Create breadcrumb items
  const breadcrumbItems = segments.map((segment, index) => {
    // Calculate the path for this breadcrumb
    const url = '/' + segments.slice(0, index + 1).join('/');
    
    // Format the segment for display (capitalize, replace hyphens)
    const displayName = segment
      .replace(/-/g, ' ')
      .split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
    
    return { name: displayName, path: url };
  });

  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink asChild>
            <Link to={getHomeLink()}>
              <Home className="h-4 w-4 mr-1" />
              <span className="sr-only md:not-sr-only md:inline-block">Dashboard</span>
            </Link>
          </BreadcrumbLink>
        </BreadcrumbItem>
        
        {breadcrumbItems.map((item, index) => (
          <React.Fragment key={item.path}>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink 
                asChild
                className={index === breadcrumbItems.length - 1 ? 'font-semibold' : ''}
              >
                <Link to={item.path}>
                  {item.name}
                </Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
          </React.Fragment>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  );
};
