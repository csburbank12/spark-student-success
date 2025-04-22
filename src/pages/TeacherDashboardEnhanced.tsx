
import React, { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { StatCard } from "@/components/ui/stat-card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Search, Users, AlertCircle, BarChart, Calendar } from "lucide-react";
import { StudentCard } from "@/components/teacher/StudentCard";
import StudentInterventionView from "@/components/teacher/StudentInterventionView";

const TeacherDashboardEnhanced = () => {
  const { user } = useAuth();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedStudent, setSelectedStudent] = useState<string | null>(null);
  const [selectedStudentName, setSelectedStudentName] = useState<string>("");

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

  // Filter students based on search query
  const filteredStudents = students.filter(student =>
    student.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleStudentClick = (student: any) => {
    setSelectedStudent(student.id);
    setSelectedStudentName(student.name);
  };

  const handleBackToDashboard = () => {
    setSelectedStudent(null);
  };

  // Stats for the dashboard
  const stats = [
    {
      title: "Students Being Monitored",
      value: "24",
      description: "Your assigned student count",
      icon: <Users className="h-4 w-4" />,
    },
    {
      title: "Students At Risk",
      value: "4",
      description: "Require your attention",
      icon: <AlertCircle className="h-4 w-4" />,
      trend: "up",
      trendValue: "2 more than yesterday",
    },
    {
      title: "Active Interventions",
      value: "7",
      description: "Currently being applied",
      icon: <BarChart className="h-4 w-4" />,
    },
    {
      title: "Today's Check-ins",
      value: "18",
      description: "75% completion rate",
      icon: <Calendar className="h-4 w-4" />,
      trend: "up",
      trendValue: "5% higher than average",
    },
  ];

  return (
    <div className="space-y-6">
      {!selectedStudent ? (
        <>
          <div className="flex items-center justify-between">
            <h2 className="text-3xl font-heading font-bold">Teacher Dashboard</h2>
            <Button>
              <Calendar className="h-4 w-4 mr-2" />
              Schedule Check-in
            </Button>
          </div>

          <div className="grid gap-4 md:grid-cols-4">
            {stats.map((stat, index) => (
              <StatCard
                key={index}
                title={stat.title}
                value={stat.value}
                description={stat.description}
                icon={stat.icon}
                trend={stat.trend as any}
                trendValue={stat.trendValue}
              />
            ))}
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-heading font-bold">Students</h3>
              <div className="relative w-64">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search students..."
                  className="pl-8"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>
            <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
              {filteredStudents.map((student) => (
                <StudentCard
                  key={student.id}
                  student={student}
                  onClick={() => handleStudentClick(student)}
                />
              ))}
            </div>
          </div>

          <Tabs defaultValue="at-risk">
            <TabsList>
              <TabsTrigger value="at-risk">At-Risk Students</TabsTrigger>
              <TabsTrigger value="interventions">Active Interventions</TabsTrigger>
              <TabsTrigger value="resources">Resources</TabsTrigger>
            </TabsList>
            <TabsContent value="at-risk" className="mt-4">
              <Card>
                <CardHeader>
                  <CardTitle>Students Requiring Support</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-4 sm:grid-cols-2">
                    {students
                      .filter(s => s.alerts > 0)
                      .map(student => (
                        <StudentCard
                          key={student.id}
                          student={student}
                          onClick={() => handleStudentClick(student)}
                        />
                      ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="interventions">
              <Card>
                <CardHeader>
                  <CardTitle>Current Interventions</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">View and track all active interventions here.</p>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="resources">
              <Card>
                <CardHeader>
                  <CardTitle>Teacher Resources</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">Access evidence-based interventions and resources.</p>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </>
      ) : (
        <StudentInterventionView 
          studentId={selectedStudent}
          studentName={selectedStudentName}
          onBack={handleBackToDashboard}
        />
      )}
    </div>
  );
};

export default TeacherDashboardEnhanced;
