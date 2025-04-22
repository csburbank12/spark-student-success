
import React, { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { Card, CardHeader, CardTitle, CardContent, CardDescription, CardFooter } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Search, School, User, AlertTriangle, BarChart, Users, Filter } from "lucide-react";

interface SchoolData {
  id: string;
  name: string;
  studentCount: number;
  staffCount: number;
  highRiskCount: number;
  moderateRiskCount: number;
  lowRiskCount: number;
  activeInterventions: number;
}

const mockSchools: SchoolData[] = [
  {
    id: "sch1",
    name: "Washington High School",
    studentCount: 1250,
    staffCount: 85,
    highRiskCount: 42,
    moderateRiskCount: 156,
    lowRiskCount: 1052,
    activeInterventions: 68,
  },
  {
    id: "sch2",
    name: "Lincoln Middle School",
    studentCount: 780,
    staffCount: 54,
    highRiskCount: 35,
    moderateRiskCount: 124,
    lowRiskCount: 621,
    activeInterventions: 52,
  },
  {
    id: "sch3",
    name: "Roosevelt Elementary",
    studentCount: 560,
    staffCount: 42,
    highRiskCount: 18,
    moderateRiskCount: 62,
    lowRiskCount: 480,
    activeInterventions: 30,
  },
];

const AdminDashboardEnhanced = () => {
  const { user } = useAuth();
  const [selectedSchool, setSelectedSchool] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [filterGrade, setFilterGrade] = useState<string>("all");
  const [filterRisk, setFilterRisk] = useState<string>("all");
  
  // Combined data across selected schools
  const aggregatedData = selectedSchool === "all" 
    ? mockSchools.reduce((acc, school) => {
        return {
          studentCount: acc.studentCount + school.studentCount,
          staffCount: acc.staffCount + school.staffCount,
          highRiskCount: acc.highRiskCount + school.highRiskCount,
          moderateRiskCount: acc.moderateRiskCount + school.moderateRiskCount,
          lowRiskCount: acc.lowRiskCount + school.lowRiskCount,
          activeInterventions: acc.activeInterventions + school.activeInterventions,
        };
      }, { 
        studentCount: 0, 
        staffCount: 0, 
        highRiskCount: 0, 
        moderateRiskCount: 0, 
        lowRiskCount: 0,
        activeInterventions: 0
      })
    : mockSchools.find(s => s.id === selectedSchool) || mockSchools[0];
    
  const totalStudents = aggregatedData.studentCount;
  const totalRisk = aggregatedData.highRiskCount + aggregatedData.moderateRiskCount;
  const highRiskPercentage = Math.round((aggregatedData.highRiskCount / totalStudents) * 100);
  const moderateRiskPercentage = Math.round((aggregatedData.moderateRiskCount / totalStudents) * 100);

  // Mock intervention data
  const interventionTypes = [
    { name: "Attendance Support", count: 42, success: 65 },
    { name: "Academic Intervention", count: 38, success: 72 },
    { name: "Emotional Support", count: 56, success: 82 },
    { name: "Behavioral Plan", count: 24, success: 58 },
    { name: "Social Skills", count: 30, success: 76 },
  ];
  
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-heading font-bold">Admin Dashboard</h2>
        <div className="flex items-center gap-2">
          <Select value={selectedSchool} onValueChange={setSelectedSchool}>
            <SelectTrigger className="w-[200px]">
              <SelectValue placeholder="Select School" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Schools</SelectItem>
              {mockSchools.map(school => (
                <SelectItem key={school.id} value={school.id}>{school.name}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Button variant="outline">
            <School className="mr-2 h-4 w-4" />
            Manage Schools
          </Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex justify-between">
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground">Total Students</p>
                <p className="text-2xl font-bold">{totalStudents.toLocaleString()}</p>
              </div>
              <Users className="h-10 w-10 text-primary opacity-20" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex justify-between">
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground">Students at Risk</p>
                <p className="text-2xl font-bold">{totalRisk.toLocaleString()}</p>
              </div>
              <AlertTriangle className="h-10 w-10 text-amber-500 opacity-20" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex justify-between">
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground">Staff Members</p>
                <p className="text-2xl font-bold">{aggregatedData.staffCount.toLocaleString()}</p>
              </div>
              <User className="h-10 w-10 text-primary opacity-20" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex justify-between">
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground">Active Interventions</p>
                <p className="text-2xl font-bold">{aggregatedData.activeInterventions.toLocaleString()}</p>
              </div>
              <BarChart className="h-10 w-10 text-primary opacity-20" />
            </div>
          </CardContent>
        </Card>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Risk Distribution Overview</CardTitle>
          <CardDescription>
            Student risk assessment across {selectedSchool === "all" ? "all schools" : "this school"}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <div className="flex items-center gap-2">
                  <div className="h-3 w-3 rounded-full bg-red-500"></div>
                  <span>High Risk ({aggregatedData.highRiskCount} students)</span>
                </div>
                <span>{highRiskPercentage}%</span>
              </div>
              <Progress value={highRiskPercentage} className="h-2 bg-muted" />
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <div className="flex items-center gap-2">
                  <div className="h-3 w-3 rounded-full bg-amber-500"></div>
                  <span>Moderate Risk ({aggregatedData.moderateRiskCount} students)</span>
                </div>
                <span>{moderateRiskPercentage}%</span>
              </div>
              <Progress value={moderateRiskPercentage} className="h-2 bg-muted" />
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <div className="flex items-center gap-2">
                  <div className="h-3 w-3 rounded-full bg-green-500"></div>
                  <span>Low Risk ({aggregatedData.lowRiskCount} students)</span>
                </div>
                <span>{Math.round((aggregatedData.lowRiskCount / totalStudents) * 100)}%</span>
              </div>
              <Progress value={Math.round((aggregatedData.lowRiskCount / totalStudents) * 100)} className="h-2 bg-muted" />
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Tabs defaultValue="students">
        <TabsList>
          <TabsTrigger value="students">At-Risk Students</TabsTrigger>
          <TabsTrigger value="interventions">Intervention Analytics</TabsTrigger>
          <TabsTrigger value="trends">Trends & Forecasting</TabsTrigger>
        </TabsList>
        
        <TabsContent value="students" className="mt-6">
          <Card>
            <CardHeader className="pb-0">
              <CardTitle>Students Requiring Attention</CardTitle>
              <div className="flex flex-col sm:flex-row gap-4 mt-4">
                <div className="relative flex-1">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="search"
                    placeholder="Search students..."
                    className="pl-8"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                <div className="flex items-center gap-2">
                  <Select value={filterGrade} onValueChange={setFilterGrade}>
                    <SelectTrigger className="w-[140px]">
                      <SelectValue placeholder="Grade" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Grades</SelectItem>
                      <SelectItem value="6">Grade 6</SelectItem>
                      <SelectItem value="7">Grade 7</SelectItem>
                      <SelectItem value="8">Grade 8</SelectItem>
                      <SelectItem value="9">Grade 9</SelectItem>
                      <SelectItem value="10">Grade 10</SelectItem>
                      <SelectItem value="11">Grade 11</SelectItem>
                      <SelectItem value="12">Grade 12</SelectItem>
                    </SelectContent>
                  </Select>
                  
                  <Select value={filterRisk} onValueChange={setFilterRisk}>
                    <SelectTrigger className="w-[140px]">
                      <SelectValue placeholder="Risk Level" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Levels</SelectItem>
                      <SelectItem value="high">High Risk</SelectItem>
                      <SelectItem value="moderate">Moderate Risk</SelectItem>
                      <SelectItem value="low">Low Risk</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="rounded-md border">
                <div className="grid grid-cols-12 border-b py-3 px-4 font-medium text-sm">
                  <div className="col-span-3">Student Name</div>
                  <div className="col-span-2">Grade</div>
                  <div className="col-span-2">Risk Score</div>
                  <div className="col-span-3">Primary Concerns</div>
                  <div className="col-span-2">Interventions</div>
                </div>
                
                {/* Sample student rows */}
                <div className="grid grid-cols-12 border-b py-3 px-4 text-sm items-center hover:bg-muted/50">
                  <div className="col-span-3 font-medium">Alex Johnson</div>
                  <div className="col-span-2">8</div>
                  <div className="col-span-2 flex items-center gap-2">
                    <Badge className="bg-red-100 text-red-800">High</Badge>
                    <span>82</span>
                  </div>
                  <div className="col-span-3 flex flex-wrap gap-1">
                    <Badge variant="outline">Emotional</Badge>
                    <Badge variant="outline">Attendance</Badge>
                  </div>
                  <div className="col-span-2">
                    <Button size="sm">View</Button>
                  </div>
                </div>
                
                <div className="grid grid-cols-12 border-b py-3 px-4 text-sm items-center hover:bg-muted/50">
                  <div className="col-span-3 font-medium">Lily Chen</div>
                  <div className="col-span-2">8</div>
                  <div className="col-span-2 flex items-center gap-2">
                    <Badge className="bg-red-100 text-red-800">High</Badge>
                    <span>75</span>
                  </div>
                  <div className="col-span-3 flex flex-wrap gap-1">
                    <Badge variant="outline">Emotional</Badge>
                    <Badge variant="outline">Social</Badge>
                  </div>
                  <div className="col-span-2">
                    <Button size="sm">View</Button>
                  </div>
                </div>
                
                <div className="grid grid-cols-12 border-b py-3 px-4 text-sm items-center hover:bg-muted/50">
                  <div className="col-span-3 font-medium">Emma Davis</div>
                  <div className="col-span-2">8</div>
                  <div className="col-span-2 flex items-center gap-2">
                    <Badge className="bg-amber-100 text-amber-800">Medium</Badge>
                    <span>68</span>
                  </div>
                  <div className="col-span-3 flex flex-wrap gap-1">
                    <Badge variant="outline">Attendance</Badge>
                    <Badge variant="outline">Academic</Badge>
                  </div>
                  <div className="col-span-2">
                    <Button size="sm">View</Button>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <div className="text-sm text-muted-foreground">
                Showing 3 of {totalRisk} at-risk students
              </div>
              <Button variant="outline" size="sm">View All</Button>
            </CardFooter>
          </Card>
        </TabsContent>
        
        <TabsContent value="interventions" className="mt-6">
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Intervention Distribution</CardTitle>
                <CardDescription>Types of interventions currently active</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {interventionTypes.map(type => (
                    <div key={type.name} className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>{type.name}</span>
                        <span>{type.count} active</span>
                      </div>
                      <Progress value={(type.count / aggregatedData.activeInterventions) * 100} className="h-2" />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Intervention Effectiveness</CardTitle>
                <CardDescription>Success rates by intervention type</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {interventionTypes.map(type => (
                    <div key={type.name} className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>{type.name}</span>
                        <span>{type.success}% effective</span>
                      </div>
                      <Progress value={type.success} className="h-2" />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
          
          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Recent Interventions</CardTitle>
              <CardDescription>Recently applied interventions across schools</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <div className="grid grid-cols-12 border-b py-3 px-4 font-medium text-sm">
                  <div className="col-span-3">Intervention</div>
                  <div className="col-span-2">Student</div>
                  <div className="col-span-2">School</div>
                  <div className="col-span-2">Applied By</div>
                  <div className="col-span-1">Status</div>
                  <div className="col-span-2">Applied Date</div>
                </div>
                
                {/* Sample intervention rows */}
                <div className="grid grid-cols-12 border-b py-3 px-4 text-sm items-center hover:bg-muted/50">
                  <div className="col-span-3">Daily Check-in Strategy</div>
                  <div className="col-span-2">Alex Johnson</div>
                  <div className="col-span-2">Washington HS</div>
                  <div className="col-span-2">Ms. Rodriguez</div>
                  <div className="col-span-1">
                    <Badge variant="outline">Active</Badge>
                  </div>
                  <div className="col-span-2">Apr 18, 2025</div>
                </div>
                
                <div className="grid grid-cols-12 border-b py-3 px-4 text-sm items-center hover:bg-muted/50">
                  <div className="col-span-3">Attendance Improvement Plan</div>
                  <div className="col-span-2">Emma Davis</div>
                  <div className="col-span-2">Washington HS</div>
                  <div className="col-span-2">Mr. Williams</div>
                  <div className="col-span-1">
                    <Badge variant="outline">Active</Badge>
                  </div>
                  <div className="col-span-2">Apr 10, 2025</div>
                </div>
                
                <div className="grid grid-cols-12 py-3 px-4 text-sm items-center hover:bg-muted/50">
                  <div className="col-span-3">Social Skills Group</div>
                  <div className="col-span-2">Lily Chen</div>
                  <div className="col-span-2">Washington HS</div>
                  <div className="col-span-2">Dr. Wong</div>
                  <div className="col-span-1">
                    <Badge variant="outline">New</Badge>
                  </div>
                  <div className="col-span-2">Apr 21, 2025</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="trends" className="mt-6">
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Risk Trends (30 Days)</CardTitle>
                <CardDescription>Changes in student risk levels</CardDescription>
              </CardHeader>
              <CardContent className="h-80 flex items-center justify-center">
                <div className="text-center">
                  <p className="text-muted-foreground mb-4">Trend visualization coming soon</p>
                  <div className="flex justify-center gap-8">
                    <div className="text-center">
                      <div className="flex items-center gap-1 mb-1">
                        <div className="h-3 w-3 rounded-full bg-green-500"></div>
                        <div className="text-xs">Improving</div>
                      </div>
                      <div className="text-lg font-bold">28%</div>
                    </div>
                    <div className="text-center">
                      <div className="flex items-center gap-1 mb-1">
                        <div className="h-3 w-3 rounded-full bg-gray-400"></div>
                        <div className="text-xs">Stable</div>
                      </div>
                      <div className="text-lg font-bold">56%</div>
                    </div>
                    <div className="text-center">
                      <div className="flex items-center gap-1 mb-1">
                        <div className="h-3 w-3 rounded-full bg-red-500"></div>
                        <div className="text-xs">Worsening</div>
                      </div>
                      <div className="text-lg font-bold">16%</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Intervention Impact</CardTitle>
                <CardDescription>Effectiveness of applied interventions</CardDescription>
              </CardHeader>
              <CardContent className="h-80 flex items-center justify-center">
                <div className="text-center">
                  <p className="text-muted-foreground mb-4">Impact visualization coming soon</p>
                  <div className="flex justify-center gap-8">
                    <div className="text-center">
                      <div className="flex items-center gap-1 mb-1">
                        <div className="h-3 w-3 rounded-full bg-green-500"></div>
                        <div className="text-xs">Successful</div>
                      </div>
                      <div className="text-lg font-bold">72%</div>
                    </div>
                    <div className="text-center">
                      <div className="flex items-center gap-1 mb-1">
                        <div className="h-3 w-3 rounded-full bg-amber-500"></div>
                        <div className="text-xs">Partial</div>
                      </div>
                      <div className="text-lg font-bold">18%</div>
                    </div>
                    <div className="text-center">
                      <div className="flex items-center gap-1 mb-1">
                        <div className="h-3 w-3 rounded-full bg-red-500"></div>
                        <div className="text-xs">No Effect</div>
                      </div>
                      <div className="text-lg font-bold">10%</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminDashboardEnhanced;
