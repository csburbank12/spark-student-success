
import React from "react";
import { useAuth } from "@/contexts/AuthContext";
import { UserRole } from "@/types/roles";
import { useStaffAssistStudentsAndLogs } from "@/hooks/useStaffAssistStudentsAndLogs";
import { useStaffAssistMutations } from "@/hooks/useStaffAssistMutations";
import StaffAssistAccessDenied from "@/components/staff-assist/StaffAssistAccessDenied";
import StaffAssistTabs from "@/components/staff-assist/StaffAssistTabs";
import { useIsMobile } from "@/hooks/use-mobile";
import { StudentProfile } from "@/components/staff-assist/types";

/**
 * Main StaffAssistMode Page (Presenter)
 * Handles role gating and orchestrates UI and hooks.
 */
const StaffAssistMode: React.FC = () => {
  const { user } = useAuth();
  const isMobile = useIsMobile();
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

  // Convert Student objects to StudentProfile objects
  const studentProfiles: StudentProfile[] = students.map(student => ({
    id: student.id,
    first_name: student.first_name || student.name.split(' ')[0],
    last_name: student.last_name || student.name.split(' ')[1] || '',
  }));

  // Mutations for logging and updating interventions
  const { logIntervention, updateEffectiveness } = useStaffAssistMutations({
    user,
    refetchLogs,
  });

  if (!isStaffOrAdmin) {
    return <StaffAssistAccessDenied />;
  }

  return (
    <div className={`container mx-auto px-4 ${isMobile ? 'py-2' : 'py-6'}`}>
      <StaffAssistTabs
        students={studentProfiles}
        isLoadingStudents={isLoadingStudents}
        behaviorLogs={behaviorLogs}
        refetchLogs={refetchLogs}
        isLoadingLogs={isLoadingLogs}
        logIntervention={logIntervention}
        updateEffectiveness={updateEffectiveness}
      />
    </div>
  );
};

export default StaffAssistMode;
