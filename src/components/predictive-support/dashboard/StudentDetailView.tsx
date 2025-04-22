
import React from "react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import RiskScoreCard from "../RiskScoreCard";
import RiskFactorsCard from "../RiskFactorsCard";
import InterventionTimeline from "../InterventionTimeline";
import { Student, Intervention } from "../PredictiveSupportEngine";
import RecommendedInterventionsSection from "./RecommendedInterventionsSection";
import CurrentInterventionsSection from "./CurrentInterventionsSection";
import InterventionHistorySection from "./InterventionHistorySection";
import MostEffectiveStrategiesSection from "./MostEffectiveStrategiesSection";
import UpcomingScheduledActionsSection from "./UpcomingScheduledActionsSection";

interface StudentDetailViewProps {
  selectedStudent: Student;
  interventions: Intervention[];
  onBack: () => void;
}

const StudentDetailView: React.FC<StudentDetailViewProps> = ({
  selectedStudent,
  interventions,
  onBack,
}) => {

  return (
    <>
      <div className="flex items-center">
        <Button variant="ghost" className="mr-2" onClick={onBack}>
          Back to List
        </Button>
        <h3 className="text-xl font-medium">
          Student Support Plan: {selectedStudent?.name}
        </h3>
      </div>
      <div className="grid gap-6 md:grid-cols-2">
        <RiskScoreCard student={selectedStudent} />
        <RiskFactorsCard student={selectedStudent} />
      </div>
      <Tabs defaultValue="recommended" className="w-full mt-6">
        <TabsList>
          <TabsTrigger value="recommended">Recommended Interventions</TabsTrigger>
          <TabsTrigger value="interventions">Active Interventions</TabsTrigger>
          <TabsTrigger value="timeline">Timeline</TabsTrigger>
          <TabsTrigger value="history">History</TabsTrigger>
        </TabsList>
        
        <TabsContent value="recommended" className="mt-4">
          <RecommendedInterventionsSection student={selectedStudent} />
        </TabsContent>
        
        <TabsContent value="interventions" className="mt-4">
          <CurrentInterventionsSection interventions={interventions} />
        </TabsContent>
        
        <TabsContent value="timeline">
          <InterventionTimeline interventions={interventions} />
        </TabsContent>
        
        <TabsContent value="history">
          <InterventionHistorySection />
          <div className="mt-8">
            <MostEffectiveStrategiesSection />
          </div>
          <div className="mt-8">
            <UpcomingScheduledActionsSection />
          </div>
        </TabsContent>
      </Tabs>
    </>
  );
};

export default StudentDetailView;
