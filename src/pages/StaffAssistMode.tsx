
import React from "react";
import { useAuth } from "@/contexts/AuthContext";
import { UserRole } from "@/types/roles";
import { useStaffAssistStudentsAndLogs } from "@/hooks/useStaffAssistStudentsAndLogs";
import { useStaffAssistMutations } from "@/hooks/useStaffAssistMutations";
import StaffAssistAccessDenied from "@/components/staff-assist/StaffAssistAccessDenied";
import StaffAssistTabs from "@/components/staff-assist/StaffAssistTabs";

/**
 * Main StaffAssistMode Page (Presenter)
 * Handles role gating and orchestrates UI and hooks.
 */
const StaffAssistMode: React.FC = () => {
  const { user } = useAuth();
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

  if (!isStaffOrAdmin) {
    return <StaffAssistAccessDenied />;
  }

  return (
    <StaffAssistTabs
      students={students}
      isLoadingStudents={isLoadingStudents}
      behaviorLogs={behaviorLogs}
      refetchLogs={refetchLogs}
      isLoadingLogs={isLoadingLogs}
      logIntervention={logIntervention}
      updateEffectiveness={updateEffectiveness}
    />
  );
};

export default StaffAssistMode;
