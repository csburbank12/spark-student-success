
import React from "react";
import RiskOverviewCard from "./RiskOverviewCard";
import TopRiskFactorsCard from "./TopRiskFactorsCard";
import RiskActionItemsCard from "./RiskActionItemsCard";
import HighRiskStudents from "./HighRiskStudents";

// Original student and prop types
interface Student {
  id: string;
  full_name: string;
  email: string;
}

interface StudentRiskDashboardProps {
  students: Student[];
}

const StudentRiskDashboard: React.FC<StudentRiskDashboardProps> = ({ students }) => {
  // Risk breakdown logic
  const highRiskCount = Math.floor(students.length * 0.15);
  const mediumRiskCount = Math.floor(students.length * 0.25);
  const lowRiskCount = students.length - highRiskCount - mediumRiskCount;

  // Mock risk factors
  const riskFactors = [
    { name: "Mood Decline", count: Math.floor(highRiskCount * 0.7), percentage: 70 },
    { name: "Attendance Issues", count: Math.floor(highRiskCount * 0.5), percentage: 50 },
    { name: "Social Isolation", count: Math.floor(highRiskCount * 0.4), percentage: 40 },
    { name: "Academic Struggles", count: Math.floor(highRiskCount * 0.6), percentage: 60 },
    { name: "Behavioral Concerns", count: Math.floor(highRiskCount * 0.3), percentage: 30 },
  ];

  // Generate high risk students mock
  const highRiskStudents = students
    .slice(0, highRiskCount)
    .map(student => ({
      ...student,
      riskFactors: riskFactors
        .filter(() => Math.random() > 0.5)
        .map(factor => factor.name),
      daysInRisk: Math.floor(Math.random() * 14) + 1
    }));

  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-3">
        <RiskOverviewCard
          highRiskCount={highRiskCount}
          mediumRiskCount={mediumRiskCount}
          lowRiskCount={lowRiskCount}
          totalCount={students.length}
        />
        <TopRiskFactorsCard riskFactors={riskFactors} />
        <RiskActionItemsCard
          highRiskCount={highRiskCount}
          mediumRiskCount={mediumRiskCount}
        />
      </div>
      <HighRiskStudents students={highRiskStudents} />
    </div>
  );
};

export default StudentRiskDashboard;
