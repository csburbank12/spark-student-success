
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { DatePicker } from "@/components/ui/date-picker";
import { Button } from "@/components/ui/button";
import { Search, Filter, X } from "lucide-react";

interface ErrorLogFilterProps {
  onFilterChange: (filters: ErrorLogFilters) => void;
  filters: ErrorLogFilters;
}

export interface ErrorLogFilters {
  searchTerm: string;
  profileType: string;
  fromDate: Date | null;
  toDate: Date | null;
  status: string;
}

const ErrorLogFilter: React.FC<ErrorLogFilterProps> = ({ onFilterChange, filters }) => {
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onFilterChange({ ...filters, searchTerm: e.target.value });
  };

  const handleProfileTypeChange = (value: string) => {
    onFilterChange({ ...filters, profileType: value });
  };

  const handleStatusChange = (value: string) => {
    onFilterChange({ ...filters, status: value });
  };

  const handleFromDateChange = (date: Date | null) => {
    onFilterChange({ ...filters, fromDate: date });
  };

  const handleToDateChange = (date: Date | null) => {
    onFilterChange({ ...filters, toDate: date });
  };

  const handleClearFilters = () => {
    onFilterChange({
      searchTerm: '',
      profileType: 'all',
      fromDate: null,
      toDate: null,
      status: 'all'
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg flex items-center gap-2">
          <Filter className="h-5 w-5" />
          Filter Error Logs
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="relative">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search by error message or action..."
            className="pl-8"
            value={filters.searchTerm}
            onChange={handleSearchChange}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="space-y-2">
            <Label htmlFor="profileType">Profile Type</Label>
            <Select 
              value={filters.profileType} 
              onValueChange={handleProfileTypeChange}
            >
              <SelectTrigger id="profileType">
                <SelectValue placeholder="All Profile Types" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Profile Types</SelectItem>
                <SelectItem value="student">Student</SelectItem>
                <SelectItem value="teacher">Teacher</SelectItem>
                <SelectItem value="admin">Admin</SelectItem>
                <SelectItem value="parent">Parent</SelectItem>
                <SelectItem value="counselor">Counselor</SelectItem>
                <SelectItem value="staff">Staff</SelectItem>
                <SelectItem value="unauthenticated">Unauthenticated</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="status">Status</Label>
            <Select 
              value={filters.status} 
              onValueChange={handleStatusChange}
            >
              <SelectTrigger id="status">
                <SelectValue placeholder="All Statuses" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                <SelectItem value="resolved">Resolved</SelectItem>
                <SelectItem value="unresolved">Unresolved</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>From Date</Label>
            <DatePicker date={filters.fromDate} setDate={handleFromDateChange} />
          </div>

          <div className="space-y-2">
            <Label>To Date</Label>
            <DatePicker date={filters.toDate} setDate={handleToDateChange} />
          </div>
        </div>

        <div className="flex justify-end">
          <Button 
            variant="outline" 
            size="sm"
            onClick={handleClearFilters}
            className="flex items-center gap-2"
          >
            <X className="h-4 w-4" />
            Clear Filters
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default ErrorLogFilter;
