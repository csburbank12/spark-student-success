
import React, { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  BookOpen, 
  Calendar, 
  Clock,
  Heart,
  Activity,
  PieChart
} from "lucide-react";
import { Progress } from "@/components/ui/progress";

// Sample mock data for children
const childrenData = [
  {
    id: "c1",
    name: "Alex Parker",
    grade: "9th Grade",
    school: "Lincoln High School",
    photo: null,
    age: 15,
    mood: "Good",
    attendance: "97%",
    academicStatus: "Good Standing",
    recentMood: [
      { day: "Mon", mood: "Happy" },
      { day: "Tue", mood: "Good" },
      { day: "Wed", mood: "Okay" },
      { day: "Thu", mood: "Good" },
      { day: "Fri", mood: "Happy" }
    ],
    teacherNotes: "Alex is showing strong engagement in class discussions.",
    upcomingEvents: [
      { name: "Math Test", date: "Apr 30, 2025" },
      { name: "Science Project Due", date: "May 3, 2025" }
    ],
    assignments: {
      completed: 15,
      pending: 3,
      late: 1
    },
    courses: [
      { name: "Algebra II", grade: "A-", teacher: "Dr. Nguyen" },
      { name: "Biology", grade: "B+", teacher: "Mrs. Johnson" },
      { name: "English Literature", grade: "A", teacher: "Mr. Williams" }
    ]
  },
  {
    id: "c2",
    name: "Jamie Parker",
    grade: "7th Grade",
    school: "Roosevelt Middle School",
    photo: null,
    age: 13,
    mood: "Okay",
    attendance: "94%",
    academicStatus: "Needs Support",
    recentMood: [
      { day: "Mon", mood: "Okay" },
      { day: "Tue", mood: "Sad" },
      { day: "Wed", mood: "Okay" },
      { day: "Thu", mood: "Good" },
      { day: "Fri", mood: "Okay" }
    ],
    teacherNotes: "Jamie may benefit from additional math support.",
    upcomingEvents: [
      { name: "Parent-Teacher Conference", date: "May 2, 2025" },
      { name: "Field Trip Permission Due", date: "May 5, 2025" }
    ],
    assignments: {
      completed: 12,
      pending: 5,
      late: 2
    },
    courses: [
      { name: "Math", grade: "C", teacher: "Ms. Garcia" },
      { name: "Science", grade: "B", teacher: "Mr. Thompson" },
      { name: "Language Arts", grade: "A-", teacher: "Ms. Brown" }
    ]
  }
];

const getMoodColor = (mood: string) => {
  switch (mood) {
    case "Happy": return "bg-green-500";
    case "Good": return "bg-blue-500";
    case "Okay": return "bg-yellow-500";
    case "Sad": return "bg-red-500";
    case "Stressed": return "bg-purple-500";
    default: return "bg-gray-500";
  }
};

const ParentChildrenManager: React.FC = () => {
  const [selectedChildId, setSelectedChildId] = useState(childrenData[0].id);
  const [activeTab, setActiveTab] = useState("overview");
  
  const selectedChild = childrenData.find(child => child.id === selectedChildId) || childrenData[0];
  
  return (
    <div className="space-y-6">
      <div className="flex flex-wrap gap-2">
        {childrenData.map((child) => (
          <Button
            key={child.id}
            variant={selectedChildId === child.id ? "default" : "outline"}
            className="flex items-center"
            onClick={() => setSelectedChildId(child.id)}
          >
            <Avatar className="h-6 w-6 mr-2">
              <AvatarFallback>{child.name.charAt(0)}</AvatarFallback>
            </Avatar>
            {child.name}
          </Button>
        ))}
      </div>
      
      <div className="grid md:grid-cols-3 gap-6">
        <Card className="md:col-span-2">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle>{selectedChild.name}</CardTitle>
            <Badge variant={selectedChild.academicStatus === "Good Standing" ? "default" : "outline"}>
              {selectedChild.academicStatus}
            </Badge>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div className="flex flex-col items-center justify-center p-4 bg-muted rounded-lg">
                <Heart className="h-8 w-8 text-rose-500 mb-2" />
                <span className="text-sm font-medium">Current Mood</span>
                <span className="text-lg">{selectedChild.mood}</span>
              </div>
              <div className="flex flex-col items-center justify-center p-4 bg-muted rounded-lg">
                <Clock className="h-8 w-8 text-blue-500 mb-2" />
                <span className="text-sm font-medium">Attendance</span>
                <span className="text-lg">{selectedChild.attendance}</span>
              </div>
              <div className="flex flex-col items-center justify-center p-4 bg-muted rounded-lg">
                <BookOpen className="h-8 w-8 text-amber-500 mb-2" />
                <span className="text-sm font-medium">Assignments</span>
                <span className="text-lg">{selectedChild.assignments.completed} / {selectedChild.assignments.completed + selectedChild.assignments.pending + selectedChild.assignments.late}</span>
              </div>
            </div>
            
            <div className="space-y-4">
              <div className="flex justify-between items-center mb-2">
                <h3 className="text-lg font-medium">Weekly Mood</h3>
              </div>
              <div className="flex justify-between gap-1">
                {selectedChild.recentMood.map((day, i) => (
                  <div key={i} className="flex flex-col items-center">
                    <div className={`w-8 h-8 rounded-full ${getMoodColor(day.mood)} mb-1`}></div>
                    <span className="text-xs">{day.day}</span>
                  </div>
                ))}
              </div>
              
              <div className="border-t pt-4 mt-4">
                <h3 className="text-lg font-medium mb-2">Teacher Notes</h3>
                <p className="text-muted-foreground">{selectedChild.teacherNotes}</p>
              </div>
              
              <div className="border-t pt-4 mt-4">
                <h3 className="text-lg font-medium mb-2">Upcoming Events</h3>
                <div className="space-y-2">
                  {selectedChild.upcomingEvents.map((event, i) => (
                    <div key={i} className="flex justify-between p-2 border rounded-md">
                      <div className="flex items-center">
                        <Calendar className="h-4 w-4 mr-2 text-blue-500" />
                        {event.name}
                      </div>
                      <span className="text-muted-foreground text-sm">{event.date}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Academic Progress</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {selectedChild.courses.map((course, i) => (
                <div key={i} className="space-y-1">
                  <div className="flex justify-between">
                    <span className="font-medium">{course.name}</span>
                    <span className={
                      course.grade.startsWith('A') ? 'text-green-600' : 
                      course.grade.startsWith('B') ? 'text-blue-600' :
                      course.grade.startsWith('C') ? 'text-amber-600' : 'text-red-600'
                    }>
                      {course.grade}
                    </span>
                  </div>
                  <div className="text-xs text-muted-foreground">Teacher: {course.teacher}</div>
                  <Progress 
                    value={
                      course.grade.startsWith('A') ? 90 : 
                      course.grade.startsWith('B') ? 80 :
                      course.grade.startsWith('C') ? 70 : 60
                    } 
                    className={
                      course.grade.startsWith('A') ? 'bg-green-100' : 
                      course.grade.startsWith('B') ? 'bg-blue-100' :
                      course.grade.startsWith('C') ? 'bg-amber-100' : 'bg-red-100'
                    }
                  />
                </div>
              ))}
              
              <div className="mt-6 pt-6 border-t">
                <h3 className="font-medium mb-2">Assignment Status</h3>
                <div className="grid grid-cols-3 gap-2 text-center">
                  <div className="bg-muted p-2 rounded-md">
                    <div className="text-2xl font-bold text-green-600">
                      {selectedChild.assignments.completed}
                    </div>
                    <div className="text-xs text-muted-foreground">Completed</div>
                  </div>
                  <div className="bg-muted p-2 rounded-md">
                    <div className="text-2xl font-bold text-amber-600">
                      {selectedChild.assignments.pending}
                    </div>
                    <div className="text-xs text-muted-foreground">Pending</div>
                  </div>
                  <div className="bg-muted p-2 rounded-md">
                    <div className="text-2xl font-bold text-red-600">
                      {selectedChild.assignments.late}
                    </div>
                    <div className="text-xs text-muted-foreground">Late</div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <div className="flex justify-between">
        <Button variant="outline" className="flex items-center gap-1">
          <Activity className="w-4 h-4" />
          <span>View Detailed Report</span>
        </Button>
        <Button className="flex items-center gap-1">
          <Calendar className="w-4 h-4" />
          <span>Schedule Meeting</span>
        </Button>
      </div>
    </div>
  );
};

export default ParentChildrenManager;
