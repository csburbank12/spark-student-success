
import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar } from "lucide-react";

interface ScheduleItemProps {
  title: string;
  time: string;
  location: string;
  details?: string;
}

const ScheduleItem: React.FC<ScheduleItemProps> = ({ title, time, location, details }) => (
  <div className="border rounded-lg p-3">
    <div className="flex items-center justify-between mb-1">
      <div className="font-medium">{title}</div>
      <Badge variant="outline">{time}</Badge>
    </div>
    <div className="text-sm text-muted-foreground">{location}{details && ` • ${details}`}</div>
  </div>
);

const TeacherScheduleCard = () => {
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg">Today's Schedule</CardTitle>
        <CardDescription>Upcoming classes and meetings</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          <ScheduleItem
            title="Period 1: Social Studies"
            time="8:30 - 9:20"
            location="Room 203"
            details="28 students"
          />
          <ScheduleItem
            title="Faculty Meeting"
            time="12:30 - 1:30"
            location="Conference Room"
          />
          <Button className="w-full" variant="outline">
            <Calendar className="mr-2 h-4 w-4" />
            View Full Calendar
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default TeacherScheduleCard;
