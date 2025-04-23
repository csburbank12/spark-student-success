import React, { useState, useTransition } from "react";
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
import { Skeleton } from "@/components/ui/skeleton";
import StudentDetailView from "./dashboard/StudentDetailView";
import StudentListView from "./dashboard/StudentListView";

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

// Loading skeleton for cards
const CardSkeleton = () => (
  <div className="space-y-3">
    <Skeleton className="h-6 w-1/3" />
    <Skeleton className="h-24 w-full" />
    <Skeleton className="h-24 w-full" />
  </div>
);

const PredictiveSupportEngine: React.FC = () => {
  const [isPending, startTransition] = useTransition();
  
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

  // Handle tab change with startTransition to avoid suspension
  const handleTabChange = (value: string) => {
    startTransition(() => {
      setActiveTab(value);
    });
  };

  // Handle filter change with startTransition
  const handleFilterChange = (value: string) => {
    startTransition(() => {
      setSelectedFilter(value);
    });
  };

  // Handle search query change with startTransition
  const handleSearchChange = (value: string) => {
    startTransition(() => {
      setSearchQuery(value);
    });
  };

  // Make sure we have data before rendering
  const currentStudent = selectedStudent || (filteredStudents.length > 0 ? filteredStudents[0] : null);

  // Render student detail view or list view based on current state
  if (viewMode === "detail" && selectedStudent) {
    return (
      <StudentDetailView 
        selectedStudent={selectedStudent} 
        interventions={interventions}
        onBack={handleBackToList} 
      />
    );
  }

  return (
    <div className="space-y-6">
      <PredictiveSupportHeader />
      
      <StudentFilters 
        searchQuery={searchQuery}
        setSearchQuery={handleSearchChange}
        selectedFilter={selectedFilter}
        setSelectedFilter={handleFilterChange}
      />
      
      <Tabs defaultValue={activeTab} onValueChange={handleTabChange} className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="overview">Student Overview</TabsTrigger>
          <TabsTrigger value="interventions">Interventions</TabsTrigger>
          <TabsTrigger value="warnings">Early Warnings</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            {isPending || !currentStudent ? (
              <>
                <CardSkeleton />
                <CardSkeleton />
              </>
            ) : (
              <>
                <RiskScoreCard student={currentStudent} />
                <RiskFactorsCard student={currentStudent} />
              </>
            )}
          </div>
          <StudentListView 
            students={filteredStudents}
            filteredStudents={filteredStudents}
            onStudentSelect={handleStudentSelect}
          />
        </TabsContent>
        
        <TabsContent value="interventions" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            {isPending ? (
              <>
                <CardSkeleton />
                <CardSkeleton />
              </>
            ) : (
              <>
                {interventions.length > 0 && <InterventionCard intervention={interventions[0]} />}
                <InterventionTimeline interventions={interventions} />
              </>
            )}
          </div>
          {isPending ? (
            <CardSkeleton />
          ) : (
            <RecommendedInterventions 
              student={currentStudent || filteredStudents[0]} 
              recommendations={[]}
            />
          )}
        </TabsContent>
        
        <TabsContent value="warnings" className="space-y-6">
          {isPending ? (
            <CardSkeleton />
          ) : (
            <EarlyWarningIndicators indicators={earlyWarningIndicators} />
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default PredictiveSupportEngine;
