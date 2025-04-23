
import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import StaffAssistForm from "./StaffAssistForm";
import InterventionHistory from "./InterventionHistory";
import { StudentProfile, BehaviorLog } from "./types";
import { useIsMobile } from "@/hooks/use-mobile";
import { UseMutationResult } from "@tanstack/react-query";

interface StaffAssistTabsProps {
  students: StudentProfile[];
  isLoadingStudents: boolean;
  behaviorLogs: BehaviorLog[];
  refetchLogs: () => void;
  isLoadingLogs: boolean;
  logIntervention: UseMutationResult<void, Error, {
    studentId: string | null;
    situationType: string;
    interventionUsed: string;
    notes: string;
  }, unknown>;
  updateEffectiveness: UseMutationResult<void, Error, {
    logId: string;
    rating: number;
  }, unknown>;
}

const StaffAssistTabs: React.FC<StaffAssistTabsProps> = ({
  students,
  isLoadingStudents,
  behaviorLogs,
  refetchLogs,
  isLoadingLogs,
  logIntervention,
  updateEffectiveness,
}) => {
  const [activeTab, setActiveTab] = useState<string>("assist");
  const isMobile = useIsMobile();

  // No form reset needed; prop for API parity
  const resetForm = () => {};

  return (
    <div className="space-y-4 md:space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
        <h2 className="text-2xl md:text-3xl font-heading font-bold">Staff Assist Mode</h2>
        <div className="text-sm md:text-base text-muted-foreground">
          Real-time classroom behavior support
        </div>
      </div>
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className={`grid w-full ${isMobile ? "grid-cols-1 gap-2" : "grid-cols-2"}`}>
          <TabsTrigger value="assist">Get Assistance</TabsTrigger>
          <TabsTrigger value="history">Intervention History</TabsTrigger>
        </TabsList>
        <TabsContent value="assist" className="space-y-6 mt-4 md:mt-6">
          <StaffAssistForm
            students={students}
            isLogging={logIntervention.isPending}
            onLog={(data) => logIntervention.mutate(data)}
            resetForm={resetForm}
          />
        </TabsContent>
        <TabsContent value="history" className="mt-4 md:mt-6">
          <InterventionHistory
            behaviorLogs={behaviorLogs}
            students={students}
            isLoading={isLoadingLogs}
            updateEffectiveness={(logId, rating) =>
              updateEffectiveness.mutate({ logId, rating })
            }
            isEffectivenessSaving={updateEffectiveness.isPending}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default StaffAssistTabs;
