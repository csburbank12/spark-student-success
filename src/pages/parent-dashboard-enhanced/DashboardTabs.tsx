
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import OverviewTab from "./OverviewTab";
import WellnessTab from "./WellnessTab";
import AcademicsTab from "./AcademicsTab";
import ResourcesTab from "./ResourcesTab";
import { Child, RiskLevel } from "@/types/parent-dashboard";

interface DashboardTabsProps {
  activeTab: string;
  onTabChange: (value: string) => void;
  selectedChildData: Child;
  getHomeStrategies: () => string[];
  getRiskColor: (level: RiskLevel) => string;
}

const DashboardTabs = ({ 
  activeTab, 
  onTabChange, 
  selectedChildData,
  getHomeStrategies,
  getRiskColor 
}: DashboardTabsProps) => {
  return (
    <Tabs defaultValue="overview" value={activeTab} onValueChange={onTabChange}>
      <TabsList className="w-full md:w-auto">
        <TabsTrigger value="overview">Overview</TabsTrigger>
        <TabsTrigger value="wellness">Mood & Wellness</TabsTrigger>
        <TabsTrigger value="academics">Academics</TabsTrigger>
        <TabsTrigger value="resources">Family Resources</TabsTrigger>
      </TabsList>

      <TabsContent value="overview" className="space-y-6 pt-4">
        <OverviewTab selectedChildData={selectedChildData} getHomeStrategies={getHomeStrategies} />
      </TabsContent>

      <TabsContent value="wellness" className="space-y-6 pt-4">
        <WellnessTab selectedChildData={selectedChildData} getRiskColor={(level: RiskLevel) => getRiskColor(level)} />
      </TabsContent>

      <TabsContent value="academics" className="space-y-6 pt-4">
        <AcademicsTab selectedChildData={selectedChildData} />
      </TabsContent>

      <TabsContent value="resources" className="space-y-6 pt-4">
        <ResourcesTab />
      </TabsContent>
    </Tabs>
  );
};

export default DashboardTabs;
