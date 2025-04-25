
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import OverviewTab from "./OverviewTab";
import WellnessTab from "./WellnessTab";
import AcademicsTab from "./AcademicsTab";
import ResourcesTab from "./ResourcesTab";

interface DashboardTabsProps {
  activeTab: string;
  onTabChange: (value: string) => void;
  selectedChildData: any;
  getHomeStrategies: () => string[];
}

const DashboardTabs = ({ 
  activeTab, 
  onTabChange, 
  selectedChildData,
  getHomeStrategies 
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
        <WellnessTab selectedChildData={selectedChildData} />
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
