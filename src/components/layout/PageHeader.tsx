
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';

interface PageHeaderProps {
  title: string;
  showBackButton?: boolean;
}

const PageHeader = ({ title, showBackButton = true }: PageHeaderProps) => {
  return (
    <div className="flex items-center justify-between mb-6">
      <div className="flex items-center gap-4">
        {showBackButton && (
          <Link to="/dashboard">
            <Button variant="ghost" size="sm">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Dashboard
            </Button>
          </Link>
        )}
        <h2 className="text-3xl font-heading font-bold">{title}</h2>
      </div>
    </div>
  );
};

export default PageHeader;
