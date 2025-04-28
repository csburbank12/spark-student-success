
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, MapPin, Users } from "lucide-react";
import { Button } from "@/components/ui/button";

const meetingsData = [
  { 
    title: "Parent-Teacher Conference", 
    date: "October 15, 2023",
    time: "3:30 PM - 4:00 PM",
    location: "Room 204",
    teacher: "Mr. Ethan Nguyen",
    status: "upcoming",
    children: ["Jada Thompson"]
  },
  { 
    title: "School Board Meeting", 
    date: "October 20, 2023",
    time: "6:00 PM - 8:00 PM",
    location: "School Auditorium",
    status: "upcoming",
    children: []
  },
  { 
    title: "Student Progress Review", 
    date: "September 28, 2023",
    time: "4:15 PM - 4:45 PM",
    location: "Virtual (Zoom)",
    teacher: "Ms. Rebecca Chen",
    status: "completed",
    children: ["Marcus Thompson"]
  }
];

const ParentMeetingsCard: React.FC = () => {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-lg flex items-center">
          <Calendar className="h-5 w-5 mr-2" />
          Meetings & Events
        </CardTitle>
        <Button variant="outline" size="sm">Schedule Meeting</Button>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {meetingsData.map((meeting, index) => (
            <div 
              key={index} 
              className={`p-4 rounded-md border ${meeting.status === 'completed' ? 'bg-muted/20' : 'bg-card'}`}
            >
              <div className="flex items-start justify-between mb-2">
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-medium">{meeting.title}</h3>
                    <Badge 
                      variant={meeting.status === 'upcoming' ? 'default' : 'secondary'} 
                      className={meeting.status === 'completed' ? 'bg-muted text-muted-foreground' : ''}
                    >
                      {meeting.status === 'upcoming' ? 'Upcoming' : 'Completed'}
                    </Badge>
                  </div>
                  <div className="flex flex-wrap gap-x-4 gap-y-2 mt-2 text-sm text-muted-foreground">
                    <div className="flex items-center">
                      <Calendar className="h-3.5 w-3.5 mr-1 opacity-70" />
                      {meeting.date}
                    </div>
                    <div className="flex items-center">
                      <Clock className="h-3.5 w-3.5 mr-1 opacity-70" />
                      {meeting.time}
                    </div>
                    <div className="flex items-center">
                      <MapPin className="h-3.5 w-3.5 mr-1 opacity-70" />
                      {meeting.location}
                    </div>
                    {meeting.teacher && (
                      <div>Teacher: {meeting.teacher}</div>
                    )}
                  </div>
                </div>
                
                {meeting.status === 'upcoming' && (
                  <div>
                    <Button variant="outline" size="sm">
                      Reschedule
                    </Button>
                  </div>
                )}
              </div>
              
              {meeting.children.length > 0 && (
                <div className="mt-3 flex items-center text-sm">
                  <Users className="h-3.5 w-3.5 mr-1 text-muted-foreground" />
                  <span className="text-muted-foreground mr-1">Regarding:</span>
                  {meeting.children.map((child, i) => (
                    <Badge key={i} variant="outline" className="mr-1">
                      {child}
                    </Badge>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default ParentMeetingsCard;
