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
import DashboardRiskSummary from "./dashboard/DashboardRiskSummary";
import StudentListView from "./dashboard/StudentListView";
import StudentDetailView from "./dashboard/StudentDetailView";
import InterventionImpactAnalysis from "./dashboard/InterventionImpactAnalysis";

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
    const matchesSearch = searchQuery === "" || 
      student.name.toLowerCase().includes(searchQuery.toLowerCase());
    
    if (selectedFilter === "all") return matchesSearch;
    if (selectedFilter === "high") return matchesSearch && student.riskScore >= 75;
    if (selectedFilter === "medium") return matchesSearch && student.riskScore >= 50 && student.riskScore < 75;
    if (selectedFilter === "low") return matchesSearch && student.riskScore < 50;
    
    return matchesSearch;
  });

  const interventionImpactData = [
    { name: "Counseling", success: 68, partial: 22, none: 10 },
    { name: "Mindfulness", success: 72, partial: 18, none: 10 },
    { name: "Academic", success: 65, partial: 25, none: 10 },
    { name: "Parental", success: 58, partial: 30, none: 12 },
    { name: "Peer Support", success: 75, partial: 15, none: 10 },
  ];

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
          <DashboardRiskSummary
            students={students}
            interventions={interventions}
          />
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
          <StudentListView
            students={students}
            filteredStudents={filteredStudents}
            onStudentSelect={handleStudentSelect}
          />
          <InterventionImpactAnalysis
            interventionImpactData={interventionImpactData}
          />
        </>
      ) : (
        <StudentDetailView
          selectedStudent={selectedStudent!}
          interventions={interventions}
          onBack={handleBackToList}
        />
      )}
    </div>
  );
};

export default PredictiveSupportEngine;
