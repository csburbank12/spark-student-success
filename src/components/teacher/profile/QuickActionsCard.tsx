
import React from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  ClipboardCheck,
  GraduationCap,
  Headphones,
  MessageSquare,
} from "lucide-react";

const QuickActionsCard = () => {
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg">Quick Actions</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <Button variant="outline" className="h-auto flex-col py-4 px-2">
            <ClipboardCheck className="h-5 w-5 mb-1" />
            <span className="text-xs">Take Attendance</span>
          </Button>
          <Button variant="outline" className="h-auto flex-col py-4 px-2">
            <GraduationCap className="h-5 w-5 mb-1" />
            <span className="text-xs">Student Check-in</span>
          </Button>
          <Button variant="outline" className="h-auto flex-col py-4 px-2">
            <Headphones className="h-5 w-5 mb-1" />
            <span className="text-xs">Staff Assist</span>
          </Button>
          <Button variant="outline" className="h-auto flex-col py-4 px-2">
            <MessageSquare className="h-5 w-5 mb-1" />
            <span className="text-xs">Messages</span>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default QuickActionsCard;
