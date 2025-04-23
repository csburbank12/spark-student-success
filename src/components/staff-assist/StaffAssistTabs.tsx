
import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import StaffAssistForm from "./StaffAssistForm";
import InterventionHistory from "./InterventionHistory";
import { StudentProfile, BehaviorLog } from "./types";

interface StaffAssistTabsProps {
  students: StudentProfile[];
  isLoadingStudents: boolean;
  behaviorLogs: BehaviorLog[];
  refetchLogs: () => void;
  isLoadingLogs: boolean;
  logIntervention: {
    isPending: boolean;
    mutate: (data: {
      studentId: string | null;
      situationType: string;
      interventionUsed: string;
      notes: string;
    }) => void;
  };
  updateEffectiveness: {
    isPending: boolean;
    mutate: (data: { logId: string; rating: number }) => void;
  };
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

  // No form reset needed; prop for API parity
  const resetForm = () => {};

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-heading font-bold">Staff Assist Mode</h2>
      </div>
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="assist">Get Assistance</TabsTrigger>
          <TabsTrigger value="history">Intervention History</TabsTrigger>
        </TabsList>
        <TabsContent value="assist" className="space-y-6 mt-6">
          <StaffAssistForm
            students={students}
            isLogging={logIntervention.isPending}
            onLog={(data) => logIntervention.mutate(data)}
            resetForm={resetForm}
          />
        </TabsContent>
        <TabsContent value="history" className="mt-6">
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
