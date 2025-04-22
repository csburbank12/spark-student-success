
import React, { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import {
  AlertCircle,
  BarChart4,
  CheckCircle,
  Clock,
  Filter,
  UserCog,
  Calendar,
  TrendingUp,
  TrendingDown,
  Search,
  ThumbsUp,
  ThumbsDown,
  PlusCircle
} from "lucide-react";
import { Input } from "@/components/ui/input";

import RiskScoreCard from "./RiskScoreCard";
import InterventionCard from "./InterventionCard";
import InterventionTimeline from "./InterventionTimeline";
import RiskFactorsCard from "./RiskFactorsCard";

export interface Student {
  id: string;
  name: string;
  grade: string;
  riskScore: number;
  riskTrend: "up" | "down" | "stable";
  riskFactors: string[];
  lastUpdated: string;
  predictedRisk: number;
  confidenceLevel: number;
}

export interface Intervention {
  id: string;
  type: string;
  description: string;
  assignedTo: string;
  dueDate: string;
  status: "pending" | "in-progress" | "completed" | "overdue";
  impact?: number;
}

const PredictiveSupportEngine: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("all");

  // Mock data for at-risk students
  const students: Student[] = [
    {
      id: "s1",
      name: "Alex Johnson",
      grade: "8",
      riskScore: 82,
      riskTrend: "up",
      riskFactors: ["Declining grades", "Increased absences", "Negative journal sentiment", "Low engagement"],
      lastUpdated: "Today, 8:15 AM",
      predictedRisk: 87,
      confidenceLevel: 92
    },
    {
      id: "s2",
      name: "Maya Patel",
      grade: "7",
      riskScore: 65,
      riskTrend: "stable",
      riskFactors: ["Peer conflict", "Recent mood decline"],
      lastUpdated: "Today, 9:30 AM",
      predictedRisk: 68,
      confidenceLevel: 78
    },
    {
      id: "s3",
      name: "Ethan Brown",
      grade: "6",
      riskScore: 45,
      riskTrend: "down",
      riskFactors: ["Moderate absences"],
      lastUpdated: "Yesterday, 2:45 PM",
      predictedRisk: 38,
      confidenceLevel: 85
    },
    {
      id: "s4",
      name: "Zoe Martinez",
      grade: "8",
      riskScore: 78,
      riskTrend: "up",
      riskFactors: ["Behavioral incidents", "Declining grades", "Low check-in rate"],
      lastUpdated: "Today, 7:50 AM",
      predictedRisk: 82,
      confidenceLevel: 89
    }
  ];

  // Mock data for interventions
  const interventions: Intervention[] = [
    {
      id: "i1",
      type: "Counselor Check-in",
      description: "1:1 session to discuss recent peer conflicts and provide support strategies",
      assignedTo: "Dr. Lisa Wong",
      dueDate: "Apr 23, 2:30 PM",
      status: "pending",
    },
    {
      id: "i2",
      type: "Parent Conference",
      description: "Meeting with parents to discuss academic support options and home strategies",
      assignedTo: "Mr. James Harris",
      dueDate: "Apr 25, 3:15 PM",
      status: "in-progress",
    },
    {
      id: "i3",
      type: "Academic Support",
      description: "After-school math tutoring twice weekly for 3 weeks",
      assignedTo: "Ms. Sarah Miller",
      dueDate: "Ongoing through May 12",
      status: "in-progress",
      impact: 15
    },
    {
      id: "i4",
      type: "Mindfulness Exercise",
      description: "Daily breathing exercise and guided visualization",
      assignedTo: "Self-guided",
      dueDate: "Daily, 9:00 AM",
      status: "completed",
      impact: 22
    }
  ];
  
  const filteredStudents = students.filter(student => {
    // Apply search filter
    const matchesSearch = searchQuery === "" || 
      student.name.toLowerCase().includes(searchQuery.toLowerCase());
    
    // Apply risk level filter
    if (selectedFilter === "all") return matchesSearch;
    if (selectedFilter === "high") return matchesSearch && student.riskScore >= 75;
    if (selectedFilter === "medium") return matchesSearch && student.riskScore >= 50 && student.riskScore < 75;
    if (selectedFilter === "low") return matchesSearch && student.riskScore < 50;
    
    return matchesSearch;
  });

  // Analytics data
  const interventionImpactData = [
    { name: "Counseling", success: 68, partial: 22, none: 10 },
    { name: "Mindfulness", success: 72, partial: 18, none: 10 },
    { name: "Academic", success: 65, partial: 25, none: 10 },
    { name: "Parental", success: 58, partial: 30, none: 12 },
    { name: "Peer Support", success: 75, partial: 15, none: 10 },
  ];

  // Selected student (for detailed view)
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(students[0]);
  const [viewMode, setViewMode] = useState<"list" | "detail">("list");

  const handleStudentSelect = (student: Student) => {
    setSelectedStudent(student);
    setViewMode("detail");
  };

  const handleBackToList = () => {
    setViewMode("list");
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-heading font-bold">
          Predictive Student Support Engine
        </h2>
        <div className="flex items-center gap-2">
          <Button variant="outline" className="gap-1">
            <BarChart4 className="h-4 w-4" />
            <span>Analytics</span>
          </Button>
          <Button className="gap-1">
            <UserCog className="h-4 w-4" />
            <span>Configure Engine</span>
          </Button>
        </div>
      </div>

      {viewMode === "list" ? (
        <>
          <div className="grid gap-4 md:grid-cols-4">
            <Card>
              <CardContent className="p-4">
                <div className="flex flex-col items-center text-center">
                  <AlertCircle className="h-8 w-8 text-red-500 mb-2" />
                  <div className="text-2xl font-bold">{students.filter(s => s.riskScore >= 75).length}</div>
                  <p className="text-sm text-muted-foreground">High Risk</p>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="flex flex-col items-center text-center">
                  <AlertCircle className="h-8 w-8 text-amber-500 mb-2" />
                  <div className="text-2xl font-bold">{students.filter(s => s.riskScore >= 50 && s.riskScore < 75).length}</div>
                  <p className="text-sm text-muted-foreground">Medium Risk</p>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="flex flex-col items-center text-center">
                  <CheckCircle className="h-8 w-8 text-green-500 mb-2" />
                  <div className="text-2xl font-bold">{students.filter(s => s.riskScore < 50).length}</div>
                  <p className="text-sm text-muted-foreground">Low Risk</p>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="flex flex-col items-center text-center">
                  <Calendar className="h-8 w-8 text-primary mb-2" />
                  <div className="text-2xl font-bold">{interventions.filter(i => i.status === "pending" || i.status === "in-progress").length}</div>
                  <p className="text-sm text-muted-foreground">Active Interventions</p>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search students..."
                className="pl-8"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="flex items-center space-x-2">
              <Button 
                variant={selectedFilter === "all" ? "default" : "outline"}
                onClick={() => setSelectedFilter("all")}
                size="sm"
              >
                All
              </Button>
              <Button 
                variant={selectedFilter === "high" ? "default" : "outline"}
                onClick={() => setSelectedFilter("high")}
                size="sm"
                className="flex items-center gap-1"
              >
                <AlertCircle className="h-4 w-4 text-red-500" /> High Risk
              </Button>
              <Button 
                variant={selectedFilter === "medium" ? "default" : "outline"}
                onClick={() => setSelectedFilter("medium")}
                size="sm"
                className="flex items-center gap-1"
              >
                <AlertCircle className="h-4 w-4 text-amber-500" /> Medium Risk
              </Button>
              <Button 
                variant={selectedFilter === "low" ? "default" : "outline"}
                onClick={() => setSelectedFilter("low")}
                size="sm"
                className="flex items-center gap-1"
              >
                <CheckCircle className="h-4 w-4 text-green-500" /> Low Risk
              </Button>
            </div>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Students Requiring Support</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {filteredStudents.length === 0 ? (
                  <p className="text-center text-muted-foreground py-8">No students match your filters</p>
                ) : (
                  filteredStudents.map(student => (
                    <div 
                      key={student.id}
                      className="flex flex-col md:flex-row md:items-center justify-between p-4 border rounded-lg hover:bg-muted/20 cursor-pointer transition-colors"
                      onClick={() => handleStudentSelect(student)}
                    >
                      <div className="space-y-2 md:space-y-0.5">
                        <div className="flex items-center gap-2">
                          <h3 className="font-medium">{student.name}</h3>
                          <Badge variant="outline">Grade {student.grade}</Badge>
                          {student.riskTrend === "up" && (
                            <Badge variant="destructive" className="flex items-center gap-1">
                              <TrendingUp className="h-3 w-3" /> Increasing Risk
                            </Badge>
                          )}
                          {student.riskTrend === "down" && (
                            <Badge variant="secondary" className="flex items-center gap-1">
                              <TrendingDown className="h-3 w-3" /> Decreasing Risk
                            </Badge>
                          )}
                        </div>
                        <div className="text-sm text-muted-foreground">
                          <span>Risk Factors: </span>
                          <span>{student.riskFactors.join(", ")}</span>
                        </div>
                        <div className="flex items-center gap-1 text-xs text-muted-foreground">
                          <Clock className="h-3 w-3" />
                          <span>Updated: {student.lastUpdated}</span>
                        </div>
                      </div>

                      <div className="flex flex-col items-center mt-4 md:mt-0">
                        <div className="flex items-baseline gap-2">
                          <span className="text-lg font-bold">
                            {student.riskScore}
                          </span>
                          <span className="text-sm text-muted-foreground">
                            Risk Score
                          </span>
                        </div>
                        <div className="w-full max-w-[120px] mt-1">
                          <Progress 
                            value={student.riskScore} 
                            className={
                              student.riskScore >= 75 ? "bg-red-200" : 
                              student.riskScore >= 50 ? "bg-amber-200" : 
                              "bg-green-200"
                            }
                          />
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </CardContent>
            <CardFooter className="flex justify-center border-t p-4">
              <Button variant="outline">View All Students</Button>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Intervention Impact Analysis</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {interventionImpactData.map((intervention, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex justify-between mb-1">
                      <span className="font-medium">{intervention.name} Interventions</span>
                      <span>{intervention.success}% Success Rate</span>
                    </div>
                    <div className="flex h-2 rounded-full overflow-hidden">
                      <div 
                        className="bg-green-500" 
                        style={{ width: `${intervention.success}%` }}
                      />
                      <div 
                        className="bg-amber-400" 
                        style={{ width: `${intervention.partial}%` }}
                      />
                      <div 
                        className="bg-red-400" 
                        style={{ width: `${intervention.none}%` }}
                      />
                    </div>
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>
                        <span className="inline-block h-2 w-2 bg-green-500 rounded-full mr-1"></span>
                        Significant Impact
                      </span>
                      <span>
                        <span className="inline-block h-2 w-2 bg-amber-400 rounded-full mr-1"></span>
                        Partial Impact
                      </span>
                      <span>
                        <span className="inline-block h-2 w-2 bg-red-400 rounded-full mr-1"></span>
                        No Impact
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </>
      ) : (
        // Detail view for a selected student
        <>
          <div className="flex items-center">
            <Button variant="ghost" className="mr-2" onClick={handleBackToList}>
              Back to List
            </Button>
            <h3 className="text-xl font-medium">
              Student Support Plan: {selectedStudent?.name}
            </h3>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <RiskScoreCard student={selectedStudent!} />
            <RiskFactorsCard student={selectedStudent!} />
          </div>

          <Tabs defaultValue="interventions" className="w-full mt-6">
            <TabsList>
              <TabsTrigger value="interventions">Interventions</TabsTrigger>
              <TabsTrigger value="timeline">Timeline</TabsTrigger>
              <TabsTrigger value="history">History</TabsTrigger>
            </TabsList>
            
            <TabsContent value="interventions" className="mt-4">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                  <CardTitle>Recommended Interventions</CardTitle>
                  <Button size="sm" className="flex items-center gap-1">
                    <PlusCircle className="h-4 w-4" />
                    Add Intervention
                  </Button>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {interventions.map((intervention) => (
                      <InterventionCard 
                        key={intervention.id} 
                        intervention={intervention}
                      />
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="timeline">
              <InterventionTimeline interventions={interventions} />
            </TabsContent>
            
            <TabsContent value="history">
              <Card>
                <CardHeader>
                  <CardTitle>Intervention History & Effectiveness</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div>
                      <h3 className="font-medium mb-2">Previous Interventions</h3>
                      <div className="space-y-4">
                        <div className="p-4 border rounded-lg">
                          <div className="flex justify-between mb-1">
                            <div className="font-medium">Weekly Check-ins with School Counselor</div>
                            <Badge variant="outline" className="flex items-center gap-1">
                              <ThumbsUp className="h-3 w-3 text-green-500" />
                              Effective
                            </Badge>
                          </div>
                          <p className="text-sm mb-2">Four weekly sessions discussing social anxiety and coping strategies</p>
                          <div className="flex items-center gap-1 text-xs text-muted-foreground">
                            <Calendar className="h-3 w-3" />
                            <span>March 5 - March 26, 2023</span>
                          </div>
                          <div className="mt-3">
                            <div className="text-sm font-medium mb-1">Impact Metrics:</div>
                            <div className="grid grid-cols-2 gap-2 text-sm">
                              <div>Mood Score: +18%</div>
                              <div>Check-in Completion: +25%</div>
                              <div>Classroom Participation: +12%</div>
                              <div>Self-reported Anxiety: -30%</div>
                            </div>
                          </div>
                        </div>

                        <div className="p-4 border rounded-lg">
                          <div className="flex justify-between mb-1">
                            <div className="font-medium">Math Tutoring Program</div>
                            <Badge variant="outline" className="flex items-center gap-1">
                              <ThumbsDown className="h-3 w-3 text-amber-500" />
                              Partial Effect
                            </Badge>
                          </div>
                          <p className="text-sm mb-2">Twice-weekly after-school math support for 4 weeks</p>
                          <div className="flex items-center gap-1 text-xs text-muted-foreground">
                            <Calendar className="h-3 w-3" />
                            <span>February 1 - February 28, 2023</span>
                          </div>
                          <div className="mt-3">
                            <div className="text-sm font-medium mb-1">Impact Metrics:</div>
                            <div className="grid grid-cols-2 gap-2 text-sm">
                              <div>Math Assessment Scores: +8%</div>
                              <div>Homework Completion: +15%</div>
                              <div>Math Anxiety: -5%</div>
                              <div>Self-confidence: +2%</div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="font-medium mb-2">Most Effective Strategies for This Student</h3>
                      <div className="space-y-2">
                        <div className="flex justify-between items-center">
                          <span>One-on-one counseling</span>
                          <div className="flex items-center gap-1">
                            <Progress value={85} className="w-24 h-2 bg-gray-100" />
                            <span className="text-sm">85%</span>
                          </div>
                        </div>
                        <div className="flex justify-between items-center">
                          <span>Mindfulness practices</span>
                          <div className="flex items-center gap-1">
                            <Progress value={72} className="w-24 h-2 bg-gray-100" />
                            <span className="text-sm">72%</span>
                          </div>
                        </div>
                        <div className="flex justify-between items-center">
                          <span>Parent involvement</span>
                          <div className="flex items-center gap-1">
                            <Progress value={68} className="w-24 h-2 bg-gray-100" />
                            <span className="text-sm">68%</span>
                          </div>
                        </div>
                        <div className="flex justify-between items-center">
                          <span>Peer mentoring</span>
                          <div className="flex items-center gap-1">
                            <Progress value={45} className="w-24 h-2 bg-gray-100" />
                            <span className="text-sm">45%</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </>
      )}
    </div>
  );
};

export default PredictiveSupportEngine;
