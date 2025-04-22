
import { useState, useMemo } from "react";
import { Student, Intervention } from "./PredictiveSupportEngine";

// Demo/mock data extracted for isolation and re-use
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

const interventionImpactData = [
  { name: "Counseling", success: 68, partial: 22, none: 10 },
  { name: "Mindfulness", success: 72, partial: 18, none: 10 },
  { name: "Academic", success: 65, partial: 25, none: 10 },
  { name: "Parental", success: 58, partial: 30, none: 12 },
  { name: "Peer Support", success: 75, partial: 15, none: 10 },
];

// Data sources for the WellLens engine
const dataSources = [
  { name: "Attendance Records", lastSync: "Today, 6:00 AM", status: "active", count: 1245 },
  { name: "Academic Performance", lastSync: "Today, 7:15 AM", status: "active", count: 876 },
  { name: "Behavior Reports", lastSync: "Yesterday, 3:30 PM", status: "active", count: 342 },
  { name: "Mood Check-ins", lastSync: "Today, 8:45 AM", status: "active", count: 563 },
  { name: "Counselor Notes", lastSync: "Yesterday, 4:15 PM", status: "active", count: 128 },
];

// Early warning indicators data
const earlyWarningIndicators = [
  {
    id: "ewi1",
    type: "Attendance Pattern Change",
    description: "Multiple students showing unusual absences on Mondays and Fridays",
    urgency: "medium",
    detectedDate: "Apr 18, 2025",
    confidence: 78,
    affectedStudents: 14,
    trend: "increasing"
  },
  {
    id: "ewi2",
    type: "Mood Score Decline",
    description: "8th grade students showing significant decrease in average mood scores",
    urgency: "high",
    detectedDate: "Apr 20, 2025",
    confidence: 92,
    affectedStudents: 22,
    trend: "increasing"
  },
  {
    id: "ewi3",
    type: "Academic Performance",
    description: "Sudden drop in math assessment results for 7th grade",
    urgency: "medium",
    detectedDate: "Apr 15, 2025",
    confidence: 85,
    affectedStudents: 18,
    trend: "stable"
  }
];

export default function usePredictiveSupportState() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("all");
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(students[0]);
  const [viewMode, setViewMode] = useState<"list" | "detail">("list");

  const filteredStudents = useMemo(() => {
    const matchesSearch = (student: Student) =>
      searchQuery === "" ||
      student.name.toLowerCase().includes(searchQuery.toLowerCase());

    return students.filter((student) => {
      if (selectedFilter === "all") return matchesSearch(student);
      if (selectedFilter === "high") return matchesSearch(student) && student.riskScore >= 75;
      if (selectedFilter === "medium")
        return matchesSearch(student) && student.riskScore >= 50 && student.riskScore < 75;
      if (selectedFilter === "low") return matchesSearch(student) && student.riskScore < 50;
      return matchesSearch(student);
    });
  }, [searchQuery, selectedFilter]);

  const handleStudentSelect = (student: Student) => {
    setSelectedStudent(student);
    setViewMode("detail");
  };

  const handleBackToList = () => {
    setViewMode("list");
  };

  return {
    students,
    interventions,
    interventionImpactData,
    searchQuery,
    setSearchQuery,
    selectedFilter,
    setSelectedFilter,
    filteredStudents,
    selectedStudent,
    setSelectedStudent,
    viewMode,
    setViewMode,
    handleStudentSelect,
    handleBackToList,
    dataSources,
    earlyWarningIndicators
  };
}
