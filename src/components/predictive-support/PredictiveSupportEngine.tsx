
import React from "react";
import usePredictiveSupportState from "./usePredictiveSupportState";
import PredictiveSupportHeader from "./PredictiveSupportHeader";
import StudentFilters from "./StudentFilters";
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
  const {
    students,
    interventions,
    interventionImpactData,
    searchQuery,
    setSearchQuery,
    selectedFilter,
    setSelectedFilter,
    filteredStudents,
    selectedStudent,
    handleStudentSelect,
    handleBackToList,
    viewMode
  } = usePredictiveSupportState();

  return (
    <div className="space-y-6">
      <PredictiveSupportHeader />
      {viewMode === "list" ? (
        <>
          <DashboardRiskSummary
            students={students}
            interventions={interventions}
          />
          <StudentFilters
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            selectedFilter={selectedFilter}
            setSelectedFilter={setSelectedFilter}
          />
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
