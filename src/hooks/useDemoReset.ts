
import { useState } from 'react';
import { toast } from 'sonner';
import { resetDemoData } from '@/utils/demoDataManager';
import { ErrorLoggingService, ProfileType } from '@/services/ErrorLoggingService';

/**
 * Hook to handle demo data reset functionality
 */
export const useDemoReset = () => {
  const [isResetting, setIsResetting] = useState(false);
  
  const handleReset = async () => {
    if (isResetting) return;
    
    setIsResetting(true);
    toast.loading('Resetting demo environment...');
    
    try {
      await resetDemoData();
      
      // Reload the page to show fresh data
      setTimeout(() => {
        window.location.reload();
      }, 1000);
      
    } catch (error) {
      console.error('Failed to reset demo data:', error);
      
      ErrorLoggingService.logError({
        action: 'demo_reset_failed',
        error_message: `Failed to reset demo data: ${error instanceof Error ? error.message : String(error)}`,
        profile_type: 'unknown'
      });
      
      toast.error('Failed to reset demo data. Please try again.');
    } finally {
      setIsResetting(false);
    }
  };
  
  return { 
    isResetting,
    handleReset
  };
};
