
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Users, Clock } from "lucide-react";

const classesData = [
  { 
    name: "Math 101", 
    period: "1st Period", 
    students: 28, 
    time: "8:00 AM - 9:15 AM",
    room: "Room 204",
    tags: ["Freshman", "Required"]
  },
  { 
    name: "Math 202", 
    period: "3rd Period", 
    students: 24, 
    time: "10:45 AM - 12:00 PM",
    room: "Room 204",
    tags: ["Sophomore", "Required"]
  },
  { 
    name: "Math 303", 
    period: "4th Period", 
    students: 18, 
    time: "12:45 PM - 2:00 PM",
    room: "Room 206",
    tags: ["Junior", "Elective", "Advanced"]
  }
];

const TeacherClassesCard: React.FC = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg flex items-center">
          <Users className="h-5 w-5 mr-2" />
          My Classes
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {classesData.map((classItem, index) => (
            <div 
              key={index} 
              className={`p-4 rounded-md border ${index % 2 === 0 ? 'bg-muted/40' : ''}`}
            >
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-medium text-lg">{classItem.name}</h3>
                <div className="flex items-center space-x-1">
                  {classItem.tags.map((tag, i) => (
                    <Badge key={i} variant={i === 2 ? "default" : "secondary"} className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
              <div className="grid grid-cols-2 gap-2 text-sm text-muted-foreground">
                <div className="flex items-center">
                  <Clock className="h-3.5 w-3.5 mr-1 opacity-70" />
                  {classItem.time}
                </div>
                <div>Period: {classItem.period}</div>
                <div>Room: {classItem.room}</div>
                <div>Students: {classItem.students}</div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default TeacherClassesCard;
