
import React from "react";
import { User } from "@/types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Users, BookOpen, AlertCircle } from "lucide-react";

interface TeacherProfileProps {
  user: User | null;
}

const TeacherProfile: React.FC<TeacherProfileProps> = ({ user }) => {
  // Mock data for teacher profile
  const teacherData = {
    department: "Science",
    position: "Science Teacher",
    yearsOfExperience: 8,
    classesCount: 4,
    studentsCount: 112,
    certifications: ["Science Education", "Special Education", "Math Education"],
    upcomingEvents: [
      { title: "Parent-Teacher Conference", date: "May 5, 2023" },
      { title: "Science Fair Judging", date: "May 12, 2023" },
      { title: "Professional Development Workshop", date: "May 20, 2023" },
    ],
    atRiskStudents: 5,
    pendingInterventions: 3,
    recentActivities: [
      { 
        activity: "Created new intervention plan", 
        student: "Alex Johnson", 
        date: "2 days ago",
        type: "intervention" 
      },
      { 
        activity: "Reviewed mood check-ins", 
        student: "Class 10B", 
        date: "Yesterday",
        type: "review" 
      },
      { 
        activity: "Added SEL resources", 
        student: "All classes", 
        date: "Today",
        type: "resource" 
      },
    ],
  };

  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Professional Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Department:</span>
              <span className="font-medium">{teacherData.department}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Position:</span>
              <span className="font-medium">{teacherData.position}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Years of Experience:</span>
              <span className="font-medium">{teacherData.yearsOfExperience} years</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Certifications:</span>
              <div className="flex flex-wrap justify-end gap-1">
                {teacherData.certifications.map((cert) => (
                  <Badge key={cert} variant="outline">
                    {cert}
                  </Badge>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Teaching Summary</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col items-center justify-center p-4 rounded-md bg-muted/50">
                <Users className="h-8 w-8 text-primary mb-2" />
                <span className="text-2xl font-bold">{teacherData.classesCount}</span>
                <span className="text-sm text-muted-foreground">Classes</span>
              </div>
              <div className="flex flex-col items-center justify-center p-4 rounded-md bg-muted/50">
                <BookOpen className="h-8 w-8 text-primary mb-2" />
                <span className="text-2xl font-bold">{teacherData.studentsCount}</span>
                <span className="text-sm text-muted-foreground">Students</span>
              </div>
              <div className="flex flex-col items-center justify-center p-4 rounded-md bg-muted/50">
                <AlertCircle className="h-8 w-8 text-amber-500 mb-2" />
                <span className="text-2xl font-bold">{teacherData.atRiskStudents}</span>
                <span className="text-sm text-muted-foreground">At Risk Students</span>
              </div>
              <div className="flex flex-col items-center justify-center p-4 rounded-md bg-muted/50">
                <AlertCircle className="h-8 w-8 text-primary mb-2" />
                <span className="text-2xl font-bold">{teacherData.pendingInterventions}</span>
                <span className="text-sm text-muted-foreground">Pending Interventions</span>
              </div>
            </div>

            <div className="flex justify-between space-x-2">
              <Button className="flex-1">View My Students</Button>
              <Button variant="outline" className="flex-1">View Classes</Button>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Upcoming Events</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {teacherData.upcomingEvents.map((event, index) => (
                <li
                  key={index}
                  className="flex items-center justify-between p-2 rounded bg-muted/50"
                >
                  <span>{event.title}</span>
                  <Badge variant="outline">{event.date}</Badge>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Recent Activities</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {teacherData.recentActivities.map((activity, index) => (
                <li
                  key={index}
                  className="flex items-center gap-2 p-2 rounded bg-muted/50"
                >
                  <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                    <span className="text-primary">
                      {activity.type === 'intervention' ? '🔔' : 
                       activity.type === 'review' ? '📊' : '📚'}
                    </span>
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">{activity.activity}</p>
                    <p className="text-xs text-muted-foreground">
                      For {activity.student} • {activity.date}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default TeacherProfile;
