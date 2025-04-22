import React, { useState } from "react";
import SchoolSelectorHeader from "./admin-dashboard-enhanced/SchoolSelectorHeader";
import AdminStatsCardsRow from "./admin-dashboard-enhanced/AdminStatsCardsRow";
import RiskDistributionOverview from "./admin-dashboard-enhanced/RiskDistributionOverview";
import AtRiskStudentsTab from "./admin-dashboard-enhanced/AtRiskStudentsTab";
import InterventionsTab, { RecentInterventionsTable } from "./admin-dashboard-enhanced/InterventionsTab";
import TrendsForecastingTab from "./admin-dashboard-enhanced/TrendsForecastingTab";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface SchoolData {
  id: string;
  name: string;
  studentCount: number;
  staffCount: number;
  highRiskCount: number;
  moderateRiskCount: number;
  lowRiskCount: number;
  activeInterventions: number;
}

const mockSchools: SchoolData[] = [
  {
    id: "sch1",
    name: "Washington High School",
    studentCount: 1250,
    staffCount: 85,
    highRiskCount: 42,
    moderateRiskCount: 156,
    lowRiskCount: 1052,
    activeInterventions: 68,
  },
  {
    id: "sch2",
    name: "Lincoln Middle School",
    studentCount: 780,
    staffCount: 54,
    highRiskCount: 35,
    moderateRiskCount: 124,
    lowRiskCount: 621,
    activeInterventions: 52,
  },
  {
    id: "sch3",
    name: "Roosevelt Elementary",
    studentCount: 560,
    staffCount: 42,
    highRiskCount: 18,
    moderateRiskCount: 62,
    lowRiskCount: 480,
    activeInterventions: 30,
  },
];

const AdminDashboardEnhanced = () => {
  const { user } = useAuth();
  const [selectedSchool, setSelectedSchool] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [filterGrade, setFilterGrade] = useState<string>("all");
  const [filterRisk, setFilterRisk] = useState<string>("all");

  const aggregatedData =
    selectedSchool === "all"
      ? mockSchools.reduce(
          (acc, school) => ({
            studentCount: acc.studentCount + school.studentCount,
            staffCount: acc.staffCount + school.staffCount,
            highRiskCount: acc.highRiskCount + school.highRiskCount,
            moderateRiskCount: acc.moderateRiskCount + school.moderateRiskCount,
            lowRiskCount: acc.lowRiskCount + school.lowRiskCount,
            activeInterventions: acc.activeInterventions + school.activeInterventions,
          }),
          {
            studentCount: 0,
            staffCount: 0,
            highRiskCount: 0,
            moderateRiskCount: 0,
            lowRiskCount: 0,
            activeInterventions: 0,
          }
        )
      : mockSchools.find((s) => s.id === selectedSchool) || mockSchools[0];

  const totalStudents = aggregatedData.studentCount;
  const totalRisk = aggregatedData.highRiskCount + aggregatedData.moderateRiskCount;

  const interventionTypes = [
    { name: "Attendance Support", count: 42, success: 65 },
    { name: "Academic Intervention", count: 38, success: 72 },
    { name: "Emotional Support", count: 56, success: 82 },
    { name: "Behavioral Plan", count: 24, success: 58 },
    { name: "Social Skills", count: 30, success: 76 },
  ];

  return (
    <div className="space-y-6">
      <SchoolSelectorHeader
        mockSchools={mockSchools}
        selectedSchool={selectedSchool}
        setSelectedSchool={setSelectedSchool}
      />

      <AdminStatsCardsRow aggregatedData={aggregatedData} totalRisk={totalRisk} />

      <RiskDistributionOverview aggregatedData={aggregatedData} selectedSchool={selectedSchool} />

      <Tabs defaultValue="students">
        <TabsList>
          <TabsTrigger value="students">At-Risk Students</TabsTrigger>
          <TabsTrigger value="interventions">Intervention Analytics</TabsTrigger>
          <TabsTrigger value="trends">Trends & Forecasting</TabsTrigger>
        </TabsList>

        <TabsContent value="students" className="mt-6">
          <AtRiskStudentsTab
            totalRisk={totalRisk}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            filterGrade={filterGrade}
            setFilterGrade={setFilterGrade}
            filterRisk={filterRisk}
            setFilterRisk={setFilterRisk}
          />
        </TabsContent>

        <TabsContent value="interventions" className="mt-6">
          <InterventionsTab interventionTypes={interventionTypes} aggregatedData={aggregatedData} />
          <RecentInterventionsTable />
        </TabsContent>

        <TabsContent value="trends" className="mt-6">
          <TrendsForecastingTab />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminDashboardEnhanced;
