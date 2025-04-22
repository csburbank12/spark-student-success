
import React from "react";
import { useAuth } from "@/contexts/AuthContext";
import { StatCard } from "@/components/ui/stat-card";
import { StudentCard } from "@/components/teacher/StudentCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertCircle, Search, Users, Bell, Calendar } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { toast } from "sonner";

const TeacherDashboard = () => {
  const { user } = useAuth();

  // Mock data for students
  const students = [
    {
      id: "s1",
      name: "Alex Johnson",
      lastCheckIn: "Today, 8:15 AM",
      mood: "😔 Sad",
      alerts: 2,
      flags: ["Missed check-ins", "Mood decline"],
    },
    {
      id: "s2",
      name: "Zoe Martin",
      lastCheckIn: "Today, 9:20 AM",
      mood: "😐 Okay",
      alerts: 0,
      flags: [],
    },
    {
      id: "s3",
      name: "Ethan Brown",
      lastCheckIn: "Yesterday, 3:45 PM",
      mood: "🙂 Good",
      alerts: 0,
      flags: [],
    },
    {
      id: "s4",
      name: "Lily Chen",
      lastCheckIn: "2 days ago",
      mood: "😣 Stressed",
      alerts: 1,
      flags: ["High stress levels"],
    },
    {
      id: "s5",
      name: "Noah Williams",
      lastCheckIn: "Today, 7:30 AM",
      mood: "😃 Happy",
      alerts: 0,
      flags: [],
    },
    {
      id: "s6",
      name: "Emma Davis",
      lastCheckIn: "3 days ago",
      alerts: 1,
      flags: ["No recent check-in"],
    },
  ];

  // Mock data for upcoming events
  const upcomingEvents = [
    {
      id: "e1",
      title: "SEL Class Session",
      date: "Today, 11:30 AM",
      type: "class",
    },
    {
      id: "e2",
      title: "Check-in with Alex",
      date: "Today, 2:15 PM",
      type: "meeting",
    },
    {
      id: "e3",
      title: "Team Collaboration",
      date: "Tomorrow, 9:00 AM",
      type: "meeting",
    },
  ];

  // Mock data for resources
  const resources = [
    {
      id: "r1",
      title: "Mindfulness Activities",
      description: "Collection of 5-minute exercises",
      tags: ["SEL", "Classroom"],
    },
    {
      id: "r2",
      title: "Anxiety Coping Strategies",
      description: "Resources for helping students manage stress",
      tags: ["Mental Health", "Support"],
    },
    {
      id: "r3",
      title: "Mood Check-in Templates",
      description: "Printable worksheets for classroom use",
      tags: ["Resources", "Activities"],
    },
  ];

  const handleStudentClick = (student: any) => {
    toast.info(`Viewing details for ${student.name}`);
    // In a real app, this would navigate to student details or open a modal
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-heading font-bold">Teacher Dashboard</h2>
        <div className="flex items-center gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="gap-1">
                <Bell className="h-4 w-4" />
                <span>Alerts</span>
                <Badge className="ml-1 bg-amber-500">4</Badge>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-80">
              <DropdownMenuLabel>Recent Alerts</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="cursor-pointer">
                <div className="flex items-start gap-2">
                  <AlertCircle className="h-4 w-4 text-amber-500 mt-0.5" />
                  <div>
                    <p className="font-medium">Alex Johnson - Mood decline</p>
                    <p className="text-sm text-muted-foreground">Reported feeling sad for 3 consecutive days</p>
                    <p className="text-xs text-muted-foreground mt-1">10 minutes ago</p>
                  </div>
                </div>
              </DropdownMenuItem>
              <DropdownMenuItem className="cursor-pointer">
                <div className="flex items-start gap-2">
                  <AlertCircle className="h-4 w-4 text-amber-500 mt-0.5" />
                  <div>
                    <p className="font-medium">Emma Davis - Missed check-ins</p>
                    <p className="text-sm text-muted-foreground">No check-ins for 3 consecutive days</p>
                    <p className="text-xs text-muted-foreground mt-1">2 hours ago</p>
                  </div>
                </div>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <Button>
            <Calendar className="h-4 w-4 mr-2" />
            Schedule Check-in
          </Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <StatCard
          title="Students Being Monitored"
          value="24"
          description="Your assigned student count"
          icon={<Users className="h-4 w-4" />}
        />
        <StatCard
          title="Outstanding Alerts"
          value="4"
          description="Require your attention"
          icon={<AlertCircle className="h-4 w-4" />}
          trend="up"
          trendValue="2 more than yesterday"
        />
        <StatCard
          title="Today's Check-ins"
          value="18"
          description="75% of your students"
          trend="up"
          trendValue="5% higher than average"
        />
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <div className="md:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-heading font-bold">Students</h3>
            <div className="relative w-64">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search students..."
                className="pl-8"
              />
            </div>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {students.map((student) => (
              <StudentCard
                key={student.id}
                student={student}
                onClick={() => handleStudentClick(student)}
              />
            ))}
          </div>
          <div className="flex justify-center">
            <Button variant="outline">View All Students</Button>
          </div>
        </div>
        
        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-xl">Upcoming Schedule</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {upcomingEvents.map((event) => (
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
          
          <Card>
            <CardHeader>
              <CardTitle className="text-xl">Quick Resources</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {resources.map((resource) => (
                <div key={resource.id} className="space-y-2 pb-3 border-b last:border-0 last:pb-0">
                  <p className="font-medium">{resource.title}</p>
                  <p className="text-sm text-muted-foreground">{resource.description}</p>
                  <div className="flex flex-wrap gap-1">
                    {resource.tags.map((tag) => (
                      <Badge key={tag} variant="secondary" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
              ))}
              <Button variant="outline" className="w-full mt-2">
                Browse Resources
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default TeacherDashboard;
