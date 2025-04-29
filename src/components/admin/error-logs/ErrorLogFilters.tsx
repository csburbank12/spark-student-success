
import React from 'react';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { DatePickerWithRange } from '@/components/ui/date-range-picker';
import { DateRange } from 'react-day-picker';

export interface ErrorLogFiltersProps {
  dateRange: DateRange | undefined;
  setDateRange: (range: DateRange | undefined) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  severity: string;
  setSeverity: (severity: string) => void;
  component: string;
  setComponent: (component: string) => void;
  onApplyFilters: () => void;
  onResetFilters: () => void;
}

export const ErrorLogFilters: React.FC<ErrorLogFiltersProps> = ({ 
  dateRange, 
  setDateRange,
  searchQuery,
  setSearchQuery,
  severity,
  setSeverity,
  component,
  setComponent,
  onApplyFilters,
  onResetFilters
}) => {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="space-y-2">
          <Label>Date Range</Label>
          <DatePickerWithRange
            dateRange={dateRange}
            setDateRange={setDateRange}
          />
        </div>
        
        <div className="space-y-2">
          <Label>Severity</Label>
          <Select value={severity} onValueChange={setSeverity}>
            <SelectTrigger>
              <SelectValue placeholder="Select severity" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All</SelectItem>
              <SelectItem value="error">Error</SelectItem>
              <SelectItem value="warning">Warning</SelectItem>
              <SelectItem value="info">Info</SelectItem>
              <SelectItem value="debug">Debug</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div className="space-y-2">
          <Label>Component</Label>
          <Select value={component} onValueChange={setComponent}>
            <SelectTrigger>
              <SelectValue placeholder="Select component" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Components</SelectItem>
              <SelectItem value="frontend">Frontend</SelectItem>
              <SelectItem value="backend">Backend</SelectItem>
              <SelectItem value="auth">Authentication</SelectItem>
              <SelectItem value="database">Database</SelectItem>
              <SelectItem value="api">API</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div className="space-y-2">
          <Label>Search</Label>
          <div className="flex space-x-2">
            <Input
              placeholder="Search error messages..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
      </div>
      
      <div className="flex justify-end space-x-2">
        <Button variant="outline" onClick={onResetFilters}>Reset Filters</Button>
        <Button onClick={onApplyFilters}>Apply Filters</Button>
      </div>
    </div>
  );
};
