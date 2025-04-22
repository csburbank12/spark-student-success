
import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar } from "lucide-react";

interface Event {
  id: string;
  title: string;
  date: string;
  type: string;
}

interface UpcomingScheduleCardProps {
  events: Event[];
}

export const UpcomingScheduleCard: React.FC<UpcomingScheduleCardProps> = ({ events }) => (
  <Card>
    <CardHeader>
      <CardTitle className="text-xl">Upcoming Schedule</CardTitle>
    </CardHeader>
    <CardContent className="space-y-4">
      {events.map((event) => (
        <div key={event.id} className="flex items-start gap-3">
          <div className="h-10 w-10 rounded bg-primary/10 flex items-center justify-center">
            <Calendar className="h-5 w-5 text-primary" />
          </div>
          <div>
            <p className="font-medium">{event.title}</p>
            <p className="text-sm text-muted-foreground">{event.date}</p>
          </div>
        </div>
      ))}
      <Button variant="outline" className="w-full mt-2">
        View Calendar
      </Button>
    </CardContent>
  </Card>
);
