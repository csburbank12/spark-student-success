
import React, { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import StaffAssistForm from "@/components/staff-assist/StaffAssistForm";
import InterventionHistory from "@/components/staff-assist/InterventionHistory";
import { UserRole } from "@/types/roles";
import { useStaffAssistStudentsAndLogs } from "@/hooks/useStaffAssistStudentsAndLogs";
import { useStaffAssistMutations } from "@/hooks/useStaffAssistMutations";

/**
 * Main StaffAssistMode Page (Presenter)
 * Handles role gating and orchestrates UI and hooks.
 */
const StaffAssistMode: React.FC = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState<string>("assist");
  const isStaffOrAdmin =
    user?.role === UserRole.staff.toString() || user?.role === UserRole.admin.toString();

  // Queries for students and logs
  const {
    students,
    isLoadingStudents,
    behaviorLogs,
    refetchLogs,
    isLoadingLogs,
  } = useStaffAssistStudentsAndLogs(user, isStaffOrAdmin);

  // Mutations for logging and updating interventions
  const { logIntervention, updateEffectiveness } = useStaffAssistMutations({
    user,
    refetchLogs,
  });

  // Forwards to child (no local state management needed here)
  const resetForm = () => {};

  if (!isStaffOrAdmin) {
    return (
      <div className="max-w-lg mx-auto mt-20">
        <div className="rounded-lg border bg-card text-card-foreground shadow-sm">
          <div className="flex flex-col space-y-1.5 p-6">
            <h3 className="text-2xl font-semibold leading-none tracking-tight">Access Denied</h3>
          </div>
          <div className="p-6 pt-0">
            <p>You do not have permission to access Staff Assist Mode.</p>
          </div>
        </div>
      </div>
    );
  }

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

export default StaffAssistMode;
