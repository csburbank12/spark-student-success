
import { supabase } from "@/integrations/supabase/client";
import { ErrorLoggingService, ProfileType } from "@/services/ErrorLoggingService";

export type FERPAAccessType = 'view' | 'edit' | 'delete' | 'create' | 'export' | 'print';
export type FERPARecordType = 'student_record' | 'mood_data' | 'intervention' | 'sel_progress' | 'consent';

export interface FERPAAccessLog {
  user_id: string;
  user_role: ProfileType;
  record_type: FERPARecordType;
  record_id: string;
  student_id?: string;
  access_type: FERPAAccessType;
  access_reason?: string;
  timestamp: string;
  ip_address?: string;
  successful: boolean;
}

export class FERPAComplianceService {
  static async logAccess({
    user_id,
    user_role,
    record_type,
    record_id,
    student_id,
    access_type,
    access_reason,
    successful,
    ip_address
  }: Omit<FERPAAccessLog, 'timestamp'>): Promise<void> {
    try {
      // In a production environment, this would insert into a ferpa_access_logs table
      console.log("FERPA Access Log:", {
        user_id,
        user_role,
        record_type,
        record_id,
        student_id,
        access_type,
        access_reason,
        timestamp: new Date().toISOString(),
        ip_address,
        successful
      });

      // For now, we'll log this using the existing ErrorLoggingService
      await ErrorLoggingService.logError({
        action: `ferpa_${access_type}_${record_type}`,
        error_message: successful 
          ? `User accessed ${record_type} record ${record_id}${student_id ? ` for student ${student_id}` : ''}`
          : `Failed access attempt to ${record_type} record ${record_id}${student_id ? ` for student ${student_id}` : ''}`,
        profile_type: user_role,
      });

    } catch (error) {
      console.error("Failed to log FERPA access:", error);
    }
  }

  static async getAccessLogs(recordType?: FERPARecordType, recordId?: string, studentId?: string, userId?: string): Promise<any[]> {
    try {
      // In a production environment, this would query the ferpa_access_logs table
      // For now, we'll return a mock response
      return [
        {
          user_id: "mock-user-1",
          user_role: "teacher",
          record_type: "student_record",
          record_id: "mock-record-1",
          student_id: "mock-student-1",
          access_type: "view",
          timestamp: new Date().toISOString(),
          successful: true
        }
      ];
    } catch (error) {
      console.error("Failed to retrieve FERPA access logs:", error);
      return [];
    }
  }

  static async hasValidConsent(userId: string, consentType: string): Promise<boolean> {
    try {
      // In a production environment, this would check the user_consents table
      // For now, we'll assume consent is given for required items
      return ["data-collection", "mental-health", "parent-communication", "intervention-sharing"].includes(consentType);
    } catch (error) {
      console.error("Failed to check consent status:", error);
      return false;
    }
  }
}
