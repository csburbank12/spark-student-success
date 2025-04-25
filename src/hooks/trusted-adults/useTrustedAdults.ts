
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from "sonner";
import { ErrorLoggingService } from '@/services/ErrorLoggingService';
import { TrustedAdult } from '@/types/trusted-adults';
import { getMockTrustedAdults } from '@/utils/mock-data/trusted-adults';
import { useTrustedAdultsHandlers } from './useTrustedAdultsHandlers';

export function useTrustedAdults(studentId: string) {
  const [trustedAdults, setTrustedAdults] = useState<TrustedAdult[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { handleAddTrustedAdult, handleRemoveTrustedAdult } = useTrustedAdultsHandlers(studentId);

  const fetchTrustedAdults = async () => {
    setIsLoading(true);
    if (!studentId) {
      setTrustedAdults([]);
      setIsLoading(false);
      return;
    }
    
    try {
      // For now, use mock data since we have database relationship issues
      const mockTrustedAdults = getMockTrustedAdults(studentId);
      setTrustedAdults(mockTrustedAdults);
      
    } catch (error) {
      console.error('Error fetching trusted adults:', error);
      await ErrorLoggingService.logError({
        action: 'fetch_trusted_adults',
        error_message: error.message,
        profile_type: 'student'
      });
      toast.error("Could not load trusted adults. Please try again later. If the problem persists, contact support.");
    }
    setIsLoading(false);
  };

  const addTrustedAdult = async (staffId: string) => {
    const newAdult = await handleAddTrustedAdult(staffId);
    if (newAdult) {
      setTrustedAdults(prev => [...prev, newAdult]);
    }
  };

  const removeTrustedAdult = async (trustedAdultId: string) => {
    await handleRemoveTrustedAdult(trustedAdultId);
    setTrustedAdults((prev) => prev.filter(adult => adult.id !== trustedAdultId));
  };

  useEffect(() => {
    fetchTrustedAdults();
  }, [studentId]);

  return {
    trustedAdults,
    isLoading,
    addTrustedAdult,
    removeTrustedAdult,
    refreshTrustedAdults: fetchTrustedAdults
  };
}

export type { TrustedAdult };
