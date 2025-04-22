
import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import PredictiveSupportHeader from "./PredictiveSupportHeader";
import StudentFilters from "./StudentFilters";
import RiskFactorsCard from "./RiskFactorsCard";
import RiskScoreCard from "./RiskScoreCard";
import InterventionCard from "./InterventionCard";
import InterventionTimeline from "./InterventionTimeline";
import RecommendedInterventions from "./RecommendedInterventions";
import EarlyWarningIndicators from "./EarlyWarningIndicators";
import { usePredictiveSupport } from "./usePredictiveSupportState";

// Define the types
interface Student {
  id: string;
  name: string;
  grade: string;
  riskLevel: "high" | "medium" | "low";
  riskScore: number;
  trend: "up" | "down" | "stable";
}

interface RiskFactor {
  name: string;
  weight: number;
  category: "academic" | "behavioral" | "social" | "emotional" | "attendance";
  trend: "increasing" | "decreasing" | "stable";
}

interface Intervention {
  id: string;
  name: string;
  description: string;
  assignee: string;
  status: "pending" | "in-progress" | "completed";
  startDate: string;
  endDate: string;
  effectiveness: number;
}

interface EarlyWarningIndicator {
  id: string;
  type: string;
  description: string;
  urgency: "high" | "medium" | "low";
  detectedDate: string;
  confidence: number;
  affectedStudents: number;
  trend: string;
}

const PredictiveSupportEngine: React.FC = () => {
  const { state, dispatch } = usePredictiveSupport();
  const [activeTab, setActiveTab] = useState("overview");

  // Mock data
  const students: Student[] = [
    { id: "s1", name: "Alex Johnson", grade: "9", riskLevel: "high", riskScore: 85, trend: "up" },
    { id: "s2", name: "Jamie Smith", grade: "10", riskLevel: "medium", riskScore: 65, trend: "stable" },
    { id: "s3", name: "Taylor Williams", grade: "8", riskLevel: "low", riskScore: 35, trend: "down" },
  ];

  const riskFactors: RiskFactor[] = [
    { name: "Attendance", weight: 0.8, category: "attendance", trend: "increasing" },
    { name: "Grade Performance", weight: 0.75, category: "academic", trend: "stable" },
    { name: "Social Interaction", weight: 0.6, category: "social", trend: "decreasing" },
  ];

  const interventions: Intervention[] = [
    {
      id: "i1",
      name: "Weekly Check-in",
      description: "Regular check-in with counselor",
      assignee: "Ms. Rodriguez",
      status: "in-progress",
      startDate: "2023-03-15",
      endDate: "2023-06-15",
      effectiveness: 80,
    },
    {
      id: "i2",
      name: "Parent Conference",
      description: "Meeting with parents to discuss progress",
      assignee: "Mr. Peterson",
      status: "pending",
      startDate: "2023-04-10",
      endDate: "2023-04-10",
      effectiveness: 0,
    },
  ];

  // Define earlyWarningIndicators with the correct urgency types
  const earlyWarningIndicators: EarlyWarningIndicator[] = [
    {
      id: "ew1",
      type: "Attendance",
      description: "Multiple absences detected in the past week",
      urgency: "high", // Using the literal type
      detectedDate: "2023-04-01",
      confidence: 90,
      affectedStudents: 12,
      trend: "increasing",
    },
    {
      id: "ew2",
      type: "Academic",
      description: "Significant grade decline in core subjects",
      urgency: "medium", // Using the literal type
      detectedDate: "2023-03-28",
      confidence: 75,
      affectedStudents: 8,
      trend: "stable",
    },
    {
      id: "ew3",
      type: "Behavioral",
      description: "Reduced participation in class activities",
      urgency: "low", // Using the literal type
      detectedDate: "2023-03-15",
      confidence: 60,
      affectedStudents: 5,
      trend: "decreasing",
    },
  ];

  return (
    <div className="space-y-6">
      <PredictiveSupportHeader />
      
      <StudentFilters />
      
      <Tabs defaultValue={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="overview">Student Overview</TabsTrigger>
          <TabsTrigger value="interventions">Interventions</TabsTrigger>
          <TabsTrigger value="warnings">Early Warnings</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            <RiskScoreCard />
            <RiskFactorsCard riskFactors={riskFactors} />
          </div>
        </TabsContent>
        
        <TabsContent value="interventions" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            <InterventionCard interventions={interventions} />
            <InterventionTimeline interventions={interventions} />
          </div>
          <RecommendedInterventions />
        </TabsContent>
        
        <TabsContent value="warnings" className="space-y-6">
          <EarlyWarningIndicators indicators={earlyWarningIndicators} />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default PredictiveSupportEngine;
