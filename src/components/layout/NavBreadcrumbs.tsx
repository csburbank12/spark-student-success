
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ChevronRight, Home } from 'lucide-react';
import { 
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { useAuth } from '@/contexts/AuthContext';

const NavBreadcrumbs = () => {
  const location = useLocation();
  const { user } = useAuth();
  const pathnames = location.pathname.split('/').filter(Boolean);

  // Map specific path segments to more user-friendly names
  const getDisplayName = (path: string, index: number) => {
    // Special cases for common paths
    const commonPaths: Record<string, string> = {
      'dashboard': 'Dashboard',
      'profile': 'Profile',
      'settings': 'Settings',
      'help': 'Help & Support',
      'qa-dashboard': 'QA Dashboard',
    };

    if (commonPaths[path]) return commonPaths[path];
    
    // Role-specific dashboards
    if (path.includes('-dashboard')) {
      const role = path.split('-')[0];
      return `${role.charAt(0).toUpperCase() + role.slice(1)} Dashboard`;
    }

    // Create a readable name from path segments
    return path.split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };
  
  // Get the proper home path based on user role
  const getHomePath = () => {
    if (!user) return '/';
    return '/dashboard';
  };
  
  // For empty paths, show at least the dashboard
  if (pathnames.length === 0 || (pathnames.length === 1 && pathnames[0] === 'dashboard')) {
    return (
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbPage>
              <Home className="h-4 w-4 mr-1 inline" />
              <span>Dashboard</span>
            </BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
    );
  }
  
  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink asChild>
            <Link to={getHomePath()}>
              <Home className="h-4 w-4 mr-1" />
              <span>Dashboard</span>
            </Link>
          </BreadcrumbLink>
        </BreadcrumbItem>

        {pathnames.map((name, index) => {
          const routeTo = `/${pathnames.slice(0, index + 1).join('/')}`;
          const isLast = index === pathnames.length - 1;

          return (
            <React.Fragment key={routeTo}>
              <BreadcrumbSeparator>
                <ChevronRight className="h-4 w-4" />
              </BreadcrumbSeparator>
              
              {isLast ? (
                <BreadcrumbPage>{getDisplayName(name, index)}</BreadcrumbPage>
              ) : (
                <BreadcrumbItem>
                  <BreadcrumbLink asChild>
                    <Link to={routeTo}>
                      {getDisplayName(name, index)}
                    </Link>
                  </BreadcrumbLink>
                </BreadcrumbItem>
              )}
            </React.Fragment>
          );
        })}
      </BreadcrumbList>
    </Breadcrumb>
  );
};

export default NavBreadcrumbs;
