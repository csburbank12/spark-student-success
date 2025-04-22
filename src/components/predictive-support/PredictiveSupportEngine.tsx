
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
import usePredictiveSupportState from "./usePredictiveSupportState";

// Define the types
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

export interface RiskFactor {
  name: string;
  weight: number;
  category: "academic" | "behavioral" | "social" | "emotional" | "attendance";
  trend: "increasing" | "decreasing" | "stable";
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

export interface EarlyWarningIndicator {
  id: string;
  type: string;
  description: string;
  urgency: "high" | "medium" | "low";
  detectedDate: string;
  confidence: number;
  affectedStudents: number;
  trend: "increasing" | "stable" | "decreasing";
}

const PredictiveSupportEngine: React.FC = () => {
  const {
    searchQuery,
    setSearchQuery,
    selectedFilter,
    setSelectedFilter,
    filteredStudents,
    selectedStudent,
    interventions,
    viewMode,
    handleStudentSelect,
    handleBackToList,
    earlyWarningIndicators
  } = usePredictiveSupportState();
  
  const [activeTab, setActiveTab] = useState("overview");

  // Sample risk factors for the card
  const riskFactors: RiskFactor[] = [
    { name: "Attendance", weight: 0.8, category: "attendance", trend: "increasing" },
    { name: "Grade Performance", weight: 0.75, category: "academic", trend: "stable" },
    { name: "Social Interaction", weight: 0.6, category: "social", trend: "decreasing" },
  ];

  return (
    <div className="space-y-6">
      <PredictiveSupportHeader />
      
      <StudentFilters 
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        selectedFilter={selectedFilter}
        setSelectedFilter={setSelectedFilter}
      />
      
      <Tabs defaultValue={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="overview">Student Overview</TabsTrigger>
          <TabsTrigger value="interventions">Interventions</TabsTrigger>
          <TabsTrigger value="warnings">Early Warnings</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            <RiskScoreCard student={selectedStudent || filteredStudents[0]} />
            <RiskFactorsCard student={selectedStudent || filteredStudents[0]} />
          </div>
        </TabsContent>
        
        <TabsContent value="interventions" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            {interventions.length > 0 && <InterventionCard intervention={interventions[0]} />}
            <InterventionTimeline interventions={interventions} />
          </div>
          <RecommendedInterventions 
            student={selectedStudent || filteredStudents[0]} 
            recommendations={[]}
          />
        </TabsContent>
        
        <TabsContent value="warnings" className="space-y-6">
          <EarlyWarningIndicators indicators={earlyWarningIndicators} />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default PredictiveSupportEngine;
