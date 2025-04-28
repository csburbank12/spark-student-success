
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, Users, MapPin, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { format, addDays, subDays, startOfWeek, endOfWeek } from "date-fns";
import { toast } from "sonner";

const meetingsData = [
  {
    id: "1",
    title: "Student Check-in: Jada Thompson",
    time: "9:00 AM - 9:30 AM",
    date: "2023-10-15",
    attendees: ["Jada Thompson"],
    location: "Counseling Office 102",
    type: "check-in"
  },
  {
    id: "2",
    title: "College Planning: Jordan Lee",
    time: "10:15 AM - 11:00 AM",
    date: "2023-10-15",
    attendees: ["Jordan Lee", "Ms. Martinez (College Advisor)"],
    location: "Counseling Office 102",
    type: "planning"
  },
  {
    id: "3",
    title: "Crisis Intervention: Alex Johnson",
    time: "1:30 PM - 2:15 PM",
    date: "2023-10-15",
    attendees: ["Alex Johnson"],
    location: "Counseling Office 102",
    type: "intervention",
    urgent: true
  },
  {
    id: "4",
    title: "Parent Meeting: Thompson Family",
    time: "3:00 PM - 4:00 PM",
    date: "2023-10-15",
    attendees: ["Jada Thompson", "Sarah Thompson (Parent)", "Mr. Nguyen (Math Teacher)"],
    location: "Conference Room A",
    type: "parent"
  },
  {
    id: "5",
    title: "Weekly Staff Meeting",
    time: "8:00 AM - 9:00 AM",
    date: "2023-10-16",
    attendees: ["Counseling Department", "Principal Rodriguez"],
    location: "Conference Room B",
    type: "staff"
  },
  {
    id: "6",
    title: "Student Check-in: Casey Williams",
    time: "11:00 AM - 11:30 AM",
    date: "2023-10-16",
    attendees: ["Casey Williams"],
    location: "Counseling Office 102",
    type: "check-in"
  }
];

// Helper function to get type styling
const getTypeStyling = (type: string, urgent: boolean = false) => {
  if (urgent) {
    return "bg-red-100 text-red-800 border-red-200";
  }
  
  switch (type) {
    case "check-in":
      return "bg-blue-100 text-blue-800 border-blue-200";
    case "planning":
      return "bg-purple-100 text-purple-800 border-purple-200";
    case "parent":
      return "bg-amber-100 text-amber-800 border-amber-200";
    case "staff":
      return "bg-green-100 text-green-800 border-green-200";
    case "intervention":
      return "bg-orange-100 text-orange-800 border-orange-200";
    default:
      return "bg-gray-100 text-gray-800 border-gray-200";
  }
};

const CounselorScheduleCard: React.FC = () => {
  const [currentDate, setCurrentDate] = React.useState(new Date());
  const startDate = startOfWeek(currentDate, { weekStartsOn: 1 });
  const endDate = endOfWeek(currentDate, { weekStartsOn: 1 });
  
  const goToPreviousWeek = () => {
    setCurrentDate(subDays(currentDate, 7));
  };
  
  const goToNextWeek = () => {
    setCurrentDate(addDays(currentDate, 7));
  };
  
  const handleReschedule = (id: string) => {
    toast.info(`Rescheduling meeting #${id}`);
  };
  
  const handleAddMeeting = () => {
    toast.info("Opening new meeting scheduler");
  };
  
  // Filter meetings for current display period
  const currentMeetings = meetingsData.filter(meeting => {
    const meetingDate = new Date(meeting.date);
    return meetingDate >= startDate && meetingDate <= endDate;
  });
  
  // Group meetings by date
  const meetingsByDate: Record<string, typeof meetingsData> = {};
  currentMeetings.forEach(meeting => {
    if (!meetingsByDate[meeting.date]) {
      meetingsByDate[meeting.date] = [];
    }
    meetingsByDate[meeting.date].push(meeting);
  });

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-lg flex items-center">
          <Calendar className="h-5 w-5 mr-2" />
          My Schedule
        </CardTitle>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="icon" onClick={goToPreviousWeek}>
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <div className="text-sm font-medium">
            {format(startDate, "MMM d")} - {format(endDate, "MMM d, yyyy")}
          </div>
          <Button variant="outline" size="icon" onClick={goToNextWeek}>
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {Object.keys(meetingsByDate).length === 0 ? (
          <div className="py-8 text-center text-muted-foreground">
            No meetings scheduled for this week
          </div>
        ) : (
          Object.entries(meetingsByDate)
            .sort(([dateA], [dateB]) => dateA.localeCompare(dateB))
            .map(([date, meetings]) => (
              <div key={date} className="space-y-3">
                <div className="font-medium">
                  {format(new Date(date), "EEEE, MMMM d")}
                </div>
                <div className="space-y-2">
                  {meetings.map((meeting) => (
                    <div 
                      key={meeting.id} 
                      className={`p-3 rounded-md border ${getTypeStyling(meeting.type, meeting.urgent)}`}
                    >
                      <div className="flex items-start justify-between">
                        <div>
                          <div className="font-medium">{meeting.title}</div>
                          <div className="flex flex-wrap gap-x-4 gap-y-2 mt-1 text-sm">
                            <div className="flex items-center">
                              <Clock className="h-3.5 w-3.5 mr-1 opacity-70" />
                              {meeting.time}
                            </div>
                            <div className="flex items-center">
                              <MapPin className="h-3.5 w-3.5 mr-1 opacity-70" />
                              {meeting.location}
                            </div>
                          </div>
                        </div>
                        {meeting.urgent && (
                          <Badge variant="outline" className="bg-red-100 border-red-300 text-red-800">
                            Urgent
                          </Badge>
                        )}
                      </div>
                      
                      <div className="mt-2 flex items-center text-sm">
                        <Users className="h-3.5 w-3.5 mr-1 opacity-70" />
                        <span className="text-muted-foreground mr-1">Attendees:</span>
                        <span className="truncate">{meeting.attendees.join(", ")}</span>
                      </div>
                      
                      <div className="mt-3 flex justify-end gap-2">
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => handleReschedule(meeting.id)}
                        >
                          Reschedule
                        </Button>
                        <Button size="sm">View Details</Button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))
        )}
        
        <div className="pt-4 border-t flex justify-end">
          <Button onClick={handleAddMeeting}>
            Schedule New Meeting
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default CounselorScheduleCard;
