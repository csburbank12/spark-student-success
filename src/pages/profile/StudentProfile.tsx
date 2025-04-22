
import React from "react";
import { User } from "@/types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

interface StudentProfileProps {
  user: User | null;
}

const StudentProfile: React.FC<StudentProfileProps> = ({ user }) => {
  // Mock data for student profile
  const academicData = {
    currentGrade: "10th Grade",
    gpa: 3.8,
    subjects: [
      { name: "Mathematics", grade: "A-", progress: 92 },
      { name: "Science", grade: "B+", progress: 88 },
      { name: "English", grade: "A", progress: 95 },
      { name: "History", grade: "B", progress: 85 },
    ],
    recentAchievements: [
      "5-Day Check-in Streak",
      "Completed All Assignments",
      "Perfect Attendance - April",
    ],
    upcomingGoals: [
      "Complete science project by May 15",
      "Improve math quiz scores",
      "Read 2 books by end of month",
    ],
  };

  const wellnessData = {
    checkInStreak: 5,
    moodTrend: "Stable",
    lastCheckIn: "Today, 8:30 AM",
    recommendedActivities: [
      "Deep breathing exercise - 5 min",
      "Journaling prompt: 'My goals for this week'",
      "Physical activity - 30 min walk",
    ],
  };

  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Academic Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Current Grade:</span>
              <span className="font-medium">{academicData.currentGrade}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">GPA:</span>
              <span className="font-medium">{academicData.gpa}</span>
            </div>
            <div>
              <div className="flex justify-between items-center mb-1">
                <span className="text-muted-foreground">Subject Performance:</span>
              </div>
              <div className="space-y-3">
                {academicData.subjects.map((subject) => (
                  <div key={subject.name} className="space-y-1">
                    <div className="flex justify-between text-sm">
                      <span>{subject.name}</span>
                      <span className="font-medium">{subject.grade}</span>
                    </div>
                    <Progress value={subject.progress} className="h-1.5" />
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Wellness & Check-ins</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Check-in Streak:</span>
              <Badge className="bg-green-100 text-green-800">
                {wellnessData.checkInStreak} Days
              </Badge>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Mood Trend:</span>
              <span className="font-medium">{wellnessData.moodTrend}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Last Check-in:</span>
              <span className="font-medium">{wellnessData.lastCheckIn}</span>
            </div>
            <div className="space-y-2">
              <h4 className="text-sm font-medium">Recommended Activities</h4>
              <ul className="space-y-1">
                {wellnessData.recommendedActivities.map((activity, index) => (
                  <li key={index} className="text-sm pl-2 border-l-2 border-primary">
                    {activity}
                  </li>
                ))}
              </ul>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Recent Achievements</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {academicData.recentAchievements.map((achievement, index) => (
                <li
                  key={index}
                  className="flex items-center gap-2 p-2 rounded bg-muted/50"
                >
                  <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                    <span className="text-primary">🏆</span>
                  </div>
                  <span>{achievement}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Goals & Objectives</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {academicData.upcomingGoals.map((goal, index) => (
                <li
                  key={index}
                  className="flex items-center gap-2 p-2 rounded bg-muted/50"
                >
                  <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                    <span className="text-primary">🎯</span>
                  </div>
                  <span>{goal}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default StudentProfile;
