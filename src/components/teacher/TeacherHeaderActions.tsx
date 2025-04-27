
import React from "react";
import { Button } from "@/components/ui/button";
import { PlusCircle, Calendar, Bell } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { Link } from "react-router-dom";

export const TeacherHeaderActions = () => {
  return (
    <div className="flex items-center gap-2">
      <Button variant="outline" size="sm" asChild>
        <Link to="/calendar">
          <Calendar className="h-4 w-4 mr-1" />
          <span>Calendar</span>
        </Link>
      </Button>
      
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="sm">
            <Bell className="h-4 w-4 mr-1" />
            <span>Notifications</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-[300px]">
          <div className="p-2 font-medium">Notifications</div>
          <div className="p-4 text-center text-sm text-muted-foreground">
            No new notifications
          </div>
        </DropdownMenuContent>
      </DropdownMenu>
      
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button size="sm">
            <PlusCircle className="h-4 w-4 mr-1" />
            <span>Add New</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem asChild>
            <Link to="/assign-sel">Assign SEL Activity</Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link to="/schedule-meeting">Schedule Meeting</Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link to="/create-report">Create Student Report</Link>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};
