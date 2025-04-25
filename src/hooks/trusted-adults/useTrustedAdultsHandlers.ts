
import { toast } from "sonner";
import { TrustedAdult } from "@/types/trusted-adults";
import { ErrorLoggingService } from "@/services/ErrorLoggingService";

export const useTrustedAdultsHandlers = (studentId: string) => {
  const handleAddTrustedAdult = async (staffId: string): Promise<TrustedAdult | undefined> => {
    try {
      if (!studentId || !staffId) return;
      
      // Mock implementation
      const newAdult: TrustedAdult = {
        id: `ta${Date.now()}`,
        staff_id: staffId,
        student_id: studentId,
        staff_name: "New Trusted Adult",
        staff_role: "Staff Member",
      };
      
      toast.success("Trusted Adult Added. You can now reach out to this staff member when you need support.");
      
      return newAdult;
      
    } catch (error) {
      console.error('Error adding trusted adult:', error);
      await ErrorLoggingService.logError({
        action: 'add_trusted_adult',
        error_message: error.message,
        profile_type: 'student'
      });
      toast.error("Could not add trusted adult. Please try again. If the problem persists, contact support.");
    }
  };

  const handleRemoveTrustedAdult = async (trustedAdultId: string) => {
    try {
      toast.success("Trusted Adult Removed. The staff member has been removed from your trusted adults.");
      
    } catch (error) {
      console.error('Error removing trusted adult:', error);
      await ErrorLoggingService.logError({
        action: 'remove_trusted_adult',
        error_message: error.message,
        profile_type: 'student'
      });
      toast.error("Could not remove trusted adult. Please try again. If the problem persists, contact support.");
    }
  };

  return {
    handleAddTrustedAdult,
    handleRemoveTrustedAdult
  };
};
