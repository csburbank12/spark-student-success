
import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BarChart3, Calendar, TrendingUp } from "lucide-react";
import BehaviorPredictionEngine from "@/components/behavior-prediction/BehaviorPredictionEngine";
import SelDomainScoresCard from "./SelDomainScoresCard";
import BehaviorHeatmap from "@/components/behavior-prediction/BehaviorHeatmap";
import InterventionImpactAnalysis from "@/components/predictive-support/dashboard/InterventionImpactAnalysis";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";

// Prop types
interface DashboardTabsProps {
  studentData: any;
  interventionImpactData: any[];
}

const DashboardTabs: React.FC<DashboardTabsProps> = ({ studentData, interventionImpactData }) => {
  return (
    <Tabs defaultValue="overview" className="space-y-4">
      <TabsList>
        <TabsTrigger value="overview" className="flex items-center gap-1">
          <BarChart3 className="h-4 w-4" />
          <span>Overview</span>
        </TabsTrigger>
        <TabsTrigger value="timeline" className="flex items-center gap-1">
          <Calendar className="h-4 w-4" />
          <span>Timeline</span>
        </TabsTrigger>
        <TabsTrigger value="impact" className="flex items-center gap-1">
          <TrendingUp className="h-4 w-4" />
          <span>Intervention Impact</span>
        </TabsTrigger>
      </TabsList>
      
      <TabsContent value="overview" className="space-y-6">
        <div className="grid md:grid-cols-2 gap-6">
          <BehaviorPredictionEngine studentData={studentData} />
          <SelDomainScoresCard />
        </div>
        <BehaviorHeatmap 
          studentId={studentData.studentId} 
          studentName={studentData.studentName}
          domains={["emotional", "social", "academic", "behavioral"]} 
        />
      </TabsContent>
      
      <TabsContent value="timeline" className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Long-term Behavior Trends</CardTitle>
            <CardDescription>
              Historical data visualization across all domains
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-96 flex items-center justify-center">
              <p className="text-muted-foreground">Timeline visualization will be implemented here</p>
            </div>
          </CardContent>
        </Card>
      </TabsContent>
      
      <TabsContent value="impact" className="space-y-6">
        <InterventionImpactAnalysis interventionImpactData={interventionImpactData} />
      </TabsContent>
    </Tabs>
  );
};

export default DashboardTabs;
