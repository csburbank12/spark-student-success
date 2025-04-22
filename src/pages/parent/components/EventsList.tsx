
import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock } from "lucide-react";

interface Event {
  id: number;
  title: string;
  date: string;
  location?: string;
  type: string;
}

interface EventsListProps {
  events: Event[];
}

export const EventsList: React.FC<EventsListProps> = ({ events }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Upcoming Events</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {events.map(event => (
            <div key={event.id} className="p-4 border rounded-lg">
              <div className="flex items-center justify-between mb-1">
                <h3 className="font-medium">{event.title}</h3>
                <Badge variant="outline">{event.type}</Badge>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground mt-2">
                <Clock className="h-3 w-3" />
                {event.date}
              </div>
              {event.location && (
                <p className="text-sm mt-1">Location: {event.location}</p>
              )}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default EventsList;
