
import React, { useEffect, ComponentType } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { FERPAComplianceService, FERPAAccessType, FERPARecordType } from '@/services/FERPAComplianceService';
import { ProfileType } from '@/services/ErrorLoggingService';

interface WithFERPAComplianceProps {
  recordType: FERPARecordType;
  recordId?: string;
  studentId?: string;
  accessType: FERPAAccessType;
  accessReason?: string;
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
      
      // Return cleanup function
      return () => {
        // Optionally log when component unmounts if needed
      };
    }, [user, props.recordId, props.studentId]);

    return <WrappedComponent {...props} />;
  };

  // Set display name for debugging
  const displayName = WrappedComponent.displayName || WrappedComponent.name || 'Component';
  WithFERPAComplianceComponent.displayName = `withFERPACompliance(${displayName})`;

  return WithFERPAComplianceComponent;
}

// Example usage:
// const ProtectedStudentRecordComponent = withFERPACompliance(StudentRecord, {
//   recordType: 'student_record',
//   accessType: 'view'
// });
