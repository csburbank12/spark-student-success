
import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';

export const useOnboardingStatus = () => {
  const { user } = useAuth();
  const [isCompleted, setIsCompleted] = useState<boolean | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkOnboardingStatus = async () => {
      if (!user) {
        setIsLoading(false);
        return;
      }

      try {
        const { data, error } = await supabase
          .from('onboarding_status')
          .select('completed')
          .eq('user_id', user.id)
          .single();

        if (error) throw error;
        setIsCompleted(data?.completed ?? false);
      } catch (error) {
        console.error('Error checking onboarding status:', error);
        toast.error('Failed to check onboarding status');
      } finally {
        setIsLoading(false);
      }
    };

    checkOnboardingStatus();
  }, [user]);

  const completeOnboarding = async () => {
    if (!user) return;

    try {
      const { error } = await supabase
        .from('onboarding_status')
        .update({ 
          completed: true,
          completed_at: new Date().toISOString()
        })
        .eq('user_id', user.id);

      if (error) throw error;
      setIsCompleted(true);
    } catch (error) {
      console.error('Error updating onboarding status:', error);
      toast.error('Failed to update onboarding status');
    }
  };

  return { isCompleted, isLoading, completeOnboarding };
};
