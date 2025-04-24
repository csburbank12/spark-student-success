
import React, { useState, useEffect } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { AlertTriangle, Users, ArrowUp, ArrowDown, Search } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import StudentRiskList from "./StudentRiskList";
import RiskLevelChart from "./RiskLevelChart";
import AlertsRiskWidget from "./AlertsRiskWidget";
import { toast } from "@/hooks/use-toast";

export type Student = {
  id: string;
  name: string;
  grade: string;
  riskScore: number;
  riskLevel: 'low' | 'medium' | 'high';
  riskTrend: 'up' | 'down' | 'stable';
  primaryConcern?: string;
  secondaryConcern?: string;
  lastCheckIn?: string;
  checkInActivity?: number; // percentage of check-ins completed
  days_since_check_in?: number;
};

// Mock data for now, will be replaced with real data from Supabase
const initialStudents: Student[] = [
  {
    id: "s1",
    name: "Alex Johnson",
    grade: "10",
    riskScore: 75,
    riskLevel: "high",
    riskTrend: "up",
    primaryConcern: "Extended negative mood",
    secondaryConcern: "Low check-in participation",
    lastCheckIn: "3 days ago",
    checkInActivity: 45,
    days_since_check_in: 3
  },
  {
    id: "s2",
    name: "Zoe Martin",
    grade: "9",
    riskScore: 30,
    riskLevel: "low",
    riskTrend: "stable",
    lastCheckIn: "Today",
    checkInActivity: 95,
    days_since_check_in: 0
  },
  {
    id: "s3",
    name: "Ethan Brown",
    grade: "11",
    riskScore: 55,
    riskLevel: "medium",
    riskTrend: "down",
    primaryConcern: "Multiple negative mood days",
    lastCheckIn: "Yesterday",
    checkInActivity: 75,
    days_since_check_in: 1
  },
  {
    id: "s4",
    name: "Lily Chen",
    grade: "10",
    riskScore: 82,
    riskLevel: "high",
    riskTrend: "up",
    primaryConcern: "Missing check-ins",
    secondaryConcern: "Recent negative reporting",
    lastCheckIn: "5 days ago",
    checkInActivity: 25,
    days_since_check_in: 5
  },
  {
    id: "s5",
    name: "Noah Williams",
    grade: "9",
    riskScore: 45,
    riskLevel: "medium",
    riskTrend: "stable",
    primaryConcern: "Declining mood trend",
    lastCheckIn: "Today",
    checkInActivity: 80,
    days_since_check_in: 0
  }
];

const PredictiveSupportEngine: React.FC = () => {
  const { user } = useAuth();
  const [students, setStudents] = useState<Student[]>(initialStudents);
  const [filteredStudents, setFilteredStudents] = useState<Student[]>(initialStudents);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedRiskLevel, setSelectedRiskLevel] = useState<string>("all");

  useEffect(() => {
    // In a real application, we would fetch the data from Supabase here
    // const fetchStudentData = async () => {
    //   try {
    //     const { data, error } = await supabase
    //       .from('trend_alerts')
    //       .select('*')
    //     
    //     if (error) throw error;
    //     // Process the data and set it to the state
    //   } catch (error) {
    //     console.error('Error fetching student data:', error);
    //     toast({
    //       title: "Error fetching data",
    //       description: "Failed to load student risk data.",
    //       variant: "destructive",
    //     });
    //   }
    // };
    // 
    // fetchStudentData();

    // For now, we'll use the mock data
  }, []);

  // Filter students based on search query and risk level
  useEffect(() => {
    let result = students;
    
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(student => 
        student.name.toLowerCase().includes(query) || 
        student.grade.toString().includes(query)
      );
    }
    
    if (selectedRiskLevel !== "all") {
      result = result.filter(student => student.riskLevel === selectedRiskLevel);
    }
    
    setFilteredStudents(result);
  }, [searchQuery, selectedRiskLevel, students]);

  // Analyze a student and send notifications
  const analyzeStudent = async (studentId: string) => {
    try {
      // This is where we would call our Supabase function to analyze the student
      toast({
        title: "Analysis Initiated",
        description: "Analyzing student data and sending notifications...",
      });
      // Simulate successful analysis
      setTimeout(() => {
        toast({
          title: "Analysis Complete",
          description: "Student risk assessment updated and notifications sent.",
        });
      }, 1500);
    } catch (error) {
      console.error("Error analyzing student:", error);
      toast({
        title: "Analysis Failed",
        description: "There was an error analyzing the student data.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-heading font-bold">
          WellLens™ Pulse Dashboard
        </h2>
        <Button onClick={() => {
          toast({
            title: "Analysis Started",
            description: "Running full school wellness analysis...",
          });
          // In a real app, this would trigger the analyze_student_mood function in Supabase
        }}>
          Run Full Analysis
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardContent className="p-6">
            <div className="flex justify-between">
              <div>
                <p className="text-sm text-muted-foreground">At-Risk Students</p>
                <p className="text-3xl font-bold">
                  {students.filter(s => s.riskLevel !== "low").length}
                </p>
              </div>
              <div className="h-12 w-12 rounded-full bg-amber-100 flex items-center justify-center">
                <AlertTriangle className="h-6 w-6 text-amber-600" />
              </div>
            </div>
            <div className="mt-4 flex items-center text-xs text-muted-foreground">
              <ArrowUp className="mr-1 h-4 w-4 text-red-500" />
              <span>12% increase this week</span>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Check-in Rate</p>
                <p className="text-3xl font-bold">78%</p>
              </div>
              <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center">
                <Users className="h-6 w-6 text-blue-600" />
              </div>
            </div>
            <div className="mt-4 flex items-center text-xs text-muted-foreground">
              <ArrowDown className="mr-1 h-4 w-4 text-green-500" />
              <span>5% increase over last week</span>
            </div>
          </CardContent>
        </Card>
        
        <AlertsRiskWidget />
      </div>

      <div className="w-full flex items-center space-x-2">
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
        <div className="flex items-center space-x-2">
          <Button 
            variant={selectedRiskLevel === "all" ? "default" : "outline"}
            onClick={() => setSelectedRiskLevel("all")}
          >
            All
          </Button>
          <Button 
            variant={selectedRiskLevel === "high" ? "default" : "outline"}
            className="text-red-700 bg-red-100 border-red-200 hover:bg-red-200"
            onClick={() => setSelectedRiskLevel("high")}
          >
            High Risk
          </Button>
          <Button 
            variant={selectedRiskLevel === "medium" ? "default" : "outline"}
            className="text-amber-700 bg-amber-100 border-amber-200 hover:bg-amber-200"
            onClick={() => setSelectedRiskLevel("medium")}
          >
            Medium Risk
          </Button>
        </div>
      </div>

      <Tabs defaultValue="riskList">
        <TabsList>
          <TabsTrigger value="riskList">Student Risk List</TabsTrigger>
          <TabsTrigger value="analytics">Risk Analytics</TabsTrigger>
        </TabsList>
        
        <TabsContent value="riskList">
          <StudentRiskList 
            students={filteredStudents} 
            onAnalyze={analyzeStudent} 
          />
        </TabsContent>
        
        <TabsContent value="analytics">
          <div className="grid md:grid-cols-3 gap-6">
            <Card className="md:col-span-2">
              <CardHeader>
                <CardTitle>Risk Level Trends</CardTitle>
              </CardHeader>
              <CardContent className="h-96">
                <RiskLevelChart />
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Risk Distribution</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <Badge className="bg-red-100 text-red-800 mr-2">High</Badge>
                        <span>High Risk</span>
                      </div>
                      <span>{students.filter(s => s.riskLevel === "high").length}</span>
                    </div>
                    <div className="h-2 bg-gray-100 rounded">
                      <div 
                        className="h-2 bg-red-500 rounded" 
                        style={{ 
                          width: `${(students.filter(s => s.riskLevel === "high").length / students.length) * 100}%` 
                        }} 
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <Badge className="bg-amber-100 text-amber-800 mr-2">Medium</Badge>
                        <span>Medium Risk</span>
                      </div>
                      <span>{students.filter(s => s.riskLevel === "medium").length}</span>
                    </div>
                    <div className="h-2 bg-gray-100 rounded">
                      <div 
                        className="h-2 bg-amber-500 rounded" 
                        style={{ 
                          width: `${(students.filter(s => s.riskLevel === "medium").length / students.length) * 100}%`
                        }} 
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <Badge className="bg-green-100 text-green-800 mr-2">Low</Badge>
                        <span>Low Risk</span>
                      </div>
                      <span>{students.filter(s => s.riskLevel === "low").length}</span>
                    </div>
                    <div className="h-2 bg-gray-100 rounded">
                      <div 
                        className="h-2 bg-green-500 rounded" 
                        style={{ 
                          width: `${(students.filter(s => s.riskLevel === "low").length / students.length) * 100}%` 
                        }} 
                      />
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

export default PredictiveSupportEngine;
