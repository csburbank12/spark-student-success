
import React from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search, X } from 'lucide-react';

interface ErrorLogFiltersProps {
  showResolved: boolean;
  setShowResolved: (value: boolean) => void;
  errorType: string;
  setErrorType: (value: string) => void;
  searchQuery: string;
  setSearchQuery: (value: string) => void;
  onReset: () => void;
}

const ErrorLogFilters = ({
  showResolved,
  setShowResolved,
  errorType,
  setErrorType,
  searchQuery,
  setSearchQuery,
  onReset,
}: ErrorLogFiltersProps) => {
  return (
    <div className="flex flex-col lg:flex-row gap-4 lg:items-center mb-6">
      <div className="flex items-center gap-2">
        <span className="text-sm text-muted-foreground">Show Resolved</span>
        <Switch checked={showResolved} onCheckedChange={setShowResolved} />
      </div>
      
      <div className="flex-1">
        <Select value={errorType} onValueChange={setErrorType}>
          <SelectTrigger>
            <SelectValue placeholder="Filter by error type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All errors</SelectItem>
            <SelectItem value="javascript">JavaScript errors</SelectItem>
            <SelectItem value="api">API errors</SelectItem>
            <SelectItem value="database">Database errors</SelectItem>
            <SelectItem value="validation">Validation errors</SelectItem>
            <SelectItem value="404">404 errors</SelectItem>
          </SelectContent>
        </Select>
      </div>
      
      <div className="flex-1 relative">
        <Input
          placeholder="Search error messages..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-9"
        />
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
      </div>
      
      <Button variant="outline" onClick={onReset} className="whitespace-nowrap">
        <X className="mr-2 h-4 w-4" />
        Reset Filters
      </Button>
    </div>
  );
};

export default ErrorLogFilters;
