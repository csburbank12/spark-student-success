
import React from 'react';
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Check, ChevronDown, Filter } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";

export const ErrorLogFilter = () => {
  return (
    <div className="flex items-center gap-2 mb-4">
      <Popover>
        <PopoverTrigger asChild>
          <Button variant="outline" size="sm" className="h-8 gap-1">
            <Filter className="h-3.5 w-3.5" />
            <span>Filter</span>
            <ChevronDown className="h-3.5 w-3.5" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[200px] p-0" align="start">
          <Command>
            <CommandList>
              <CommandGroup heading="Profile Type">
                <CommandItem className="flex items-center gap-2">
                  <Check className="h-4 w-4 opacity-0" />
                  <span>All Users</span>
                </CommandItem>
                <CommandItem className="flex items-center gap-2">
                  <Check className="h-4 w-4" />
                  <span>Teacher</span>
                </CommandItem>
                <CommandItem className="flex items-center gap-2">
                  <Check className="h-4 w-4 opacity-0" />
                  <span>Student</span>
                </CommandItem>
                <CommandItem className="flex items-center gap-2">
                  <Check className="h-4 w-4 opacity-0" />
                  <span>Admin</span>
                </CommandItem>
              </CommandGroup>
              <CommandSeparator />
              <CommandGroup heading="Status Code">
                <CommandItem className="flex items-center gap-2">
                  <Check className="h-4 w-4 opacity-0" />
                  <span>400 - Bad Request</span>
                </CommandItem>
                <CommandItem className="flex items-center gap-2">
                  <Check className="h-4 w-4" />
                  <span>403 - Forbidden</span>
                </CommandItem>
                <CommandItem className="flex items-center gap-2">
                  <Check className="h-4 w-4 opacity-0" />
                  <span>404 - Not Found</span>
                </CommandItem>
                <CommandItem className="flex items-center gap-2">
                  <Check className="h-4 w-4 opacity-0" />
                  <span>500 - Server Error</span>
                </CommandItem>
              </CommandGroup>
            </CommandList>
            <CommandSeparator />
            <div className="p-2">
              <Button size="sm" className="w-full">Apply Filters</Button>
            </div>
          </Command>
        </PopoverContent>
      </Popover>
      
      <Separator orientation="vertical" className="h-8" />
      
      <Button variant="ghost" size="sm" className="h-8 px-2 text-xs">
        Clear filters
      </Button>
      
      <span className="text-xs text-muted-foreground ml-2">
        Showing 3 results
      </span>
    </div>
  );
};

export default ErrorLogFilter;
