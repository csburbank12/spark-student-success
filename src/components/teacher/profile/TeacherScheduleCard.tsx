
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
import { useTeacherSchedule } from "@/hooks/useTeacherSchedule";
import type { ScheduleItem } from "@/hooks/useTeacherSchedule";

const ScheduleItem: React.FC<ScheduleItem> = ({ title, time, location, details }) => (
  <div className="border rounded-lg p-3">
    <div className="flex items-center justify-between mb-1">
      <div className="font-medium">{title}</div>
      <Badge variant="outline">{time}</Badge>
    </div>
    <div className="text-sm text-muted-foreground">{location}{details && ` • ${details}`}</div>
  </div>
);

const TeacherScheduleCard = () => {
  const { schedule, isLoading, error } = useTeacherSchedule();

  if (isLoading) {
    return <div>Loading schedule...</div>;
  }

  if (error) {
    return <div>Error loading schedule: {error.message}</div>;
  }

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg">Today's Schedule</CardTitle>
        <CardDescription>Upcoming classes and meetings</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {schedule && schedule.length > 0 ? (
            schedule.map((item) => (
              <ScheduleItem key={item.id} {...item} />
            ))
          ) : (
            <div className="text-center py-4 text-muted-foreground">
              No scheduled events for today
            </div>
          )}
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
