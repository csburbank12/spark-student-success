
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

export interface PageHeaderProps {
  title: string;
  description?: string;
  showBackButton?: boolean;
}

const PageHeader = ({ title, description, showBackButton = true }: PageHeaderProps) => {
  const { user } = useAuth();
  
  // Determine the correct dashboard route based on user role
  const getDashboardRoute = () => {
    if (!user?.role) return '/dashboard';
    
    switch (user.role) {
      case 'teacher':
        return '/teacher-dashboard-enhanced';
      case 'student':
        return '/student-dashboard-enhanced';
      case 'admin':
        return '/admin-dashboard-enhanced';
      case 'parent':
        return '/parent-dashboard-enhanced';
      default:
        return '/dashboard';
    }
  };

  return (
    <div className="flex flex-col space-y-2 mb-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          {showBackButton && (
            <Link to={getDashboardRoute()}>
              <Button variant="ghost" size="sm">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Dashboard
              </Button>
            </Link>
          )}
          <h2 className="text-3xl font-heading font-bold">{title}</h2>
        </div>
      </div>
      {description && (
        <p className="text-muted-foreground">{description}</p>
      )}
    </div>
  );
};

export default PageHeader;
