
import React, { useEffect, ComponentType } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { ErrorLoggingService, ProfileType } from '@/services/ErrorLoggingService';
import { supabase } from '@/integrations/supabase/client';

export type FERPARecordType = 'student_record' | 'academic_data' | 'attendance' | 'behavior' | 'health' | 'sel_data' | 'assessment';
export type FERPAAccessType = 'view' | 'edit' | 'delete' | 'export';

interface WithFERPAComplianceProps {
  recordType: FERPARecordType;
  recordId?: string;
  studentId?: string;
  accessType: FERPAAccessType;
  accessReason?: string;
}

interface FERPAAccessLog {
  user_id: string;
  user_role: ProfileType;
  record_type: FERPARecordType;
  record_id?: string;
  student_id?: string;
  access_type: FERPAAccessType;
  access_reason?: string;
  successful: boolean;
  ip_address?: string;
  timestamp: string;
}

export class FERPAComplianceService {
  static async logAccess(access: Omit<FERPAAccessLog, 'timestamp'>) {
    try {
      // Log to error logging service as we don't have a dedicated FERPA table
      await ErrorLoggingService.logError({
        action: `ferpa_access_${access.access_type}`,
        error_message: `FERPA ${access.access_type}: ${access.user_role} accessed ${access.record_type}${access.record_id ? ` (ID: ${access.record_id})` : ''}${access.student_id ? ` for student ${access.student_id}` : ''}`,
        profile_type: access.user_role
      });
      
      // Store locally for audit purposes
      const logEntry = {
        ...access,
        timestamp: new Date().toISOString()
      };
      
      // Store in localStorage as backup
      try {
        const existingLogs = localStorage.getItem('ferpa_access_logs');
        const logs = existingLogs ? JSON.parse(existingLogs) : [];
        logs.push(logEntry);
        localStorage.setItem('ferpa_access_logs', JSON.stringify(logs.slice(-100))); // Keep last 100 entries
      } catch (storageErr) {
        console.error('Failed to store FERPA log locally:', storageErr);
      }
    } catch (error) {
      console.error('Error logging FERPA access:', error);
    }
  }
}

// Higher-order component to wrap components that access FERPA-protected data
export function withFERPACompliance<P extends object>(
  WrappedComponent: ComponentType<P>,
  {
    recordType,
    accessType,
    accessReason = 'Educational purpose'
  }: WithFERPAComplianceProps
) {
  const WithFERPAComplianceComponent = (props: P & { recordId?: string; studentId?: string }) => {
    const { user } = useAuth();
    
    useEffect(() => {
      if (user) {
        // Log the access attempt when component mounts
        FERPAComplianceService.logAccess({
          user_id: user.id,
          user_role: user.role as ProfileType || 'unknown',
          record_type: recordType,
          record_id: props.recordId || 'multiple',
          student_id: props.studentId,
          access_type: accessType,
          access_reason: accessReason,
          successful: true,
          ip_address: undefined // In a real implementation, you would capture this
        });
      }
    }, [user, props.recordId, props.studentId]);

    return <WrappedComponent {...props} />;
  };

  // Set display name for debugging
  const displayName = WrappedComponent.displayName || WrappedComponent.name || 'Component';
  WithFERPAComplianceComponent.displayName = `withFERPACompliance(${displayName})`;

  return WithFERPAComplianceComponent;
}
