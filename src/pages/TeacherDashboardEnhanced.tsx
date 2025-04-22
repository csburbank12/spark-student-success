
import React, { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { StatCard } from "@/components/ui/stat-card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { AlertTriangle, Search, Users, Bell, Calendar, BarChart } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { toast } from "sonner";
import StudentInterventionView from "@/components/teacher/StudentInterventionView";
import { ChallengeArea } from "@/components/interventions/InterventionLibrary";

// Mock student data with risk assessment
interface StudentWithRisk {
  id: string;
  name: string;
  grade: string;
  riskScore: number;
  lastCheckIn: string;
  mood?: string;
  alerts: number;
  flaggedAreas: ChallengeArea[];
}

const TeacherDashboardEnhanced = () => {
  const { user } = useAuth();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedStudent, setSelectedStudent] = useState<StudentWithRisk | null>(null);
  const [selectedTab, setSelectedTab] = useState("overview");

  // Mock data for students with risk assessment
  const students: StudentWithRisk[] = [
    {
      id: "s1",
      name: "Alex Johnson",
      grade: "8",
      riskScore: 82,
      lastCheckIn: "Today, 8:15 AM",
      mood: "😔 Sad",
      alerts: 2,
      flaggedAreas: ["emotional", "attendance", "academic"],
    },
    {
      id: "s2",
      name: "Zoe Martin",
      grade: "7",
      riskScore: 45,
      lastCheckIn: "Today, 9:20 AM",
      mood: "😐 Okay",
      alerts: 0,
      flaggedAreas: [],
    },
    {
      id: "s3",
      name: "Ethan Brown",
      grade: "6",
      riskScore: 35,
      lastCheckIn: "Yesterday, 3:45 PM",
      mood: "🙂 Good",
      alerts: 0,
      flaggedAreas: [],
    },
    {
      id: "s4",
      name: "Lily Chen",
      grade: "8",
      riskScore: 75,
      lastCheckIn: "2 days ago",
      mood: "😣 Stressed",
      alerts: 1,
      flaggedAreas: ["emotional", "social"],
    },
    {
      id: "s5",
      name: "Noah Williams",
      grade: "7",
      riskScore: 28,
      lastCheckIn: "Today, 7:30 AM",
      mood: "😃 Happy",
      alerts: 0,
      flaggedAreas: [],
    },
    {
      id: "s6",
      name: "Emma Davis",
      grade: "8",
      riskScore: 68,
      lastCheckIn: "3 days ago",
      alerts: 1,
      flaggedAreas: ["attendance", "academic"],
    },
  ];

  // Filter students by search query
  const filteredStudents = students.filter(
    student => student.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const highRiskCount = students.filter(s => s.riskScore >= 70).length;
  const moderateRiskCount = students.filter(s => s.riskScore >= 40 && s.riskScore < 70).length;
  const lowRiskCount = students.filter(s => s.riskScore < 40).length;

  const handleStudentSelect = (student: StudentWithRisk) => {
    setSelectedStudent(student);
  };

  const handleBackToList = () => {
    setSelectedStudent(null);
  };

  const getRiskBadgeColor = (score: number) => {
    if (score >= 70) return "bg-red-100 text-red-800";
    if (score >= 40) return "bg-amber-100 text-amber-800";
    return "bg-green-100 text-green-800";
  };

  const getRiskLabel = (score: number) => {
    if (score >= 70) return "High Risk";
    if (score >= 40) return "Moderate Risk";
    return "Low Risk";
  };

  // If a student is selected, show the intervention view
  if (selectedStudent) {
    return (
      <StudentInterventionView 
        studentId={selectedStudent.id}
        studentName={selectedStudent.name}
        onBack={handleBackToList}
      />
    );
  }

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
                <Badge className="ml-1 bg-amber-500">{students.reduce((sum, s) => sum + s.alerts, 0)}</Badge>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-80">
              <DropdownMenuLabel>Recent Alerts</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="cursor-pointer">
                <div className="flex items-start gap-2">
                  <AlertTriangle className="h-4 w-4 text-amber-500 mt-0.5" />
                  <div>
                    <p className="font-medium">Alex Johnson - Mood decline</p>
                    <p className="text-sm text-muted-foreground">Reported feeling sad for 3 consecutive days</p>
                    <p className="text-xs text-muted-foreground mt-1">10 minutes ago</p>
                  </div>
                </div>
              </DropdownMenuItem>
              <DropdownMenuItem className="cursor-pointer">
                <div className="flex items-start gap-2">
                  <AlertTriangle className="h-4 w-4 text-amber-500 mt-0.5" />
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

      <div className="grid gap-4 md:grid-cols-4">
        <StatCard
          title="Students At Risk"
          value={highRiskCount.toString()}
          description="Require immediate attention"
          icon={<AlertTriangle className="h-4 w-4" />}
          trend={highRiskCount > 0 ? "up" : undefined}
          trendValue={highRiskCount > 0 ? `${highRiskCount} need attention` : undefined}
        />
        <StatCard
          title="Moderate Risk"
          value={moderateRiskCount.toString()}
          description="Need monitoring"
          icon={<Users className="h-4 w-4" />}
        />
        <StatCard
          title="Low Risk"
          value={lowRiskCount.toString()}
          description="On track"
          icon={<Users className="h-4 w-4" />}
        />
        <StatCard
          title="Active Interventions"
          value="4"
          description="Currently in progress"
          icon={<BarChart className="h-4 w-4" />}
        />
      </div>

      <Tabs value={selectedTab} onValueChange={setSelectedTab}>
        <TabsList>
          <TabsTrigger value="overview">Student Overview</TabsTrigger>
          <TabsTrigger value="interventions">Interventions</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview" className="mt-6">
          <Card>
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle>Students Risk Assessment</CardTitle>
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
              <CardDescription>Click on a student to view details and interventions</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {filteredStudents.length === 0 ? (
                  <p className="text-center col-span-3 py-8 text-muted-foreground">
                    No students match your search.
                  </p>
                ) : (
                  filteredStudents.map((student) => (
                    <Card 
                      key={student.id}
                      className="cursor-pointer transition-all hover:shadow-md"
                      onClick={() => handleStudentSelect(student)}
                    >
                      <CardContent className="p-4">
                        <div className="flex flex-col space-y-3">
                          <div className="flex justify-between items-start">
                            <div>
                              <h3 className="font-medium">{student.name}</h3>
                              <p className="text-sm text-muted-foreground">Grade {student.grade}</p>
                            </div>
                            <Badge className={getRiskBadgeColor(student.riskScore)}>
                              {getRiskLabel(student.riskScore)}
                            </Badge>
                          </div>
                          
                          <div className="space-y-2">
                            <div className="flex justify-between text-sm">
                              <span className="text-muted-foreground">Risk Score</span>
                              <span className="font-medium">{student.riskScore}</span>
                            </div>
                            <div className="w-full bg-muted rounded-full h-2.5">
                              <div 
                                className={`h-2.5 rounded-full ${
                                  student.riskScore >= 70 
                                    ? "bg-red-500" 
                                    : student.riskScore >= 40 
                                      ? "bg-amber-500" 
                                      : "bg-green-500"
                                }`}
                                style={{ width: `${student.riskScore}%` }}
                              ></div>
                            </div>
                          </div>
                          
                          <div className="flex justify-between text-sm">
                            <span className="text-muted-foreground">Last Check-in:</span>
                            <span>{student.lastCheckIn}</span>
                          </div>
                          
                          {student.mood && (
                            <div className="flex justify-between text-sm">
                              <span className="text-muted-foreground">Mood:</span>
                              <span>{student.mood}</span>
                            </div>
                          )}
                          
                          {student.flaggedAreas.length > 0 && (
                            <div className="flex flex-wrap gap-1 mt-1">
                              {student.flaggedAreas.map(area => (
                                <Badge key={area} variant="outline" className="text-xs">
                                  {area.charAt(0).toUpperCase() + area.slice(1)}
                                </Badge>
                              ))}
                            </div>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  ))
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="interventions" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Active Interventions</CardTitle>
              <CardDescription>Currently applied interventions and their progress</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-4 border rounded-lg">
                  <div className="flex justify-between">
                    <div>
                      <h3 className="font-medium">Daily Check-ins</h3>
                      <p className="text-sm text-muted-foreground">For Alex Johnson - Started 5 days ago</p>
                    </div>
                    <Badge>In Progress</Badge>
                  </div>
                  <div className="mt-3 space-y-1">
                    <div className="flex justify-between text-sm">
                      <span>Progress</span>
                      <span>5/10 days</span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2">
                      <div className="bg-primary h-2 rounded-full" style={{ width: "50%" }}></div>
                    </div>
                  </div>
                </div>
                
                <div className="p-4 border rounded-lg">
                  <div className="flex justify-between">
                    <div>
                      <h3 className="font-medium">Attendance Improvement Plan</h3>
                      <p className="text-sm text-muted-foreground">For Emma Davis - Started 2 weeks ago</p>
                    </div>
                    <Badge>In Progress</Badge>
                  </div>
                  <div className="mt-3 space-y-1">
                    <div className="flex justify-between text-sm">
                      <span>Progress</span>
                      <span>2/4 weeks</span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2">
                      <div className="bg-primary h-2 rounded-full" style={{ width: "50%" }}></div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="analytics" className="mt-6">
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Risk Distribution</CardTitle>
                <CardDescription>Student risk level breakdown</CardDescription>
              </CardHeader>
              <CardContent className="h-80 flex items-center justify-center">
                <div className="text-center">
                  <p className="text-muted-foreground">Risk analytics visualization coming soon</p>
                  <div className="flex justify-center gap-4 mt-4">
                    <div className="text-center">
                      <div className="text-lg font-bold text-red-500">{highRiskCount}</div>
                      <div className="text-xs">High Risk</div>
                    </div>
                    <div className="text-center">
                      <div className="text-lg font-bold text-amber-500">{moderateRiskCount}</div>
                      <div className="text-xs">Moderate Risk</div>
                    </div>
                    <div className="text-center">
                      <div className="text-lg font-bold text-green-500">{lowRiskCount}</div>
                      <div className="text-xs">Low Risk</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Intervention Effectiveness</CardTitle>
                <CardDescription>Success rates by intervention type</CardDescription>
              </CardHeader>
              <CardContent className="h-80 flex items-center justify-center">
                <p className="text-muted-foreground">Effectiveness metrics coming soon</p>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default TeacherDashboardEnhanced;
