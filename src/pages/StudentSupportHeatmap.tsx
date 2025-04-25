import React, { useState, useMemo } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { UserRole } from "@/types/roles";
import { toast } from "sonner";
import { HeatmapHeader } from "@/components/student-support/HeatmapHeader";
import { HeatmapSearchAndFilter } from "@/components/student-support/HeatmapSearchAndFilter";
import { HeatmapContent } from "@/components/student-support/HeatmapContent";
import { HeatmapFilters } from "@/components/student-support/HeatmapFilters";
import { HeatmapStats } from "@/components/student-support/HeatmapStats";

// Define the Student type
type StudentStatus = "at_risk" | "concerning" | "stable";

interface Student {
  id: string;
  name: string;
  photoUrl: string | null;
  grade: string;
  class: string;
  teacher: string;
  status: StudentStatus;
  confidenceScore: number;
  moodTrend: string;
  absences: number;
  tardies: number;
  behaviorReports: number;
  currentInterventions: string[];
}

const StudentSupportHeatmap = () => {
  const { user } = useAuth();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedView, setSelectedView] = useState<"class" | "grade" | "school">("class");
  const [selectedGrade, setSelectedGrade] = useState<string>("");
  const [selectedClass, setSelectedClass] = useState<string>("");
  const [selectedRiskLevel, setSelectedRiskLevel] = useState<string>("all");
  const [isRealTimeEnabled, setIsRealTimeEnabled] = useState(true);
  
  // Mock data - this would come from your data source
  const mockData = useMemo<Student[]>(() => {
    return [
      {
        id: "s1",
        name: "Alex Johnson",
        photoUrl: null,
        grade: "8",
        class: "8A",
        teacher: "Ms. Smith",
        status: "at_risk",
        confidenceScore: 85,
        moodTrend: "declining",
        absences: 3,
        tardies: 2,
        behaviorReports: 1,
        currentInterventions: ["Weekly check-in with counselor"],
      },
      {
        id: "s2",
        name: "Emma Davis",
        photoUrl: null,
        grade: "8",
        class: "8A",
        teacher: "Ms. Smith",
        status: "stable",
        confidenceScore: 92,
        moodTrend: "stable",
        absences: 0,
        tardies: 1,
        behaviorReports: 0,
        currentInterventions: [],
      },
      {
        id: "s3",
        name: "Michael Lee",
        photoUrl: null,
        grade: "7",
        class: "7C",
        teacher: "Mr. Johnson",
        status: "concerning",
        confidenceScore: 68,
        moodTrend: "fluctuating",
        absences: 2,
        tardies: 3,
        behaviorReports: 0,
        currentInterventions: [],
      },
      {
        id: "s4",
        name: "Sophia Wilson",
        photoUrl: null,
        grade: "6",
        class: "6B",
        teacher: "Mrs. Garcia",
        status: "at_risk",
        confidenceScore: 74,
        moodTrend: "declining",
        absences: 5,
        tardies: 2,
        behaviorReports: 2,
        currentInterventions: ["Parent meeting scheduled"],
      },
      {
        id: "s5",
        name: "James Taylor",
        photoUrl: null,
        grade: "8",
        class: "8B",
        teacher: "Mr. Brown",
        status: "stable",
        confidenceScore: 95,
        moodTrend: "improving",
        absences: 0,
        tardies: 0,
        behaviorReports: 0,
        currentInterventions: [],
      },
      {
        id: "s6",
        name: "Olivia Miller",
        photoUrl: null,
        grade: "7",
        class: "7A",
        teacher: "Ms. Wilson",
        status: "concerning",
        confidenceScore: 79,
        moodTrend: "recent decline",
        absences: 1,
        tardies: 2,
        behaviorReports: 1,
        currentInterventions: [],
      },
      {
        id: "s7",
        name: "Noah Anderson",
        photoUrl: null,
        grade: "6",
        class: "6A",
        teacher: "Mrs. Davis",
        status: "stable",
        confidenceScore: 88,
        moodTrend: "stable",
        absences: 1,
        tardies: 0,
        behaviorReports: 0,
        currentInterventions: [],
      },
      {
        id: "s8",
        name: "Isabella Thomas",
        photoUrl: null,
        grade: "8",
        class: "8A",
        teacher: "Ms. Smith",
        status: "at_risk",
        confidenceScore: 65,
        moodTrend: "rapid decline",
        absences: 4,
        tardies: 3,
        behaviorReports: 2,
        currentInterventions: ["Counselor sessions", "Behavior plan"],
      },
    ];
  }, []);

  // Filter data based on search and filters
  const filteredData = useMemo(() => {
    return mockData.filter((student) => {
      // Search filter
      const matchesSearch = searchQuery === "" || 
        student.name.toLowerCase().includes(searchQuery.toLowerCase());
      
      // Grade filter
      const matchesGrade = selectedGrade === "" || student.grade === selectedGrade;
      
      // Class filter
      const matchesClass = selectedClass === "" || student.class === selectedClass;
      
      // Risk level filter
      const matchesRiskLevel = 
        selectedRiskLevel === "all" || 
        (selectedRiskLevel === "at_risk" && student.status === "at_risk") ||
        (selectedRiskLevel === "concerning" && student.status === "concerning") ||
        (selectedRiskLevel === "stable" && student.status === "stable");
      
      return matchesSearch && matchesGrade && matchesClass && matchesRiskLevel;
    });
  }, [mockData, searchQuery, selectedGrade, selectedClass, selectedRiskLevel]);

  // Count students by status
  const statusCounts = useMemo(() => {
    const counts = {
      at_risk: 0,
      concerning: 0,
      stable: 0,
      total: mockData.length,
    };
    
    mockData.forEach((student) => {
      counts[student.status as keyof typeof counts] += 1;
    });
    
    return counts;
  }, [mockData]);

  // Available filters based on data
  const availableGrades = useMemo(() => {
    return Array.from(new Set(mockData.map((student) => student.grade)));
  }, [mockData]);
  
  const availableClasses = useMemo(() => {
    return Array.from(new Set(mockData.map((student) => student.class)));
  }, [mockData]);

  // Toggle real-time updates
  const toggleRealTime = () => {
    setIsRealTimeEnabled(!isRealTimeEnabled);
    toast.success(`Real-time updates ${!isRealTimeEnabled ? "enabled" : "disabled"}`);
  };

  const handleExportData = () => {
    toast.success("Exporting data...");
  };

  return (
    <div className="space-y-6">
      <HeatmapHeader 
        isRealTimeEnabled={isRealTimeEnabled}
        toggleRealTime={toggleRealTime}
        handleExportData={handleExportData}
      />

      <HeatmapStats 
        atRiskCount={statusCounts.at_risk}
        concerningCount={statusCounts.concerning}
        stableCount={statusCounts.stable}
        totalCount={statusCounts.total}
      />
      
      <HeatmapSearchAndFilter 
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        selectedView={selectedView}
        setSelectedView={setSelectedView}
        availableGrades={availableGrades}
        availableClasses={availableClasses}
        selectedGrade={selectedGrade}
        selectedClass={selectedClass}
        setSelectedGrade={setSelectedGrade}
        setSelectedClass={setSelectedClass}
        userRole={user?.role as UserRole}
      />

      <HeatmapFilters 
        selectedRiskLevel={selectedRiskLevel}
        onRiskLevelChange={setSelectedRiskLevel}
      />

      <HeatmapContent 
        filteredData={filteredData}
        selectedView={selectedView}
      />
    </div>
  );
};

export default StudentSupportHeatmap;
