
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { DatePicker } from "@/components/ui/date-picker";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar, Check, ChevronDown, Filter } from 'lucide-react';
import { Badge } from "@/components/ui/badge";

export const ErrorLogFilter = () => {
  const [activeFilters, setActiveFilters] = useState<string[]>([]);
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  
  const handleAddFilter = (filter: string) => {
    if (!activeFilters.includes(filter)) {
      setActiveFilters([...activeFilters, filter]);
    }
  };
  
  const handleRemoveFilter = (filter: string) => {
    setActiveFilters(activeFilters.filter(f => f !== filter));
  };
  
  const handleClearFilters = () => {
    setActiveFilters([]);
    setStartDate(null);
    setEndDate(null);
  };

  return (
    <div className="space-y-4 mb-6">
      <div className="flex flex-wrap gap-2">
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline" size="sm" className="flex items-center">
              <Filter className="h-4 w-4 mr-1" />
              Add Filter
              <ChevronDown className="h-4 w-4 ml-1" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-60">
            <div className="space-y-2">
              <div className="font-medium text-sm">Filter by</div>
              <div className="grid gap-1">
                <Button 
                  variant="ghost" 
                  className="justify-start"
                  onClick={() => handleAddFilter('status')}
                >
                  Status
                </Button>
                <Button 
                  variant="ghost" 
                  className="justify-start"
                  onClick={() => handleAddFilter('profile')} 
                >
                  Profile Type
                </Button>
                <Button 
                  variant="ghost" 
                  className="justify-start"
                  onClick={() => handleAddFilter('action')}
                >
                  Action
                </Button>
                <Button 
                  variant="ghost" 
                  className="justify-start"
                  onClick={() => handleAddFilter('date')}
                >
                  Date Range
                </Button>
              </div>
            </div>
          </PopoverContent>
        </Popover>

        {activeFilters.length > 0 && (
          <Button 
            variant="outline" 
            size="sm" 
            onClick={handleClearFilters}
          >
            Clear Filters
          </Button>
        )}
      </div>

      {activeFilters.length > 0 && (
        <div className="flex flex-wrap gap-2 items-center">
          {activeFilters.includes('status') && (
            <div className="flex items-center gap-1">
              <Badge variant="outline" className="px-2">
                Status
                <button 
                  className="ml-1 hover:text-destructive" 
                  onClick={() => handleRemoveFilter('status')}
                >
                  &times;
                </button>
              </Badge>
              <Select defaultValue="all">
                <SelectTrigger className="w-[120px] h-8">
                  <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All</SelectItem>
                  <SelectItem value="resolved">Resolved</SelectItem>
                  <SelectItem value="unresolved">Unresolved</SelectItem>
                </SelectContent>
              </Select>
            </div>
          )}

          {activeFilters.includes('profile') && (
            <div className="flex items-center gap-1">
              <Badge variant="outline" className="px-2">
                Profile Type
                <button 
                  className="ml-1 hover:text-destructive" 
                  onClick={() => handleRemoveFilter('profile')}
                >
                  &times;
                </button>
              </Badge>
              <Select defaultValue="all">
                <SelectTrigger className="w-[120px] h-8">
                  <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All</SelectItem>
                  <SelectItem value="teacher">Teacher</SelectItem>
                  <SelectItem value="student">Student</SelectItem>
                  <SelectItem value="admin">Admin</SelectItem>
                  <SelectItem value="parent">Parent</SelectItem>
                </SelectContent>
              </Select>
            </div>
          )}

          {activeFilters.includes('action') && (
            <div className="flex items-center gap-1">
              <Badge variant="outline" className="px-2">
                Action
                <button 
                  className="ml-1 hover:text-destructive" 
                  onClick={() => handleRemoveFilter('action')}
                >
                  &times;
                </button>
              </Badge>
              <Select defaultValue="all">
                <SelectTrigger className="w-[150px] h-8">
                  <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All</SelectItem>
                  <SelectItem value="page_load">Page Load</SelectItem>
                  <SelectItem value="submission">Submission</SelectItem>
                  <SelectItem value="data_export">Data Export</SelectItem>
                  <SelectItem value="profile">Profile Update</SelectItem>
                </SelectContent>
              </Select>
            </div>
          )}

          {activeFilters.includes('date') && (
            <div className="flex items-center gap-1">
              <Badge variant="outline" className="px-2">
                Date Range
                <button 
                  className="ml-1 hover:text-destructive" 
                  onClick={() => handleRemoveFilter('date')}
                >
                  &times;
                </button>
              </Badge>
              <div className="flex items-center gap-1">
                <DatePicker date={startDate} setDate={setStartDate} />
                <span>to</span>
                <DatePicker date={endDate} setDate={setEndDate} />
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ErrorLogFilter;
