
import React from 'react';
import { Link } from 'react-router-dom';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { Home } from 'lucide-react';

interface NavBreadcrumbsProps {
  path: string;
}

export const NavBreadcrumbs: React.FC<NavBreadcrumbsProps> = ({ path }) => {
  // Skip rendering breadcrumbs on main dashboard
  if (path === '/' || path === '/dashboard') {
    return null;
  }

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
            <Link to="/dashboard">
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
