
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar, Clock, Users, Video, MapPin, Plus } from "lucide-react";
import { Badge } from "@/components/ui/badge";

// Mock data for parent meetings
const upcomingMeetings = [
  {
    id: "m1",
    title: "Parent-Teacher Conference",
    date: "Apr 30, 2025",
    time: "3:30 PM - 4:00 PM",
    teacher: "Ms. Rodriguez",
    location: "Room 204",
    status: "confirmed",
    isVirtual: false,
    child: "Alex Johnson"
  },
  {
    id: "m2",
    title: "IEP Review Meeting",
    date: "May 5, 2025",
    time: "2:00 PM - 3:00 PM",
    teacher: "Dr. Martinez",
    location: "Virtual (Zoom)",
    status: "confirmed",
    isVirtual: true,
    child: "Jordan Johnson"
  },
  {
    id: "m3",
    title: "SEL Program Introduction",
    date: "May 12, 2025",
    time: "5:30 PM - 6:30 PM",
    teacher: "School Counselor Team",
    location: "School Auditorium",
    status: "pending",
    isVirtual: false,
    child: "All Parents"
  },
];

const pastMeetings = [
  {
    id: "m4",
    title: "Mid-Year Progress Review",
    date: "Feb 15, 2025",
    time: "4:00 PM - 4:30 PM",
    teacher: "Ms. Thompson",
    location: "Room 105",
    status: "completed",
    isVirtual: false,
    child: "Alex Johnson"
  },
  {
    id: "m5",
    title: "Behavior Support Planning",
    date: "Jan 20, 2025",
    time: "3:15 PM - 4:00 PM",
    teacher: "Mr. Johnson",
    location: "Virtual (Zoom)",
    status: "completed",
    isVirtual: true,
    child: "Jordan Johnson"
  },
];

const ParentMeetings: React.FC = () => {
  const [activeTab, setActiveTab] = useState("upcoming");

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <h2 className="text-3xl font-heading font-bold">Meetings & Events</h2>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Request Meeting
        </Button>
      </div>

      <Tabs defaultValue={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
          <TabsTrigger value="past">Past Meetings</TabsTrigger>
        </TabsList>
        
        <TabsContent value="upcoming" className="space-y-4 pt-4">
          {upcomingMeetings.length > 0 ? (
            upcomingMeetings.map((meeting) => (
              <Card key={meeting.id} className={`overflow-hidden transition-all ${
                meeting.status === 'confirmed' ? 'border-l-4 border-l-green-500' : 'border-l-4 border-l-amber-500'
              }`}>
                <CardHeader className="pb-2">
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle>{meeting.title}</CardTitle>
                      <p className="text-sm text-muted-foreground">For {meeting.child}</p>
                    </div>
                    <Badge variant={meeting.status === 'confirmed' ? 'outline' : 'secondary'}>
                      {meeting.status === 'confirmed' ? 'Confirmed' : 'Pending'}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-3">
                      <div className="flex items-start gap-3">
                        <Calendar className="h-4 w-4 mt-0.5 text-muted-foreground" />
                        <div>
                          <p className="font-medium">Date</p>
                          <p className="text-sm">{meeting.date}</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <Clock className="h-4 w-4 mt-0.5 text-muted-foreground" />
                        <div>
                          <p className="font-medium">Time</p>
                          <p className="text-sm">{meeting.time}</p>
                        </div>
                      </div>
                    </div>
                    <div className="space-y-3">
                      <div className="flex items-start gap-3">
                        <Users className="h-4 w-4 mt-0.5 text-muted-foreground" />
                        <div>
                          <p className="font-medium">With</p>
                          <p className="text-sm">{meeting.teacher}</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        {meeting.isVirtual ? (
                          <Video className="h-4 w-4 mt-0.5 text-muted-foreground" />
                        ) : (
                          <MapPin className="h-4 w-4 mt-0.5 text-muted-foreground" />
                        )}
                        <div>
                          <p className="font-medium">Location</p>
                          <p className="text-sm">{meeting.location}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex gap-2 bg-muted/20 border-t">
                  {meeting.status === 'confirmed' ? (
                    <>
                      {meeting.isVirtual && (
                        <Button className="flex-1">
                          <Video className="h-4 w-4 mr-2" />
                          Join Meeting
                        </Button>
                      )}
                      <Button variant="outline" className="flex-1">Add to Calendar</Button>
                      <Button variant="outline" className="flex-1">Reschedule</Button>
                    </>
                  ) : (
                    <>
                      <Button variant="outline" className="flex-1">Confirm</Button>
                      <Button variant="outline" className="flex-1">Request Another Time</Button>
                    </>
                  )}
                </CardFooter>
              </Card>
            ))
          ) : (
            <div className="p-6 text-center">
              <p className="text-muted-foreground">No upcoming meetings scheduled</p>
              <Button variant="outline" className="mt-4">
                <Plus className="mr-2 h-4 w-4" />
                Request a Meeting
              </Button>
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="past" className="space-y-4 pt-4">
          {pastMeetings.length > 0 ? (
            pastMeetings.map((meeting) => (
              <Card key={meeting.id}>
                <CardHeader className="pb-2">
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle>{meeting.title}</CardTitle>
                      <p className="text-sm text-muted-foreground">For {meeting.child}</p>
                    </div>
                    <Badge variant="outline">Completed</Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-3">
                      <div className="flex items-start gap-3">
                        <Calendar className="h-4 w-4 mt-0.5 text-muted-foreground" />
                        <div>
                          <p className="font-medium">Date</p>
                          <p className="text-sm">{meeting.date}</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <Clock className="h-4 w-4 mt-0.5 text-muted-foreground" />
                        <div>
                          <p className="font-medium">Time</p>
                          <p className="text-sm">{meeting.time}</p>
                        </div>
                      </div>
                    </div>
                    <div className="space-y-3">
                      <div className="flex items-start gap-3">
                        <Users className="h-4 w-4 mt-0.5 text-muted-foreground" />
                        <div>
                          <p className="font-medium">With</p>
                          <p className="text-sm">{meeting.teacher}</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        {meeting.isVirtual ? (
                          <Video className="h-4 w-4 mt-0.5 text-muted-foreground" />
                        ) : (
                          <MapPin className="h-4 w-4 mt-0.5 text-muted-foreground" />
                        )}
                        <div>
                          <p className="font-medium">Location</p>
                          <p className="text-sm">{meeting.location}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex gap-2 bg-muted/20 border-t">
                  <Button variant="outline" className="flex-1">View Notes</Button>
                  <Button variant="outline" className="flex-1">Request Follow-up</Button>
                </CardFooter>
              </Card>
            ))
          ) : (
            <div className="p-6 text-center">
              <p className="text-muted-foreground">No past meetings found</p>
            </div>
          )}
        </TabsContent>
      </Tabs>
      
      <Card>
        <CardHeader>
          <CardTitle>Upcoming School Events</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-start gap-3 pb-4 border-b">
              <div className="flex flex-col items-center justify-center h-12 w-12 rounded-md bg-primary/10">
                <span className="text-lg font-bold">15</span>
                <span className="text-xs">May</span>
              </div>
              <div>
                <h4 className="font-medium">Spring Concert</h4>
                <p className="text-sm text-muted-foreground">7:00 PM - School Auditorium</p>
                <p className="text-sm">All grade levels performing</p>
              </div>
            </div>
            
            <div className="flex items-start gap-3 pb-4 border-b">
              <div className="flex flex-col items-center justify-center h-12 w-12 rounded-md bg-primary/10">
                <span className="text-lg font-bold">22</span>
                <span className="text-xs">May</span>
              </div>
              <div>
                <h4 className="font-medium">Parent Association Meeting</h4>
                <p className="text-sm text-muted-foreground">6:00 PM - School Library</p>
                <p className="text-sm">End-of-year planning and officer elections</p>
              </div>
            </div>
            
            <div className="flex items-start gap-3">
              <div className="flex flex-col items-center justify-center h-12 w-12 rounded-md bg-primary/10">
                <span className="text-lg font-bold">5</span>
                <span className="text-xs">Jun</span>
              </div>
              <div>
                <h4 className="font-medium">Field Day</h4>
                <p className="text-sm text-muted-foreground">9:00 AM - School Grounds</p>
                <p className="text-sm">Annual outdoor activities and games</p>
              </div>
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button variant="outline" className="w-full">View All School Events</Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default ParentMeetings;
