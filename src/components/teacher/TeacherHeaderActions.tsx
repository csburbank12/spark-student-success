
import React from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Bell, Calendar, Users } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

export const TeacherHeaderActions = () => {
  const navigate = useNavigate();
  
  const handleScheduleCheckIn = () => {
    navigate("/check-in");
    toast.info("Opening check-in scheduler...");
  };

  return (
    <div className="flex items-center gap-2">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="sm" className="relative">
            <Bell className="h-4 w-4 mr-1" />
            Alerts
            <Badge className="ml-1 bg-amber-500">3</Badge>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-80">
          <div className="p-2">
            <h4 className="font-medium mb-1">Recent Alerts</h4>
            <p className="text-sm text-muted-foreground">You have 3 unread alerts</p>
          </div>
          <DropdownMenuSeparator />
          <DropdownMenuItem className="cursor-pointer" onClick={() => navigate("/students")}>
            <div className="flex flex-col gap-1">
              <p className="font-medium">Student Check-in Required</p>
              <p className="text-sm text-muted-foreground">Alex hasn't checked in for 2 days</p>
            </div>
          </DropdownMenuItem>
          <DropdownMenuItem className="cursor-pointer">
            <div className="flex flex-col gap-1">
              <p className="font-medium">New SEL Activity Available</p>
              <p className="text-sm text-muted-foreground">Mindfulness exercise ready for review</p>
            </div>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <Button variant="outline" size="sm" onClick={() => navigate("/students")}>
        <Users className="h-4 w-4 mr-1" />
        Students
      </Button>

      <Button size="sm" onClick={handleScheduleCheckIn}>
        <Calendar className="h-4 w-4 mr-1" />
        Schedule Check-in
      </Button>
    </div>
  );
};
