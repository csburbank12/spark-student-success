
import React from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Bell, AlertCircle } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export const AlertDropdown: React.FC = () => (
  <DropdownMenu>
    <DropdownMenuTrigger asChild>
      <Button variant="outline" className="gap-1">
        <Bell className="h-4 w-4" />
        <span>Alerts</span>
        <Badge className="ml-1 bg-amber-500">4</Badge>
      </Button>
    </DropdownMenuTrigger>
    <DropdownMenuContent align="end" className="w-80">
      <DropdownMenuLabel>Recent Alerts</DropdownMenuLabel>
      <DropdownMenuSeparator />
      <DropdownMenuItem className="cursor-pointer">
        <div className="flex items-start gap-2">
          <AlertCircle className="h-4 w-4 text-amber-500 mt-0.5" />
          <div>
            <p className="font-medium">Alex Johnson - Mood decline</p>
            <p className="text-sm text-muted-foreground">Reported feeling sad for 3 consecutive days</p>
            <p className="text-xs text-muted-foreground mt-1">10 minutes ago</p>
          </div>
        </div>
      </DropdownMenuItem>
      <DropdownMenuItem className="cursor-pointer">
        <div className="flex items-start gap-2">
          <AlertCircle className="h-4 w-4 text-amber-500 mt-0.5" />
          <div>
            <p className="font-medium">Emma Davis - Missed check-ins</p>
            <p className="text-sm text-muted-foreground">No check-ins for 3 consecutive days</p>
            <p className="text-xs text-muted-foreground mt-1">2 hours ago</p>
          </div>
        </div>
      </DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>
);
